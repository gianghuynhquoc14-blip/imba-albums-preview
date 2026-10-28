'use strict';
window.VibeGalleryOnly=config=>{
 const core=window.VibeCoverBuilder,$=id=>document.getElementById(id),el=core.element;let index=0;
 const section=el('section');section.id=config.sectionId;section.hidden=true;section.className='choice-section';const heading=el('h2',config.title);heading.id=config.headingId;section.append(el('p',config.eyebrow),heading,el('p',config.intro));
 if(config.guideHref){const guide=el('a','Как придумать творческое фото компании →');guide.href=config.guideHref;guide.className='quiet';section.append(guide);}
 const gallery=el('div');gallery.className='vibe-example-gallery';const prev=el('button','←'),next=el('button','→');prev.type=next.type='button';prev.className=next.className='round';prev.setAttribute('aria-label','Предыдущий пример: '+config.title);next.setAttribute('aria-label','Следующий пример: '+config.title);
 const figure=el('figure');figure.className='personal-example-card';const zoom=el('button');zoom.type='button';zoom.className='personal-example-image';zoom.setAttribute('aria-label','Рассмотреть: '+config.title);const img=new Image();img.width=1920;img.height=1280;zoom.append(img);const caption=el('figcaption'),counter=el('span'),title=el('h3');counter.id=config.counterId;caption.append(counter,title);figure.append(zoom,caption);gallery.append(prev,figure,next);section.append(gallery);
 const actions=el('div');actions.className='personal-step-actions';const proceed=el('button',config.nextLabel);proceed.type='button';proceed.className='primary';proceed.onclick=()=>core.showCommonStep(config.next);actions.append(proceed);section.append(actions);$(config.afterId).after(section);
 function draw(){const item=config.examples[index];img.src=item.src;img.alt=item.title;counter.textContent=(index+1)+' / '+config.examples.length;title.textContent=item.title;prev.disabled=next.disabled=config.examples.length<2;}
 prev.onclick=()=>{index=(index+config.examples.length-1)%config.examples.length;draw();};next.onclick=()=>{index=(index+1)%config.examples.length;draw();};zoom.onclick=()=>{$('coverZoomImage').src=img.src;$('coverZoomImage').alt=img.alt;$('coverZoomCaption').textContent=config.examples[index].title;$('coverZoom').showModal();};
 core.registerStep({id:config.id,section,button:$(config.buttonId),headingId:config.headingId,draw,restore(){index=0;draw();},pages:async()=>[],hasSelection:()=>false});draw();
};
