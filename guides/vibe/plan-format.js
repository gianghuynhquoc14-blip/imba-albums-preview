'use strict';
(() => {
  const kinds = {personal:'Личный разворот',teachers:'Учителя',outdoor:'Общая в другой локации',serious:'Серьёзная общая',fun:'Весёлая общая',portraits:'Портреты, имена и цитаты',companies:'Классические компании',creative:'Творческие компании',archive:'Школьный архив',photobooth:'Фотобудка',idea:'Своя идея / свободное место'};
  const statuses={idea:'Идея',prepare:'Нужно подготовить',shoot:'Нужно снять',done:'Готово'};
  const rect=(x,y,w,h)=>({x,y,w,h});
  const layouts=[
    {id:'portrait-four',label:'4 портрета · фото и цитаты в шахматном порядке',rects:[rect(0,0,25,56),rect(25,44,25,56),rect(50,44,25,56),rect(75,0,25,56)]},
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
  const newState=(mode='class')=>({format:'vibe-album-plan',version:1,guideId:'vibe',mode,school:'',owner:'',student:{id:uid(),surname:'',givenName:''},portraitStyle:'',styleImage:null,spreads:mode==='personal'?[emptySpread('personal'),emptySpread('personal')]:Array.from({length:14},(_,i)=>emptySpread(['personal','personal','teachers','serious','portraits','companies','creative','fun'][i]||'idea'))});
  function normalize(raw){if(raw?.guideId&&raw.guideId!=='vibe')throw new Error('Этот проект относится к другому путеводителю.');if(!raw||raw.format!=='vibe-album-plan'||raw.version!==1||!['class','personal'].includes(raw.mode))throw new Error('Это не файл проекта «Вайб» поддерживаемой версии.');const count=raw.mode==='personal'?2:14;if(!Array.isArray(raw.spreads)||raw.spreads.length!==count)throw new Error('В этом плане неверное число разворотов.');const text=(v,max=4000)=>typeof v==='string'?v.slice(0,max):'';const image=v=>{if(v===null||v===undefined)return null;if(!v||typeof v.src!=='string'||!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(v.src)||v.src.length>6*1024*1024)throw new Error('В проекте есть неподдерживаемое изображение.');return {id:validUid(v.id),src:v.src,name:text(v.name,200),width:Number(v.width)||0,height:Number(v.height)||0,source:{kind:'local',filename:text(v.name,200)}};};return {...(raw.spreadBudget?{spreadBudget:normalizeBudget(raw.spreadBudget)}:{}),...(raw.coverChoice?{coverChoice:normalizeCover(raw.coverChoice,image,text)}:{}),...(raw.teacherChoice?{teacherChoice:normalizeTeachers(raw.teacherChoice,image,text)}:{}),...(raw.generalChoice?{generalChoice:normalizeGeneral(raw.generalChoice)}:{}),...(raw.portraitChoice?{portraitChoice:normalizePortraits(raw.portraitChoice,image,text)}:{}),...(raw.funChoice?{funChoice:normalizeSimpleChoice(raw.funChoice,funIds,text)}:{}),...(raw.memoryChoice?{memoryChoice:normalizeSimpleChoice(raw.memoryChoice,memoryIds,text)}:{}),...(raw.phoneChoice?{phoneChoice:normalizeSimpleChoice(raw.phoneChoice,['include','none'],text)}:{}),...(raw.epicChoice?{epicChoice:normalizeSimpleChoice(raw.epicChoice,epicIds,text)}:{}),format:'vibe-album-plan',version:1,guideId:'vibe',mode:raw.mode,school:text(raw.school,100),owner:text(raw.owner,100),student:{id:validUid(raw.student?.id),surname:text(raw.student?.surname,100),givenName:text(raw.student?.givenName,100)},portraitStyle:text(raw.portraitStyle),styleImage:image(raw.styleImage),spreads:raw.spreads.map((s,i)=>{if(!s||!Object.hasOwn(kinds,s.kind)||i<2&&s.kind!=='personal'||i>=2&&s.kind==='personal'||!layouts.some(l=>l.id===s.layout)||!Array.isArray(s.slots)||s.slots.length!==8)throw new Error('Структура разворотов повреждена.');return {...(s.referenceChoice?{referenceChoice:normalizePersonalReference(s.referenceChoice,image,text)}:{}),id:validUid(s.id),kind:s.kind,included:s.included===true,title:text(s.title,150),location:text(s.location,200),comment:text(s.comment),layout:s.layout,slots:s.slots.map(v=>{if(!v||typeof v!=='object')throw new Error('Данные окошка повреждены.');return {id:validUid(v.id),image:image(v.image),comment:text(v.comment),props:text(v.props),use:v.use==='photo'?'photo':'reference',status:Object.hasOwn(statuses,v.status)?v.status:'idea',date:/^\d{4}-\d{2}-\d{2}$/.test(v.date)?v.date:''};})};})};}
  function normalizeBudget(raw){if(raw.version!==1||!raw.counts||typeof raw.counts!=='object'||Array.isArray(raw.counts))throw Error('Распределение разворотов повреждено.');const counts={};for(const key of ['teachers','general','portraits','fun','memories','creative','phone','epic'])if(Object.hasOwn(raw.counts,key)){const n=raw.counts[key];if(!Number.isInteger(n)||n<0||n>14)throw Error('Число разворотов должно быть целым от 0 до 14.');counts[key]=n;}return {version:1,counts};}
  function normalizePersonalReference(raw,image,text){
    if(!raw||!['preset','own'].includes(raw.kind)||typeof raw.id!=='string'||!/^[a-z0-9-]{1,100}$/.test(raw.id))throw new Error('Пример личного разворота повреждён.');
    return {kind:raw.kind,id:raw.id,image:image(raw.image),title:text(raw.title,150)};
  }
  function normalizeCover(raw,image,text){
    const categories=['photo','sunset','board','school','design','reference','own'];
    if(!raw||raw.version!==1)throw new Error('Не удалось прочитать выбор обложки.');
    const category=categories.includes(raw.category)?raw.category:'photo';
    let selected=null;
    if(raw.selected){if(!categories.includes(raw.selected.category)||typeof raw.selected.id!=='string'||!/^[a-z0-9-]{1,100}$/.test(raw.selected.id))throw new Error('Выбор обложки повреждён.');selected={category:raw.selected.category,id:raw.selected.id};}
    const indexes={};for(const key of categories)indexes[key]=Number.isInteger(raw.indexes?.[key])&&raw.indexes[key]>=0?Math.min(raw.indexes[key],100):0;
    const custom={reference:image(raw.custom?.reference),own:image(raw.custom?.own)};
    return {version:1,category,indexes,selected,mode:['shared','individual','discuss'].includes(raw.mode)?raw.mode:'discuss',note:text(raw.note),custom,comments:{reference:text(raw.comments?.reference),own:text(raw.comments?.own)}};
  }
  const portraitIds=['clean-script','soft-type','bold-names','colour-icons','red-notes','black-doodles','pencil-story'];
  const photoIds=['color','canvas-30','canvas-14','dark','room-29','room-14','window','own-photo'];
  const funIds=["07-000", "DSC04561", "12-000", "DSC01448", "34-000-1", "DSC05225", "DSC03454", "27-000", "DSC06541-1", "05-000", "DSC08562", "DSC00667", "DSC07468", "DSC04519", "DSC04670", "engineering-b", "engineering-a", "school-4"];
  const epicIds=["epic-1", "epic-2", "epic-3", "epic-4", "epic-5", "epic-6", "epic-7", "epic-9", "epic-10", "own", "none"];
  const memoryIds=['school-1','school-2','school-3','school-4','school-5','school-6','school-7','school-8','school-9','booth-class-1','booth-class-2','booth-class-3','booth-class-4','booth-grid','none'];
  const comments=(raw,ids,text)=>Object.fromEntries(ids.map(id=>[id,text(raw?.[id])]));
  function normalizeSimpleChoice(raw,ids,text){if(raw.version!==1||raw.selected!==null&&!ids.includes(raw.selected))throw new Error('Выбор раздела повреждён.');return {version:1,selected:raw.selected,comments:comments(raw.comments,ids,text)};}
  function normalizePortraits(raw,image,text){
    if(raw.version!==1)throw new Error('Выбор оформления портретов повреждён.');let selected=null;
    if(raw.selected){const value=raw.selected;if(!['preset','own','designer'].includes(value.kind)||value.kind==='preset'&&!portraitIds.includes(value.id)||value.kind!=='preset'&&value.id!==value.kind)throw new Error('Вариант оформления портретов не поддерживается.');selected={kind:value.kind,id:value.id};}
    if(raw.photo!==null&&!photoIds.includes(raw.photo))throw new Error('Способ съёмки портретов не поддерживается.');
    return {version:1,selected,photo:raw.photo==='canvas-30'?'canvas-14':raw.photo,comments:comments(raw.comments,[...portraitIds,'own','designer'],text),photoComments:comments({...raw.photoComments,...(raw.photo==='canvas-30'&&!raw.photoComments?.['canvas-14']?{'canvas-14':raw.photoComments?.['canvas-30']||''}:{})},photoIds,text),custom:image(raw.custom)};
  }
  function normalizeGeneral(raw){
    const ids=['06-000','04-000','DSC07440','01-000','DSC08498','IMG_9039','DSC01458','DSC04464','DSC00340','DSC01421','DSC06513','DSC05177','03-000','DSC09387','own'];
    if(raw.version!==1||raw.general!==null&&!ids.includes(raw.general))throw new Error('Выбор общей фотографии повреждён.');
    return {version:1,general:raw.general};
  }
  function normalizeTeachers(raw,image,text){
    const variants=['wish','plain','design','all','vignette','none','own'];
    if(raw.version!==1||raw.teachers!==null&&!variants.includes(raw.teachers))throw new Error('Выбор учителей повреждён.');
    return {version:1,teachers:raw.teachers,teacherWishes:['teacher','class','none'].includes(raw.teacherWishes)?raw.teacherWishes:'teacher',teacherCustom:raw.teacherCustom?image({src:raw.teacherCustom,name:'Пример учителей'})?.src:null,teacherName:text(raw.teacherName,1500),teacherRoster:text(raw.teacherRoster,1500),teacherIdea:text(raw.teacherIdea,1500),teacherText:text(raw.teacherText,4000)};
  }
  const layoutOf=spread=>layouts.find(l=>l.id===spread.layout)||layouts.find(l=>l.id==='two');
  globalThis.VibePlan={budgetVersion:1,kinds,statuses,layouts,layoutOf,uid,newState,normalize};
})();
