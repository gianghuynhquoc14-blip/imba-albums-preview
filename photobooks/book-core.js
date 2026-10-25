/* Photo-book draft primitives. Geometry follows the existing Vibe percentage
   layouts; no school roster, vendor requests, image generation or order writes. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ImbaPhotobook=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const rect=(left,top,width,height)=>({left,top,width,height});
 const layouts={
  one:[rect(54,6,42,88)],
  two:[rect(4,6,42,88),rect(54,6,42,88)],
  three:[rect(4,6,42,88),rect(54,6,42,41),rect(54,53,42,41)],
  four:[rect(4,6,42,41),rect(4,53,42,41),rect(54,6,42,41),rect(54,53,42,41)],
  six:[rect(4,6,42,26),rect(4,37,42,26),rect(4,68,42,26),rect(54,6,42,26),rect(54,37,42,26),rect(54,68,42,26)],
  eight:[rect(4,6,19,41),rect(27,6,19,41),rect(4,53,19,41),rect(27,53,19,41),rect(54,6,19,41),rect(77,6,19,41),rect(54,53,19,41),rect(77,53,19,41)],
  ten:[rect(4,6,42,26),rect(4,37,19,26),rect(27,37,19,26),rect(4,68,19,26),rect(27,68,19,26),rect(54,6,42,26),rect(54,37,19,26),rect(77,37,19,26),rect(54,68,19,26),rect(77,68,19,26)],
  panorama:[rect(4,6,92,88)]
 };
 const copy=value=>JSON.parse(JSON.stringify(value));
 const uid=()=>globalThis.crypto.randomUUID();
 const text=(v,max)=>typeof v==='string'?v.slice(0,max):'';
 function integer(v,min,max,label){if(!Number.isInteger(v)||v<min||v>max)throw Error('Некорректное значение: '+label);return v;}
 function identifier(v,label){if(typeof v!=='string'||!/^[a-zA-Z0-9_-]{1,100}$/.test(v))throw Error('Некорректный идентификатор: '+label);return v;}
 function slot(photoId=null){return {id:uid(),photoId,fit:'contain',positionX:50,positionY:50,rotation:0};}
 function spread(){return {id:uid(),layout:'two',slots:[slot(),slot()],caption:'',background:'#fffdf5',layers:[],edited:false};}
 function newBook({widthMm,heightMm,spreadCount,productId=null,formatId=null}){
  integer(widthMm,50,1000,'ширина');integer(heightMm,50,1000,'высота');integer(spreadCount,1,200,'число разворотов');
  return {format:'imba-photobook-plan',version:1,id:uid(),title:'',theme:'',productId,formatId,widthMm,heightMm,photos:[],cover:{photoId:null,title:'',subtitle:''},spreads:Array.from({length:spreadCount},spread)};
 }
 function normalize(raw){
  if(!raw||raw.format!=='imba-photobook-plan'||raw.version!==1)throw Error('Это не поддерживаемый проект фотокниги.');
  if(!Array.isArray(raw.photos)||raw.photos.length>500||!Array.isArray(raw.spreads))throw Error('Структура проекта повреждена. До 500 фотографий на книгу.');
  const result=newBook({widthMm:raw.widthMm,heightMm:raw.heightMm,spreadCount:raw.spreads.length,productId:raw.productId,formatId:raw.formatId});
  result.id=identifier(raw.id,'книга');result.title=text(raw.title,200);result.theme=text(raw.theme,100);
  for(const key of ['productId','formatId'])result[key]=raw[key]==null?null:identifier(raw[key],key);
  const ids=new Set();result.photos=raw.photos.map(p=>{
   if(!p||typeof p!=='object')throw Error('Сведения о фотографии повреждены.');
   const id=identifier(p.id,'фотография');if(ids.has(id))throw Error('Повтор идентификатора фотографии.');ids.add(id);
   return {id,name:text(p.name,250),width:integer(p.width,1,100000,'ширина фотографии'),height:integer(p.height,1,100000,'высота фотографии'),bytes:Number.isInteger(p.bytes)&&p.bytes>=0?p.bytes:0,available:p.available!==false};
  });
  const photoRef=id=>{if(id==null)return null;identifier(id,'ссылка на фотографию');if(!ids.has(id))throw Error('Макет ссылается на фотографию, которой нет в проекте.');return id;};
  result.cover={photoId:photoRef(raw.cover?.photoId),title:text(raw.cover?.title,200),subtitle:text(raw.cover?.subtitle,500)};
  const spreadIds=new Set(),slotIds=new Set();result.spreads=raw.spreads.map(p=>{
   if(!p||!Object.hasOwn(layouts,p.layout)||!Array.isArray(p.slots)||p.slots.length!==layouts[p.layout].length)throw Error('Композиция разворота повреждена.');
   const id=identifier(p.id,'разворот');if(spreadIds.has(id))throw Error('Повтор идентификатора разворота.');spreadIds.add(id);
   if(p.layers!==undefined&&(!Array.isArray(p.layers)||p.layers.length>30))throw Error('Слишком много элементов оформления.');
   const layers=(p.layers||[]).map(l=>{if(!l||!['text','symbol'].includes(l.kind))throw Error('Элемент оформления повреждён.');return {id:identifier(l.id,'оформление'),kind:l.kind,text:text(l.text,500),x:typeof l.x==='number'&&Number.isFinite(l.x)?Math.max(0,Math.min(95,l.x)):10,y:typeof l.y==='number'&&Number.isFinite(l.y)?Math.max(0,Math.min(95,l.y)):10,size:typeof l.size==='number'&&Number.isFinite(l.size)?Math.max(12,Math.min(100,l.size)):28,color:/^#[a-f0-9]{6}$/i.test(l.color||'')?l.color:'#183e32',font:['serif','sans','italic'].includes(l.font)?l.font:'serif'};});
   return {id,layout:p.layout,caption:text(p.caption,2000),background:/^#[a-f0-9]{6}$/i.test(p.background||'')?p.background:'#fffdf5',layers,edited:p.edited===true,slots:p.slots.map(s=>{
    const sid=identifier(s.id,'окошко');if(slotIds.has(sid))throw Error('Повтор идентификатора окошка.');slotIds.add(sid);
    return {id:sid,photoId:photoRef(s.photoId),fit:s.fit==='cover'?'cover':'contain',positionX:typeof s.positionX==='number'&&Number.isFinite(s.positionX)?Math.max(0,Math.min(100,s.positionX)):50,positionY:typeof s.positionY==='number'&&Number.isFinite(s.positionY)?Math.max(0,Math.min(100,s.positionY)):50,rotation:[0,90,180,270].includes(s.rotation)?s.rotation:0};
   })};
  });return result;
 }
 function placements(book){return book.spreads.flatMap(p=>p.slots.filter(s=>s.photoId).map(s=>({photoId:s.photoId,spreadId:p.id,slotId:s.id})));}
 function unplaced(book){const used=new Set(placements(book).map(p=>p.photoId));return book.photos.filter(p=>!used.has(p.id)).map(p=>p.id);}
 function autofill(raw,{rebuildAutomatic=false}={}){
  const book=normalize(raw);if(rebuildAutomatic)for(const p of book.spreads)if(!p.edited){p.layout='two';p.slots=[slot(),slot()];}
  const used=new Set(placements(book).map(p=>p.photoId)),pending=book.photos.filter(p=>p.available&&!used.has(p.id));let cursor=0;
  for(let i=0;i<book.spreads.length&&cursor<pending.length;i++){
   const page=book.spreads[i],hasPlaced=page.slots.some(s=>s.photoId);
   if(!page.edited&&!hasPlaced){
    const remainingPages=book.spreads.slice(i).filter(p=>!p.edited&&!p.slots.some(s=>s.photoId)).length||1;
    const needed=Math.ceil((pending.length-cursor)/remainingPages),choice=[['one',1],['two',2],['three',3],['four',4],['six',6],['eight',8],['ten',10]].find(([,n])=>n>=needed)||['ten',10];
    page.layout=choice[0];page.slots=Array.from({length:choice[1]},()=>slot());
   }
   for(const s of page.slots){if(s.photoId||cursor>=pending.length)continue;s.photoId=pending[cursor++].id;}
  }
  return {book,placed:cursor,unplaced:unplaced(book)};
 }
 function moveSpread(raw,spreadId,direction){const book=normalize(raw),i=book.spreads.findIndex(p=>p.id===spreadId);if(i<0||![-1,1].includes(direction))throw Error('Не удалось выбрать разворот.');const j=i+direction;if(j>=0&&j<book.spreads.length)[book.spreads[i],book.spreads[j]]=[book.spreads[j],book.spreads[i]];return book;}
 function resize(raw,count){const book=normalize(raw);integer(count,1,200,'число разворотов');const removed=book.spreads.slice(count),returnedPhotoIds=[...new Set(removed.flatMap(p=>p.slots.map(s=>s.photoId).filter(Boolean)))];book.spreads=book.spreads.slice(0,count);while(book.spreads.length<count)book.spreads.push(spread());return {book,removedSpreadIds:removed.map(p=>p.id),returnedPhotoIds,requiresConfirmation:removed.some(p=>p.edited||p.caption||p.slots.some(s=>s.photoId))};}
 function review(raw){const book=normalize(raw),missing=book.photos.filter(p=>!p.available).map(p=>p.id),empty=book.spreads.filter(p=>!p.slots.some(s=>s.photoId)).map(p=>p.id);return {unplaced:unplaced(book),missingPhotos:missing,emptySpreads:empty,panoramas:book.spreads.filter(p=>p.layout==='panorama').map(p=>p.id)};}
 return {newBook,normalize,autofill,placements,unplaced,moveSpread,resize,review,layouts:copy(layouts)};
});
