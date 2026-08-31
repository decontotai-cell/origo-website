# site/fonts/

Coloque aqui os **webfonts licenciados** da marca. Enquanto esta pasta estiver
vazia, o site usa os fallbacks (Fraunces + Manrope) e o visual segue igual.

Arquivos esperados (formato **.woff2**, licença **Webfont** para uso em
site comercial):

| Arquivo | Fonte da marca | Uso |
| --- | --- | --- |
| `Alamanda.woff2` | Alamanda | Títulos de destaque (`--font-display`) — fallback Fraunces |
| `Nexa-Light.woff2` | Nexa (300–400) | Cabeçalhos e interface (`--font-ui`) — fallback Manrope |
| `Nexa-Bold.woff2` | Nexa (500–700) | idem, pesos fortes |
| `Athena-Regular.woff2` | Athena (400) | Subcabeçalhos e parágrafos (`--font-text`) — fallback Manrope |
| `Athena-Medium.woff2` | Athena (500–700) | idem, ênfase |

As declarações `@font-face` já estão no `<head>` do site apontando para estes
nomes. Assim que os arquivos entrarem aqui, as fontes trocam sozinhas.

## Importante — licença

- **Não** usar cópias de sites como FontsFree.net (pirataria).
- **Não** usar versões "PERSONAL USE ONLY" — o site é comercial.
- Nexa: comprar em fontfabric.com (licença Webfont).
- Athena / Alamanda: obter da fundição correta ou da agência de marca
  (Aposto Lab), que provavelmente já tem os arquivos licenciados.
- Converter `.otf`/`.ttf` licenciado para `.woff2` (ex.: `fonttools`,
  `woff2_compress`, ou um conversor confiável).
