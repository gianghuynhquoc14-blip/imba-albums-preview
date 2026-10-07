'use strict';
(() => {
  const {normalize,layoutOf,kinds,statuses}=VibePlan;
  const fold=value=>String(value||'').normalize('NFKC').toLocaleLowerCase('ru').replace(/ё/g,'е').replace(/[^\p{L}\p{N}]+/gu,'');
  const fullName=plan=>[plan.student.surname.trim(),plan.student.givenName.trim()].filter(Boolean).join(' ')||plan.owner.trim();
  const identity=plan=>fold(plan.school)+'|'+fold(fullName(plan));
  const empty=()=>({format:'vibe-class-plans',version:1,school:'',roster:'',common:null,students:[]});
  function review(collection,inputs){let school=collection.school.trim();const candidates=[],errors=[],replacements=[];let common=null;
    for(const input of inputs){try{const plan=normalize(input.data);if(!plan.school.trim())throw new Error('Не указан класс / школа.');if(!school)school=plan.school.trim();if(fold(plan.school)!==fold(school))throw new Error('Другой класс: '+plan.school+'. Здесь собираем '+school+'.');if(plan.mode==='class'){if(collection.common||common)replacements.push('Общий план класса');common=plan;continue;}if(fullName(plan).split(/\s+/).length<2)throw new Error('Не указаны фамилия и имя ученика. Дополните их в конструкторе и сохраните проект снова.');const key=identity(plan);const existing=collection.students.find(s=>s.key===key||s.plan.student.id===plan.student.id);const inBatch=candidates.findIndex(s=>s.key===key||s.plan.student.id===plan.student.id);const entry={key,plan,receivedAt:new Date().toISOString(),sourceFile:input.name||''};if(existing||inBatch>=0)replacements.push(fullName(plan));if(inBatch>=0)candidates[inBatch]=entry;else candidates.push(entry);}catch(e){errors.push((input.name||'Файл')+': '+e.message);}}
    return {school,candidates,common,errors,replacements:[...new Set(replacements)]};
  }
  function apply(collection,reviewed){const next=structuredClone(collection);next.school=reviewed.school;if(reviewed.common)next.common=reviewed.common;for(const entry of reviewed.candidates){const index=next.students.findIndex(s=>s.key===entry.key||s.plan.student.id===entry.plan.student.id);if(index>=0)next.students[index]=entry;else next.students.push(entry);}next.students.sort((a,b)=>fullName(a.plan).localeCompare(fullName(b.plan),'ru'));return next;}
  function rosterNames(text){const names=text.split(/\r?\n/).map(v=>v.replace(/^\s*\d+[.)]?\s+/,'').trim()).filter(Boolean);return [...new Map(names.map(n=>[fold(n),n])).values()];}
  function missing(collection){const received=new Set(collection.students.map(s=>fold(fullName(s.plan))));return rosterNames(collection.roster).filter(n=>!received.has(fold(n)));}
  const hasContent=s=>Boolean(s.image||s.comment.trim()||s.props.trim());
  function summary(plan){let slots=0,filled=0,toShoot=0;const locations=new Set(),props=new Set(),ideas=[],issues=[];
    plan.spreads.forEach((sp,i)=>{if(plan.mode==='class'&&i<2)return;const active=layoutOf(sp).rects.length;slots+=active;let wantsShoot=false;sp.slots.forEach((s,j)=>{if(j>=active){if(hasContent(s))issues.push('Разворот '+(i+1)+': окошко '+(j+1)+' не размещено в выбранной схеме.');return;}if(hasContent(s)){filled++;if(s.comment.trim())ideas.push(s.comment.trim());if(s.props.trim())props.add(s.props.trim());if(s.use==='reference'&&s.status!=='done'){toShoot++;wantsShoot=true;if(!s.comment.trim())issues.push('Окошко '+(j+1)+' на развороте '+(i+1)+': пояснить референс.');}}});if(sp.location.trim())locations.add(sp.location.trim());else if(wantsShoot)issues.push('Разворот '+(i+1)+': уточнить место съёмки.');if(sp.comment.trim())ideas.push(sp.comment.trim());});
    if(filled<slots)issues.unshift('Заполнено '+filled+' из '+slots+' окошек: остальные пока без картинки или описания.');
    return {slots,filled,toShoot,locations:[...locations],props:[...props],ideas,issues};
  }
  function normalizeCollection(raw){if(!raw||raw.format!=='vibe-class-plans'||raw.version!==1||!Array.isArray(raw.students)||raw.students.length>200)throw new Error('Это не поддерживаемый файл сборника класса.');const collection=empty();collection.school=typeof raw.school==='string'?raw.school.slice(0,150):'';collection.roster=typeof raw.roster==='string'?raw.roster.slice(0,20000):'';const inputs=raw.students.map(s=>({name:s.sourceFile||'Личный план',data:s.plan}));if(raw.common)inputs.push({name:'Общий план',data:raw.common});const reviewed=review(collection,inputs);if(reviewed.errors.length)throw new Error(reviewed.errors.join('\n'));return apply(collection,reviewed);}
  function csv(collection){const rows=[['Класс','Ученик / раздел','Разворот','Окошко','Расположено','Тип изображения','Исходное имя файла','Задумка / что изменить','Место съёмки','Реквизит и подготовка','Статус','Планируемая дата','Комментарий разворота','Проверка плана']];
    const add=(plan,name,onlyCommon=false)=>plan.spreads.forEach((sp,i)=>{if(onlyCommon&&i<2)return;const active=layoutOf(sp).rects.length;sp.slots.forEach((s,j)=>{if(j>=active&&!hasContent(s))return;rows.push([plan.school,name,i+1,j+1,j<active?'Да':'Нет — вне схемы',s.use==='photo'?'Готовая фотография':'Референс / будущий кадр',s.image?.name||'',s.comment,sp.location,s.props,statuses[s.status],s.date,sp.comment,summary(plan).issues.join(' | ')]);});});
    if(collection.common){rows.push([collection.school,'Единый стиль портретов','','','','','',collection.common.portraitStyle]);add(collection.common,'Общая часть класса',true);}
    collection.students.forEach(s=>add(s.plan,fullName(s.plan)));
    const cell=v=>{let text=String(v??'');if(/^[\s]*[=+\-@]/.test(text))text="'"+text;return '"'+text.replace(/"/g,'""')+'"';};return '\ufeff'+rows.map(row=>Array.from({length:14},(_,i)=>cell(row[i])).join(';')).join('\r\n');
  }
  globalThis.VibeCollection={fold,fullName,identity,empty,review,apply,rosterNames,missing,summary,normalizeCollection,csv};
})();
