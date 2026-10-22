'use strict';
(()=>{
 const api=window.ImbaEasyDraft;if(!api)return;
 const {state,scheduleSave,canvasPage,image,fit}=api;
 const el=(tag,text)=>{const n=document.createElement(tag);if(text)n.textContent=text;return n;};
 const groups=[['room','В кабинете'],['corridor','В коридоре'],['gym','В спортзале'],['hall','В актовом зале'],['street','На улице']];
 const examples=[['room','07-000','Весёлая общая · пример 1'],['hall','DSC04561','Весёлая общая · пример 2'],['gym','12-000','Весёлая общая · пример 3'],['hall','DSC01448','Весёлая общая · пример 4'],['gym','34-000-1','Весёлая общая · пример 5'],['street','DSC05225','Весёлая общая · пример 6'],['gym','DSC03454','Весёлая общая · пример 7'],['corridor','27-000','Весёлая общая · пример 8'],['street','DSC06541-1','Весёлая общая · пример 9'],['room','05-000','Весёлая общая · пример 10'],['gym','DSC08562','Весёлая общая · пример 11'],['gym','DSC00667','Весёлая общая · пример 12'],['room','DSC07468','Весёлая общая · пример 13'],['hall','DSC04519','Весёлая общая · пример 14'],['gym','DSC04670','Весёлая общая · пример 15'],['gym','engineering-b','Весёлая общая · пример 16'],['corridor','engineering-a','Весёлая общая · пример 17'],['gym','school-4','Весёлая общая · пример 18']].map(([category,id,title])=>({category,id,title,src:'builder-assets/fun-'+id+'.webp'}));
 const common=[
 'Весёлую общую фотографию снимаем в том же месте, где серьёзную. Выбранный здесь пример — идея настроения и сюжета; новую локацию для второго кадра искать не нужно.',
 'Придумайте шутки и маленькие сценки заранее. Покажите не только то, как умеете быть серьёзными, но и то, как веселитесь вместе. Пусть в общем кадре у каждого будет своя роль и будет видно каждого.',
 'Принесите необычный, нешкольный реквизит: забавные очки, любимую игрушку, аксессуар из вашего увлечения, табличку с общей шуткой. Соберите всё до съёмки и заранее обсудите сюжет с фотографом.',
 'Классного руководителя можно пригласить в общую сценку: придумайте роль вместе с ним и согласуйте, что ему комфортно. Хороший прикол нравится всем участникам.',
 'Идеи для старта: замерший кадр самого шумного урока; каждый показывает своё увлечение; класс как постер приключенческого фильма; учитель сохраняет спокойствие, пока вокруг творится постановочный хаос.',
 'Выбирайте допустимый реквизит и постановку, в которой всем комфортно. Сложные позы и взаимодействия заранее согласуйте с фотографом. Самое важное — ваш характер, энергия и общие воспоминания.'
 ];
 const extra={};
 if(!examples.some(v=>v.id===state.fun))state.fun=null;
 let category=examples.find(v=>v.id===state.fun)?.category||'room',index=0;
 const section=el('section');section.id='funStep';section.hidden=true;section.className='choice-section';section.append(el('p','07 · Весёлая общая'),el('h2','А теперь — ваш настоящий шумный класс.'),el('p','В том же месте, что и серьёзная общая, но с вашими шутками, реквизитом и духом молодости.'));
 const tabs=el('div');tabs.className='category-tabs';section.append(tabs);
 const tabButtons=groups.map(([key,title])=>{const b=el('button',title);b.type='button';b.onclick=()=>{category=key;index=0;draw();};tabs.append(b);return b;});
 const gallery=el('div');gallery.className='gallery-panel';const prev=el('button','←'),next=el('button','→');prev.type=next.type='button';prev.className='round previous';next.className='round next';prev.setAttribute('aria-label','Предыдущий пример весёлой общей');next.setAttribute('aria-label','Следующий пример весёлой общей');
 const figure=el('figure');figure.className='cover-card';const visual=el('div');visual.className='cover-image teacher-visual';const caption=el('figcaption'),counter=el('span'),title=el('h3'),description=el('p'),choose=el('button','Выбрать весёлую общую');choose.id='chooseFun';choose.type='button';choose.className='primary';caption.append(counter,title,description,choose);figure.append(visual,caption);gallery.append(prev,figure,next);section.append(gallery);
 const tips=el('aside');tips.className='tips';section.append(tips);document.getElementById('companiesStep').after(section);
 const summary=el('div');summary.className='fun-summary';summary.setAttribute('aria-live','polite');document.querySelector('.summary-actions').before(summary);
 const step=document.getElementById('stepFun');
 const list=()=>examples.filter(v=>v.category===category);
 function draw(){const options=list(),v=options[index];tabButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(groups[i][0]===category)));counter.textContent=(index+1)+' / '+options.length;title.textContent=v.title;description.textContent=extra[category]||'Выбирайте настроение и сюжет. Снимаемся там же, где серьёзную общую.';visual.replaceChildren();if(v.src){const zoom=el('button'),img=el('img');zoom.type='button';zoom.setAttribute('aria-label','Рассмотреть: '+v.title);img.src=v.src;img.alt=v.title;zoom.append(img);zoom.onclick=()=>{document.getElementById('zoomImage').src=v.src;document.getElementById('zoomImage').alt=v.title;document.getElementById('zoomCaption').textContent=v.title;document.getElementById('zoomDialog').showModal();};visual.append(zoom);}else{const paper=el('div');paper.className='teacher-text-example';paper.append(el('h3','Место, которое знаете вы'),el('p','Любимый коридор, вестибюль или другая локация. Лично отправьте фотографу фотографии места и расскажите свою идею.'));visual.append(paper);}choose.textContent=state.fun===v.id?'Весёлая общая выбрана ✓':'Выбрать весёлую общую';summary.replaceChildren(el('p',state.fun?'Весёлая общая: '+examples.find(v=>v.id===state.fun).title:'Весёлая общая пока не выбрана.'));tips.replaceChildren(el('p','Подготовка к весёлой общей'));const ul=el('ul');for(const text of [...common,...(extra[category]?[extra[category]]:[])])ul.append(el('li',text));tips.append(ul);api.updateExport();}
 prev.onclick=()=>{index=(index+list().length-1)%list().length;draw();};next.onclick=()=>{index=(index+1)%list().length;draw();};choose.onclick=()=>{state.fun=list()[index].id;scheduleSave();draw();};
 async function photoPage(src,title){const p=canvasPage();p.ctx.font='700 26px Arial';p.ctx.fillText(title,60,75);fit(p.ctx,await image(src),60,120,1380,850);return p.canvas.toDataURL('image/jpeg',.9);}
 async function pages(){const v=examples.find(v=>v.id===state.fun);if(!v)return [];const result=[];if(v.src)result.push(await photoPage(v.src,'ВЕСЁЛАЯ ОБЩАЯ · '+v.title));
  const paragraphs=['ВЕСЁЛАЯ ОБЩАЯ · '+v.title,'Класс: '+(state.className||'не указан'),'Что подготовить заранее:',...common,...(extra[v.category]?[extra[v.category]]:[])];let p=canvasPage(),y=85;
  for(const paragraph of paragraphs){let line='';for(const word of String(paragraph).split(/\s+/)){p.ctx.font='23px Arial';const candidate=line?line+' '+word:word;if(p.ctx.measureText(candidate).width>1360&&line){write(line);line=word;}else line=candidate;}if(line)write(line);y+=22;}result.push(p.canvas.toDataURL('image/jpeg',.9));return result;
  function write(text){if(y>970){result.push(p.canvas.toDataURL('image/jpeg',.9));p=canvasPage();y=85;}p.ctx.font='23px Arial';p.ctx.fillText(text,60,y);y+=34;}
 }
 index=Math.max(0,list().findIndex(v=>v.id===state.fun));api.register({section,button:step,pages,draw});draw();
})();
