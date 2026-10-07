'use strict';
(() => {
 const chapters=[...document.querySelectorAll('[data-chapter]')];
 if(chapters.length){
  const links=[...document.querySelectorAll('.chapter-nav a')];
  const update=()=>{let current=chapters[0];const line=window.innerHeight*.38;for(const section of chapters){if(section.getBoundingClientRect().top<=line)current=section;}
   links.forEach(link=>{const active=link.hash==='#'+current.id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
   document.getElementById('chapterCount').textContent=String(chapters.indexOf(current)+1).padStart(2,'0')+' / '+String(chapters.length).padStart(2,'0');document.getElementById('chapterName').textContent=current.dataset.chapter;
  };let queued=false;window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{update();queued=false;});}},{passive:true});window.addEventListener('resize',update);update();
 }
 const dialog=document.getElementById('workDialog');if(!dialog)return;let opener=null;
 document.querySelectorAll('[data-photo-title]').forEach(link=>link.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();opener=link;document.getElementById('workDialogTitle').textContent=link.dataset.photoTitle;const source=link.querySelector('img'),image=document.getElementById('workDialogImage');image.src=link.href;image.alt=source.alt;dialog.showModal();document.body.classList.add('lightbox-open');}));
 document.getElementById('workDialogClose').onclick=()=>dialog.close();dialog.addEventListener('close',()=>{document.body.classList.remove('lightbox-open');opener?.focus({preventScroll:true});});
})();
