/* Norte — comportamento compartilhado. Cada bloco só roda se os elementos existirem na página. */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const R=document.documentElement;
const st={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};

/* ---------- Acessibilidade (tema, fonte, animações) ---------- */
let fs=+(st.get('fs')||100);
function applyFs(){R.style.setProperty('--fs',fs+'%');st.set('fs',fs)}
function setTheme(t){R.dataset.theme=t;st.set('th',t)}
if(st.get('th'))R.dataset.theme=st.get('th');
applyFs();
if(st.get('mot')==='1'){R.dataset.motion='off';if($('#mot'))$('#mot').checked=true}
if($('#a11yBtn')){
  $('#a11yBtn').onclick=e=>{const p=$('#a11y'),o=p.hidden;p.hidden=!o;e.currentTarget.setAttribute('aria-expanded',o)};
  $$('[data-theme-set]').forEach(b=>b.onclick=()=>setTheme(b.dataset.themeSet));
  $('#fPlus').onclick=()=>{fs=Math.min(150,fs+10);applyFs()};
  $('#fMinus').onclick=()=>{fs=Math.max(80,fs-10);applyFs()};
  $('#fReset').onclick=()=>{fs=100;applyFs()};
  $('#mot').onchange=e=>{if(e.target.checked)R.dataset.motion='off';else delete R.dataset.motion;st.set('mot',e.target.checked?'1':'0')};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#a11y').hidden){$('#a11y').hidden=true;$('#a11yBtn').setAttribute('aria-expanded',false);$('#a11yBtn').focus()}});
}

/* ---------- Revelar ao rolar ---------- */
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
  $$('.reveal').forEach(el=>io.observe(el));
}else $$('.reveal').forEach(el=>el.classList.add('in'));

/* ---------- Dados fictícios ---------- */
const subs=[['Desenvolvimento Web','Prof. Almeida','Seg e qua, 19h'],['Banco de Dados','Profa. Ribeiro','Ter e qui, 19h'],['Estrutura de Dados','Prof. Matos','Seg e qui, 21h'],['Cálculo II','Profa. Lima','Sex, 19h']];
const items=[
{t:'prova',m:'Banco de Dados',n:'Prova bimestral (AV1)',d:2},
{t:'trabalho',m:'Desenvolvimento Web',n:'Entrega do projeto final',d:5},
{t:'trabalho',m:'Estrutura de Dados',n:'Lista de exercícios sobre árvores',d:1},
{t:'prova',m:'Cálculo II',n:'Prova de integrais',d:9},
{t:'aviso',m:'Desenvolvimento Web',n:'Aula de revisão no laboratório',d:0},
{t:'aviso',m:'Banco de Dados',n:'Material de apoio publicado',d:3},
{t:'trabalho',m:'Cálculo II',n:'Relatório de aplicações',d:12}];
const lab={prova:'Prova',trabalho:'Trabalho',aviso:'Aviso'};
const col={prova:'text-am',trabalho:'text-pr',aviso:'text-mu'};
const when=d=>d===0?'hoje':d===1?'amanhã':'em '+d+' dias';
const dt=d=>new Date(Date.now()+d*864e5).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'});
const cardHTML=i=>{const u=i.d<=2&&i.t!=='aviso';return `<article class="card lift${u?' border-l-[6px] border-l-am':''}"><span class="chip ${col[i.t]}">${lab[i.t]}</span><h3 class="mt-2 font-bold">${i.n}</h3><p class="text-mu">${i.m}</p><p class="font-bold">${dt(i.d)}, ${when(i.d)}${u?' · atenção ao prazo':''}</p></article>`};

/* ---------- Prévia da agenda (início) ---------- */
if($('#mini')){$('#mini').innerHTML=[...items].sort((a,b)=>a.d-b.d).slice(0,3).map(cardHTML).join('')}

/* ---------- Agenda ---------- */
if($('#list')){
  let tab='todos';
  const render=()=>{
    const q=$('#q').value.trim().toLowerCase();
    const l=items.filter(i=>(tab==='todos'||i.t===tab)&&(i.m+' '+i.n).toLowerCase().includes(q)).sort((a,b)=>a.d-b.d);
    $('#count').textContent=l.length?l.length+' resultado(s)':'Nenhum resultado. Tente outro termo ou outra aba.';
    $('#list').innerHTML=l.map(cardHTML).join('');
  };
  $$('#tabs [role=tab]').forEach(b=>b.onclick=()=>{tab=b.dataset.k;$$('#tabs [role=tab]').forEach(x=>x.setAttribute('aria-selected',x===b));render()});
  $('#q').oninput=render;
  $('#subs').innerHTML=subs.map(s=>`<article class="card lift"><h3 class="font-bold">${s[0]}</h3><p class="text-mu">${s[1]}</p><p class="text-mu">${s[2]}</p></article>`).join('');
  render();
}

/* ---------- Login simulado ---------- */
if($('#go')){
  $('#go').onclick=()=>{const e=$('#em'),p=$('#pw'),m=$('#lmsg');
    if(!e.value||!e.checkValidity()){m.className='msg err';m.textContent='Informe um e-mail válido, como nome@sempreceub.com.';e.focus();return}
    if(p.value.length<6){m.className='msg err';m.textContent='A senha precisa ter pelo menos 6 caracteres.';p.focus();return}
    m.className='msg';m.textContent='Sessão simulada iniciada para '+e.value.split('@')[0]+'. Abra a Agenda para ver seus prazos.';p.value=''};
}

/* ---------- Assistente ---------- */
if($('#log')){
  const fmt=a=>a.map(i=>'• '+lab[i.t]+': '+i.n+' ('+i.m+'), '+when(i.d)).join('\n');
  const reply=q=>{q=q.toLowerCase();let l;
    const s=subs.find(x=>q.includes(x[0].toLowerCase()));
    if(s){l=items.filter(i=>i.m===s[0]).sort((a,b)=>a.d-b.d);return s[0]+' ('+s[1]+'):\n'+fmt(l)}
    if(q.includes('semana')||q.includes('próxim')||q.includes('entreg')){l=items.filter(i=>i.d<=7).sort((a,b)=>a.d-b.d);return 'Para os próximos 7 dias:\n'+fmt(l)}
    if(q.includes('hoje')){l=items.filter(i=>i.d===0);return l.length?'Hoje:\n'+fmt(l):'Nada marcado para hoje.'}
    for(const k of ['prova','trabalho','aviso'])if(q.includes(k)){l=items.filter(i=>i.t===k).sort((a,b)=>a.d-b.d);return fmt(l)}
    return 'Ainda não entendi. Tente perguntar sobre “esta semana”, “provas”, “trabalhos” ou o nome de uma matéria.'};
  const say=(t,c)=>{const b=document.createElement('div');b.className='b '+(c==='me'?'self-end bg-brand text-white':'self-start border border-bd bg-bg');b.textContent=t;$('#log').append(b);$('#log').scrollTop=1e5};
  const ask=q=>{q=q.trim();if(!q)return;say(q,'me');setTimeout(()=>say(reply(q),'ai'),250);$('#ask').value=''};
  $('#send').onclick=()=>ask($('#ask').value);
  $('#ask').onkeydown=e=>{if(e.key==='Enter')ask(e.target.value)};
  $$('[data-ask]').forEach(b=>b.onclick=()=>ask(b.dataset.ask));
}

/* ---------- Carrossel ---------- */
if($('#track')){
  let ci=0;const n=$$('.slide').length;
  $('#dots').innerHTML=[...Array(n)].map((_,i)=>`<button class="dot" aria-label="Ir para o slide ${i+1}"></button>`).join('');
  const go=i=>{ci=(i+n)%n;$('#track').style.transform=`translateX(-${ci*100}%)`;$$('.dot').forEach((d,k)=>d.setAttribute('aria-current',k===ci));$$('.slide').forEach((s,k)=>s.setAttribute('aria-hidden',k!==ci))};
  $('#prev').onclick=()=>go(ci-1);$('#next').onclick=()=>go(ci+1);$$('.dot').forEach((d,k)=>d.onclick=()=>go(k));go(0);
}

/* ---------- Verificador de contraste ---------- */
if($('#c1')){
  const lum=h=>{const c=[1,3,5].map(i=>parseInt(h.substr(i,2),16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};
  const cr=()=>{const a=$('#c1').value,b=$('#c2').value,x=lum(a),y=lum(b),r=(Math.max(x,y)+.05)/(Math.min(x,y)+.05);
    $('#cr').textContent='Razão '+r.toFixed(2).replace('.',',')+':1 — '+(r>=7?'passa em AA e AAA':r>=4.5?'passa em AA, não em AAA':r>=3?'só passa para texto grande':'reprovado');
    $('#cs').style.cssText=`color:${a};background:${b};border-color:#888`};
  $('#c1').oninput=$('#c2').oninput=cr;cr();
}

/* ---------- Contato simulado ---------- */
if($('#cs2')){
  $('#cs2').onclick=()=>{const m=$('#cmsg'),n=$('#cn'),e=$('#ce'),t=$('#cm');
    if(!n.value.trim()){m.className='msg err';m.textContent='Preencha o nome.';n.focus();return}
    if(!e.value||!e.checkValidity()){m.className='msg err';m.textContent='Informe um e-mail válido.';e.focus();return}
    if(!t.value.trim()){m.className='msg err';m.textContent='Escreva uma mensagem.';t.focus();return}
    m.className='msg';m.textContent='Mensagem registrada, obrigado, '+n.value.trim().split(' ')[0]+'! (simulação, nada foi enviado)';n.value=e.value=t.value=''};
}
