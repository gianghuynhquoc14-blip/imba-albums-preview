'use strict';
(()=>{
 const api=window.ImbaEasyDraft;if(!api)return;
 const {state,scheduleSave,canvasPage,image,fit}=api;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text)n.textContent=text;return n;};
 const groups=[['color','Цветная подсветка'],['canvas','Холст'],['dark','Тёмный фон'],['room','Кабинет со вспышкой'],['window','Свет от окна']];
 const examples=[
 ['color','color','Цветной фон и свет на лице'],
 ['canvas','canvas-14','Портреты на сером холсте'],
 ['dark','dark','Кабинет уходит в темноту'],
 ['room','room-29','Кабинет остаётся в кадре'],['room','room-14','Портреты в знакомом классе'],
 ['window','window','Мягкий свет от окна']
 ].map(([category,id,title])=>({category,id,title,src:'builder-assets/portrait-'+id+'.webp'}));
 const common=[
 'Портрет — послание себе в будущее. Покажите человека, которым вы были в школе: его увлечения, любимые вещи, характер и шутки. Можно просто сделать красивый портрет без реквизита.',
 'Заранее определите общий стиль портретов всем классом: свет, фон и одежду. Фотографии выбранного кабинета лично отправьте фотографу, чтобы согласовать подходящий вариант света.',
 'Во время портретной съёмки делаем несколько вариантов с запасом: для родителей и учителей, для себя на личный разворот и для одноклассников. Какие кадры попадут в альбом, в итоге выбираете вы.',
 'Подготовьте два набора идей и реквизита: послание одноклассникам и послание себе на личный разворот. Это могут быть разные вещи и разные настроения.',
 'Принесите то, что рассказывает о вас: постер любимого сериала, хоккейную клюшку, геймпад, любимую книгу или предмет вашего увлечения. Продумайте это до съёмки и заранее обсудите с фотографом необычный или крупный реквизит.'
 ];
 const extra={
 color:'Цветная подсветка сзади и вспышка на лицо: фон получает цвет, человек остаётся хорошо виден. Такой свет помогает преобразить даже неприметный кабинет. Оттенок выбирайте вместе с фотографом.',
 canvas:'Холст закрывает неудачный фон и помогает собрать спокойный выразительный портрет. Внимание остаётся на человеке; конкретный холст и место для установки согласуйте с фотографом.',
 dark:'Свет направлен на человека, а кабинет уходит в темноту. Это помогает скрыть отвлекающие детали фона и сохранить выразительный портрет.',
 room:'Вспышка освещает человека, кабинет остаётся виден. Выбирайте этот вариант, если хотите сохранить в памяти именно свой класс и его детали. Заранее приведите фон в порядок.',
 window:'Естественный свет от окна лучше выбирать для спокойного однотонного кабинета: белого, серого или с нейтральными тёплыми оттенками. Пёстрые яркие стены и предметы могут мешать общей цветовой картине. Подходящее место и время уточнит фотограф.'
 };
 if(state.portrait==='canvas-30')state.portrait='canvas-14';if(!examples.some(v=>v.id===state.portrait))state.portrait=null;
 let category=examples.find(v=>v.id===state.portrait)?.category||'color',index=0;
 const section=el('section');section.id='portraitStep';section.hidden=true;section.className='choice-section';section.append(el('p','04 · Портреты и виньетка'),el('h2','Послание себе в будущее.'),el('p','Начните со света и цвета. Затем продумайте образ и реквизит, которые расскажут о вас.'));
 const tabs=el('div');tabs.className='category-tabs';section.append(tabs);
 const tabButtons=groups.map(([key,title])=>{const b=el('button',title);b.type='button';b.onclick=()=>{category=key;index=0;draw();};tabs.append(b);return b;});
 const gallery=el('div');gallery.className='gallery-panel';const prev=el('button','←'),next=el('button','→');prev.type=next.type='button';prev.className='round previous';next.className='round next';prev.setAttribute('aria-label','Предыдущий пример портретов');next.setAttribute('aria-label','Следующий пример портретов');
 const figure=el('figure');figure.className='cover-card';const visual=el('div');visual.className='cover-image teacher-visual';const caption=el('figcaption'),counter=el('span'),title=el('h3'),description=el('p'),choose=el('button','Выбрать этот свет');choose.id='choosePortrait';choose.type='button';choose.className='primary';caption.append(counter,title,description,choose);figure.append(visual,caption);gallery.append(prev,figure,next);section.append(gallery);
 const tips=el('aside');tips.className='tips';section.append(tips);document.getElementById('teachersStep').after(section);
 const summary=el('div');summary.className='portrait-summary';summary.setAttribute('aria-live','polite');document.querySelector('.summary-actions').before(summary);
 const step=document.getElementById('stepPortrait');
 const list=()=>examples.filter(v=>v.category===category);
 function draw(){const options=list(),v=options[index];tabButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(groups[i][0]===category)));counter.textContent=(index+1)+' / '+options.length;title.textContent=v.title;description.textContent=extra[category]||'Выберите понравившуюся идею. Фотографии своего места лично отправьте фотографу.';visual.replaceChildren();if(v.src){const zoom=el('button'),img=el('img');zoom.type='button';zoom.setAttribute('aria-label','Рассмотреть: '+v.title);img.src=v.src;img.alt=v.title;zoom.append(img);zoom.onclick=()=>{document.getElementById('zoomImage').src=v.src;document.getElementById('zoomImage').alt=v.title;document.getElementById('zoomCaption').textContent=v.title;document.getElementById('zoomDialog').showModal();};visual.append(zoom);}else{const paper=el('div');paper.className='teacher-text-example';paper.append(el('h3','Место, которое знаете вы'),el('p','Любимый коридор, вестибюль или другая локация. Лично отправьте фотографу фотографии места и расскажите свою идею.'));visual.append(paper);}choose.textContent=state.portrait===v.id?'Свет для портретов выбран ✓':'Выбрать этот свет';summary.replaceChildren(el('p',state.portrait?'Портреты: '+examples.find(v=>v.id===state.portrait).title:'Портреты пока не выбраны.'));tips.replaceChildren(el('p','Подготовка к портретам'));const ul=el('ul');for(const text of [...common,...(extra[category]?[extra[category]]:[])])ul.append(el('li',text));tips.append(ul);api.updateExport();}
 prev.onclick=()=>{index=(index+list().length-1)%list().length;draw();};next.onclick=()=>{index=(index+1)%list().length;draw();};choose.onclick=()=>{state.portrait=list()[index].id;scheduleSave();draw();};
 async function photoPage(src,title){const p=canvasPage();p.ctx.font='700 26px Arial';p.ctx.fillText(title,60,75);fit(p.ctx,await image(src),60,120,1380,850);return p.canvas.toDataURL('image/jpeg',.9);}
 async function pages(){const v=examples.find(v=>v.id===state.portrait);if(!v)return [];const result=[];if(v.src)result.push(await photoPage(v.src,'ПОРТРЕТЫ И ВИНЬЕТКА · '+v.title));
  const paragraphs=['ПОРТРЕТЫ И ВИНЬЕТКА · '+v.title,'Класс: '+(state.className||'не указан'),'Что подготовить заранее:',...common,...(extra[v.category]?[extra[v.category]]:[])];let p=canvasPage(),y=85;
  for(const paragraph of paragraphs){let line='';for(const word of String(paragraph).split(/\s+/)){p.ctx.font='23px Arial';const candidate=line?line+' '+word:word;if(p.ctx.measureText(candidate).width>1360&&line){write(line);line=word;}else line=candidate;}if(line)write(line);y+=22;}result.push(p.canvas.toDataURL('image/jpeg',.9));return result;
  function write(text){if(y>970){result.push(p.canvas.toDataURL('image/jpeg',.9));p=canvasPage();y=85;}p.ctx.font='23px Arial';p.ctx.fillText(text,60,y);y+=34;}
 }
 index=Math.max(0,list().findIndex(v=>v.id===state.portrait));api.register({section,button:step,pages,draw});draw();
})();
