'use strict';
(()=>{
 const root=document.documentElement;const allowed=['school','primary','kindergarten','general'];const query=new URLSearchParams(location.search);const requested=query.get('audience');
 if(allowed.includes(requested))root.dataset.audience=requested;
 const audience=root.dataset.audience||'general';root.dataset.notebook='true';
 for(const a of document.querySelectorAll('.hero-actions a')){const url=new URL(a.href,location.href);if(url.origin===location.origin&&url.pathname===location.pathname&&!url.hash)a.setAttribute('aria-current','page');}
 // Pass the selected age only to shared example/preparation pages, not external sites.
 if(['primary','kindergarten'].includes(audience))for(const a of document.querySelectorAll('a[href]')){const url=new URL(a.href,location.href);if(url.origin!==location.origin)continue;if(/^\/guides\/(easy|classic)(\/|$)/.test(url.pathname)){url.searchParams.set('audience',audience);a.href=url.pathname+url.search+url.hash;}}
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let queued=false;
 addEventListener('scroll',()=>{if(queued||reduced.matches)return;queued=true;requestAnimationFrame(()=>{root.style.setProperty('--notebook-scroll',Math.min(scrollY,2400)+'px');queued=false;});},{passive:true});
})();
