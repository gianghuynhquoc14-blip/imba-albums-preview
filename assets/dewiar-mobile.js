(() => {
 'use strict';
 let pending=false;
 const update=()=>{
  pending=false;
  const viewport=window.visualViewport;
  const height=viewport?viewport.height:window.innerHeight;
  const top=viewport?viewport.offsetTop:0;
  document.documentElement.style.setProperty('--imba-chat-height',Math.max(1,height-24)+'px');
  document.documentElement.style.setProperty('--imba-chat-top',(top+12)+'px');
 };
 const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(update);}};
 window.addEventListener('resize',schedule,{passive:true});
 window.addEventListener('orientationchange',schedule,{passive:true});
 window.visualViewport?.addEventListener('resize',schedule,{passive:true});
 window.visualViewport?.addEventListener('scroll',schedule,{passive:true});
 update();
})();
