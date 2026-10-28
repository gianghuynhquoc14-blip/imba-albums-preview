'use strict';
(()=>{
 const data={"title": "Рекомендуемый порядок съёмки классики", "steps": ["Сначала общая фотография класса.", "Затем компании или фотобудка.", "После — остальные общие кадры, которые хотите снять.", "В конце — портреты по одному."], "why": "После общих кадров и своего портрета фотограф сможет отпускать по одному тех, кто уже отснялся и больше не нужен в запланированных кадрах. Так торопящимся ребятам не придётся ждать окончания всех портретов.", "context": "Если начать с портретов, всему классу придётся оставаться до конца общих кадров. Заранее согласуйте порядок с фотографом: это рекомендация для дня классики, а не порядок разворотов в альбоме."};
 function pages(canvasPage){
  const result=[];let page=canvasPage(),y=88;
  const write=(value,bold=false)=>{page.ctx.font=(bold?'700 ':'')+'27px Arial';let line='';for(const word of value.split(/\s+/)){const next=line?line+' '+word:word;if(page.ctx.measureText(next).width>1360&&line){draw(line,bold);line=word;}else line=next;}if(line)draw(line,bold);y+=22;};
  function draw(text,bold){if(y>970){result.push(page.canvas.toDataURL('image/jpeg',.9));page=canvasPage();y=88;}page.ctx.fillStyle='#14241c';page.ctx.font=(bold?'700 ':'')+'27px Arial';page.ctx.fillText(text,60,y);y+=40;}
  write(data.title,true);y+=15;data.steps.forEach((s,i)=>write((i+1)+'. '+s,true));y+=10;write(data.why);write(data.context);result.push(page.canvas.toDataURL('image/jpeg',.9));return result;
 }
 window.ImbaClassicShootOrder=Object.freeze({...data,steps:Object.freeze(data.steps),pages});
})();
