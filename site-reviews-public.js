'use strict';
(async()=>{
 const script=document.currentScript,preview=new URL(script.src).searchParams.has('preview'),origin=preview?location.origin:'https://cabinet.imbamgdn.ru';
 const node=(tag,text)=>{const el=document.createElement(tag);if(text)el.textContent=text;return el;};
 const safeURL=value=>{if(typeof value!=='string')return null;if(/^\/review-media\/[a-f0-9]{32}\.[a-z0-9]{2,5}$/.test(value))return origin+value;try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password?url.href:null;}catch{return null;}};
 try{
  const response=await fetch(origin+'/api/public-reviews',{credentials:'omit',signal:AbortSignal.timeout(6000)});if(!response.ok)return;const data=await response.json();if(!Array.isArray(data.reviews)||!data.reviews.length)return;
  const section=node('section');section.id='siteReviews';section.dataset.chapter='Отзывы';section.setAttribute('aria-labelledby','siteReviewsTitle');const title=node('h2','Отзывы о съёмках и альбомах');title.id='siteReviewsTitle';const intro=node('p','Слова заказчиков и видео готовых альбомов. У перенесённых материалов указан источник.');const list=node('div');list.className='reviews-grid';section.append(title,intro,list);
  for(const item of data.reviews){
   if(typeof item.author!=='string'||typeof item.text!=='string')continue;
   const card=node('article');card.className='review-card layout-'+(['card','wide','quote','media'].includes(item.layout)?item.layout:'card');
   if(item.author)card.append(node('strong',item.author));
   const meta=node('p',[item.service,item.date&&/^\d{4}-\d{2}-\d{2}$/.test(item.date)?item.date.split('-').reverse().join('.'):null,item.platform].filter(Boolean).join(' · '));meta.className='review-meta';card.append(meta);
   if(Number.isInteger(item.rating)&&item.rating>=1&&item.rating<=5){const rating=node('p','★'.repeat(item.rating));rating.setAttribute('aria-label','Оценка автора: '+item.rating+' из 5');card.append(rating);}
   if(item.text){const quote=node('blockquote',item.text);if(item.text.length>600){card.append(node('p',item.text.slice(0,350)+'…'));const full=node('details');full.append(node('summary','Читать полностью'),quote);card.append(full);}else card.append(quote);}
   if(Array.isArray(item.media)){
    const gallery=node('div');gallery.className='review-media-grid';
    for(const media of item.media.slice(0,8)){
     const url=safeURL(media.url);if(!url)continue;const figure=node('figure');figure.className='review-media-'+media.kind;
     if(media.kind==='image'){const link=node('a'),img=node('img');link.href=url;link.target='_blank';link.rel='noopener noreferrer';img.src=url;img.alt=media.caption||'Материал к отзыву';img.loading='lazy';img.decoding='async';link.append(img);figure.append(link);}
     else if(media.kind==='video'||media.kind==='audio'){const player=node(media.kind);player.src=url;player.controls=true;player.preload='none';if(media.kind==='video'){player.playsInline=true;player.className='shape-'+(['portrait','landscape','square'].includes(media.shape)?media.shape:'auto');const poster=safeURL(media.poster_url);if(poster)player.poster=poster;}player.setAttribute('aria-label',media.caption||(media.kind==='video'?'Видео результата':'Аудиоотзыв'));figure.append(player);}
     else if(media.kind==='document'||media.kind==='link'){const link=node('a',media.caption||media.name||(media.kind==='document'?'Скачать файл':'Открыть материал'));link.href=url;link.target='_blank';link.rel='noopener noreferrer';figure.append(link);}else continue;
     if(media.caption&&!['document','link'].includes(media.kind))figure.append(node('figcaption',media.caption));gallery.append(figure);
    }
    if(gallery.children.length)card.append(gallery);
   }
   const source=safeURL(item.source_url);if(source){const link=node('a','Источник'+(item.platform?' · '+item.platform:''));link.href=source;link.target='_blank';link.rel='noopener noreferrer';card.append(link);}list.append(card);
  }
  if(!list.children.length)return;
  const cards=Array.from(list.children);let shown=6;for(let index=shown;index<cards.length;index++)cards[index].hidden=true;
  if(cards.length>shown){const more=node('button');more.type='button';const update=()=>{more.textContent='Показать ещё отзывы · осталось '+(cards.length-shown);more.hidden=shown>=cards.length;};more.onclick=()=>{const next=Math.min(shown+6,cards.length);for(let index=shown;index<next;index++)cards[index].hidden=false;shown=next;update();};update();section.append(more);}
  const target=document.querySelector('.seo-program-summary')||document.querySelector('footer');if(target)target.before(section);else document.querySelector('main')?.append(section);
 }catch{}
})();
