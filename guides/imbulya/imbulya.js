/* Public Imbulya guide. Local checklist only; never submits a project action. */
(()=>{'use strict';
const pages=[...document.querySelectorAll('[data-step]')],ids=pages.map(p=>p.id),prefix='imba:imbulya-guide:v1:'+(['imbulya','imbulya-drop'].includes(document.documentElement.dataset.program)?document.documentElement.dataset.program:'imbulya')+':',checks=[...document.querySelectorAll('[data-check]')],memory=new Map();
const status=document.getElementById('storageStatus'),nav=document.getElementById('stageNav'),label=document.getElementById('stageLabel');let role='parent',active='prepare',storageOK=true,resetArmed=false,printState=[];
function warning(){status.textContent='Браузер не разрешил сохранение. Отметки останутся до закрытия страницы. Это не отправка фотографу.';}
function read(key){try{return localStorage.getItem(prefix+key);}catch(_){storageOK=false;warning();return memory.get(key)??null;}}
function write(key,value){memory.set(key,value);try{if(value===null)localStorage.removeItem(prefix+key);else localStorage.setItem(prefix+key,value);}catch(_){storageOK=false;warning();}}
function progress(){for(const page of pages){const visible=[...page.querySelectorAll('[data-check]')].filter(e=>!e.closest('[data-for]').hidden),n=visible.filter(e=>e.checked).length;page.querySelector('.check-progress').textContent=n+' из '+visible.length+' пунктов отмечено';}}
function setRole(value,save=false){role=value==='organizer'?'organizer':'parent';document.querySelectorAll('[data-role]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.role===role)));document.querySelectorAll('[data-for]').forEach(e=>{e.hidden=e.dataset.for!=='both'&&e.dataset.for!==role;});document.getElementById('roleExplain').textContent=role==='parent'?'Ваша часть: подготовить ребёнка, выбрать личные фотографии и проверить макет. Общую работу класса ведёт ответственный.':'Ваша часть: организовать класс, время и общие элементы. Свои кадры и личные развороты выбирает каждая семья.';if(save)write('role',role);progress();}
function show(id,focus=false){active=ids.includes(id)?id:'prepare';pages.forEach(p=>{p.hidden=p.id!==active;});document.querySelectorAll('.stage-links a').forEach(a=>{if(a.hash==='#'+active)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');});label.textContent='Этап '+(ids.indexOf(active)+1)+' из '+ids.length+' · '+document.querySelector('.stage-links a[href="#'+active+'"]').textContent.replace(/^\d+\. /,'');write('stage',active);if(focus){if(matchMedia('(max-width:760px)').matches)nav.open=false;const h=document.getElementById('title-'+active);h.focus({preventScroll:true});h.scrollIntoView({block:'start'});}}
checks.forEach(input=>{input.checked=read('check:'+input.dataset.check)==='1';input.addEventListener('change',()=>{write('check:'+input.dataset.check,input.checked?'1':null);progress();});});
document.querySelectorAll('[data-role]').forEach(b=>b.addEventListener('click',()=>setRole(b.dataset.role,true)));
document.addEventListener('click',event=>{const a=event.target.closest('a[href^="#"]');if(!a||!ids.includes(a.hash.slice(1)))return;if(a.hash===location.hash){event.preventDefault();show(a.hash.slice(1),true);}});
window.addEventListener('hashchange',()=>{if(ids.includes(location.hash.slice(1)))show(location.hash.slice(1),true);});
window.addEventListener('storage',event=>{if(event.key?.startsWith(prefix+'check:')){const input=checks.find(e=>prefix+'check:'+e.dataset.check===event.key);if(input){input.checked=event.newValue==='1';progress();}}});
setRole(read('role'));const hash=location.hash.slice(1);show(ids.includes(hash)?hash:read('stage')||'prepare');if(matchMedia('(max-width:760px)').matches)nav.open=false;
const print=document.getElementById('printGuide');print.hidden=false;print.onclick=()=>window.print();
window.addEventListener('beforeprint',()=>{printState=[...document.querySelectorAll('.page details')].map(e=>[e,e.open]);printState.forEach(([e])=>e.open=true);});window.addEventListener('afterprint',()=>{printState.forEach(([e,open])=>e.open=open);printState=[];});
const clear=document.getElementById('clearChecklist');clear.hidden=false;clear.onclick=()=>{if(!resetArmed){resetArmed=true;clear.textContent='Подтвердить снятие отметок';return;}checks.forEach(e=>{e.checked=false;write('check:'+e.dataset.check,null);});progress();resetArmed=false;clear.textContent='Снять мои отметки';if(storageOK)status.textContent='Отметки этой памятки сняты. Выбор фотографий и данные проекта не менялись.';};

// Use the ordinary photo link when the browser has no native dialog.
const photoDialog = document.getElementById('examplePhotoDialog');
if (typeof photoDialog?.showModal === 'function') {
 const photo = photoDialog.querySelector('img');
 const caption = photoDialog.querySelector('figcaption');
 const original = photoDialog.querySelector('.photo-view-original');
 const close = photoDialog.querySelector('.photo-view-close');
 const error = photoDialog.querySelector('.photo-view-error');
 let opener = null;

 photo.addEventListener('error', () => { error.hidden = false; });
 document.querySelectorAll('.example-photo').forEach(link => {
  link.addEventListener('click', event => {
   if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || photoDialog.open) return;
   const preview = link.querySelector('img');
   opener = link;
   caption.textContent = link.closest('figure').querySelector('figcaption').textContent;
   error.hidden = true;
   photo.alt = preview.alt;
   photo.src = original.href = link.href;
   photoDialog.showModal();
   event.preventDefault();
   document.body.classList.add('photo-view-open');
  });
 });
 close.addEventListener('click', () => photoDialog.close());
 photoDialog.addEventListener('close', () => {
  document.body.classList.remove('photo-view-open');
  opener?.focus({preventScroll:true});
  opener = null;
 });
}
})();
