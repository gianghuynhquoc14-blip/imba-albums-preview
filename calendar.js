'use strict';
(()=>{
 const host=document.getElementById('publicCalendar');if(!host)return;
 let anchor=new Date();anchor.setDate(1);
 const key=date=>date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
 async function render(){
  host.replaceChildren();const bar=document.createElement('div');bar.className='public-calendar-bar';
  const prev=document.createElement('button');prev.type='button';prev.textContent='←';prev.setAttribute('aria-label','Предыдущие месяцы');
  const next=document.createElement('button');next.type='button';next.textContent='→';next.setAttribute('aria-label','Следующие месяцы');
  const label=document.createElement('strong');label.textContent='Ближайшие месяцы';bar.append(prev,label,next);host.append(bar);
  prev.onclick=()=>{anchor=new Date(anchor.getFullYear(),anchor.getMonth()-3,1);render();};next.onclick=()=>{anchor=new Date(anchor.getFullYear(),anchor.getMonth()+3,1);render();};
  const from=key(anchor),to=key(new Date(anchor.getFullYear(),anchor.getMonth()+3,0));
  try{
   const response=await fetch('https://cabinet.imbamgdn.ru/api/public-calendar?from='+from+'&to='+to,{mode:'cors'});if(!response.ok)throw Error('calendar unavailable');const result=await response.json();const busy=new Set(result.busyDates||[]),projects=result.projectsByDate||{};const months=document.createElement('div');months.className='public-calendar-months';
   for(let offset=0;offset<3;offset++){const first=new Date(anchor.getFullYear(),anchor.getMonth()+offset,1),days=new Date(first.getFullYear(),first.getMonth()+1,0).getDate(),start=(first.getDay()+6)%7;const panel=document.createElement('section');panel.className='public-calendar-month';const heading=document.createElement('h3');heading.textContent=first.toLocaleDateString('ru-RU',{month:'long',year:'numeric'});panel.append(heading);const details=document.createElement('p');details.className='public-calendar-details';details.setAttribute('role','status');details.hidden=true;const grid=document.createElement('div');grid.className='public-calendar-days';for(const day of ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']){const cell=document.createElement('span');cell.className='public-calendar-weekday';cell.textContent=day;grid.append(cell);}for(let i=0;i<start;i++){const blank=document.createElement('span');blank.className='public-calendar-empty';grid.append(blank);}for(let day=1;day<=days;day++){const date=new Date(first.getFullYear(),first.getMonth(),day),cell=document.createElement(busy.has(key(date))?'button':'span');cell.className='public-calendar-day';cell.textContent=String(day);if(busy.has(key(date))){cell.classList.add('is-busy');cell.type='button';const names=Array.isArray(projects[key(date)])?projects[key(date)]:[];const info=date.toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'})+' — '+(names.length?names.join(', '):'Занято');cell.title=info;cell.setAttribute('aria-label',info);const show=()=>{details.textContent=info;details.hidden=false;};cell.onclick=show;cell.onmouseenter=show;cell.onfocus=show;}grid.append(cell);}panel.append(grid,details);months.append(panel);}
   host.append(months);const legend=document.createElement('small');legend.className='public-calendar-legend';legend.textContent='● занято';host.append(legend);
  }catch{const note=document.createElement('p');note.textContent='Календарь временно не загрузился. Попробуйте обновить страницу позже.';host.append(note);}
 }
 render();
})();
