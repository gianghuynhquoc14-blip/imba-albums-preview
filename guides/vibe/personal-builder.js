'use strict';
(()=>{
 const core=window.VibeCoverBuilder,$=id=>document.getElementById(id),node=core.element;
 const host=$('vibePersonalStep'),overview=$('vibeAlbumOverview');
 // These are inspiration only. Browsing never writes to either personal spread.
 const examples=[
  {id:'creative-and-school',title:'Творческий образ и школьная форма',src:'personal-assets/creative-and-school.webp',text:'Слева — свой образ у расписанной стены, справа — портрет за партой. Один из способов показать себя с разных сторон.'},
  {id:'code-and-class',title:'Твоя идея и школьный портрет',src:'personal-assets/code-and-class.webp',text:'Сюжет с проекцией и портрет с настроением. Идея может быть связана с тем, что интересно именно тебе.'},
  {id:'portrait-and-hobby',title:'Школа и то, чем живёшь',src:'personal-assets/portrait-and-hobby.webp',text:'Школьный портрет рядом с фотографией в своём образе и с любимым реквизитом.'},
  {id:'studio-and-friends',title:'Личные кадры и твои люди',src:'personal-assets/studio-and-friends.webp',text:'Можно соединить личную съёмку и фотографию с друзьями. Количество и расположение кадров выбираешь сам.'},
  {id:'two-moods',title:'Два кадра, два настроения',src:'personal-assets/two-moods.webp',text:'Разные ракурсы, свет и настроение могут сложиться в одну историю.'},
  {id:'two-portraits',title:'Два портрета, два настроения',src:'/assets/archive/01-008.jpg',text:'Один человек и два разных кадра. Можно придумать другой образ, свет или содержание.'},
  {id:'light-shadow',title:'Свет, тень и характер',src:'/assets/archive/03-005.jpg',text:'Контраст света и настроений на одном развороте. Съёмку придумываем под твою историю.'},
  {id:'full-frame',title:'Один кадр на весь разворот',src:'/guides/easy/builder-assets/personal-full.webp',text:'Крупная фотография может стать самостоятельной историей. Композицию и расположение лица на сгибе обсудим заранее.'},
  {id:'story',title:'История в нескольких кадрах',src:'/guides/easy/builder-assets/personal-story.webp',text:'Несколько фотографий, связанных идеей или настроением. Это пример, а не обязательное количество кадров.'},
  {id:'friends',title:'Про тебя и твоих людей',src:'/guides/easy/builder-assets/personal-friends.webp',text:'Личные кадры могут включать друзей и общие воспоминания. Заранее договоримся, что хочется снять.'}
 ];
 let index=0;
 const examplesSection=node('section');examplesSection.className='personal-examples';examplesSection.setAttribute('aria-label','Примеры личных разворотов');
 const galleryHeading=node('div');galleryHeading.className='section-heading';
 const galleryText=node('div');galleryText.append(node('p','ПОЛИСТАЙТЕ ДЛЯ ВДОХНОВЕНИЯ'),node('h3','Вот как можно. А можно по-своему.'));
 galleryHeading.append(galleryText,node('p','Это примеры. Здесь ничего не нужно выбирать или подтверждать.'));examplesSection.append(galleryHeading);
 const gallery=node('div');gallery.className='vibe-example-gallery';
 const prev=node('button','←'),next=node('button','→');
 for(const [button,label] of [[prev,'Предыдущий пример личного разворота'],[next,'Следующий пример личного разворота']]){button.type='button';button.className='round';button.setAttribute('aria-label',label);}
 const figure=node('figure');figure.className='personal-example-card';
 const zoom=node('button');zoom.type='button';zoom.className='personal-example-image';zoom.setAttribute('aria-label','Рассмотреть личный разворот целиком');
 const img=new Image();img.width=1920;img.height=1280;zoom.append(img);
 const caption=node('figcaption'),counter=node('span'),exampleTitle=node('h4'),description=node('p');
 counter.id='personalExampleCounter';counter.setAttribute('aria-live','polite');caption.append(counter,exampleTitle,description);figure.append(zoom,caption);gallery.append(prev,figure,next);examplesSection.append(gallery);
 function render(){const item=examples[index];img.src=item.src;img.alt=item.title;counter.textContent=(index+1)+' / '+examples.length;exampleTitle.textContent=item.title;description.textContent=item.text;}
 function move(delta){index=(index+delta+examples.length)%examples.length;render();}
 prev.onclick=()=>move(-1);next.onclick=()=>move(1);
 gallery.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();move(event.key==='ArrowLeft'?-1:1);});
 zoom.onclick=()=>{$('coverZoomImage').src=img.src;$('coverZoomImage').alt=img.alt;$('coverZoomCaption').textContent=exampleTitle.textContent;$('coverZoom').showModal();};
 function afterCover(){
  $('commonExampleMount').append(examplesSection);core.showOverview();
 }
 function show(){
  $('personalExampleMount').append(examplesSection);core.showPersonalView();core.scrollTo(host);if(core.focusHeading)core.focusHeading('vibePersonalTitle');else $('vibePersonalTitle').focus({preventScroll:true});
 }
 function restore(){index=0;render();}
 $('vibeStepCover').onclick=()=>{core.returnCommon();};$('vibeStepPersonal').onclick=show;
 $('backToCommon').onclick=()=>{core.returnCommon();};
 $('overviewEditCover').onclick=()=>{core.showCover();};$('overviewTeachers').onclick=()=>core.showTeachers();
 $('commonExampleMount').append(examplesSection);render();
 // Keep imported personal data intact, but do not export browsed examples as decisions.
 core.registerPersonal({show,afterCover,restore,summary(){},pages:async()=>[],hasSelection:()=>false});
})();
