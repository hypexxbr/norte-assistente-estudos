/* Norte | configuração do Tailwind (CDN). As cores apontam para variáveis de assets/css/style.css, então o tema claro/escuro funciona sozinho. */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)', sf: 'var(--sf)', inp: 'var(--inp)', tx: 'var(--tx)', mu: 'var(--mu)',
        pr: 'var(--pr)', onpr: 'var(--onpr)', am: 'var(--am)', fl: 'var(--fl)'
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif']
      }
    }
  }
};
