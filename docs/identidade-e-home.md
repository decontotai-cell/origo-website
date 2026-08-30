# Identidade e Home — Órigo Human Strategy

Documento de referência para o desenvolvimento do site. Base obrigatória: Manual de Marca,
Menu de Comunicação e Plano de Ação de Conteúdos.

## Interpretação da identidade (15 tópicos)

1. **Órigo = origem.** A marca olha para o que existe *antes* do indicador: o comportamento das pessoas.
2. **Tese temporal.** Indicadores contam o que já aconteceu; comportamento revela o que ainda vai acontecer.
3. **Não é consultoria de RH — nem treinamento de liderança.** É inteligência estratégica sobre comportamento organizacional aplicada ao crescimento. A liderança é alinhada; não é o ponto de partida.
4. **Território do "acha que / mas a origem é".** "O empresário acha que o problema é rotatividade; a origem pode ser liderança."
5. **O trabalho começa no chão de fábrica.** Na primeira linha de produção — quem faz o produto todos os dias, onde ninguém olha. Só depois sobe: líderes imediatos → RH → diretoria (cultura e EVP). Esse diferencial precisa ficar explícito na Home, porque quase todo cliente presume que o foco é a gestão/liderança. (People e Select partem dessa mesma origem: pessoas.)
6. **Select é arquitetura, não produto ainda.** Rotas preparadas para integração futura com ATS/CRM externo.
7. **Promessa central:** "Devolvemos a liberdade para o empresário voltar a ser empresário" — sem prometer resultado garantido.
8. **Manifesto:** "Processos organizam. Tecnologia acelera. Mas são as pessoas que sustentam o crescimento."
9. **Personalidade:** inteligente, estratégica, humana, técnica, elegante, sólida, contemporânea, confiável, discreta, sofisticada.
10. **Paleta terrosa e sóbria.** Leveza dominante, faixas Espresso como âncora, Raiz nos CTAs, Névoa como único tom frio.
11. **Símbolo triádico** (conexões · comportamento · sistema): usar sempre a arte oficial do arquivo (três formas que se tocam sem se fundir), nunca redesenho em CSS/SVG. Microanimação: deriva lenta e quase imperceptível. Versão negativa (monocromática clara) para fundos escuros.
12. **Tom de voz:** seguro, claro, próximo, profundo. Traduz gestão para a rotina do empresário. Zero motivacional vazio.
13. **Estética editorial:** muito respiro, coluna de leitura estreita, alternância de tons. Sem cards, sem ícones de RH, sem banco de imagens.
14. **Fotografia (quando entrar):** trabalho acontecendo, mãos, cadernos, luz natural, materiais — observação, não pose.
15. **Critério-guilhotina:** se a Home pudesse pertencer a qualquer consultoria de RH, está errada.

## Sitemap

```
/                         Home — Órigo Human Strategy
/a-origo                   A Órigo (conceito, método, quem somos)
/people                    Órigo People — consultoria em gestão de pessoas
/select                    Órigo Select — visão geral
  /select/empresas         Fluxo "preciso contratar" → solicitação de vaga
  /select/vagas            Lista de oportunidades (via ATS externo)
  /select/vagas/[slug]     Detalhe da vaga + candidatura (via ATS externo)
  /select/talentos         Banco de talentos (via ATS externo)
/como-pensamos             Editoriais / ponto de vista da marca
/contato                   Contato
/politica-de-privacidade   Legal
/termos                    Legal
```

Camada de integração desacoplada para a Select: `ATSProvider` com
`getJobs() · getJob() · applyToJob() · createTalentProfile() · createClientJobRequest()`.
Mocks isolados da camada visual, substituíveis pela API do ATS escolhido
(em avaliação: Recruit CRM, Abler).

## Conceito visual da Home

- Coluna editorial com medida de leitura ~44rem e trilho de progresso à esquerda.
- Tipografia: *Fraunces* (títulos) + *Manrope* (texto/UI) — substitutas de Nexa/Athena/Alamanda no protótipo.
- Paleta oficial rigorosa; fundo Leveza, faixas Espresso no Manifesto e rodapé.
- Hero sem imagem genérica: motor "*O empresário acha que o problema é [palavra que cicla] — mas a origem é outra*".
- Símbolo oficial (arte do arquivo) ao lado do hero, com deriva lenta. Rodapé usa o lockup negativo transparente (sem caixa).
- Seção 03 traz o método em 6 passos numerados (é uma sequência real: diagnóstico → líderes imediatos → RH → indicadores → diretoria/cultura/EVP → onboarding).
- Tema claro e escuro, ambos com contraste AA. Animações respeitam `prefers-reduced-motion`.

## Hierarquia das seções

| # | Seção | Papel |
| --- | --- | --- |
| 01 | Hero | Tese: antes dos resultados existe o que os produz |
| 02 | A origem | Indicadores (passado) × Comportamento (o que começa) |
| 03 | O nosso olhar | "Analisamos comportamentos" — não começa pela liderança, começa no chão de fábrica + método em 6 passos |
| 04 | Duas vertentes | **central** — People × Select, dois territórios divididos por um filete |
| 05 | Filosofia / Manifesto | Faixa Espresso, muito espaço negativo |
| 06 | Resultado | "Devolvemos a liberdade…" com a ressalva |
| 07 | People ou Select? | Interação A/B → revela a solução certa |
| 08 | CTA final | "Todo crescimento tem uma origem. Vamos encontrá-la." |
| — | Rodapé | Faixa Espresso, navegação, legal, social (em breve) |

## Textos

**Adaptados dos materiais:** "Enquanto a maioria analisa indicadores, nós analisamos
comportamentos"; "Processos organizam. Tecnologia acelera…"; slogan da liberdade;
"O empresário acha que… mas a origem é outra"; os níveis de observação; texto de Resultado.
O método em 6 passos e o foco no chão de fábrica vieram da fala da fundadora (30/08/2026)
e são consistentes com o Menu de Comunicação ("desenvolvemos toda a estrutura humana da
empresa, de baixo para cima").

**A validar (marcados no site):**

- **Órigo Select** — escopo e linguagem de recrutamento (fonte quase não cobre).
- **Contato** — sem e-mail, telefone, cidade ou endereço nos arquivos. `contato@origo.net.br` é placeholder.
- **Redes sociais** — LinkedIn / Instagram sem URLs.
- **Fundadora (Taiane)** — decidir se entra na Home ou só em "A Órigo".
- **Método na Home** — versão curta em 6 passos, na seção 03. O detalhamento (os 7 passos do Menu de Comunicação) fica para `/people`. Confirmar redação dos passos.
- **Números, clientes, cases, certificações** — nenhum foi inventado, conforme instruído.
- **Política de Privacidade / Termos** — só rotas; conteúdo jurídico depois.
