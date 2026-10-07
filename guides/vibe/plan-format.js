'use strict';
(() => {
  const kinds = {personal:'Личный разворот',teachers:'Учителя',outdoor:'Общая в другой локации',serious:'Серьёзная общая',fun:'Весёлая общая',portraits:'Портреты, имена и цитаты',companies:'Классические компании',creative:'Творческие компании',archive:'Школьный архив',photobooth:'Фотобудка',idea:'Своя идея / свободное место'};
  const statuses={idea:'Идея',prepare:'Нужно подготовить',shoot:'Нужно снять',done:'Готово'};
  const rect=(x,y,w,h)=>({x,y,w,h});
  const layouts=[
    {id:'outdoor-mix',label:'Общий кадр крупно + компании',rects:[rect(4,6,92,58),rect(4,70,28,24),rect(36,70,28,24),rect(68,70,28,24)]},
    {id:'full',label:'1 · весь разворот',rects:[rect(4,6,92,88)]},
    {id:'two',label:'2 · по одной',rects:[rect(4,6,42,88),rect(54,6,42,88)]},
    {id:'three-left',label:'3 · две слева',rects:[rect(4,6,42,41),rect(4,53,42,41),rect(54,6,42,88)]},
    {id:'three-right',label:'3 · две справа',rects:[rect(4,6,42,88),rect(54,6,42,41),rect(54,53,42,41)]},
    {id:'four',label:'4 · по две',rects:[rect(4,6,42,41),rect(4,53,42,41),rect(54,6,42,41),rect(54,53,42,41)]},
    {id:'five',label:'5 · две и три',rects:[rect(4,6,42,41),rect(4,53,42,41),rect(54,6,42,26),rect(54,37,42,26),rect(54,68,42,26)]},
    {id:'six',label:'6 · по три',rects:[rect(4,6,42,26),rect(4,37,42,26),rect(4,68,42,26),rect(54,6,42,26),rect(54,37,42,26),rect(54,68,42,26)]},
    {id:'seven',label:'7 · три и четыре',rects:[rect(4,6,42,26),rect(4,37,42,26),rect(4,68,42,26),rect(54,6,19,41),rect(77,6,19,41),rect(54,53,19,41),rect(77,53,19,41)]},
    {id:'eight',label:'8 · по четыре',rects:[rect(4,6,19,41),rect(27,6,19,41),rect(4,53,19,41),rect(27,53,19,41),rect(54,6,19,41),rect(77,6,19,41),rect(54,53,19,41),rect(77,53,19,41)]}
  ];
  const uid=()=>crypto.randomUUID();
  const validUid=id=>typeof id==='string'&&/^[a-f0-9-]{36}$/i.test(id)?id:uid();
  const emptySlot=()=>({id:uid(),image:null,comment:'',props:'',use:'reference',status:'idea',date:''});
  const emptySpread=(kind='idea')=>({id:uid(),kind,title:'',location:'',comment:'',layout:'two',slots:Array.from({length:8},emptySlot)});
  const newState=(mode='class')=>({format:'vibe-album-plan',version:1,guideId:'vibe',mode,school:'',owner:'',student:{id:uid(),surname:'',givenName:''},portraitStyle:'',styleImage:null,spreads:mode==='personal'?[emptySpread('personal'),emptySpread('personal')]:Array.from({length:14},(_,i)=>emptySpread(['personal','personal','teachers','serious','portraits','fun','companies','creative'][i]||'idea'))});
  function normalize(raw){if(raw?.guideId&&raw.guideId!=='vibe')throw new Error('Этот проект относится к другому путеводителю.');if(!raw||raw.format!=='vibe-album-plan'||raw.version!==1||!['class','personal'].includes(raw.mode))throw new Error('Это не файл проекта «Вайб» поддерживаемой версии.');const count=raw.mode==='personal'?2:14;if(!Array.isArray(raw.spreads)||raw.spreads.length!==count)throw new Error('В этом плане неверное число разворотов.');const text=(v,max=4000)=>typeof v==='string'?v.slice(0,max):'';const image=v=>{if(v===null||v===undefined)return null;if(!v||typeof v.src!=='string'||!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(v.src)||v.src.length>6*1024*1024)throw new Error('В проекте есть неподдерживаемое изображение.');return {id:validUid(v.id),src:v.src,name:text(v.name,200),width:Number(v.width)||0,height:Number(v.height)||0,source:{kind:'local',filename:text(v.name,200)}};};return {format:'vibe-album-plan',version:1,guideId:'vibe',mode:raw.mode,school:text(raw.school,100),owner:text(raw.owner,100),student:{id:validUid(raw.student?.id),surname:text(raw.student?.surname,100),givenName:text(raw.student?.givenName,100)},portraitStyle:text(raw.portraitStyle),styleImage:image(raw.styleImage),spreads:raw.spreads.map((s,i)=>{if(!s||!Object.hasOwn(kinds,s.kind)||i<2&&s.kind!=='personal'||i>=2&&s.kind==='personal'||!layouts.some(l=>l.id===s.layout)||!Array.isArray(s.slots)||s.slots.length!==8)throw new Error('Структура разворотов повреждена.');return {id:validUid(s.id),kind:s.kind,title:text(s.title,150),location:text(s.location,200),comment:text(s.comment),layout:s.layout,slots:s.slots.map(v=>{if(!v||typeof v!=='object')throw new Error('Данные окошка повреждены.');return {id:validUid(v.id),image:image(v.image),comment:text(v.comment),props:text(v.props),use:v.use==='photo'?'photo':'reference',status:Object.hasOwn(statuses,v.status)?v.status:'idea',date:/^\d{4}-\d{2}-\d{2}$/.test(v.date)?v.date:''};})};})};}
  const layoutOf=spread=>layouts.find(l=>l.id===spread.layout)||layouts[1];
  globalThis.VibePlan={kinds,statuses,layouts,layoutOf,uid,newState,normalize};
})();
