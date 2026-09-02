/*
 * Órigo Select — camada de preparação para o ATS/CRM de recrutamento.
 * =================================================================
 * O ATS/CRM definitivo AINDA NÃO foi escolhido (avaliando plataformas
 * profissionais). Este arquivo é o ÚNICO ponto de configuração da
 * integração futura — nenhuma URL, chave ou chamada de ATS deve ficar
 * espalhada pelas páginas.
 *
 *   ATS_STATUS = "pending"  -> nada de rede; a interface mostra os
 *                              estados de "estrutura em preparação".
 *   ATS_STATUS = "active"   -> os providers passam a falar com a API /
 *                              white-label do ATS escolhido, SEM que a
 *                              interface precise ser reescrita.
 *
 * Quando o ATS for definido:
 *   1. Trocar ATS_STATUS para "active" e preencher `config`.
 *   2. Implementar os três providers abaixo chamando a API real.
 *   3. Nenhuma página (select.html, select-vagas.html,
 *      select-talentos.html) muda de estrutura — elas já esperam
 *      por este contrato e têm um ponto de montagem (#ats-mount).
 *
 * Este arquivo NÃO cria backend próprio, banco de candidatos,
 * autenticação, upload de currículo nem coleta de dados pessoais.
 */
window.OrigoSelect = (function () {
  "use strict";

  /* -------- interruptor único de modo -------- */
  var ATS_STATUS = "pending"; // "pending" | "active"

  /* -------- configuração da integração (preencher quando "active") -------- */
  var config = {
    provider: null,             // ex.: "recruit-crm", "abler"
    jobsUrl: null,              // endpoint/whitelabel de vagas
    talentPoolUrl: null,        // endpoint/whitelabel do banco de talentos
    clientPortalUrl: null,      // portal do cliente (candidatos encaminhados, pareceres, andamento)
    applicationMode: "pending"  // "pending" | "external" (leva ao ATS) | "embedded" (widget na página)
  };

  function isActive() { return ATS_STATUS === "active"; }
  function empty() { return Promise.resolve([]); }
  function noop() { return Promise.resolve(null); }

  /* -------- componentes reutilizáveis (contrato fixo) -------- */

  /* Vagas — /select/vagas e /select/vagas/[slug] */
  var JobsProvider = {
    /** Lista de vagas publicadas. "pending" -> []. */
    list: function () { return empty(); },
    /** Detalhe de uma vaga por id ou slug. "pending" -> null. */
    get: function (idOrSlug) { return noop(); }
  };

  /* Banco de talentos — /select/talentos */
  var TalentProvider = {
    /** Envio de perfil ao banco de talentos. "pending" -> null (a UI não deve coletar dados ainda). */
    submitProfile: function (payload) { return noop(); }
  };

  /* Solicitações de empresa / portal do cliente */
  var ClientRequestProvider = {
    /** Abertura de vaga por um cliente. "pending" -> null. */
    create: function (payload) { return noop(); },
    /** URL do portal do cliente, quando existir. */
    getClientPortalUrl: function () { return config.clientPortalUrl; }
  };

  return {
    ATS_STATUS: ATS_STATUS,
    config: config,
    isActive: isActive,
    JobsProvider: JobsProvider,
    TalentProvider: TalentProvider,
    ClientRequestProvider: ClientRequestProvider
  };
})();
