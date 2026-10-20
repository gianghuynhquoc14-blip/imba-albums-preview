(() => {
 'use strict';
 let pending=false,lastOpen=false,observing=null;
 const svg=(paths)=>'<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+paths+'</svg>';
 const icons={
  chat:svg('<path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H5l-3 3V11.5A7.5 7.5 0 0 1 9.5 4H12"/><path d="M16 3v6M13 6h6M7 11h6M7 15h9"/>'),
  close:svg('<path d="m6 6 12 12M18 6 6 18"/>'),
  expand:svg('<path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5"/>')
 };
 const element=(tag,className,text)=>{
  const node=document.createElement(tag);
  node.className=className;
  if(text)node.textContent=text;
  return node;
 };
 const button=(label,icon,action)=>{
  const node=element('button','imba-chat-action');
  node.type='button';node.title=label;node.setAttribute('aria-label',label);node.innerHTML=icon;
  node.addEventListener('mousedown',event=>event.stopPropagation());
  node.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();action();});
  return node;
 };
 const enhance=()=>{
  const host=document.getElementById('Dewiar_AI');
  if(!host)return;
  const launcher=host.querySelector('#enclkD');
  if(launcher&&!launcher.classList.contains('imba-chat-launcher')){
   launcher.classList.add('imba-chat-launcher');
   launcher.setAttribute('role','button');launcher.tabIndex=0;
   launcher.setAttribute('aria-label','Открыть помощника ИМБА');
   launcher.setAttribute('aria-controls','emulator');
   const mark=element('span','imba-chat-launcher-icon');mark.innerHTML=icons.chat;
   const copy=element('span','imba-chat-launcher-copy');
   copy.append(element('strong','','Спросить ИМБА'),element('small','','Помогу с альбомом'));
   launcher.append(mark,copy);
   launcher.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){event.preventDefault();launcher.click();}
   });
  }
  const panel=host.querySelector('#emulator');
  if(panel&&!panel.classList.contains('imba-chat-shell')){
   const menu=panel.querySelector('.em_menu'),frame=panel.querySelector('iframe'),vendorClose=panel.querySelector('.em_close');
   if(menu&&frame&&vendorClose){
    panel.classList.add('imba-chat-shell');
    panel.setAttribute('role','dialog');panel.setAttribute('aria-label','Помощник ИМБА');
    frame.title='Диалог с помощником ИМБА';
    const brand=element('div','imba-chat-brand');
    const avatar=element('span','imba-chat-avatar','и');
    const titles=element('div','imba-chat-titles');
    titles.append(element('strong','','Помощник ИМБА'),element('span','','Альбомы · подготовка · кабинет'));
    brand.append(avatar,titles);
    const actions=element('div','imba-chat-actions');
    const expand=button('Увеличить окно',icons.expand,()=>{
     const wide=panel.classList.toggle('imba-chat-wide');
     expand.title=wide?'Обычный размер':'Увеличить окно';
     expand.setAttribute('aria-label',expand.title);expand.setAttribute('aria-pressed',String(wide));
    });
    expand.classList.add('imba-chat-expand');expand.setAttribute('aria-pressed','false');
    const close=button('Закрыть помощника',icons.close,()=>vendorClose.click());
    actions.append(expand,close);menu.append(brand,actions);
    const links=element('nav','imba-chat-links');links.setAttribute('aria-label','Полезные разделы ИМБА');
    for(const [label,href] of [['Выбрать альбом','https://imbamgdn.ru/guides/'],['Личный кабинет','https://cabinet.imbamgdn.ru/']]){
     const link=element('a','',label);link.href=href;links.append(link);
    }
    menu.after(links);
    const loading=element('div','imba-chat-loading','Открываем помощника…');
    loading.setAttribute('role','status');panel.append(loading);
    const loaded=()=>{
     const waiting=frame.classList.contains('none');
     loading.hidden=!waiting;
     panel.setAttribute('aria-busy',String(waiting));
    };
    frame.addEventListener('load',()=>{loading.hidden=true;panel.setAttribute('aria-busy','false');});
    loaded();
    close.focus({preventScroll:true});
   }
  }
  if(panel?.classList.contains('imba-chat-shell')){
   const frame=panel.querySelector('iframe'),loading=panel.querySelector('.imba-chat-loading');
   if(frame&&loading){
    const waiting=frame.classList.contains('none');
    loading.hidden=!waiting;panel.setAttribute('aria-busy',String(waiting));
   }
  }
  const open=!!panel;
  if(launcher&&launcher.getAttribute('aria-expanded')!==String(open)){
   launcher.setAttribute('aria-expanded',String(open));
   launcher.setAttribute('aria-hidden',String(open));
   launcher.tabIndex=open?-1:0;
  }
  if(host.dataset.imbaChatOpen!==String(open))host.dataset.imbaChatOpen=String(open);
  if(lastOpen&&!open&&launcher)launcher.focus({preventScroll:true});
  lastOpen=open;
 };
 const update=()=>{
  pending=false;
  const viewport=window.visualViewport;
  const height=viewport?viewport.height:window.innerHeight;
  const top=viewport?viewport.offsetTop:0;
  document.documentElement.style.setProperty('--imba-chat-height',Math.max(1,height-20)+'px');
  document.documentElement.style.setProperty('--imba-chat-top',(top+10)+'px');
  enhance();
 };
 const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(update);}};
 const start=()=>{
  const host=document.getElementById('Dewiar_AI');
  if(host&&!observing){
   observing=new MutationObserver(schedule);
   observing.observe(host,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  }
  schedule();
 };
 window.addEventListener('resize',schedule,{passive:true});
 window.addEventListener('orientationchange',schedule,{passive:true});
 window.visualViewport?.addEventListener('resize',schedule,{passive:true});
 window.visualViewport?.addEventListener('scroll',schedule,{passive:true});
 document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const close=document.querySelector('#Dewiar_AI #emulator .em_close');
  if(close){event.preventDefault();close.click();}
 });
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
