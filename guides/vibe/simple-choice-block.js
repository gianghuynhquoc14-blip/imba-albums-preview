'use strict';
window.VibeSimpleChoice=config=>{
 const core=window.VibeCoverBuilder,$=id=>document.getElementById(id),el=core.element,data=config.data;
 const state=()=>core.commonState(config.id);let category=config.firstCategory||data.groups[0][0],index=0;
 const list=()=>data.examples.filter(v=>v.category===category),item=()=>list()[index];
 const section=el('section');section.id=config.sectionId;section.hidden=true;section.className='choice-section';
 const heading=el('h2',config.title);heading.id=config.headingId;section.append(el('p',config.eyebrow),heading,el('p',config.intro));
 const tabs=el('div');tabs.className='category-tabs';for(const [key,text] of data.groups){const b=el('button',text);b.type='button';b.dataset.category=key;b.onclick=()=>{category=key;index=0;draw();};tabs.append(b);}section.append(tabs);
 const gallery=el('div');gallery.className='vibe-example-gallery';const prev=el('button','←'),next=el('button','→');prev.type=next.type='button';prev.className=next.className='round';prev.setAttribute('aria-label','Предыдущий пример: '+config.short);next.setAttribute('aria-label','Следующий пример: '+config.short);
 const figure=el('figure');figure.className='personal-example-card';const zoom=el('button');zoom.type='button';zoom.className='personal-example-image';zoom.setAttribute('aria-label','Рассмотреть пример: '+config.short);const img=new Image();img.width=1920;img.height=1280;zoom.append(img);const caption=el('figcaption'),counter=el('span'),title=el('h3'),description=el('p');caption.append(counter,title,description);figure.append(zoom,caption);gallery.append(prev,figure,next);section.append(gallery);
 const noPhoto=el('aside');noPhoto.className='portrait-alternative';const noPhotoTitle=el('h3'),noPhotoText=el('p');noPhoto.append(noPhotoTitle,noPhotoText);section.append(noPhoto);
 const noteBox=el('label','Комментарий к этому варианту');noteBox.className='portrait-comment';const note=el('textarea');note.id=config.id+'Comment';note.rows=3;note.maxLength=4000;note.placeholder='Что нравится, что изменить, какие детали учесть?';noteBox.append(note);section.append(noteBox);
 const choose=el('button','Выбрать этот вариант');choose.id=config.chooseId;choose.className='primary';choose.type='button';section.append(choose);
 const tips=el('aside');tips.className='tips';tips.append(el('h3',config.tipsTitle||'Что подготовить?'));const tipList=el('ul');for(const text of data.common)tipList.append(el('li',text));tips.append(tipList);section.append(tips);
 $(config.afterId).after(section);
 const summary=el('div');summary.className='portrait-summary';summary.setAttribute('aria-live','polite');document.querySelector('.summary-actions').before(summary);
 function draw(){const value=item(),saved=state();for(const b of tabs.children)b.setAttribute('aria-pressed',String(b.dataset.category===category));prev.disabled=next.disabled=list().length<2;gallery.hidden=!value.src;noPhoto.hidden=!!value.src;
  if(value.src){img.src=value.src;img.alt=value.title;}counter.textContent=(index+1)+' / '+list().length;title.textContent=noPhotoTitle.textContent=value.title;description.textContent=noPhotoText.textContent=data.extra[category]||config.intro;note.value=saved.comments[value.id]||'';choose.textContent=value.id==='none'?'Не добавлять этот блок':config.chooseLabel||'Выбрать этот вариант';
  updateSummary();
 }
 prev.onclick=()=>{index=(index+list().length-1)%list().length;draw();};next.onclick=()=>{index=(index+1)%list().length;draw();};note.oninput=()=>{state().comments[item().id]=note.value;core.changed();};
 choose.onclick=()=>{state().selected=item().id;core.changed();draw();if(config.next)core.showCommonStep(config.next);else core.review();};
 zoom.onclick=()=>{$('coverZoomImage').src=img.src;$('coverZoomImage').alt=img.alt;$('coverZoomCaption').textContent=item().title;$('coverZoom').showModal();};
 function updateSummary(){const saved=state(),selected=data.examples.find(v=>v.id===saved.selected);summary.replaceChildren(el('h3',config.short),el('p',selected?selected.title:'Можно выбрать или обсудить позже'));if(selected&&saved.comments[selected.id])summary.append(el('p',saved.comments[selected.id]));}
 function restore(){const selected=data.examples.find(v=>v.id===state().selected);category=selected?.category||config.firstCategory||data.groups[0][0];index=Math.max(0,list().findIndex(v=>v.id===state().selected));draw();}
 async function pages(plan){const choice=plan[config.field],selected=data.examples.find(v=>v.id===choice?.selected);if(!selected)return [];const output=[];
  if(selected.src){const page=core.canvasPage();page.ctx.font='700 26px Arial';core.drawLines(page.ctx,config.short+' · '+selected.title,60,70,1380,34);const picture=await core.loadImage(selected.src),scale=Math.min(1380/picture.width,800/picture.height);page.ctx.drawImage(picture,60+(1380-picture.width*scale)/2,150+(800-picture.height*scale)/2,picture.width*scale,picture.height*scale);output.push(page.canvas.toDataURL('image/jpeg',.9));}
  output.push(...core.textPages(config.short.toUpperCase(),['Класс: '+(plan.school||'не указан'),'Выбор: '+selected.title,config.intro,'Пожелания: '+(choice.comments[selected.id]||'нет дополнительных пожеланий'),data.extra[selected.category]||'',...(selected.id==='none'?[]:data.common)]));return output;
 }
 core.registerStep({id:config.id,section,button:$(config.buttonId),headingId:config.headingId,draw,restore,pages,summary:updateSummary,hasSelection:()=>!!state().selected});draw();
};
