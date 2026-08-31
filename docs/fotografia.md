# Direção fotográfica — Home

A Home usa **três** fotografias, e só três. Elas não são ilustração: são parte da
narrativa. A lógica precisa ser percebida sem ser explicada.

```
FOTO 01 — Nosso olhar   → A ORGANIZAÇÃO   (o sistema em funcionamento)
FOTO 02 — Órigo People  → AS PESSOAS      (as relações dentro do sistema)
FOTO 03 — Liberdade     → O EMPRESÁRIO    (ele volta a olhar para o negócio)
```

Não escolher três fotos que contem a mesma história.

## Universo visual comum

Documental + editorial + empresarial — "uma revista de negócios sofisticada
observando pessoas reais enquanto trabalham".

**Buscar:** pessoas reais; trabalho acontecendo; relações espontâneas; gestos;
mãos; movimento; arquitetura; ambientes reais; materiais naturais; luz natural;
texturas; enquadramentos não óbvios; sensação de observação; pouca ou nenhuma pose.

**Tratamento:** saturação levemente reduzida; tons naturais; calor discreto;
contraste suave; textura preservada; aparência editorial. Deve conversar com a
paleta (Raiz `#4B5143`, Espresso `#373028`, Linho `#D9CDBF`, Névoa `#D1E2EC`,
Pedra `#8D7D6E`, Leveza `#F9F9F9`).

**Nunca:** executivo de braços cruzados; ninguém olhando para a câmera; aperto de
mãos; reunião fake; equipe sorrindo em fila; pessoa apontando para gráfico;
escritório tecnológico azul; pose corporativa; foto motivacional; estética de
banco de imagens evidente.

## Como estão implementadas

Cada slot já tem dimensão final, crop, tratamento (overlay `.photo__grade`),
comportamento responsivo e — na Foto 01 — a interação. **Para publicar as fotos
definitivas basta trocar o arquivo:** dentro de `<div class="photo" data-photo="…">`,
substituir `<div class="photo__img">` por `<img src="…" alt="…">` (manter o
`.photo__grade` e os `data-*`). O tratamento e os enquadramentos continuam
funcionando sobre a imagem real.

| Slot | `data-photo` | Proporção desktop | Proporção mobile | Enquadramento |
| --- | --- | --- | --- | --- |
| Foto 01 · Nosso olhar | `olhar` | 5:4 | 4:3 | Cena relativamente ampla — uma empresa em funcionamento, várias relações ao mesmo tempo. Indústria/operação/serviço/escritório real. **Não** tornar a Órigo "de indústria". |
| Foto 02 · People | `people` | 1:1 (máx. 380px) | 1:1 (máx. 460px) | Próximo/médio. Escuta + observação + relação + desenvolvimento. Grupo pequeno à mesa, mãos sobre cadernos, alguém ouvindo. Mais humana que a Foto 01. |
| Foto 03 · Liberdade | `liberdade` | 4:5 | 1:1 | O empresário dentro da própria operação, de costas / perfil / 3-4, **sem olhar para a câmera**. Presença sem centralização — "voltou a olhar para o negócio, não para os incêndios". |

### Foto 01 — interação "Nosso olhar"

Uma única fotografia. Ao ativar cada item (hover no desktop, **toque no mobile**),
muda só o **ponto de observação** — leve zoom + `object-position` + tom do overlay,
transição lenta (~0,9s). Nada rápido.

| Item | Intenção do enquadramento |
| --- | --- |
| 01 — Como o trabalho é feito | execução, mãos, processo |
| 02 — Como as equipes se relacionam | interação entre pessoas |
| 03 — Como a liderança imediata conduz | relação de orientação / acompanhamento |
| 04 — Como a cultura influencia decisões | dinâmica coletiva |
| 05 — Como a estrutura favorece/bloqueia | mais ambiente, organização, sistema |

Frase discreta ao lado da imagem (não compete com os itens):
*"A empresa é a mesma. O que muda é o nosso olhar."*
