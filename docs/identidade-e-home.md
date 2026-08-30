# Identidade e Home — Órigo Human Strategy

Documento de referência para o desenvolvimento do site. Base obrigatória: Manual de Marca,
Menu de Comunicação e Plano de Ação de Conteúdos.

## Interpretação da identidade (15 tópicos)

1. **Órigo = origem.** A marca olha para o que existe *antes* do indicador: o comportamento das pessoas.
2. **Tese temporal.** Indicadores contam o que já aconteceu; comportamento revela o que ainda vai acontecer.
3. **Não é consultoria de RH — nem treinamento de liderança.** É inteligência estratégica sobre comportamento organizacional aplicada ao crescimento. A liderança é alinhada; não é o ponto de partida.
4. **Território do "acha que / mas a origem é".** "O empresário acha que o problema é rotatividade; a origem pode ser liderança."
5. **O trabalho começa no chão de fábrica.** Na primeira linha de produção — quem faz o produto todos os dias, onde ninguém olha. Só depois sobe: lideranças imediatas → RH → cultura/EVP/employer branding → indicadores → acompanhamento. Esse diferencial precisa ficar explícito na Home, porque quase todo cliente presume que o foco é a gestão/liderança. (People e Select partem dessa mesma origem: pessoas.)
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
- Seção 03 traz **O método** em 7 passos numerados, alinhado ao método oficial (Menu de Comunicação): diagnóstico organizacional → trabalho direto com a equipe (chão de fábrica; inclui reposicionamento e onboarding) → treinamento das lideranças imediatas → alinhamento com o RH → cultura, EVP e employer branding → indicadores → acompanhamento contínuo.
- Onboarding **não** é passo final: é uma das muitas ações que partem do diagnóstico, dentro do trabalho com a equipe.
- Tema claro e escuro, ambos com contraste AA. Animações respeitam `prefers-reduced-motion`.

## Hierarquia das seções — V2 (capítulos visuais + ritmo cromático)

| # | Seção | Fundo | Papel |
| --- | --- | --- | --- |
| 01 | Hero | Leveza | Tese + símbolo triádico arquitetônico (2 camadas, saindo pela viewport, deriva lenta) |
| 02 | A origem | Névoa suave | Eixo diagonal Indicadores (passado, baixo) ↔ Comportamento (adiante, alto), rótulos verticais |
| 03 | Frase-conceito | **Raiz** | "Os números contam o que aconteceu…" — ~88vh, tipografia enorme |
| 04 | O nosso olhar | Leveza | 5 linhas editoriais (botões), numeração 01–05. Ativar um item (hover no desktop, toque no mobile) reenquadra a **mesma** foto — "a empresa é a mesma, muda o olhar" |
| 05 | O método | Linho | Jornada: Diagnosticar → Estruturar → Desenvolver → Consolidar → Mensurar → Acompanhar, com linha que preenche no scroll. EVP/branding/treinamento/cultura são ações possíveis, nunca etapas |
| 06 | Duas vertentes | People em Névoa/Linho · Select em Raiz/Espresso | Dois territórios de ~84vh lado a lado; hover expande ~55/45; empilham no mobile |
| 07 | Manifesto | **Espresso** | 3 linhas preservadas + símbolo gigante fora da tela, opacidade 0.06 |
| 08 | Devolvemos a liberdade | Linho | Composição assimétrica texto ~55% / foto ~45%; a foto "escapa" para a seção seguinte |
| 09 | Decisão | Leveza | "Preciso olhar para dentro" / "Preciso encontrar quem vai chegar" — duas linhas grandes e clicáveis (sem "Opção A/B") |
| 10 | CTA final | **Espresso** | "Todo crescimento tem uma origem. Vamos encontrá-la." |
| — | Rodapé | Espresso | Navegação, legal, social (em breve) |

**Movimento (V2):** reveal com direção (esquerda/direita), deriva lenta e parallax mínimo no símbolo, linha do método preenchendo no scroll, marcador de capítulo no trilho lateral (A ORIGEM → O COMPORTAMENTO → O MÉTODO → PEOPLE + SELECT → O RESULTADO), hover editorial. Textura de papel fixa quase imperceptível. Tudo respeita `prefers-reduced-motion`; trilho some abaixo de 1120px.

**Fotografia (V2):** 3 momentos, com função narrativa distinta — **Foto 01** (Nosso olhar) = a organização/sistema; **Foto 02** (People) = as pessoas; **Foto 03** (Liberdade) = o empresário. Direção completa, especificação de cada slot e como trocar o arquivo em [`fotografia.md`](fotografia.md). Enquanto não há fotos reais, cada slot já tem dimensão final, crop, tratamento (`.photo__grade`), interação e responsivo — basta trocar `<div class="photo__img">` por `<img>`. Sem rótulos de placeholder na interface.

## Textos

**Adaptados dos materiais:** "Enquanto a maioria analisa indicadores, nós analisamos
comportamentos"; "Processos organizam. Tecnologia acelera…"; slogan da liberdade;
"O empresário acha que… mas a origem é outra"; os níveis de observação; texto de Resultado.
O método em 7 passos e o foco no chão de fábrica vieram da fala da fundadora (30/08/2026),
alinhados ao método oficial do Menu de Comunicação ("desenvolvemos toda a estrutura humana
da empresa, de baixo para cima").

**A validar (marcados no site):**

- **Órigo Select** — escopo e linguagem de recrutamento (fonte quase não cobre).
- **Contato** — sem e-mail, telefone, cidade ou endereço nos arquivos. `contato@origo.net.br` é placeholder.
- **Redes sociais** — LinkedIn / Instagram sem URLs.
- **Fundadora (Taiane)** — decidir se entra na Home ou só em "A Órigo".
- **Método na Home (V2, revisado 30/08/2026)** — jornada de 6 macroetapas: **Diagnosticar → Estruturar → Desenvolver → Consolidar → Mensurar → Acompanhar**. Na interface: verbo grande + 1 frase-síntese + linha de palavras-chave. EVP, Employer Branding, cultura, treinamento, DISC etc. **não** são etapas — são ações possíveis que surgem do diagnóstico de cada empresa. Lógica implícita: "não chegamos com uma solução pronta; primeiro entendemos". Detalhe completo de cada fase fica para `/people`.
- **Fotografia** — sem imagens reais ainda. Definir 3 fotos editoriais (Nosso olhar / People / Liberdade).
- **Fontes da marca** — Nexa/Athena/Alamanda são licenciadas; o protótipo usa Fraunces + Manrope. Adquirir/instalar para o build definitivo.
- **Números, clientes, cases, certificações** — nenhum foi inventado, conforme instruído.
- **Política de Privacidade / Termos** — só rotas; conteúdo jurídico depois.
