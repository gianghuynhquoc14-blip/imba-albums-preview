'use strict';
window.ImbaOriginalTransfer=(()=>{
 const endpoint=()=>['localhost','127.0.0.1'].includes(location.hostname)?location.origin:'https://cabinet.imbamgdn.ru';
 async function post(path,body){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),60000);try{const r=await fetch(endpoint()+path,{method:'POST',credentials:'omit',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:controller.signal});let d;try{d=await r.json();}catch{throw Error('Подтверждение не получено. Сохранённую передачу можно продолжить.');}if(!r.ok)throw Error(d.error||'Не удалось передать файлы');return d;}finally{clearTimeout(timer);}}
 async function checkAssets(body,asset){for(const p of body.photos||body.book.photos){const a=await asset(p.id);if(!a?.original||a.original.size!==p.bytes)throw Error('Исходный файл '+p.name+' недоступен. Откройте проект с оригиналами.');}}
 async function send(receipt,body,asset,progress=()=>{}){
  const rid=Number(receipt.requestId.replace(/^(PB|RT)-/,''));if(!Number.isSafeInteger(rid)||rid<1)throw Error('Не найден номер заявки для передачи');
  const auth={requestId:rid,requestKey:body.requestKey};let state=await post('/api/photobook-originals',{...auth,action:'status'}),done=state.completed;
  progress({done,total:state.total});if(state.complete)return state;
  const photos=body.photos||body.book.photos;
  for(const p of photos){const remote=state.photos.find(x=>x.photoId===p.id);if(!remote)throw Error('Список файлов заявки изменился');if(remote.complete)continue;
   const a=await asset(p.id);if(!a?.original||a.original.size!==p.bytes)throw Error('Не найден оригинал '+p.name+'. Откройте исходный проект.');
   let offset=remote.offset;
   while(offset<p.bytes){const fragment=a.original.slice(offset,Math.min(p.bytes,offset+2*1024**2)),data=(await ImbaPhotoFiles.dataUrl(fragment)).split(',')[1],result=await post('/api/photobook-originals',{...auth,action:'chunk',photoId:p.id,offset,data});if(result.offset!==offset+fragment.size)throw Error('Не совпало место продолжения. Повторите передачу.');offset=result.offset;progress({done,total:state.total,name:p.name,offset,bytes:p.bytes});}
   done++;progress({done,total:state.total});
  }
  state=await post('/api/photobook-originals',{...auth,action:'status'});if(!state.complete)throw Error('Не все оригиналы получены. Продолжите передачу.');return state;
 }
 return {post,send,checkAssets};
})();
