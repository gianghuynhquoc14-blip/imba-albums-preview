'use strict';
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ImbaBookOptions=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 const papers=(p,f)=>p?.papers.filter(x=>!x.formats||x.formats.includes(f))||[];
 function limits(p,f,paper){const format=p?.formats.find(x=>x.id===f),stock=p?.papers.find(x=>x.id===paper);return {min:p?.minSpreads||1,max:Math.min(p?.maxSpreads||200,format?.maxSpreads||200,stock?.maxSpreads||200),quantity:p?.maxQuantity||1000};}
 const coverFinishes=(data,f)=>data?.coverFinishes?.filter(x=>!x.exceptFormats?.includes(f))||[];
 function issues(data,b,s){
  if(!data||!b)return [];
  const p=data.products.find(p=>p.id===b.productId),f=p?.formats.find(f=>f.id===b.formatId),result=[];
  if(!p)return ['Выберите тип книги из текущего каталога.'];
  if(!f||f.widthMm!==b.widthMm||f.heightMm!==b.heightMm)result.push('Сохранённый формат нужно уточнить: выберите доступный размер.');
  if(!papers(p,b.formatId).some(x=>x.id===s.paper))result.push('Для этого формата выберите подходящую бумагу или толщину страницы.');
  if(!p.finishes.some(x=>x.id===s.finish))result.push('Выберите поверхность страниц для этого типа книги.');
  if(!data.covers.some(x=>x.id===s.cover))result.push('Выберите материал обложки.');
  if(s.cover==='photo'&&s.coverFinish&&!coverFinishes(data,b.formatId).some(x=>x.id===s.coverFinish))result.push('Выберите доступную поверхность обложки.');
  const l=limits(p,b.formatId,s.paper);
  if(b.spreads.length<l.min||b.spreads.length>l.max)result.push(`Для выбранных параметров нужно ${l.min}–${l.max} разворотов. В черновике сейчас ${b.spreads.length}.`);
  if(!Number.isInteger(s.quantity)||s.quantity<1||s.quantity>l.quantity)result.push(`Для этого варианта можно указать 1–${l.quantity} экземпляров. Другой тираж уточним отдельно.`);
  return result;
 }
 return {papers,limits,coverFinishes,issues};
});
