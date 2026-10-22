 'use strict';
(()=>{
 const steps=[['coverStep','stepCover'],['personalStep','stepPersonal'],['teachersStep','stepTeachers'],['portraitStep','stepPortrait'],['generalStep','stepGeneral'],['companiesStep','stepCompanies'],['funStep','stepFun']];
 function reveal(element){if(!element)return;element.scrollIntoView({block:'start',behavior:'smooth'});const heading=element.querySelector('h2');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}}
 for(const [sectionId,stepId] of steps){const step=document.getElementById(stepId);if(!step)continue;const previous=step.onclick;step.onclick=function(event){const result=previous?.call(this,event);reveal(document.getElementById(sectionId));return result;};}
 for(const [index,[sectionId]] of steps.entries()){const section=document.getElementById(sectionId);if(!section)continue;for(const button of section.querySelectorAll('button.primary')){if(!/^Выбрать|^Выбрано|выбран/.test(button.textContent))continue;const previous=button.onclick;if(!previous)continue;button.onclick=function(event){if(this.disabled)return;const result=previous.call(this,event);const next=steps[index+1];if(next)document.getElementById(next[1]).click();else reveal(document.querySelector('.summary'));return result;};}}
})();
