/* Shared public-page navigation. Scroll only: no URL/history/form mutation. */
(()=>{
 'use strict';
 const start=()=>{
  if(document.getElementById('imbaBackToTop')||!document.body)return;
  const button=document.createElement('button');
  button.id='imbaBackToTop';button.className='imba-back-to-top';button.type='button';button.hidden=true;
  button.setAttribute('aria-label','Наверх страницы');button.setAttribute('title','Наверх страницы');
  button.setAttribute('data-html2canvas-ignore','true');
  const arrow=document.createElement('span');arrow.textContent='↑';arrow.setAttribute('aria-hidden','true');
  const label=document.createElement('span');label.textContent='Наверх';button.append(arrow,label);document.body.append(button);
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let queued=false,obstacles=[],dirty=true,offset=0;
  const visible=node=>{
   if(!node||node.hidden||!node.getClientRects().length)return false;
   const style=getComputedStyle(node);return style.display!=='none'&&style.visibility!=='hidden';
  };
  const modalOpen=()=>document.body.classList.contains('lightbox-open')||document.body.classList.contains('modal-open')||
   [...document.querySelectorAll('dialog[open],[aria-modal="true"],#Dewiar_AI #emulator')].some(visible)||
   document.getElementById('Dewiar_AI')?.dataset.imbaChatOpen==='true';
  const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(update);};
  const collectObstacles=()=>{
   obstacles=[...document.querySelectorAll('button,a,[role="button"],nav,aside,[data-back-to-top-obstacle]')].filter(node=>{
    if(node===button||button.contains(node)||node.closest('dialog'))return false;
    const style=getComputedStyle(node);
    return style.position==='fixed'||style.position==='sticky'&&style.bottom!=='auto';
   });dirty=false;
  };
  const update=()=>{
   queued=false;
   const height=window.innerHeight,viewport=window.visualViewport;
   const editing=/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName||'');
   const keyboard=editing&&viewport&&viewport.height<height-140;
   const pageHeight=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
   const show=scrollY>Math.max(320,height*.75)&&pageHeight>height*1.5&&!modalOpen()&&!keyboard;
   if(button.hidden===show)button.hidden=!show;
   if(!show)return;
   if(dirty)collectObstacles();
   const rect=button.getBoundingClientRect();
   const baseBottom=height-rect.bottom-offset;
   let next=0;
   for(let pass=0;pass<4;pass++){
    let adjusted=next;
    for(const node of obstacles){
     if(!visible(node))continue;
     const other=node.getBoundingClientRect(),bottom=height-baseBottom-next,top=bottom-rect.height;
     if(rect.left<other.right+10&&rect.right>other.left-10&&top<other.bottom+10&&bottom>other.top-10)
      adjusted=Math.max(adjusted,height-baseBottom-other.top+12);
    }
    if(adjusted===next)break;next=adjusted;
   }
   if(height-baseBottom-next-rect.height<96){button.hidden=true;return;}
   if(next!==offset){offset=next;button.style.setProperty('--imba-back-top-offset',offset+'px');}
  };
  button.addEventListener('click',()=>{
   if(modalOpen())return;
   const target=[...document.querySelectorAll('main h1,h1,main,[role="main"]')].find(visible)||document.body;
   const previous=target.getAttribute('tabindex');
   if(previous===null){
    target.setAttribute('tabindex','-1');
    target.addEventListener('blur',()=>{if(target.getAttribute('tabindex')==='-1')target.removeAttribute('tabindex');},{once:true});
   }
   target.focus({preventScroll:true});
   window.scrollTo({top:0,left:window.scrollX,behavior:reduced.matches?'auto':'smooth'});
  });
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',()=>{dirty=true;schedule();},{passive:true});
  window.visualViewport?.addEventListener('resize',schedule,{passive:true});
  document.addEventListener('toggle',()=>{dirty=true;schedule();},true);
  document.addEventListener('focusin',schedule);document.addEventListener('focusout',schedule);
  document.addEventListener('load',schedule,true);
  if(typeof MutationObserver!=='undefined')new MutationObserver(records=>{
   if(records.every(record=>record.target===button||button.contains(record.target)))return;
   dirty=true;schedule();
  }).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['open','hidden','aria-modal','aria-hidden','class','style','data-imba-chat-open']});
  if(typeof ResizeObserver!=='undefined')new ResizeObserver(schedule).observe(document.body);
  schedule();
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
