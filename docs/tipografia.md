# Tipografia

## Sistema do site (digital) — em uso

| Papel | Família | `--var` | Stack |
| --- | --- | --- | --- |
| Títulos, frases-conceito, verbos do método, blocos editoriais | **Fraunces** (serifada editorial, Google Fonts) | `--font-display` | `"Fraunces", ui-serif, Georgia, "Times New Roman", serif` |
| Corpo de texto, ledes, notas, `body` | **Manrope** (sans, Google Fonts) | `--font-text` | `"Manrope", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` |
| Interface: menu, botões, rótulos, eyebrows, números, footer | **Manrope** | `--font-ui` | igual a `--font-text` |

Carregadas em `<head>` via Google Fonts (`Fraunces` + `Manrope`). É este o
visual aprovado: limpo, contemporâneo, legível, bom para interface digital.

## Fontes do manual da marca (Nexa · Athena · Alamanda)

São **referência de identidade visual** (logo, marca, peças institucionais) —
**não** a fonte funcional do site. Decisão de 01/09/2026: não aplicar
Nexa/Athena/Alamanda como padrão global do site; o ambiente digital fica em
Fraunces + Manrope.

Se, no futuro, a marca quiser usar alguma delas em pontos **muito específicos**
definidos pela identidade, isso é exceção pontual — não regra. Nesse caso:
`@font-face` só para o(s) peso(s) necessário(s), aplicado só naquele componente,
com Fraunces/Manrope como fallback, e revendo `line-height`/`clamp()` porque as
métricas diferem.

## Histórico

- `9045dc7` (31/08) tinha trocado as pilhas para "manual primeiro, Fraunces/
  Manrope como fallback" + `@font-face` apontando para `site/fonts/*.woff2`.
  Os `.woff2` nunca existiram no projeto, então o navegador sempre usou o
  fallback — mas o manual ficava como padrão latente.
- **Revertido em 01/09**: `--font-*` voltaram a ser só Fraunces/Manrope, os
  `@font-face` do manual foram removidos, e `.mstep__lead` (frase-síntese do
  método na People) voltou a herdar a sans, como no estado aprovado.
