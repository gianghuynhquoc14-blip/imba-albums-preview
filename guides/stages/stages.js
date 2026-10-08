'use strict';
const album=new URLSearchParams(location.search).get('album');
if(album==='easy'||album==='vibe'){
 const name=album==='easy'?'Изи':'Вайб';document.querySelector('h1').textContent='Этапы работы · '+name;
 const link=document.getElementById('stagePreparationLink');
 document.getElementById('stage-1').remove();document.querySelectorAll('.tariff-card .eyebrow').forEach((label,i)=>label.textContent='Этап '+(i+1));if(album==='easy'){}
 else {link.href='/guides/vibe/#prepare';link.textContent='Подготовка к Вайбу';}
 document.querySelectorAll('.tariff-card a[href="/guides/vibe/"]').forEach(a=>{if(a!==link){a.href='/guides/'+album+'/';a.textContent='Посмотреть примеры '+name;}});
}

if(album==='vibe'){
 const grid=document.querySelector('.tariff-grid');
 const steps=[
 ['Собираем общий план класса','Альбом уже выбран. Определяем порядок и наполнение общих разворотов; два личных остаются за каждым учеником. Один организатор собирает решения класса.','Что выбрать заранее?','Учителя: только классный руководитель и пожелания или также предметники и директор. Стандартные компании или фотобудка. Творческим компаниям — по странице; дополнительные локации и свои разделы обсуждаем с фотографом.','/guides/vibe/builder.html','Собрать общий план'],
 ['Готовимся к съёмкам','Для каждого съёмочного дня согласуем дату, школьные помещения и ключи, одежду, реквизит и очередь. У сложных идей подготовка начинается заранее.','Как распределить подготовку?','Ребята готовят свои вещи и договариваются о доступе. Фотограф помогает обсудить задумку; нужный свет, оборудование и реквизит согласуем по плану. Накануне организатор собирает напоминания одним сообщением.','/guides/vibe/#prepare','Подготовка к Вайбу'],
 ['Снимаем школьную классику','Общие фотографии, портреты каждого и стандартные компании либо согласованная фотобудка. Основную программу выполняем для всех справедливо.','Что важно для классики?','Единый стиль портретов и одежды, готовая доска, отдельный кабинет ожидания и заранее составленная очередь. В основных компаниях участники не повторяются. Дополнительные сочетания — если остаётся время.','/guides/vibe/','Посмотреть примеры'],
 ['Снимаем творческие компании и личные идеи','Готовим задумки для компаний и индивидуальных кадров. Очерёдность и время согласуем так, чтобы каждый получил внимание.','Как подготовить свою задумку?','Покажите фотографу идею, локацию и реквизит заранее; сложную сцену — хотя бы за неделю. Планируем съёмку по готовности участников. В Вайбе предусмотрены три съёмки; распределение программы по дням согласуется, отдельный дополнительный день автоматически не обещается.','/guides/vibe/','Идеи и примеры'],
 ['Выбираем фотографии и подписи','После съёмок выбираем кадры для своих и общих страниц. Собираем имена, фамилии, цитаты и пожелания к оформлению.','Как передать выбор?','Ответственный собирает согласованные решения без повторяющихся сообщений и передаёт фотографу. Если цитата придумана до съёмки, можно заранее обыграть её в кадре.',null,null],
 ['Ретушь и макет','Обрабатываем выбранные фотографии и собираем страницы по согласованному наполнению.','Что написать заранее?','Пожелания по обработке и оформлению. Базовая ретушь сохраняет естественную внешность и убирает временные недостатки; сложные изменения обсуждаются отдельно.',null,null],
 ['Проверяем и отправляем в печать','Просматриваем весь макет: обложку, порядок страниц, фотографии, имена и цитаты. Собираем правки одним списком и подтверждаем результат.','Что означает подтверждение?','После исправлений и вашего согласования макет отправляется в печать. Проверяйте подписи внимательно, пока их можно поправить.',null,null]
 ];
 grid.replaceChildren();steps.forEach(([title,lead,q,a,url,label],i)=>{const card=document.createElement('article');card.className='tariff-card';const badge=document.createElement('span');badge.className='eyebrow';badge.textContent='Этап '+(i+1);const heading=document.createElement('h2');heading.textContent=title;const text=document.createElement('p');text.textContent=lead;const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent=q;const answer=document.createElement('p');answer.textContent=a;details.append(summary,answer);card.append(badge,heading,text,details);if(url){const box=document.createElement('div');box.className='hero-actions';const link=document.createElement('a');link.className='secondary-link';link.href=url;link.textContent=label;box.append(link);card.append(box);}grid.append(card);});
}
