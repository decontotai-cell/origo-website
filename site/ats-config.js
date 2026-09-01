/*
 * Órigo Select — camada de integração com o ATS/CRM (recrutamento).
 * =============================================================
 * O ATS/CRM definitivo AINDA NÃO foi escolhido (avaliando plataformas
 * profissionais). Este arquivo isola toda a futura integração numa
 * interface única — para nenhuma URL, chamada ou credencial de ATS ficar
 * espalhada pelos componentes da página.
 *
 * Enquanto `config.provider` for "pending":
 *   - nenhuma chamada de rede é feita;
 *   - toda função devolve um resultado vazio/nulo, de forma previsível;
 *   - a interface do site continua funcionando normalmente (nada quebra).
 *
 * Quando o ATS for definido, os passos são:
 *   1. Preencher `config` (provider, jobsUrl, talentPoolUrl, clientPortalUrl,
 *      applicationMode: "external" quando o candidato é levado para o
 *      ambiente do ATS, ou "embedded" quando o ATS expõe um widget/iframe).
 *   2. Implementar cada função abaixo chamando a API real do provider
 *      escolhido (ou seu SDK/whitelabel).
 *   3. Nenhuma página (select.html, select-vagas.html, select-talentos.html)
 *      precisa mudar de estrutura — elas já esperam por este contrato.
 *
 * Este arquivo NÃO cria banco de candidatos, autenticação, upload de
 * currículo nem armazenamento de dados pessoais. É só a interface.
 */
window.OrigoATS = (function () {
  "use strict";

  var config = {
    provider: "pending",        // "pending" | nome do ATS quando escolhido (ex.: "recruit-crm", "abler")
    jobsUrl: null,               // URL/endpoint de listagem de vagas do ATS
    talentPoolUrl: null,         // URL/endpoint do banco de talentos do ATS
    clientPortalUrl: null,       // URL do portal do cliente (candidatos encaminhados, pareceres, andamento)
    applicationMode: "pending"   // "pending" | "external" (leva ao ATS) | "embedded" (widget na própria página)
  };

  function pending() {
    return Promise.resolve(config.provider === "pending" ? [] : []);
  }
  function pendingNull() {
    return Promise.resolve(null);
  }

  return {
    config: config,

    /** Lista de vagas publicadas. Em modo "pending": lista vazia. */
    getJobs: function () {
      return pending();
    },

    /** Detalhe de uma vaga por id/slug. Em modo "pending": null. */
    getJob: function (idOrSlug) {
      return pendingNull();
    },

    /** Candidatura a uma vaga. Em modo "pending": não faz nada (a UI não deve chamar isto ainda). */
    applyToJob: function (jobId, payload) {
      return pendingNull();
    },

    /** Cadastro no banco de talentos. Em modo "pending": não faz nada. */
    createTalentProfile: function (payload) {
      return pendingNull();
    },

    /** Abertura de vaga por um cliente (portal empresa). Em modo "pending": não faz nada. */
    createJobRequest: function (payload) {
      return pendingNull();
    },

    /** URL do portal do cliente, quando existir. Em modo "pending": null. */
    getClientPortalUrl: function () {
      return config.clientPortalUrl;
    }
  };
})();
