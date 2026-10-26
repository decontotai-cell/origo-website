# Órigo Select — jornada comercial para empresas (`/select/empresas`)

Substitui o fluxo antigo em que os CTAs de empresa abriam o WhatsApp direto.
Agora: **interesse → formulário curto → registro do lead → agendamento →
confirmação → WhatsApp como canal secundário**.

## Arquivos

| Arquivo | Papel |
|---|---|
| `site/select-empresas.html` | A página. Formulário (11 campos) + telas de agendamento e confirmação. |
| `site/select-leads.js` | Camada desacoplada `window.OrigoLeads` — envio do lead e confirmação de reunião. Nenhum dado é guardado no site. |
| `site/select.html` | CTAs de empresa repontados para `select-empresas.html` (ver abaixo). |

### CTAs alterados em `select.html`
- Bifurcação **Sou empresa**: "Abrir uma vaga", "Falar com a Órigo" e o botão "Quero contratar".
- Seção **Como funciona**: botão "Abrir uma vaga".
- **CTA final**: botão "Quero contratar".

Continuam no WhatsApp (de propósito): botão "Fale com a Órigo" do header e do menu
mobile, todos os CTAs do lado "Sou profissional", e o bloco de contato do rodapé.

## Regra de ouro

O lead é **registrado antes** de liberar o agendamento. `submitCompanyLead()` só
resolve com `{ ok: true }` vindo do endpoint. Sem confirmação → a página não avança
e mostra mensagem honesta + WhatsApp. Formulário e agendamento são **duas
conversões**: quem preenche e não agenda **já está salvo** com status `NOVO LEAD`.

## Estados

`select-leads.js` → `leadConfig.status`:

- `"pending"` (atual) — sem endpoint. A página **desabilita o envio** e informa o
  visitante. Não finge que registrou.
- `"test"` — modo de desenvolvimento. Simula sucesso **sem tocar a rede**. Nunca publicar assim.
- `"active"` — envia de verdade e exige `{ok:true}`.

`meetingConfig.status`: `"pending"` (mostra "a Órigo entra em contato para marcar")
ou `"active"` (abre a página de agendamento do Google).

---

## Ativação — o que a Órigo precisa fazer

### 1. Planilha + Apps Script (registro do lead)

1. Criar uma Planilha Google. Anotar o ID (o trecho entre `/d/` e `/edit` na URL).
2. Menu **Extensões → Apps Script**. Apagar o conteúdo e colar o código de
   `apps-script.gs` (abaixo). Preencher `SHEET_ID` e, se quiser, `NOTIFY_TO`.
3. **Implantar → Nova implantação → Tipo: App da Web.**
   - Executar como: **Eu**
   - Quem tem acesso: **Qualquer pessoa**  ← precisa ser este, senão o site não lê a resposta.
4. Copiar a URL que termina em `/exec`.
5. Em `site/select-leads.js`: `leadConfig.endpoint = "…/exec"` e `leadConfig.status = "active"`.
6. Fazer um envio de teste pelo site e conferir a linha na planilha + o e-mail.

> Se a Órigo usar Google Workspace com política que **impeça** publicar como
> "Qualquer pessoa", trocar o provider por um serviço equivalente (Formspree,
> Basin, Getform): muda só `leadConfig` e a função `postJSON` — a página não muda.

### 2. Página de Agendamento do Google (marcar a reunião)

1. Google Agenda → **Criar → Página de agendamento** (Appointment schedule).
2. Duração, disponibilidade, e **adicionar videoconferência do Google Meet**.
3. Publicar e copiar o link público (`calendar.google.com/calendar/appointments/…`).
4. Em `select-leads.js`: `meetingConfig.bookingUrl = "…"` e `meetingConfig.status = "active"`.

O convite, o lembrete e o link do Meet são enviados pelo próprio Google. O site
não recria isso. O botão "Concluí o agendamento" faz um ping best-effort que
atualiza o Status da linha para `REUNIÃO AGENDADA` (se falhar, não tem problema —
o agendamento real aparece na agenda da Órigo).

### 3. Dados que ainda faltam definir
- E-mail que recebe a notificação de lead: o Apps Script implantado pela Órigo usa
  **`origoselect@gmail.com`**. É independente do e-mail de contato exibido no site
  (`origohuman@gmail.com`, geral, desde 26/10/2026).
- Texto jurídico definitivo da Política de Privacidade (o link já aponta para
  `politica-de-privacidade.html`, hoje placeholder).

---

## Contrato do endpoint

**Request** (POST, `Content-Type: text/plain`, corpo = JSON):

```jsonc
// action: "company-lead"
{
  "action": "company-lead",
  "leadId": "OS-20260903-153012-A1B2",
  "nome": "", "cargo": "", "email": "", "telefone": "",
  "empresa": "", "segmento": "", "colaboradores": "", "cidade": "",
  "area": "", "quantidade": "", "prazo": "",
  "consent": true, "consentText": "Concordo com o uso…",
  "origem": "website", "unidade": "select", "pagina": "/select/empresas",
  "status": "NOVO LEAD", "clientTs": "2026-09-03T18:30:12.000Z",
  "utm_source": "", "utm_medium": "", "utm_campaign": "", "utm_content": ""
}
```

```jsonc
// action: "meeting-confirmed"
{ "action": "meeting-confirmed", "leadId": "OS-20260903-153012-A1B2" }
```

**Response** (JSON):

```jsonc
{ "ok": true, "id": "OS-20260903-153012-A1B2", "ts": "2026-09-03T18:30:13.000Z" }
// ou
{ "ok": false, "error": "mensagem" }
```

## Colunas da planilha (aba `Leads`)

`LeadID · Data · Nome · Cargo · E-mail · Telefone · Empresa · Segmento ·
Colaboradores · Cidade · Vaga · Área · Quantidade · Prazo · Descrição · Origem ·
UTM Source · UTM Medium · UTM Campaign · UTM Content · Consentimento · Status`

`Vaga` e `Descrição` ficam reservadas (o formulário atual não tem campo aberto).
`Data` é carimbada no servidor, fuso `America/Sao_Paulo`.

## Funil (valores possíveis de `Status` — sem CRM agora)

`NOVO LEAD → REUNIÃO PENDENTE → REUNIÃO AGENDADA → REUNIÃO REALIZADA →
PROPOSTA ENVIADA → EM NEGOCIAÇÃO → CLIENTE / NÃO CONVERTIDO`

---

## `apps-script.gs`

```js
/**
 * Web App da Órigo Select — captura de leads de empresas.
 * Implantar como App da Web: executar como "Eu", acesso "Qualquer pessoa".
 * Colar a URL /exec em site/select-leads.js -> leadConfig.endpoint
 */
var SHEET_ID   = 'COLE_O_ID_DA_PLANILHA_AQUI';
var SHEET_NAME = 'Leads';
var NOTIFY_TO  = 'origoselect@gmail.com';
var TZ         = 'America/Sao_Paulo';

var COLUMNS = [
  'LeadID', 'Data', 'Nome', 'Cargo', 'E-mail', 'Telefone', 'Empresa', 'Segmento',
  'Colaboradores', 'Cidade', 'Vaga', 'Área', 'Quantidade', 'Prazo', 'Descrição',
  'Origem', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Content',
  'Consentimento', 'Status'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var body = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    if (body.action === 'meeting-confirmed') {
      return json(markMeeting_(body.leadId));
    }

    var sheet = getSheet_();
    var now = new Date();
    var data = Utilities.formatDate(now, TZ, 'yyyy-MM-dd HH:mm:ss');
    var leadId = String(body.leadId || ('OS-' + now.getTime()));

    var row = [
      leadId, data,
      s_(body.nome), s_(body.cargo), s_(body.email), s_(body.telefone),
      s_(body.empresa), s_(body.segmento), s_(body.colaboradores), s_(body.cidade),
      s_(body.vaga), s_(body.area), s_(body.quantidade), s_(body.prazo), s_(body.descricao),
      s_(body.origem) || 'website',
      s_(body.utm_source), s_(body.utm_medium), s_(body.utm_campaign), s_(body.utm_content),
      body.consent ? ('Sim — ' + s_(body.consentText)) : 'Não',
      s_(body.status) || 'NOVO LEAD'
    ];
    sheet.appendRow(row);

    notify_(leadId, data, body);
    return json({ ok: true, id: leadId, ts: now.toISOString() });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore) {}
  }
}

function doGet() { return json({ ok: true, service: 'origo-select-leads' }); }

function getSheet_() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function markMeeting_(leadId) {
  if (!leadId) return { ok: false, error: 'leadId ausente' };
  var sheet = getSheet_();
  var values = sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 0), 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0]) === String(leadId)) {
      sheet.getRange(i + 2, COLUMNS.indexOf('Status') + 1).setValue('REUNIÃO AGENDADA');
      return { ok: true, id: leadId };
    }
  }
  return { ok: false, error: 'lead não encontrado' };
}

function notify_(leadId, data, b) {
  if (!NOTIFY_TO) return;
  var linhas = [
    'Novo lead — Órigo Select (empresas)', '',
    'LeadID: ' + leadId,
    'Data: ' + data, '',
    'Nome: ' + s_(b.nome) + ' (' + s_(b.cargo) + ')',
    'E-mail: ' + s_(b.email),
    'Telefone: ' + s_(b.telefone), '',
    'Empresa: ' + s_(b.empresa) + ' — ' + s_(b.segmento),
    'Colaboradores: ' + s_(b.colaboradores),
    'Cidade: ' + s_(b.cidade), '',
    'Área: ' + s_(b.area),
    'Vagas: ' + s_(b.quantidade),
    'Prazo: ' + s_(b.prazo), '',
    'Origem: ' + (s_(b.origem) || 'website') + ' / ' + s_(b.pagina),
    'UTM: ' + [s_(b.utm_source), s_(b.utm_medium), s_(b.utm_campaign), s_(b.utm_content)].join(' / '),
    'Status: NOVO LEAD'
  ];
  MailApp.sendEmail(NOTIFY_TO, 'Novo lead Órigo Select — ' + s_(b.empresa), linhas.join('\n'));
}

function s_(v) { return (v === undefined || v === null) ? '' : String(v).trim(); }

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```
