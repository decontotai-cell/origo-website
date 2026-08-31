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
