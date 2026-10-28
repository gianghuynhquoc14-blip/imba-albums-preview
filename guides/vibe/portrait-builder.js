'use strict';
(()=>{
 const core=window.VibeCoverBuilder,$=id=>document.getElementById(id),el=core.element,photoData=window.VibePortraitPhotoData;
 const formats=[
  ['clean-script','Лаконично и с воздухом','Белый фон, крупные имена и рукописные цитаты.'],
  ['soft-type','Мягкая типографика','Выразительные имена и спокойное оформление текста.'],
  ['bold-names','Имена с характером','Акцентный шрифт имени и личные слова рядом с портретом.'],
  ['colour-icons','Яркие символы','Цитаты и цветные значки, связанные с настроением страницы.'],
  ['red-notes','Акценты и рисунки','Красные плашки, заметки и простые рисунки.'],
  ['black-doodles','Чёрно-белые зарисовки','Стрелки, силуэты и графические детали вокруг портретов.'],
  ['pencil-story','Карандашная история','Рисунок поддерживает цитату и историю человека.']
 ].map(([id,title,text])=>({id,title,text,src:'portrait-assets/'+id+'.webp'}));
 let index=0,mode='preset',phase='layout',photoCategory='color',photoIndex=0,uploadSerial=0;
 const state=()=>core.commonState('portraits'),current=()=>mode==='preset'?formats[index]:{id:mode,title:mode==='own'?'Своя идея оформления':'Довериться дизайнеру'};
 const photoList=()=>photoData.examples.filter(v=>v.category===photoCategory),photo=()=>photoList()[photoIndex];
 const section=el('section');section.id='quotePortraitStep';section.hidden=true;section.className='choice-section';
 const title=el('h2','Портреты и ваши слова.');title.id='quotePortraitHeading';section.append(el('p','05 · ПОРТРЕТЫ С ЦИТАТАМИ'),title,el('p','Сначала выберите оформление, затем — как хотите сфотографироваться. Дизайн страницы и характер снимков можно сочетать по-своему. Фотографии, имена и цитаты в вашем альбоме будут ваши.'));
 const substeps=el('nav');substeps.className='quote-substeps';substeps.setAttribute('aria-label','Выбор портретного раздела');
 const layoutTab=el('button','1 · Оформление'),photoTab=el('button','2 · Как сфотографировать');layoutTab.type=photoTab.type='button';substeps.append(layoutTab,photoTab);section.append(substeps);
 const layout=el('div'),shoot=el('div');layout.id='portraitLayoutPanel';shoot.id='portraitShootPanel';section.append(layout,shoot);
 const modes=el('div');modes.className='category-tabs portrait-format-modes';
 for(const [key,text] of [['preset','Посмотреть варианты'],['own','Предложить свой вариант'],['designer','Довериться дизайнеру']]){const b=el('button',text);b.type='button';b.dataset.kind=key;b.onclick=()=>{mode=key;renderLayout();};modes.append(b);}layout.append(modes);
 function gallery(parent,previousLabel,nextLabel,zoomLabel){
  const root=el('div');root.className='vibe-example-gallery';const prev=el('button','←'),next=el('button','→');prev.type=next.type='button';prev.className=next.className='round';prev.setAttribute('aria-label',previousLabel);next.setAttribute('aria-label',nextLabel);
  const figure=el('figure');figure.className='personal-example-card';const zoom=el('button');zoom.type='button';zoom.className='personal-example-image';zoom.setAttribute('aria-label',zoomLabel);const img=new Image();img.width=1920;img.height=1280;zoom.append(img);
  const caption=el('figcaption'),counter=el('span'),heading=el('h3'),description=el('p');caption.append(counter,heading,description);figure.append(zoom,caption);root.append(prev,figure,next);parent.append(root);
  zoom.onclick=()=>{$('coverZoomImage').src=img.src;$('coverZoomImage').alt=img.alt;$('coverZoomCaption').textContent=heading.textContent;$('coverZoom').showModal();};
  return {root,prev,next,zoom,img,counter,heading,description};
 }
 const formatGallery=gallery(layout,'Предыдущее оформление портретов','Следующее оформление портретов','Рассмотреть оформление портретов целиком');formatGallery.counter.id='portraitFormatCounter';
 const alternative=el('aside');alternative.className='portrait-alternative';const alternativeTitle=el('h3'),alternativeText=el('p');alternative.append(alternativeTitle,alternativeText);layout.append(alternative);
 const uploadLabel=el('label','Добавить свой пример оформления'),upload=el('input');upload.id='portraitReferenceFile';upload.type='file';upload.accept='image/jpeg,image/png,image/webp';uploadLabel.append(upload);const customPreview=el('div');customPreview.className='custom-preview';const uploadStatus=el('p');uploadStatus.setAttribute('role','status');alternative.append(uploadLabel,customPreview,uploadStatus);
 const noteBox=el('label','Что нравится и что хочется изменить?');noteBox.className='portrait-comment';const note=el('textarea');note.id='portraitFormatComment';note.rows=4;note.maxLength=4000;note.placeholder='Например: оставить рисунки и шрифт, а фотографии сделать со светом от окна. Комментарий сохраняется отдельно для каждого варианта.';noteBox.append(note);layout.append(noteBox);
 const choose=el('button','Выбрать это оформление');choose.id='choosePortraitFormat';choose.type='button';choose.className='primary';layout.append(choose);
 layout.append(el('p','Примеры показывают оформление. Свет, фон и настроение фотографий выберем следующим шагом.'));
 const shootHeading=el('h3','1 · Свет и фон портретов');shootHeading.id='portraitShootHeading';shootHeading.tabIndex=-1;shoot.append(shootHeading,el('p','Выберите свет и фон: например, окно, студийное освещение, холст или кабинет. Это отдельно от оформления разворота и от постановки кадра. Ниже можно описать и свою задумку.'));
 const photoTabs=el('div');photoTabs.className='category-tabs';for(const [key,text] of photoData.groups){const b=el('button',text);b.type='button';b.dataset.category=key;b.onclick=()=>{photoCategory=key;photoIndex=0;renderPhoto();};photoTabs.append(b);}shoot.append(photoTabs);
 const shootGallery=gallery(shoot,'Предыдущий способ съёмки портретов','Следующий способ съёмки портретов','Рассмотреть способ съёмки портретов');
 const staging=el('aside');staging.className='tips';staging.append(el('h3','2 · Постановка и личные детали'),el('p','Что происходит в кадре: обычный портрет, своя вещь или общая творческая идея класса. Не нужно менять выбранный свет, чтобы предложить сюжет: опишите постановку в пожеланиях ниже. Какие свет и фон подойдут к ней, обсудим с фотографом.'));const stagingLink=el('a','Пример общей постановки: одна идея, разные характеры ↗');stagingLink.href='/guides/classic/preparation/#creative-portrait-idea';stagingLink.target='_blank';stagingLink.rel='noopener';stagingLink.setAttribute('aria-label','Пример общей постановки — открыть в новой вкладке');staging.append(stagingLink,el('p','Пример откроется в новой вкладке; текущий выбор и пожелания останутся здесь.'));shoot.append(staging);
 const ownPhoto=el('aside');ownPhoto.className='portrait-alternative';ownPhoto.append(el('h3','Как это должно выглядеть?'),el('p','Можно предложить свой свет, фон, настроение или сюжет. Опишите задумку ниже — детали обсудим с фотографом.'));shoot.append(ownPhoto);
 const photoNoteBox=el('label','Пожелания к выбранному варианту: свет, фон и постановка');photoNoteBox.className='portrait-comment';const photoNote=el('textarea');photoNote.id='portraitPhotoComment';photoNote.rows=4;photoNote.maxLength=4000;photoNote.placeholder='Свет, фон, одежда, настроение, реквизит. Для своего варианта опишите идею.';photoNoteBox.append(photoNote);shoot.append(photoNoteBox);
 const choosePhoto=el('button','Выбрать этот способ съёмки');choosePhoto.id='choosePortraitPhoto';choosePhoto.type='button';choosePhoto.className='primary';shoot.append(choosePhoto);
 const tips=el('aside');tips.className='tips';tips.append(el('h3','Что подготовить?'));const tipList=el('ul');for(const text of photoData.common)tipList.append(el('li',text));tips.append(tipList);shoot.append(tips);
 $('generalStep').after(section);
 const summary=el('div');summary.className='portrait-summary';summary.setAttribute('aria-live','polite');document.querySelector('.summary-actions').before(summary);
 const formatName=choice=>choice?.kind==='preset'?formats.find(v=>v.id===choice.id)?.title:choice?.kind==='own'?'Своя идея оформления':choice?.kind==='designer'?'Довериться дизайнеру':null;
 function renderSummary(){const value=state();summary.replaceChildren(el('h3','Портреты с цитатами'),el('p','Оформление: '+(formatName(value.selected)||'пока не выбрано')),el('p','Как сфотографировать: '+(photoData.examples.find(v=>v.id===value.photo)?.title||'можно выбрать или обсудить позже')));if(value.selected&&value.comments[value.selected.id])summary.append(el('p',value.comments[value.selected.id]));if(value.photo&&value.photoComments[value.photo])summary.append(el('p',value.photoComments[value.photo]));}
 function renderLayout(){
  const value=state(),item=current();for(const b of modes.children)b.setAttribute('aria-pressed',String(b.dataset.kind===mode));formatGallery.root.hidden=mode!=='preset';alternative.hidden=mode==='preset';uploadLabel.hidden=customPreview.hidden=uploadStatus.hidden=mode!=='own';
  if(mode==='preset'){formatGallery.img.src=item.src;formatGallery.img.alt=item.title;formatGallery.counter.textContent=(index+1)+' / '+formats.length;formatGallery.heading.textContent=item.title;formatGallery.description.textContent=item.text;}
  else{alternativeTitle.textContent=item.title;alternativeText.textContent=mode==='own'?'Добавьте картинку или опишите идею: что взять за основу и что сделать по-своему. JPG, PNG или WebP до 12 МБ.':'Можно оставить оформление дизайнеру. Пожелания необязательны: если есть важные цвета, детали или настроение, напишите ниже.';if(mode==='own')core.imagePreview(customPreview,value.custom?.src,'Мой пример оформления портретов');}
  note.value=value.comments[item.id]||'';choose.disabled=mode==='own'&&!value.custom&&!note.value.trim();choose.textContent=mode==='designer'?'Довериться дизайнеру':mode==='own'?'Предложить свою идею':'Выбрать это оформление';renderSummary();
 }
 function renderPhoto(){
  const item=photo(),value=state(),own=item.id==='own-photo';for(const b of photoTabs.children)b.setAttribute('aria-pressed',String(b.dataset.category===photoCategory));shootGallery.root.hidden=own;ownPhoto.hidden=!own;shootGallery.prev.disabled=shootGallery.next.disabled=photoList().length<2;
  if(item.src){shootGallery.img.src=item.src;shootGallery.img.alt=item.title;}shootGallery.counter.textContent=(photoIndex+1)+' / '+photoList().length;shootGallery.heading.textContent=item.title;shootGallery.description.textContent=photoData.extra[photoCategory]||'';photoNote.value=value.photoComments[item.id]||'';choosePhoto.textContent=own?'Обсудить свой способ съёмки':'Выбрать этот способ съёмки';renderSummary();
 }
 function draw(){layout.hidden=phase!=='layout';shoot.hidden=phase!=='photo';layoutTab.setAttribute('aria-pressed',String(phase==='layout'));photoTab.setAttribute('aria-pressed',String(phase==='photo'));renderLayout();renderPhoto();}
 function showPhase(value){phase=value;draw();const heading=value==='photo'?shootHeading:title;core.scrollTo(heading);heading.focus({preventScroll:true});}
 layoutTab.onclick=()=>showPhase('layout');photoTab.onclick=()=>showPhase('photo');
 formatGallery.prev.onclick=()=>{index=(index+formats.length-1)%formats.length;renderLayout();};formatGallery.next.onclick=()=>{index=(index+1)%formats.length;renderLayout();};
 shootGallery.prev.onclick=()=>{photoIndex=(photoIndex+photoList().length-1)%photoList().length;renderPhoto();};shootGallery.next.onclick=()=>{photoIndex=(photoIndex+1)%photoList().length;renderPhoto();};
 note.oninput=()=>{state().comments[current().id]=note.value;core.changed();choose.disabled=mode==='own'&&!state().custom&&!note.value.trim();renderSummary();};photoNote.oninput=()=>{state().photoComments[photo().id]=photoNote.value;core.changed();renderSummary();};
 choose.onclick=()=>{if(choose.disabled)return;state().selected={kind:mode,id:current().id};core.changed();showPhase('photo');};choosePhoto.onclick=()=>{state().photo=photo().id;core.changed();renderSummary();core.showCommonStep('fun');};
 upload.onchange=async event=>{const file=event.target.files[0];event.target.value='';if(!file)return;const model=state(),serial=++uploadSerial;try{const image=await core.prepareImage(file);if(serial!==uploadSerial||state()!==model)return;model.custom=image;core.changed();uploadStatus.textContent='Пример добавлен. Можно дописать пожелания и предложить свою идею.';renderLayout();}catch(error){if(serial===uploadSerial&&state()===model)uploadStatus.textContent=error.message;}};
 function restore(){uploadSerial++;uploadStatus.textContent='';const value=state();mode=value.selected?.kind||'preset';index=Math.max(0,formats.findIndex(v=>v.id===value.selected?.id));const selectedPhoto=photoData.examples.find(v=>v.id===value.photo);photoCategory=selectedPhoto?.category||'color';photoIndex=Math.max(0,photoList().findIndex(v=>v.id===value.photo));phase='layout';draw();}
 async function imagePage(src,heading,caption){const page=core.canvasPage();page.ctx.font='700 25px Arial';core.drawLines(page.ctx,heading,60,65,1380,34);const image=await core.loadImage(src),scale=Math.min(1380/image.width,760/image.height);page.ctx.drawImage(image,60+(1380-image.width*scale)/2,150+(760-image.height*scale)/2,image.width*scale,image.height*scale);page.ctx.font='19px Arial';core.drawLines(page.ctx,caption,60,990,1380,28);return page.canvas.toDataURL('image/jpeg',.9);}
 async function pages(plan){const value=plan.portraitChoice;if(!value?.selected&&!value?.photo)return [];const output=[],item=formats.find(v=>v.id===value.selected?.id),photoItem=photoData.examples.find(v=>v.id===value.photo);const src=value.selected?.kind==='own'?value.custom?.src:item?.src;
  if(src)output.push(await imagePage(src,'ВАЙБ · ОФОРМЛЕНИЕ ПОРТРЕТОВ','Пример для обсуждения. Фотографии, имена и цитаты будут вашими.'));
  output.push(...core.textPages('ПОРТРЕТЫ С ЦИТАТАМИ · НАШ ВЫБОР',['Класс: '+(plan.school||'не указан'),'Оформление: '+(formatName(value.selected)||'пока не выбрано'),value.selected?'Комментарий к оформлению: '+(value.comments[value.selected.id]||'нет дополнительных пожеланий'):'','Способ съёмки: '+(photoItem?.title||'обсудим позже'),value.photo?'Пожелания к съёмке: '+(value.photoComments[value.photo]||'нет дополнительных пожеланий'):'',photoItem?photoData.extra[photoItem.category]:'']));
  if(photoItem?.src)output.push(await imagePage(photoItem.src,'ВАЙБ · КАК ХОТИМ СФОТОГРАФИРОВАТЬСЯ','Это пример света и обстановки; детали согласуем с фотографом.'));
  if(photoItem)output.push(...core.textPages('ПОРТРЕТЫ · ПОДГОТОВКА',photoData.common));return output;
 }
 core.registerStep({id:'portraits',section,button:$('stepPortraits'),headingId:'quotePortraitHeading',draw,restore,pages,summary:renderSummary,hasSelection:()=>!!state().selected||!!state().photo});draw();
})();
