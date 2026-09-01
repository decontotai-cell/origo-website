# Órigo Select — conteúdo para a página `/select`

Base fornecida pela fundadora (30/08/2026). Ainda **não** implementado na Home
nem em página — este documento guarda o material para quando `/select` for
construída. Na Home fica só um resumo curto (na seção "Duas vertentes") + a frase
de complementaridade com a People.

## O que é

Recrutamento e seleção **estratégico**, com foco em **assertividade**. Não é
"encaminhar currículos" — é encontrar quem tem a cara da vaga e do momento do
negócio.

## Como funciona — lado da EMPRESA

1. A empresa **cadastra a vaga** no site da Órigo.
2. A Órigo **traça o perfil ideal** da vaga (comportamento, competências, função,
   contexto).
3. **Rastreia compatibilidade** no banco de talentos.
4. **Só encaminha se der match** — o cliente não perde tempo com a pessoa errada,
   na função errada.
5. **Acompanhamento das taxas de conversão** do processo para o cliente.

Ferramentas/insumos ao longo do processo:

- cadastro de candidatos;
- testes vocacionais;
- testes comportamentais;
- testes de competências;
- entrevistas focadas em comportamento e competência;
- leitura postural;
- conexão com funções afins ao perfil.

## Como funciona — lado do CANDIDATO

- É uma forma de **se conhecer** (autoconhecimento pelos assessments).
- É **encaminhado para uma vaga compatível com o próprio perfil**.
- Resultado: mais valor para o profissional e mais satisfação na função que vai
  ocupar (menos frustração, melhor encaixe).

## Complementaridade com a People (isto entra na Home)

- **People** fortalece e organiza quem **já está** na empresa.
- **Select** traz quem **ainda falta**, no lugar certo.
- Juntas, cuidam de **toda a estrutura humana** do negócio.

## Restrições técnicas (mantidas)

- Integração futura com ATS/CRM externo (em avaliação: Recruit CRM, Abler).
- Sem banco de candidatos próprio, sem autenticação própria, sem armazenar
  currículos nesta etapa. Arquitetura desacoplada: `ATSProvider` com
  `getJobs() · getJob() · applyToJob() · createTalentProfile() · createClientJobRequest()`.

## Não inventar

Sem números de assertividade, taxas de conversão, tempo médio, cases ou clientes
até que sejam fornecidos.

## Contatos (fornecidos 31/08/2026)

- E-mail: **origoelect@gmail.com** — ⚠️ conferir grafia (o Instagram é
  `@origoselect`; o e-mail veio sem o "s"). Usar exatamente como fornecido
  até o cliente confirmar.
- Instagram: **@origoselect** — https://instagram.com/origoselect
- WhatsApp/telefone: **(54) 99668-9010** (`wa.me/5554996689010`) —
  provisório, o mesmo número da Órigo People por enquanto.
- Aplicar no CTA e no rodapé quando a página for construída, no mesmo
  padrão da People.

## CTAs de WhatsApp (quando a página for criada)

Número: **+55 54 99668-9010** → base `https://wa.me/5554996689010`

CTAs destinados a **EMPRESAS** ("Falar com a Órigo Select", "Quero contratar", etc.):
`https://wa.me/5554996689010?text=Ol%C3%A1!%20Conheci%20a%20%C3%93rigo%20Select%20pelo%20site%20e%20gostaria%20de%20conversar%20sobre%20recrutamento%20e%20sele%C3%A7%C3%A3o%20para%20minha%20empresa.`
(mensagem: "Olá! Conheci a Órigo Select pelo site e gostaria de conversar sobre recrutamento e seleção para minha empresa.")

Sempre com `target="_blank" rel="noopener noreferrer"` e `data-wa="select"`.

**NÃO** aplicar essa integração de WhatsApp aos CTAs de candidato / vaga /
banco de talentos — esses fluxos terão integração própria com o ATS/CRM.

## Status de implementação (01/09/2026)

Página `/select` completa e no ar, reaproveitando o sistema visual de
Home + People (mesmo header/footer, `.chapter`, `.btn`, `.lens`,
`.decision`, `.photo`, `.cta-contact` — nada redesenhado).

Arquivos:
- `site/select.html` — página principal.
- `site/select-vagas.html` — placeholder elegante de "/select/vagas"
  ("estrutura em implantação", sem "em breve"/"em construção" como texto
  visível).
- `site/select-talentos.html` — idem para "/select/talentos".
- `site/ats-config.js` — camada `OrigoATS` (`provider: "pending"`),
  interface `getJobs/getJob/applyToJob/createTalentProfile/
  createJobRequest/getClientPortalUrl`. Nada chama isso ainda.
- `/select/empresas` NÃO virou arquivo próprio — o conteúdo já é
  completo na âncora `select.html#empresas`.
- `/select/vagas/[slug]` só documentado (depende de dados reais do ATS).

Links `/select` (Home) e `select.html` `data-route` (Home + People)
foram trocados por links reais — a página deixou de ser "em construção".
