/*
  Órigo Select — camada desacoplada de captura de lead comercial (empresas).

  O site é estático (GitHub Pages). Este arquivo NÃO guarda dados: ele apenas
  entrega o payload a um endpoint externo que pertence à Órigo e devolve uma
  confirmação de registro. Trocar o destino (ATS / CRM / HubSpot) = mudar
  `leadConfig` e a função de envio; a interface da página não muda.

  Estados de `leadConfig.status`:
    "pending"  → sem endpoint configurado. A página NÃO envia nada e informa
                 o visitante honestamente (não finge que registrou).
    "test"     → modo de desenvolvimento. Simula um registro bem-sucedido
                 SEM tocar a rede. Nunca publicar assim.
    "active"   → envia de verdade ao endpoint e só avança com {ok:true}.

  Nenhuma credencial mora aqui. A URL do endpoint é um destino de POST público,
  não um segredo. A validação de origem/campos fica no endpoint.
*/
(function () {
  "use strict";

  var leadConfig = {
    provider: "google-apps-script",
    endpoint: "https://script.google.com/macros/s/AKfycbzLSqMCEYyelXXhPbAl5t-2-0nII0tTQj1OsyX584DTRV3UPDS0oi-JDwXlecI6UxGl/exec",
    status: "active"       // "pending" | "test" | "active"
  };

  var meetingConfig = {
    provider: "google-calendar",
    bookingUrl: "https://calendar.app.google/1Zd2j4cNnCxtrqZWA",
    status: "active"       // "pending" | "active"
  };

  /* valores possíveis da coluna Status — funil futuro, sem CRM agora */
  var FUNNEL_STATUSES = [
    "NOVO LEAD",
    "REUNIÃO PENDENTE",
    "REUNIÃO AGENDADA",
    "REUNIÃO REALIZADA",
    "PROPOSTA ENVIADA",
    "EM NEGOCIAÇÃO",
    "CLIENTE",
    "NÃO CONVERTIDO"
  ];

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function newLeadId() {
    var d = new Date();
    var stamp = d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) +
                "-" + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds());
    var rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    return "OS-" + stamp + "-" + rand;
  }

  function readUTM() {
    var get = function () { return ""; };
    try {
      var q = new URLSearchParams(window.location.search);
      get = function (k) { return q.get(k) || ""; };
    } catch (e) { /* sem URLSearchParams — segue vazio */ }
    return {
      utm_source: get("utm_source"),
      utm_medium: get("utm_medium"),
      utm_campaign: get("utm_campaign"),
      utm_content: get("utm_content")
    };
  }

  function postJSON(body) {
    return fetch(leadConfig.endpoint, {
      method: "POST",
      /* text/plain => requisição "simples": sem preflight CORS.
         O Apps Script responde com Access-Control-Allow-Origin: * e o
         corpo JSON pode ser lido. */
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body)
    }).then(function (r) {
      return r.json().catch(function () { return null; });
    });
  }

  /*
    Registra o lead. A Promise SÓ resolve quando o endpoint confirma o
    registro ({ok:true}). Qualquer outro caso rejeita — a página não deve
    avançar para o agendamento sem essa confirmação.
  */
  function submitCompanyLead(data) {
    var payload = {};
    var utm = readUTM();
    var k;
    for (k in data) { if (Object.prototype.hasOwnProperty.call(data, k)) payload[k] = data[k]; }
    for (k in utm) { if (Object.prototype.hasOwnProperty.call(utm, k)) payload[k] = utm[k]; }
    payload.action = "company-lead";
    payload.leadId = newLeadId();
    payload.origem = "website";
    payload.unidade = "select";
    payload.pagina = "/select/empresas";
    payload.status = "NOVO LEAD";
    payload.clientTs = new Date().toISOString();

    if (leadConfig.status === "test") {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve({ ok: true, id: payload.leadId, ts: new Date().toISOString(), testMode: true });
        }, 650);
      });
    }

    if (leadConfig.status !== "active" || !leadConfig.endpoint) {
      return Promise.reject({ code: "not-configured" });
    }

    return postJSON(payload).then(function (res) {
      if (res && res.ok) {
        return { ok: true, id: res.id || payload.leadId, ts: res.ts || null };
      }
      throw { code: "no-ack", res: res };
    }, function () {
      throw { code: "network" };
    });
  }

  /*
    Marca (best-effort) que a pessoa concluiu o agendamento. Nunca bloqueia a
    experiência: se falhar, o lead original continua íntegro e o agendamento
    real está na Google Agenda da Órigo.
  */
  function confirmMeeting(leadId) {
    if (leadConfig.status === "test") {
      return Promise.resolve({ ok: true, testMode: true });
    }
    if (leadConfig.status !== "active" || !leadConfig.endpoint || !leadId) {
      return Promise.resolve({ ok: false, skipped: true });
    }
    return postJSON({ action: "meeting-confirmed", leadId: leadId })
      .then(function (res) { return res || { ok: false }; }, function () { return { ok: false }; });
  }

  window.OrigoLeads = {
    leadConfig: leadConfig,
    meetingConfig: meetingConfig,
    FUNNEL_STATUSES: FUNNEL_STATUSES,
    submitCompanyLead: submitCompanyLead,
    confirmMeeting: confirmMeeting,
    isLeadActive: function () { return leadConfig.status === "active" && !!leadConfig.endpoint; },
    isMeetingActive: function () { return meetingConfig.status === "active" && !!meetingConfig.bookingUrl; }
  };
})();
