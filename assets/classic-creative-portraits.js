"use strict";
(()=>{
 const section=document.getElementById('creative-portrait-idea'),details=document.getElementById('creativePortraitExamples'),back=document.getElementById('creativePortraitReturn');
 if(!section||!details||!back)return;
 // Fixed routes only: incoming query text never becomes a return URL.
 const returns={easy:['/guides/easy/#portraits','Вернуться к портретам Изи'],vibe:['/guides/vibe/#prepare','Вернуться к классике Вайба']};
 const requested=new URLSearchParams(location.search).get('from');
 const destination=Object.hasOwn(returns,requested)?returns[requested]:null;
 if(destination){back.href=destination[0];back.textContent=destination[1];}
 let navigation=0;
 const reveal=()=>{
  const serial=++navigation;if(location.hash!=='#creative-portrait-idea')return;
  details.open=true;let interrupted=false;
  const stop=()=>{interrupted=true;};
  const events=['wheel','touchstart','pointerdown','keydown'];
  events.forEach(name=>window.addEventListener(name,stop,{once:true,passive:true}));
  const align=()=>{
   events.forEach(name=>window.removeEventListener(name,stop));
   if(!interrupted&&serial===navigation&&location.hash==='#creative-portrait-idea')section.scrollIntoView({block:'start',behavior:'instant'});
  };
  const ready=()=>Promise.resolve(document.fonts?.ready).catch(()=>{}).then(()=>requestAnimationFrame(()=>requestAnimationFrame(align)));
  if(document.readyState==='complete')ready();else window.addEventListener('load',ready,{once:true});
 };
 reveal();window.addEventListener('hashchange',reveal);
})();
