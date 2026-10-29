'use strict';
/* Presentation only. Buttons use the existing validated select/change path. */
(()=>{
 const root='assets/g108/',groups=new Map(),$=id=>document.getElementById(id);
 const covers={photo:'finish-gloss',eco:'cover-eco',material:'cover-paper',fabric:'cover-fabric'};
 const products={layflat:'book-moments',photo:'book-light',multipage:'book-chronicle'};
 const finish={gloss:['finish-gloss','Блики и насыщенный глянец'],matte:['finish-matte','Спокойная поверхность без ярких бликов'],touch:['finish-touch','Мягкое матовое покрытие'],pearl:['finish-pearl','Мелкое перламутровое мерцание'],texture:['finish-texture','Слегка рельефная поверхность']};
 function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;}
 function photo(name,alt=''){const img=new Image();img.src=root+name+'.webp';img.alt=alt;img.loading='lazy';img.decoding='async';img.width=1536;img.height=1024;img.onerror=()=>{const p=img.closest('.visual-options');if(p){p.dataset.failed='true';p.hidden=true;const source=$(p.dataset.source);if(source)source.hidden=false;}else if(img.closest('.demo'))img.parentElement.textContent='＋ Добавить свои фотографии';else img.hidden=true;};return img;}
 function formatArt(f){const box=el('div','format-art'),r=el('span','format-page');r.style.aspectRatio=f.widthMm+'/'+f.heightMm;r.style.width=(65*f.widthMm/f.heightMm)+'px';box.append(r,el('small','',f.widthMm/10+' × '+f.heightMm/10+' см'));return box;}
 function paperArt(id){const box=el('div','paper-art'),number=id.startsWith('thick-')?Number(id.slice(6))/10:null;for(let i=0;i<4;i++){const page=el('i');page.style.height=(number?number*6:3)+'px';box.append(page);}box.append(el('small','',number?number.toLocaleString('ru')+' мм':'Гибкие листы'));return box;}
 function layoutArt(id,layouts){const box=el('div','layout-art');for(const [i,r]of layouts[id].entries()){const slot=el('span');slot.style.cssText=`left:${r.left}%;top:${r.top}%;width:${r.width}%;height:${r.height}%;`;slot.append(photo(['sample-coast','sample-family','sample-wedding'][i%3]));box.append(slot);}return box;}
 function fitArt(id){const box=el('div','fit-art '+id);box.append(photo('sample-family'));return box;}
 function enhance(id,choices,render,note){const select=$(id);if(!select||!choices.length)return;const signature=choices.map(c=>c.id+':'+c.label).join('|')+(id==='spreadLayout'&&state?JSON.stringify(state.layouts):'');let g=groups.get(id);if(!g||g.signature!==signature){g?.host.remove();const host=el('div','visual-options');host.dataset.source=id;host.setAttribute('role','group');host.setAttribute('aria-label',select.closest('label')?.childNodes[0]?.textContent?.trim()||id);const buttons=new Map();for(const choice of choices){const b=el('button','visual-choice');b.type='button';b.dataset.value=choice.id;const art=render(choice);if(art)b.append(art);b.append(el('span','choice-label',choice.label));if(choice.hint)b.append(el('small','choice-hint',choice.hint));b.onclick=()=>{if(select.disabled)return;select.value=choice.id;select.dispatchEvent(new Event('input',{bubbles:true}));select.dispatchEvent(new Event('change',{bubbles:true}));update();};host.append(b);buttons.set(choice.id,b);}if(note)host.append(el('p','visual-note',note));select.closest('label').after(host);g={host,buttons,signature};groups.set(id,g);}const known=g.buttons.has(select.value)&&g.host.dataset.failed!=='true';select.hidden=known;g.host.hidden=!known;for(const [value,b]of g.buttons){b.setAttribute('aria-pressed',String(value===select.value));b.disabled=select.disabled;}}
 let state=null;
 function update(){if(!state)return;const {catalog,book,settings,layouts}=state,p=catalog?.products.find(p=>p.id===book.productId),native=id=>Array.from($(id)?.options||[]).map(o=>({id:o.value,label:o.textContent}));
  enhance('bookProduct',(catalog?.products||[]).map(p=>({id:p.id,label:p.title,hint:p.kind})),c=>photo(products[c.id]));
  enhance('bookFormat',p?.formats||[],formatArt,'Размер одной закрытой книги. Разворот — две страницы рядом.');
  enhance('bookPaper',native('bookPaper'),c=>paperArt(c.id),book.productId==='multipage'?'200 и 250 г/м² — плотность бумаги, а не толщина листа. Конструкцию переплёта подтвердим при расчёте.':'Толщина показана схематично, в увеличении. Более толстые страницы ограничивают объём книги.');
  enhance('bookCover',catalog?.covers||[],c=>photo(covers[c.id]),'Иллюстрации фактуры. Цвет, надпись и конкретный материал подберём вместе.');
  for(const id of ['bookFinish','bookCoverFinish'])enhance(id,native(id).map(c=>({...c,hint:finish[c.id]?.[1]})),c=>photo(finish[c.id]?.[0]||'finish-matte'),'Пример отражения света. Экран не передаёт материал и оттенок точно.');
  enhance('spreadLayout',native('spreadLayout'),c=>layoutArt(c.id,layouts),'Схема композиции. Фотографии здесь — вымышленные примеры; в книгу попадут только ваши файлы.');
  enhance('photoFit',native('photoFit'),c=>fitArt(c.id),'«Целиком» сохраняет весь кадр с полями. «Заполнить» может обрезать края — положение регулируется ниже.');
 }
 document.addEventListener('imba:book-visuals',e=>{state=e.detail;update();});
 document.addEventListener('imba:book-controls',()=>{for(const [id,g]of groups)for(const b of g.buttons.values())b.disabled=$(id).disabled;});
 document.addEventListener('input',e=>{if(groups.has(e.target.id))update();});
 window.ImbaBookVisuals={photo,update};
})();
