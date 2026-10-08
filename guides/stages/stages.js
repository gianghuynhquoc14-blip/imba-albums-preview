'use strict';
const album=new URLSearchParams(location.search).get('album');
if(album==='easy'||album==='vibe'){
 const name=album==='easy'?'Изи':'Вайб';document.querySelector('h1').textContent='Этапы работы · '+name;
 const link=document.getElementById('stagePreparationLink');
 if(album==='easy'){document.getElementById('stage-1').remove();document.querySelectorAll('.tariff-card .eyebrow').forEach((label,i)=>label.textContent='Этап '+(i+1));}
 else {link.href='/guides/vibe/#prepare';link.textContent='Подготовка к Вайбу';}
 document.querySelectorAll('.tariff-card a[href="/guides/vibe/"]').forEach(a=>{if(a!==link){a.href='/guides/'+album+'/';a.textContent='Посмотреть примеры '+name;}});
}
