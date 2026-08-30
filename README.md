# Órigo Human Strategy — Website

Site oficial da **Órigo Human Strategy** — estratégia humana aplicada ao crescimento das empresas.
Domínio: [origo.net.br](https://origo.net.br)

## O que é a Órigo

Marca principal com duas vertentes:

| Vertente | O que é |
| --- | --- |
| **Órigo People** | Consultoria estratégica em gestão de pessoas |
| **Órigo Select** | Recrutamento e seleção estratégico |

Conceito central: *Órigo = origem*. Antes dos indicadores, existe o comportamento.
A marca trabalha na causa-raiz — comportamento, pessoas e estrutura — antes de virar problema.

## Estado atual

Protótipo visual da **Home** (v1), página única e autocontida.
As páginas internas (`/people`, `/select/*`, `/como-pensamos`, `/contato`) existem
apenas como rotas preparadas.

## Como visualizar

Abra `site/index.html` no navegador. Não precisa de servidor nem build — todo o CSS,
o JavaScript e os logos estão embutidos no arquivo.

## Estrutura

```
site/
  index.html        Home (protótipo v1)
  brand/            Recortes web dos logos oficiais (símbolo e lockup, claro/escuro)
docs/
  identidade-e-home.md   Interpretação da identidade, sitemap e conceito da Home
```

## Paleta oficial

| Nome | Hex |
| --- | --- |
| Raiz | `#4B5143` |
| Espresso | `#373028` |
| Linho | `#D9CDBF` |
| Névoa | `#D1E2EC` |
| Pedra | `#8D7D6E` |
| Leveza | `#F9F9F9` |

Tipografia da marca: **Nexa** (títulos), **Athena** (texto), **Alamanda** (destaques) —
fontes licenciadas. O protótipo usa *Fraunces* + *Manrope* como substitutas.

## Próximos passos

- [ ] Aprovar a Home
- [ ] Migrar para Next.js + TypeScript + Tailwind (requer Node.js instalado)
- [ ] Desenvolver `/people`
- [ ] Desenvolver `/select` com camada de integração desacoplada para ATS/CRM externo
- [ ] Substituir dados a validar (contato, redes sociais, textos da Select)

## Não versionado

Os arquivos-fonte da marca (`*.pdf`, `*.docx`, PNGs originais na raiz) ficam fora do
controle de versão — ver `.gitignore`. Eles permanecem na pasta local / Google Drive.
