# Norte — assistente de estudos

Protótipo acadêmico de um assistente de estudos que reúne matérias, provas e trabalhos em um só lugar e responde no chat o que entregar primeiro. Projeto final de Desenvolvimento de Interfaces. Todos os dados são fictícios.

## Páginas

| Página | Arquivo |
| --- | --- |
| Início | `index.html` |
| Agenda e matérias | `agenda.html` |
| Assistente (chat) | `assistente.html` |
| Como funciona | `como-funciona.html` |
| Recursos | `recursos.html` |
| Verificador de contraste | `contraste.html` |
| Contato | `contato.html` |
| Entrar (login simulado) | `entrar.html` |

## Estrutura

```
index.html ... entrar.html
assets/
  css/style.css          estilos compartilhados (tema claro/escuro)
  js/tailwind-config.js  cores e fontes do Tailwind (CDN)
  js/app.js              comportamento de todas as páginas
```

## Acessibilidade

Tema claro e escuro, fonte ajustável, opção de reduzir animações, link para pular ao conteúdo, foco visível e contraste seguindo o WCAG 2.1 AA. As preferências ficam salvas no navegador.

## Como publicar no GitHub Pages

1. Envie todos os arquivos para a raiz do repositório.
2. Em **Settings > Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Aguarde alguns minutos e acesse `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

> Projeto acadêmico. Não é um produto oficial do CEUB.
