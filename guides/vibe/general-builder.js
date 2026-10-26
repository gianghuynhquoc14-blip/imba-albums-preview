'use strict';
(()=>{
 const api=window.ImbaVibeGeneralDraft;if(!api)return;
 const {state,scheduleSave,canvasPage,image,fit}=api;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text)n.textContent=text;return n;};
 const groups=[['room','Любимый кабинет'],['gym','Спортзал'],['hall','Актовый зал'],['street','На улице'],['board','У доски'],['own','Своя локация']];
 const examples=[
 ['room','04-000','Кабинет: книжные шкафы и школьный реквизит'],['room','06-000','Кабинет с характером'],['room','DSC07440','Кабинет и школьный реквизит'],
 ['gym','DSC01458','Современный спортзал в полутьме'],['gym','01-000','Просторный спортзал'],['gym','DSC08498','Весь класс в спортзале'],['gym','IMG_9039','На фоне спортивной сетки'],
 ['hall','DSC04464','На сцене с красным занавесом'],['hall','DSC00340','В креслах актового зала'],['hall','DSC01421','Сцена со светлым занавесом'],
 ['street','DSC06513','Школьный двор под снегом'],['street','DSC05177','На улице осенью'],['street','03-000','У входа в школу зимой'],
 ['board','DSC09387','Кабинет на фоне доски'],['own','own','Наше особенное место']
 ].map(([category,id,title])=>({category,id,title,src:id==='own'?'teacher-assets/general-own-r2.webp':'../easy/builder-assets/general-'+id+'.webp'}));
 const common=[
 'Лично отправьте фотографу фотографии именно ваших локаций заранее — в конструктор их загружать не нужно. Пример показывает идею, а возможность повторить её зависит от пространства и числа участников.',
 'Подойдёт любимый кабинет со шкафами, просторный коридор, вестибюль, спортзал, актовый зал или улица. Особенности непривычного интерьера можно обыграть — обсудите их с фотографом.',
 'Заранее договоритесь о времени и доступе: проверьте расписание занятий, найдите ответственного за ключи. Нужное помещение должно быть свободно к съёмке.',
 'Если нужны парты, подготовьте одинаковые по размеру и внешнему виду. Соберите реквизит заранее из нужных кабинетов: книги, глобусы, модели и другие предметы. Проверьте доступ к ним.',
 'Согласуйте одежду между собой, с родителями и учителями. Школьная форма необязательна: подойдут, например, джинсы и белые футболки. Выберите единый стиль и не больше трёх основных цветов на весь класс.'
 ];
 const extra={gym:'Уточните, нет ли в спортзале тренировки или дополнительного занятия на ваше время. Договоритесь о свободном зале заранее.',hall:'Проверьте доступность актового зала, состояние сцены, занавеса и кресел. Выберите подходящий фон вместе с фотографом.',street:'Съёмку на улице, в снег или дождь согласуйте с фотографом и участниками. Подготовьте запасное помещение на случай неподходящей погоды.',board:'Фон с доской не рекомендуем: она часто выглядит невыразительно и отражает свет вспышек. Лучше заранее показать фотографу другое место для сравнения.'};
 if(!examples.some(v=>v.id===state.general))state.general=null;
 let category=examples.find(v=>v.id===state.general)?.category||'room',index=0;
 const section=el('section');section.id='generalStep';section.hidden=true;section.className='choice-section';const heading=el('h2','Серьёзная общая фотография.');heading.id='generalHeading';section.append(el('p','04 · СЕРЬЁЗНАЯ ОБЩАЯ'),heading,el('p','Выберите идею по локации, а фотографии своего места лично отправьте фотографу. Для большого класса важны простор и доступность помещения.'));
 const tabs=el('div');tabs.className='category-tabs';section.append(tabs);
 const tabButtons=groups.map(([key,title])=>{const b=el('button',title);b.type='button';b.onclick=()=>{category=key;index=0;draw();};tabs.append(b);return b;});
 const gallery=el('div');gallery.className='gallery-panel';const prev=el('button','←'),next=el('button','→');prev.type=next.type='button';prev.className='round previous';next.className='round next';prev.setAttribute('aria-label','Предыдущий пример общей фотографии');next.setAttribute('aria-label','Следующий пример общей фотографии');
 const figure=el('figure');figure.className='cover-card';const visual=el('div');visual.className='cover-image teacher-visual';const caption=el('figcaption'),counter=el('span'),title=el('h3'),description=el('p'),choose=el('button','Выбрать общую фотографию');choose.id='chooseGeneral';choose.type='button';choose.className='primary';const generatedNote=el('p','Сгенерированная иллюстрация возможной локации');generatedNote.className='idea-label';generatedNote.hidden=true;caption.append(counter,title,description,generatedNote,choose);figure.append(visual,caption);gallery.append(prev,figure,next);section.append(gallery);
 const tips=el('aside');tips.className='tips';section.append(tips);document.getElementById('teachersStep').after(section);
 const summary=el('div');summary.className='general-summary';summary.setAttribute('aria-live','polite');document.querySelector('.summary-actions').before(summary);
 const step=document.getElementById('stepGeneral');
 const list=()=>examples.filter(v=>v.category===category);
 function draw(){const options=list(),v=options[index];prev.disabled=next.disabled=options.length<2;generatedNote.hidden=v.id!=='own';tabButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(groups[i][0]===category)));counter.textContent=(index+1)+' / '+options.length;title.textContent=v.title;description.textContent=extra[category]||'Выберите понравившуюся идею. Фотографии своего места лично отправьте фотографу.';visual.replaceChildren();if(v.src){const zoom=el('button'),img=el('img');zoom.type='button';zoom.setAttribute('aria-label','Рассмотреть: '+v.title);img.src=v.src;img.alt=v.title;zoom.append(img);zoom.onclick=()=>{document.getElementById('coverZoomImage').src=v.src;document.getElementById('coverZoomImage').alt=v.title;document.getElementById('coverZoomCaption').textContent=v.title;document.getElementById('coverZoom').showModal();};visual.append(zoom);}else{const paper=el('div');paper.className='teacher-text-example';paper.append(el('h3','Место, которое знаете вы'),el('p','Любимый коридор, вестибюль или другая локация. Лично отправьте фотографу фотографии места и расскажите свою идею.'));visual.append(paper);}choose.textContent=state.general===v.id?'Общая фотография выбрана ✓':'Выбрать общую фотографию';summary.replaceChildren(el('p',state.general?'Общая фотография: '+examples.find(v=>v.id===state.general).title:'Общая фотография пока не выбрана.'));tips.replaceChildren(el('p','Подготовка к общей фотографии'));const ul=el('ul');for(const text of [...common,...(extra[category]?[extra[category]]:[])])ul.append(el('li',text));tips.append(ul);api.updateExport();}
 prev.onclick=()=>{index=(index+list().length-1)%list().length;draw();};next.onclick=()=>{index=(index+1)%list().length;draw();};choose.onclick=()=>{state.general=list()[index].id;scheduleSave();draw();window.VibeCoverBuilder.showCommonStep('portraits');};
 async function photoPage(src,title){const p=canvasPage();p.ctx.font='700 26px Arial';p.ctx.fillText(title,60,75);fit(p.ctx,await image(src),60,120,1380,850);return p.canvas.toDataURL('image/jpeg',.9);}
 async function pages(plan=api.snapshot()){const state={...(plan.generalChoice||{}),className:plan.school};const v=examples.find(v=>v.id===state.general);if(!v)return [];const result=[];if(v.src)result.push(await photoPage(v.src,'ОБЩАЯ ФОТОГРАФИЯ · '+v.title));
  const paragraphs=['ОБЩАЯ ФОТОГРАФИЯ · '+v.title,'Класс: '+(state.className||'не указан'),...(v.id==='own'?['Сгенерированная иллюстрация возможной локации; фото своего места отправьте фотографу.']:[]),'Что подготовить заранее:',...common,...(extra[v.category]?[extra[v.category]]:[])];let p=canvasPage(),y=85;
  for(const paragraph of paragraphs){let line='';for(const word of String(paragraph).split(/\s+/)){p.ctx.font='23px Arial';const candidate=line?line+' '+word:word;if(p.ctx.measureText(candidate).width>1360&&line){write(line);line=word;}else line=candidate;}if(line)write(line);y+=22;}result.push(p.canvas.toDataURL('image/jpeg',.9));return result;
  function write(text){if(y>970){result.push(p.canvas.toDataURL('image/jpeg',.9));p=canvasPage();y=85;}p.ctx.font='23px Arial';p.ctx.fillText(text,60,y);y+=34;}
 }
 function restore(){category=examples.find(v=>v.id===state.general)?.category||'room';index=Math.max(0,list().findIndex(v=>v.id===state.general));draw();}api.register({section,button:step,pages,draw,restore,hasSelection:()=>examples.some(v=>v.id===state.general)});draw();
})();
