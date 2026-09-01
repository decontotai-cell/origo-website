# site/fonts/

**O site NÃO usa webfonts locais.** O sistema tipográfico é **Fraunces + Manrope**
(Google Fonts) — ver `docs/tipografia.md`. Esta pasta está vazia de propósito.

As fontes do manual da marca (Nexa · Athena · Alamanda) são referência de
**identidade** (logo/marca), não fonte funcional do site. Decisão de 01/09/2026:
não aplicá-las como padrão global.

Se um dia a marca pedir uma delas num ponto muito específico:

- obter o `.woff2` **licenciado** (licença Webfont — nada de FontsFree.net nem
  "PERSONAL USE ONLY"; o site é comercial);
- adicionar `@font-face` só para o peso necessário;
- aplicar só naquele componente, com Fraunces/Manrope como fallback.
