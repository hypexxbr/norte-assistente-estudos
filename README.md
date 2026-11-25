# Norte | assistente de estudos

Protótipo acadêmico de um assistente de estudos que reúne provas, trabalhos e avisos em uma lista só e responde no chat o que entregar primeiro. Projeto final de Desenvolvimento de Interfaces. Todos os dados são fictícios e nada é enviado a servidores.

## Como abrir

1. Extraia a pasta inteira (não abra os arquivos de dentro do .zip).
2. Dê dois cliques em `index.html`. É preciso internet, porque o Tailwind e as fontes vêm de CDN.

## Páginas

| Página | Arquivo | Função |
| --- | --- | --- |
| Início (landing) | `index.html` | Apresenta o projeto e leva às outras páginas |
| Agenda | `agenda.html` | Cartões de prazos, abas de filtro, busca e matérias |
| Assistente | `assistente.html` | Chat que responde a partir da agenda |
| Como funciona | `como-funciona.html` | Carrossel de três passos e perguntas frequentes |
| Recursos | `recursos.html` | Cartões explicativos |
| Contraste | `contraste.html` | Verificador WCAG e tabela de razões do site |
| Contato | `contato.html` | Formulário simulado |
| Entrar | `entrar.html` | Login simulado |

## Estrutura

```
index.html ... entrar.html
assets/
  css/style.css          variáveis de tema, regras globais e ilustrações
  js/tailwind-config.js  cores e fontes do Tailwind (CDN)
  js/app.js              comportamento de todas as páginas
```

## Tecnologias

- HTML5 semântico, com um arquivo por página.
- Tailwind CSS 3.4.17 via CDN, com as cores ligadas a variáveis CSS.
- JavaScript puro, sem bibliotecas.
- Fontes Fraunces (títulos) e IBM Plex Sans (texto), via Google Fonts.

## Design

Estilo editorial plano: fundo creme, tinta marrom, vinho e mostarda. Cantos retos, bordas finas, sem sombras, sem gradientes e sem animações. O tema escuro troca as variáveis do `:root` e mantém as mesmas proporções.

## Acessibilidade

Tema claro e escuro, fonte de 80% a 150%, opção de sublinhar todos os links, link para pular ao conteúdo, foco visível, menu que fecha com Esc, rótulos em todos os campos e contraste conferido pelo WCAG 2.1 AA (tabela em `contraste.html`). As preferências ficam salvas no navegador.

> Projeto acadêmico. Não é um produto oficial do CEUB.
