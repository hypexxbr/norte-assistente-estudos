/* Norte | comportamento das páginas. Cada bloco só roda se os elementos existirem na página. */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const R = document.documentElement;
const st = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};

/* ---------- acessibilidade (todas as páginas) ---------- */
let fs = +(st.get('fs') || 100);
const applyFs = () => { R.style.setProperty('--fs', fs + '%'); st.set('fs', fs); };
if (st.get('th')) R.dataset.theme = st.get('th');
applyFs();
if (st.get('ul') === '1') { document.body.classList.add('ul'); if ($('#ul')) $('#ul').checked = true; }
const a11yBtn = $('#a11yBtn'), a11y = $('#a11y');
if (a11yBtn && a11y) {
  a11yBtn.onclick = () => { const abrir = a11y.hidden; a11y.hidden = !abrir; a11yBtn.setAttribute('aria-expanded', abrir); };
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !a11y.hidden) { a11y.hidden = true; a11yBtn.setAttribute('aria-expanded', false); a11yBtn.focus(); }
  });
}
$$('[data-theme-set]').forEach(b => b.onclick = () => { R.dataset.theme = b.dataset.themeSet; st.set('th', b.dataset.themeSet); });
if ($('#fPlus')) $('#fPlus').onclick = () => { fs = Math.min(150, fs + 10); applyFs(); };
if ($('#fMinus')) $('#fMinus').onclick = () => { fs = Math.max(80, fs - 10); applyFs(); };
if ($('#fReset')) $('#fReset').onclick = () => { fs = 100; applyFs(); };
if ($('#ul')) $('#ul').onchange = e => { document.body.classList.toggle('ul', e.target.checked); st.set('ul', e.target.checked ? '1' : '0'); };

/* ---------- dados fictícios ---------- */
const subs = [
  ['Desenvolvimento Web', 'Prof. Almeida', 'Seg e qua, 19h'],
  ['Banco de Dados', 'Profa. Ribeiro', 'Ter e qui, 19h'],
  ['Estrutura de Dados', 'Prof. Matos', 'Seg e qui, 21h'],
  ['Cálculo II', 'Profa. Lima', 'Sex, 19h']
];
const items = [
  { t: 'prova', m: 'Banco de Dados', n: 'Prova bimestral (AV1)', d: 2 },
  { t: 'trabalho', m: 'Desenvolvimento Web', n: 'Entrega do projeto final', d: 5 },
  { t: 'trabalho', m: 'Estrutura de Dados', n: 'Lista de exercícios sobre árvores', d: 1 },
  { t: 'prova', m: 'Cálculo II', n: 'Prova de integrais', d: 9 },
  { t: 'aviso', m: 'Desenvolvimento Web', n: 'Aula de revisão no laboratório', d: 0 },
  { t: 'aviso', m: 'Banco de Dados', n: 'Material de apoio publicado', d: 3 },
  { t: 'trabalho', m: 'Cálculo II', n: 'Relatório de aplicações', d: 12 }
];
const lab = { prova: 'Prova', trabalho: 'Trabalho', aviso: 'Aviso' };
const when = d => d === 0 ? 'hoje' : d === 1 ? 'amanhã' : 'em ' + d + ' dias';
const D = d => new Date(Date.now() + d * 864e5);
const mon = d => D(d).toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');

/* ---------- início: esta semana ---------- */
if ($('#mini')) {
  $('#mini').innerHTML = items.filter(i => i.t !== 'aviso').sort((a, b) => a.d - b.d).slice(0, 4).map(i =>
    `<div class="grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-3 border-t border-tx py-3 first:border-t-0 first:pt-0"><b class="font-display text-xl font-extrabold">${D(i.d).getDate()} ${mon(i.d)}</b><span>${i.n}<small class="block text-mu">${i.m}</small></span><span class="font-semibold">${when(i.d)}</span></div>`
  ).join('');
}

/* ---------- agenda ---------- */
if ($('#list')) {
  let tab = 'todos';
  const render = () => {
    const q = $('#q').value.trim().toLowerCase();
    const l = items.filter(i => (tab === 'todos' || i.t === tab) && (i.m + ' ' + i.n).toLowerCase().includes(q)).sort((a, b) => a.d - b.d);
    $('#count').textContent = l.length ? l.length + ' resultado(s)' : 'Nenhum resultado. Tente outro termo ou outra aba.';
    $('#list').innerHTML = l.map(i => {
      const u = i.d <= 2 && i.t !== 'aviso';
      return `<article class="mb-4 grid grid-cols-[5rem_1fr] gap-4 border-2 border-tx bg-sf"><div class="border-r-2 border-tx p-2 text-center font-display ${u ? 'bg-fl text-[#3B2A2F]' : ''}"><b class="block text-3xl leading-none">${D(i.d).getDate()}</b>${mon(i.d)}</div><div class="py-3 pr-3"><span class="text-xs font-semibold uppercase tracking-[.08em] text-pr">${lab[i.t]}</span><h3 class="font-display text-xl font-semibold leading-tight">${i.n}</h3><p class="text-mu">${i.m}</p><p class="font-semibold ${u ? 'text-am' : ''}">${u ? 'Atenção ao prazo, ' : ''}${when(i.d)}</p></div></article>`;
    }).join('');
  };
  $$('#tabs [role=tab]').forEach(b => b.onclick = () => {
    tab = b.dataset.k;
    $$('#tabs [role=tab]').forEach(x => x.setAttribute('aria-selected', x === b));
    render();
  });
  $('#q').oninput = render;
  if ($('#subs')) $('#subs').innerHTML = subs.map(s => `<div class="border-2 border-tx bg-sf p-4"><h3 class="font-display text-xl font-semibold">${s[0]}</h3><p class="text-mu">${s[1]}</p><p class="text-mu">${s[2]}</p></div>`).join('');
  render();
}

/* ---------- assistente (chat) ---------- */
if ($('#log')) {
  const fmt = a => a.map(i => '• ' + lab[i.t] + ': ' + i.n + ' (' + i.m + '), ' + when(i.d)).join('\n');
  const reply = q => {
    q = q.toLowerCase();
    const s = subs.find(x => q.includes(x[0].toLowerCase()));
    if (s) return s[0] + ' (' + s[1] + '):\n' + fmt(items.filter(i => i.m === s[0]).sort((a, b) => a.d - b.d));
    if (q.includes('semana') || q.includes('próxim') || q.includes('entreg')) return 'Nos próximos 7 dias:\n' + fmt(items.filter(i => i.d <= 7).sort((a, b) => a.d - b.d));
    if (q.includes('hoje')) { const l = items.filter(i => i.d === 0); return l.length ? 'Hoje:\n' + fmt(l) : 'Nada marcado para hoje.'; }
    for (const k of ['prova', 'trabalho', 'aviso']) if (q.includes(k)) return fmt(items.filter(i => i.t === k).sort((a, b) => a.d - b.d));
    return 'Não entendi. Pergunte sobre “esta semana”, “provas”, “trabalhos” ou o nome de uma matéria.';
  };
  const say = (t, c) => {
    const b = document.createElement('div');
    b.className = 'max-w-[88%] whitespace-pre-line border-2 border-tx px-3 py-2 ' + (c === 'me' ? 'self-end bg-pr text-onpr' : 'self-start bg-inp');
    const s = document.createElement('small');
    s.className = 'block text-xs font-semibold uppercase tracking-wider';
    s.textContent = c === 'me' ? 'Você' : 'Norte';
    b.append(s, t);
    $('#log').append(b);
    $('#log').scrollTop = 1e5;
  };
  const ask = q => {
    q = q.trim(); if (!q) return;
    say(q, 'me');
    setTimeout(() => say(reply(q), 'ai'), 200);
    $('#ask').value = '';
  };
  $('#send').onclick = () => ask($('#ask').value);
  $('#ask').onkeydown = e => { if (e.key === 'Enter') ask(e.target.value); };
  $$('[data-ask]').forEach(b => b.onclick = () => ask(b.dataset.ask));
}

/* ---------- carrossel (como funciona) ---------- */
if ($('#prev')) {
  const sl = $$('.slide');
  let ci = 0;
  const go = i => {
    ci = (i + sl.length) % sl.length;
    sl.forEach((s, k) => s.hidden = k !== ci);
    $('#pos').textContent = 'Passo ' + (ci + 1) + ' de ' + sl.length;
  };
  $('#prev').onclick = () => go(ci - 1);
  $('#next').onclick = () => go(ci + 1);
  go(0);
}

/* ---------- verificador de contraste ---------- */
if ($('#c1')) {
  const lum = h => {
    const c = [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16) / 255).map(v => v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
    return .2126 * c[0] + .7152 * c[1] + .0722 * c[2];
  };
  const cr = () => {
    const a = $('#c1').value, b = $('#c2').value, x = lum(a), y = lum(b);
    const r = (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
    $('#cr').textContent = 'Razão ' + r.toFixed(2).replace('.', ',') + ':1. ' + (r >= 7 ? 'Passa em AA e AAA.' : r >= 4.5 ? 'Passa em AA, não em AAA.' : r >= 3 ? 'Só passa para texto grande.' : 'Reprovado.');
    $('#cs').style.color = a; $('#cs').style.background = b;
  };
  $('#c1').oninput = $('#c2').oninput = cr;
  cr();
}

/* ---------- login simulado ---------- */
if ($('#go')) {
  $('#go').onclick = () => {
    const e = $('#em'), p = $('#pw'), m = $('#lmsg');
    if (!e.value || !e.checkValidity()) { m.className = 'min-h-6 font-semibold text-am'; m.textContent = 'Informe um e-mail válido, como nome@sempreceub.com.'; e.focus(); return; }
    if (p.value.length < 6) { m.className = 'min-h-6 font-semibold text-am'; m.textContent = 'A senha precisa ter pelo menos 6 caracteres.'; p.focus(); return; }
    m.className = 'min-h-6 font-semibold';
    m.textContent = 'Sessão simulada iniciada para ' + e.value.split('@')[0] + '. Agora abra a página Agenda.';
    p.value = '';
  };
}

/* ---------- contato simulado ---------- */
if ($('#cs2')) {
  $('#cs2').onclick = () => {
    const m = $('#cmsg'), n = $('#cn'), e = $('#ce'), t = $('#cm');
    const err = (txt, el) => { m.className = 'min-h-6 font-semibold text-am'; m.textContent = txt; el.focus(); };
    if (!n.value.trim()) return err('Preencha o nome.', n);
    if (!e.value || !e.checkValidity()) return err('Informe um e-mail válido.', e);
    if (!t.value.trim()) return err('Escreva uma mensagem.', t);
    m.className = 'min-h-6 font-semibold';
    m.textContent = 'Mensagem registrada, obrigado, ' + n.value.trim().split(' ')[0] + '. Nada foi enviado, é uma simulação.';
    n.value = e.value = t.value = '';
  };
}
