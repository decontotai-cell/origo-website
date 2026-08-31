# Tipografia

## Fontes da marca (manual)

| Fonte | Papel no manual | No site (`--var`) |
| --- | --- | --- |
| **Nexa** | fonte principal, cabeçalhos (sans geométrica) | `--font-ui` — menu, botões, rótulos, eyebrows, números, footer |
| **Athena** | subcabeçalhos e parágrafos | `--font-text` — corpo de texto, ledes, notas, `body` |
| **Alamanda** | títulos | `--font-display` — h1/h2/h3, frases-conceito, pull quotes, títulos grandes |

## Estado atual (31/08/2026)

As três fontes são **licenciadas / pagas** e **não estão no projeto** com licença
comercial válida (os arquivos que chegaram eram de site pirata / "personal use
only" / pesos incompletos — não podem ir para um site comercial).

Enquanto isso, o site roda com **substitutas de licença livre**, já como fallback
nas variáveis:

- `--font-display` → **Fraunces** (serifada editorial, Google Fonts)
- `--font-text` e `--font-ui` → **Manrope** (sans, Google Fonts)

## Como trocar (quando os webfonts licenciados chegarem)

1. Colocar os `.woff2` em `site/fonts/` com os nomes de `site/fonts/README.md`.
2. Pronto — as `@font-face` do `<head>` já apontam para lá; a marca assume e o
   Fraunces/Manrope viram só fallback.
3. Revisar tamanhos/entrelinhas: Nexa e Athena têm métricas diferentes de
   Manrope; pode ser preciso reajustar `line-height` e alguns `clamp()`.

## Decisão pendente

O manual manda **Nexa (sans) nos títulos**. A V2 aprovada usa **serifada
(Alamanda/Fraunces) nos títulos grandes** — é o ar "revista" que a cliente
aprovou. Confirmar com a marca se mantém o híbrido (serifada nos grandes títulos
+ Nexa na interface) ou vai 100% Nexa nos títulos.
