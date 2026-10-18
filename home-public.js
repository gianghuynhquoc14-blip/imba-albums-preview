'use strict';
window.homeContentReady=(async()=>{
 const preview=new URL(document.currentScript.src).searchParams.has('preview');
 const origin=preview?location.origin:'https://cabinet.imbamgdn.ru';
 try{
  const response=await fetch(origin+(preview?'/api/homepage':'/api/public-homepage'),{credentials:preview?'same-origin':'omit',signal:AbortSignal.timeout(6000)});
  if(!response.ok)throw Error('Homepage unavailable');const data=await response.json(),payload=preview?data.draft:data.payload;
  for(const el of document.querySelectorAll('[data-home-text]')){
   const value=payload.texts[el.dataset.homeText];if(typeof value!=='string'||value===el.dataset.homeOriginal)continue;
   el.replaceChildren();el.hidden=!value.trim();const lines=value.split('\n');lines.forEach((line,index)=>{if(index)el.append(document.createElement('br'));if(el.id==='homeTitle'&&index===lines.length-1&&index>0){const em=document.createElement('em');em.textContent=line;el.append(em);}else el.append(document.createTextNode(line));});
  }
  const galleries={};for(const [key,photos] of Object.entries(payload.galleries))galleries[key]=photos.map(p=>({...p,src:p.src.startsWith('/home-media/')?origin+p.src:p.src,previewSrc:p.src.startsWith('/home-media/')?origin+p.src.replace(/\.jpg$/,'-view.webp'):p.src}));
  return {galleries};
 }catch(error){if(preview){const notice=document.createElement('p');notice.textContent='Черновик не загрузился. Закройте предпросмотр и попробуйте снова.';document.body.prepend(notice);}return null;}
})();
