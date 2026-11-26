# hassan-kebab-center

Site de uma página em português de Portugal. Abre o `index.html` no navegador para veres o site no computador.

## Publicar no GitHub Pages

1. Cria um repositório público com o nome `hassan-kebab-center`. Envia os ficheiros para a raiz do ramo `main`, incluindo a pasta `assets`.
2. No GitHub, abre **Settings → Pages**. Em **Build and deployment**, escolhe **Deploy from a branch**. Seleciona **main** e **/ (root)** e guarda.
3. Quando terminar, o GitHub mostra o endereço em **Settings → Pages**. Se o teu nome de utilizador for diferente de `zgopalgy12-source`, atualiza o endereço em `canonical`, `og:url`, `og:image` e no bloco JSON-LD do `index.html`.

## Editar os dados, a ementa e as fotos

- No `index.html`, procura `TODO`. A morada e o telefone vêm da ficha do Google fornecida. Se os alterares, atualiza também os links de telefone e de direções e o bloco JSON-LD.
- Cada prato é um bloco `<article class="dish">`. Edita o nome, a descrição curta e a categoria. Retira “A confirmar” depois de validares o prato com o restaurante.
- Guarda fotos quadradas WebP, até 1000 × 1000 px, em `assets/menu/`. Atualiza `src`, `alt`, `width` e `height` no cartão. A fotografia ampliada usa o mesmo ficheiro.
- As cores estão nas variáveis no início de `style.css`. O vermelho `#B20D1E` foi amostrado do letreiro da fachada. Para alterar a cor do separador, atualiza também `theme-color` no `index.html` e a cor de fundo em `assets/marca.svg`.
- Os vídeos e os respetivos posters são `assets/grelha.mp4` e `assets/grelha.jpg` no topo, e `assets/wrap.mp4` e `assets/wrap.jpg` no segundo banner. Ao trocar um vídeo, guarda o primeiro fotograma como poster e atualiza as dimensões no HTML, se necessário.
- A imagem de partilha é `assets/og.jpg` (1200 × 630 px). A foto do cartão de localização é `assets/fachada.webp`.

## Por confirmar

- Dias de funcionamento. O horário indicado é das 12:00 às 00:00.
- Nomes, categorias e disponibilidade dos pratos. Preços e ingredientes podem ser acrescentados se o restaurante os fornecer.
- Repositório e categoria do GitHub Discussions, se quiseres ativar os comentários Giscus.
