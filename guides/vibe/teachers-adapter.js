'use strict';
(()=>{
 const core=window.VibeCoverBuilder;
 const state=new Proxy({}, {
  get(_target,key){return key==='className'?core.getPlan().school:core.teacherChoice()[key];},
  set(_target,key,value){core.teacherChoice()[key]=value;return true;}
 });
 window.ImbaVibeTeacherDraft={
  state,scheduleSave:core.changed,fileData:async file=>(await core.prepareImage(file)).src,
  canvasPage:core.canvasPage,image:core.loadImage,snapshot:core.getPlan,identity:core.teacherChoice,
  fit(ctx,img,x,y,w,h){const scale=Math.min(w/img.width,h/img.height);ctx.drawImage(img,x+(w-img.width*scale)/2,y+(h-img.height*scale)/2,img.width*scale,img.height*scale);},
  updateExport:core.renderSummary,next:core.showGeneral,
  register(step){core.registerTeachers(step);}
 };
 window.ImbaVibeGeneralDraft={...window.ImbaVibeTeacherDraft,state:new Proxy({}, {get(_target,key){return key==='className'?core.getPlan().school:core.generalChoice()[key];},set(_target,key,value){core.generalChoice()[key]=value;return true;}}),register(step){core.registerGeneral(step);}};
})();
