'use strict';
(async()=>{
 const script=document.currentScript,preview=new URL(script.src).searchParams.has('preview'),origin=preview?location.origin:'https://cabinet.imbamgdn.ru';
 try{const response=await fetch(origin+'/api/public-reviews',{credentials:'omit',signal:AbortSignal.timeout(6000)});if(!response.ok)return;const data=await response.json();if(!Array.isArray(data.reviews)||!data.reviews.length)return;
 const section=document.createElement('section');section.id='siteReviews';section.dataset.chapter='Отзывы';section.setAttribute('aria-labelledby','siteReviewsTitle');const title=document.createElement('h2');title.id='siteReviewsTitle';title.textContent='Отзывы о съёмках и альбомах';const intro=document.createElement('p');intro.textContent='Слова заказчиков. У перенесённых отзывов указаны площадка и ссылка на оригинал.';const list=document.createElement('div');list.className='reviews-grid';section.append(title,intro,list);
 for(const item of data.reviews){if(typeof item.author!=='string'||typeof item.text!=='string')continue;const card=document.createElement('article'),author=document.createElement('strong'),meta=document.createElement('p'),quote=document.createElement('blockquote');author.textContent=item.author;meta.textContent=[item.service,item.date&&/^\d{4}-\d{2}-\d{2}$/.test(item.date)?item.date.split('-').reverse().join('.'):null,item.platform].filter(Boolean).join(' · ');quote.textContent=item.text;card.append(author,meta);
  if(Number.isInteger(item.rating)&&item.rating>=1&&item.rating<=5){const rating=document.createElement('p');rating.textContent='★'.repeat(item.rating);rating.setAttribute('aria-label','Оценка автора: '+item.rating+' из 5');card.append(rating);}
  if(item.text.length>600){const excerpt=document.createElement('p');excerpt.textContent=item.text.slice(0,350)+'…';const full=document.createElement('details'),summary=document.createElement('summary');summary.textContent='Читать полностью';full.append(summary,quote);card.append(excerpt,full);}else card.append(quote);
  if(item.source_url){try{const url=new URL(item.source_url);if(url.protocol==='https:'&&!url.username&&!url.password){const link=document.createElement('a');link.href=url.href;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Оригинал отзыва'+(item.platform?' · '+item.platform:'');card.append(link);}}catch{}}
  list.append(card);
 }
 if(!list.children.length)return;
 const cards=Array.from(list.children);let shown=6;for(let index=shown;index<cards.length;index++)cards[index].hidden=true;
 if(cards.length>shown){const more=document.createElement('button');more.type='button';const update=()=>{more.textContent='Показать ещё отзывы · осталось '+(cards.length-shown);more.hidden=shown>=cards.length;};more.onclick=()=>{const next=Math.min(shown+6,cards.length);for(let index=shown;index<next;index++)cards[index].hidden=false;shown=next;update();};update();section.append(more);}
 const target=document.querySelector('.seo-program-summary')||document.querySelector('footer');if(target)target.before(section);else document.querySelector('main')?.append(section);
 }catch{}
})();
