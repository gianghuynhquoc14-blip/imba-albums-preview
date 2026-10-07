'use strict';
// Продолжение прототипа «Вайб». Реальные примеры не являются выбором класса.
const archive = '/assets/archive/';
const sections = [
  {id:'personal-one', name:'Личный разворот 1', kicker:'01 / Личное', title:'Место для себя.', lead:'Первые два разворота истории — твои. Можно показать характер, увлечение или то, каким ты запомнишь школу.',
    caption:'Пример личного разворота из нашего архива. Следующий разворот — пример другого ученика из другого альбома. Нажми на фотографию, чтобы рассмотреть её.',
    examples:[{label:'Личный разворот',images:['01-008.jpg'],alt:'Личный разворот: светлый портрет и фотография у доски с кодом'}],
    pins:[{key:'personal',label:'Два разворота',x:22,y:9},{key:'idea',label:'Своя идея',x:79,y:81},{key:'selection',label:'Выбор кадров',x:24,y:88}]},
  {id:'personal-two', name:'Личный разворот 2', kicker:'02 / Личное', title:'Продолжение твоей истории.', lead:'Ещё один разворот для того, что хочется сохранить: другой образ, место или важную школьную историю.',
    caption:'Это пример другого ученика из другого альбома, а не продолжение предыдущей истории. Нажми на фотографию, чтобы рассмотреть её.',
    examples:[{label:'Личный разворот',images:['03-005.jpg'],alt:'Личный разворот: портрет на сером фоне и кадр с направленным светом'}],
    pins:[{key:'personal',label:'Наполнение',x:22,y:9},{key:'idea',label:'Вторая идея',x:79,y:81},{key:'selection',label:'Выбор кадров',x:24,y:88}]},
  {id:'teachers',name:'Учителя',kicker:'Общая история класса',title:'Те, кто был рядом.',lead:'Люди, голоса и фразы, которые останутся с вами после школы.',placeholder:'Здесь будут<br>ваши учителя.',caption:'Раздел в структуре альбома. Фотографии учителей для этого примера ещё подбираем.',pins:[{key:'teachers',label:'Кого снимаем',x:25,y:80},{key:'names',label:'Подписи',x:75,y:85}]},
  {id:'serious',name:'Серьёзная общая',kicker:'Классика / весь класс',title:'Все в одном кадре.',lead:'Один из кадров, ради которых особенно важно собраться всем. Начинаем съёмки с классики.',
    caption:'Реальный пример общей фотографии. Нажми на снимок, чтобы рассмотреть; «За кадром» покажет подготовку.',
    examples:[{label:'Общая фотография',images:['04-000.jpg'],alt:'Общая фотография класса с учителем в школьном спортзале'}],
    pins:[{key:'room',label:'Помещение и ключ',x:22,y:13},{key:'everyone',label:'Собраться всем',x:77,y:14},{key:'clothes',label:'Общий образ',x:76,y:87}]},
  {id:'portraits',name:'Портреты и цитаты',kicker:'Классика / каждый из вас',title:'Одна школа. Разный вайб.',lead:'Свет, фон и реквизит меняют настроение. Смотрим варианты и обсуждаем свой до съёмки.',
    caption:'Примеры классической съёмки из архива. Переключение знакомит с вариантами и не фиксирует выбор класса. Имена и цитаты появятся в макете.',
    examples:[{label:'Школьная атмосфера',images:['IMG_6519.jpg','IMG_6650.jpg'],alt:'Портрет у школьной доски с реквизитом'},{label:'Цвет и постановка',images:['DSC03297.jpg','DSC04810.jpg'],alt:'Постановочный портрет с реквизитом и красным освещением фона'},{label:'Личные детали',images:['DSC04192.jpg','DSC02840.jpg'],alt:'Портрет с личными предметами в школьном кабинете'}],
    pins:[{key:'style',label:'Стиль заранее',x:20,y:9},{key:'props',label:'Что принести',x:79,y:88},{key:'chalk',label:'Если нужна доска',x:23,y:88}]},
  {id:'fun',name:'Весёлая общая',kicker:'Общая история класса',title:'Теперь можно шуметь.',lead:'Общий кадр, в котором узнаётся именно ваш класс: его энергия, шутки и привычки.',placeholder:'Ваша общая<br>дурь — здесь.',caption:'Раздел в структуре альбома. Настоящий пример весёлой общей фотографии добавим следующим.',pins:[{key:'fun',label:'Общая задумка',x:25,y:81},{key:'props',label:'Реквизит',x:74,y:85}]},
  {id:'groups',name:'Классические компании',kicker:'Общая история класса',title:'Свои люди.',lead:'Небольшие компании, из которых складывается весь класс.',placeholder:'Вместе<br>вспоминать легче.',caption:'Раздел в структуре альбома. Пример классических компаний ещё подбираем.',pins:[{key:'groups',label:'Кто с кем',x:25,y:81},{key:'groupOrder',label:'Без суеты',x:74,y:85}]},
  {id:'creativeGroups',name:'Творческие компании',kicker:'Общая история класса',title:'Ваша маленькая история.',lead:'Одна компания, общая идея и кадр, который захочется объяснять даже через десять лет.',placeholder:'Идея, которую<br>вы придумали вместе.',caption:'Раздел в структуре альбома. Здесь будет реальный пример творческой компании.',pins:[{key:'groupIdea',label:'Собрать сцену',x:25,y:81},{key:'room',label:'Проверить место',x:74,y:85}]},
  {id:'memories',name:'Школьный архив',kicker:'Можно добавить в альбом',title:'То, что снимали вы.',lead:'Телефонные фотографии, школьные истории и ваши внутренние мемы.',placeholder:'Жизнь между<br>постановочными кадрами.',caption:'Дополнительный раздел: включаем, если он нужен вашему классу. Истории могут появляться и между другими разделами.',pins:[{key:'memories',label:'Что собрать',x:25,y:81},{key:'timing',label:'От каждого зависит',x:74,y:85}]}
];
const notes = {
  "personal": {
    "title": "Два разворота — твои.",
    "lead": "Это послание тебе в будущее. Сохрани свой характер, увлечения, мечты, школьные истории или любимые приколы. Соревноваться с другими не нужно.",
    "action": "Выбери то, что хочется оставить на память: творческий кадр, личные фотографии или компании с друзьями. Добавь изображения и пояснения в свои два разворота.",
    "faq": [
      [
        "Обязательно только креатив?",
        "Нет. На личных разворотах могут быть свои фотографии, компании, школьные истории и новые постановочные кадры. Наполнение выбираешь ты."
      ],
      [
        "Можно взять готовую идею?",
        "Да. Повтори пример или смешай детали: свет, цвет, место, одежду. Добавь что-то своё."
      ]
    ]
  },
  "idea": {
    "title": "Идея начинается с тебя.",
    "lead": "Образ + место + реквизит. Вспомни, что тебе нравится, о чём мечтаешь и чем запомнится школа.",
    "action": "Найди пример в архиве или интернете, загрузи его в конструктор и напиши, что повторить или изменить. Сложный свет, эффекты и необычное место нужно показать фотографу хотя бы за неделю.",
    "story": "Ночную атмосферу придумали. А кабинет солнечный, и штор нет.",
    "faq": [
      [
        "А если идей вообще нет?",
        "Даже накануне это не приговор. Принеси любимую одежду и личные предметы — начнём с них и придумаем кадр на месте. Но подготовка заранее оставит больше времени на съёмку."
      ],
      [
        "Можно оставить идею в секрете?",
        "От класса — да. Пришли задумку фотографу лично, чтобы он успел подготовить съёмку."
      ]
    ]
  },
  "selection": {
    "title": "Выбор тоже двигает альбом.",
    "lead": "После съёмки выбери кадры для личных и общих страниц. Только выбранные фотографии пойдут на ретушь и дальше в макет.",
    "action": "По присланной инструкции передай точные номера файлов для каждого раздела. Сейчас выбор кадров идёт через Google Формы.",
    "story": "«Я почти выбрал» — пока ещё не список фотографий.",
    "faq": [
      [
        "Сколько кадров выбирать?",
        "Ориентируйся на число окошек в своём плане и инструкцию по выбору."
      ],
      [
        "Можно потом заменить?",
        "Если выбор уже отправлен, напиши фотографу точные номера старого и нового кадров. Возможность замены зависит от этапа работы."
      ]
    ]
  },
  "teachers": {
    "title": "Их фишки тоже останутся с вами.",
    "lead": "Любимая фраза, общий мем, узнаваемый предмет или фирменный прикол учителя. Он тоже может оставить вам послание через фотографию.",
    "action": "Предложите задумку учителю. Составьте список преподавателей, подготовьте реквизит и договоритесь с ними о времени съёмки."
  },
  "names": {
    "title": "Проверяем каждую букву.",
    "lead": "Имя, фамилия, подпись и цитата требуют такой же внимательности, как выбор фотографии.",
    "action": "Проверь свои страницы и соберите общие исправления одним списком. Сверяйтесь с последней версией макета.",
    "story": "Опечатка в фамилии не исправится от того, что её все «вроде смотрели»."
  },
  "room": {
    "title": "Кабинет есть. А ключ?",
    "lead": "Для кадра нужно помещение, доступное на выбранную дату. Доступ к школе и ключам обеспечивает класс.",
    "action": "Заранее договоритесь с администрацией и выясните, у кого ключ. Если есть сомнения, проверьте доступ примерно за неделю; в понятной ситуации — хотя бы накануне.",
    "story": "Весь класс готов. Фотограф готов. Дверь — нет.",
    "faq": [
      [
        "А спортзал или библиотека?",
        "Договоритесь об этих помещениях отдельно. Не рассчитывайте, что нужное место окажется открытым случайно."
      ]
    ]
  },
  "everyone": {
    "title": "Общий кадр требует всех.",
    "lead": "Весь класс должен знать дату и прийти на общую фотографию.",
    "action": "Запишите места для серьёзной и весёлой общих в план альбома. Проверьте доступ, школьные события и планы одноклассников. Выберите дату, получите подтверждение и предупредите весь класс.",
    "faq": [
      [
        "Если кто-то не может?",
        "Сообщите фотографу заранее. Автоматическое добавление отсутствующего человека или досъёмку не обещаем."
      ]
    ]
  },
  "clothes": {
    "title": "Договориться об образе.",
    "lead": "Согласованная одежда помогает общей фотографии выглядеть цельно. Школьная форма — один из вариантов.",
    "action": "Выберите внешний вид класса до съёмки и запишите его в плане. Одежду и личный реквизит каждый готовит сам.",
    "story": "В кадре разные образы выглядят лучше, когда их задумали вместе, а не увидели впервые на съёмке."
  },
  "style": {
    "title": "Один класс. Единый стиль.",
    "lead": "Свет, фон и оформление классических портретов выбираем для всего класса: так раздел с именами и цитатами смотрится цельно.",
    "action": "Выберите направление и запишите его в общей карточке стиля в конструкторе. Можно предложить свою концепцию, а не только повторить пример.",
    "faq": [
      [
        "У всех должно быть одинаково?",
        "У классических портретов — единый стиль класса. Два личных разворота каждый наполняет свободно."
      ],
      [
        "Кнопка с примером уже сохраняет выбор?",
        "Нет, переключение только показывает примеры. Запиши выбранное направление в плане альбома."
      ]
    ]
  },
  "props": {
    "title": "Главная роль у реквизита.",
    "lead": "Книга, кубок, зеркало или другая личная деталь может стать основой фотографии. Важно, чтобы она приехала вместе с тобой.",
    "action": "Составь список вещей и собери их заранее. Если нужен реквизит фотографа, напиши ему до съёмки.",
    "story": "Идея приехала. Реквизит остался дома."
  },
  "chalk": {
    "title": "Меловые. Именно меловые.",
    "lead": "Если для оформления нужна доска, назначьте, кто её подготовит, и оставьте время на рисунок.",
    "action": "Подготовьте 2–3 меловых маркера под вашу задачу. Проверьте надпись на упаковке до покупки.",
    "story": "Однажды вместо меловых купили перманентные. Доску оттирали неделю.",
    "realStory": true,
    "faq": [
      [
        "Доска обязательна?",
        "Нет. Это один из вариантов оформления. Можно придумать свою обложку."
      ]
    ]
  },
  "fun": {
    "title": "Хаос тоже готовим.",
    "lead": "Весёлое общее фото может быть шумным и неожиданным. Но участники, место и нужные вещи должны быть на месте.",
    "action": "Запишите общую задумку, место и реквизит в плане. Назначьте, кто приносит нужные вещи, и предупредите класс."
  },
  "groups": {
    "title": "Свои люди. Своя задумка.",
    "lead": "Классические компании — фотографии с друзьями в рамках классической съёмки. Реквизит и приколы тоже возможны.",
    "action": "Свою идею, одежду и реквизит ребята полностью готовят сами. Организуйтесь заранее, чтобы снять задумку в выделенное время. Запишите составы и порядок групп."
  },
  "groupOrder": {
    "title": "Кто следующий?",
    "lead": "Когда составы компаний известны, меньше времени уходит на поиски людей и споры на месте.",
    "action": "Заранее составьте группы и порядок съёмки. Убедитесь, что каждый знает, когда его очередь и что нужно принести."
  },
  "groupIdea": {
    "title": "Одна идея на компанию.",
    "lead": "Творческие компании — отдельная постановка с дополнительным оборудованием и светом. Подготовка начинается до съёмки.",
    "action": "Выберите общую задумку, загрузите референс и напишите, что изменить. Укажите место, одежду и реквизит. Сложную сцену пришлите фотографу хотя бы за неделю.",
    "story": "«Я думал, это ты берёшь» — известный способ оставить сцену без реквизита."
  },
  "memories": {
    "title": "У вас уже есть архив.",
    "lead": "В телефонах остаются перемены, поездки, школьные шутки и моменты, которые фотограф просто не мог снять.",
    "action": "Отберите фотографии и истории, которые хочется сохранить вашему классу. Добавьте их в план и подпишите, что на них происходит."
  },
  "timing": {
    "title": "Срок складывается из вас.",
    "lead": "Фотографии выбраны, имена проверены, правки собраны — альбом движется дальше. Незавершённые решения задерживают следующие шаги.",
    "action": "Доведи каждую задачу до понятного результата: отправленный выбор кадров, проверенные подписи, один список правок.",
    "story": "«Сделаю завтра» у каждого своё. А альбом у класса общий."
  },
  "photobooth": {
    "title": "Фотобудка: пульт у вас.",
    "lead": "Фотограф ставит камеру, выставляет свет и композицию. Дальше вы берёте пульт и снимаете себя сами — ориентировочно по пятнадцать минут.",
    "action": "Добавьте фотобудку в пожелания к программе. Соберите друзей и придумайте, какие моменты хочется сохранить."
  }
};

// Актуальные материалы и правила владельца, 5 октября 2026.
function setExamples(id, examples, lead, caption) {
  const section=sections.find(item=>item.id===id);
  section.examples=examples.map(([label,file,alt])=>({label,images:[file],alt}));
  if(lead)section.lead=lead;
  section.caption=caption||'Настоящие примеры из разных альбомов. Это варианты: выбирайте своё наполнение и записывайте задумки в план альбома.';
}
setExamples('teachers', [['Пример 1','teachers-17.jpg','Разворот с классным руководителем, посланием и портретами учителей'],['Пример 2','teachers-13.jpg','Учителя с узнаваемыми предметами, жестами и посланием классу']], 'Их фразы, предметы и фирменные приколы тоже останутся с вами. Учителя могут оставить классу своё послание.');
setExamples('fun', [['Спортзал','fun-30.jpg','Весёлая общая фотография класса с личными предметами в спортзале'],['Коридор','fun-engineering-a.jpg','Весёлая общая фотография в школьном коридоре'],['Другой класс','fun-engineering-b.jpg','Весёлая общая фотография на гимнастических блоках'],['Вне школы','winter-30.jpg','Общая фотография на зимнем закате']], 'Весь класс, ваши приколы и заранее выбранное место. Общая вне школы — дополнительная возможность по согласованию.');
setExamples('groups', [['Разворот 1','classic-engineering-07.jpg','Разворот классических компаний на лестнице и в актовом зале'],['Разворот 2','classic-engineering-08.jpg','Классические компании с учителем и друзьями'],['Разворот 3','classic-engineering-09.jpg','Классические компании в коридоре и спортзале'],['Разворот 4','classic-30-spread.jpg','Классические компании с гитарами, в школьных помещениях и на снегу'],['Трое друзей','classic-trio.jpg','Классическая компания из трёх человек в спортзале'],['С приколом','classic-basketball.jpg','Классическая компания на баскетбольной площадке']], 'Можно и спокойно, и с приколом. Свою задумку ребята готовят самостоятельно и организованно, чтобы уложиться во время съёмки.');
setExamples('creativeGroups', [['Самовар и телефоны','creative-30b-16.jpg','Творческая компания с самоваром, платками и телефонами'],['Баня в спортзале','creative-13a-12.jpg','Творческая компания в халатах на спортивных матах'],['Свечи и гирлянды','creative-13a-09.jpg','Творческая компания со свечами и гирляндами'],['Свет и сюжет','creative-light.jpg','Творческий разворот с кругом света, лампами и телефоном'],['Ремонт у рояля','creative-30b-12.jpg','Творческая компания с инструментами и роялем'],['Химия и книги','creative-30a-11.jpg','Творческий разворот с эффектами и сценой чтения'],['У школы','creative-30a-14.jpg','Постановочная общая фотография у школы с автомобилями'],['Карточная сцена','creative-30a-12.jpg','Творческие компании с карточной сценой'],['У пианино','creative-30a-13.jpg','Творческие фотографии на лестнице и у пианино'],['Чёрные пальто','creative-13a-10.jpg','Творческий разворот в чёрных пальто у школы'],['За столом','creative-30b-15.jpg','Творческая компания за столом с картами'],['Красное на снегу','creative-30b-14.jpg','Постановочный кадр на красных креслах в снегу'],['Школьный хоррор','creative-30b-13.jpg','Постановочные школьные сцены с театральным гримом']], 'Творческие компании — отдельная постановка с дополнительным светом и оборудованием. Идею, место и реквизит готовим заранее.');
const portraitSection=sections.find(item=>item.id==='portraits');
portraitSection.title='Один класс. Единый стиль.';
portraitSection.lead='Выберите общее направление для портретов всего класса: свет, фон и оформление. Имена, фамилии и цитаты войдут в макет.';
portraitSection.caption='Здесь показаны разные проекты. В вашем классе у классических портретов будет единый выбранный стиль. Собственную концепцию тоже можно предложить.';
const memorySection=sections.find(item=>item.id==='memories');
memorySection.placeholder='Ваши истории и фото';
memorySection.caption='Возможность для вашего альбома. Чужие личные истории здесь не показываем. Можно добавить телефонные снимки, мемы и кадры фотобудки.';
memorySection.pins.push({key:'photobooth',label:'Фотобудка',x:50,y:35});

// Понятные разделы и реальные примеры фотобудки.
for(const [id,name,lead] of [
['personal-one','Личный разворот 1','Начало альбома — ваша личная история. Покажите характер, увлечения и свои идеи.'],
['personal-two','Личный разворот 2','Вторая личная страница: продолжение вашей идеи или другой образ. Здесь показан пример другого человека.'],
['teachers','Учителя','Портреты учителей и послание классного руководителя. Заранее согласуйте, кого снимаем, и проверьте подписи.'],
['serious','Общая серьёзная','Весь класс в одном кадре. Договоритесь об одежде, месте и участии классного руководителя.'],
['portraits','Портреты всех с цитатами','Портрет каждого ученика, имя и цитата. Свет, фон и оформление выбираем для всего класса.'],
['groups','Компании','Класс делится на компании без повторяющихся участников. Заранее подготовьте составы, места и очередь, чтобы каждому уделить время.'],
['creativeGroups','Творческие компании','Компания друзей и общая задумка. Обсудите её с фотографом: он подскажет, что можно реализовать и какие нужны подготовка и реквизит.'],
['fun','Общая весёлая','Весь класс, ваши шутки и реквизит. Заранее придумайте детали и взаимодействие в общем кадре.'],
['memories','Фотобудка и ваши мемы','В фотобудке все снимаются в одной подготовленной локации. Это режим, в котором ребята сами себя фотографируют: фотограф настраивает камеру и свет, а вы снимаете с пульта. Можно также прислать свои мемные фотографии — из них соберём этот разворот.']
]){const section=sections.find(x=>x.id===id);section.name=name;section.title=name;section.lead=lead;}
notes.photobooth.lead=sections.find(x=>x.id==='memories').lead;
notes.photobooth.action='Заранее выберите фотобудку или подборку своих снимков. Обсудите с фотографом место, реквизит и наполнение разворота.';
notes.memories.lead=notes.photobooth.lead;
notes.memories.action='Соберите любимые школьные снимки и мемы и передайте их для макета. Фотограф подскажет, какие изображения подходят для печати.';
memorySection.examples=[{"label": "Красный свет — серьёзные несерьёзные", "images": ["photobooth/DSC09164.jpg", "photobooth/DSC09173.jpg", "photobooth/DSC09190.jpg", "photobooth/DSC09199.jpg", "photobooth/DSC09216.jpg", "photobooth/DSC09258.jpg"], "alt": "Красный свет — серьёзные несерьёзные — фотобудка в одной локации"}, {"label": "У доски — свои правила", "images": ["photobooth/DSC02694.jpg", "photobooth/DSC02714.jpg", "photobooth/DSC02723.jpg", "photobooth/DSC02733.jpg", "photobooth/DSC02786.jpg", "photobooth/DSC02810.jpg"], "alt": "У доски — свои правила — фотобудка в одной локации"}, {"label": "Книги, скелет и немного магии", "images": ["photobooth/DSC01471.jpg", "photobooth/DSC01515.jpg", "photobooth/DSC01525.jpg", "photobooth/DSC01559.jpg", "photobooth/DSC01577.jpg"], "alt": "Книги, скелет и немного магии — фотобудка в одной локации"}, {"label": "Холст один — характеры разные", "images": ["photobooth/DSC03387.jpg", "photobooth/DSC03392.jpg", "photobooth/DSC03418.jpg", "photobooth/DSC03447.jpg", "photobooth/DSC03452.jpg"], "alt": "Холст один — характеры разные — фотобудка в одной локации"}];
memorySection.caption='Каждая подборка — отдельная локация одной фотобудки. Камера и свет остаются на месте, а ребята меняют позы, компании и реквизит. Здесь примеры кадров, а не готовый печатный макет.';

setExamples('portraits',[["Пример 1", "vibe-portraits-quotes/06-000.jpg", "Портреты Вайба с именами, цитатами и рисунками"], ["Пример 2", "vibe-portraits-quotes/07-000.jpg", "Портреты Вайба с именами, цитатами и рисунками"], ["Пример 3", "vibe-portraits-quotes/08-000.jpg", "Портреты Вайба с именами, цитатами и рисунками"], ["Пример 4", "vibe-portraits-quotes/09-000.jpg", "Портреты Вайба с именами, цитатами и рисунками"]],'Два человека на странице, четыре на развороте. Портреты чередуются с именами, цитатами и рисунками. Можно предложить своё оформление.');
memorySection.examples.unshift({label:'Готовый макет фотобудки',images:['photobooth-layout/04-000.jpg'],alt:'Готовый макет фотобудки: девять фотографий в одной локации с рисунками'});
// Портретные развороты с цветными рисунками.
sections.find(s=>s.id==='portraits').examples.push(...[{"label": "Цветные рисунки · 1", "images": ["vibe-portraits-colour/05-000.jpg"], "alt": "Готовый портретный разворот с цитатами и цветными рисунками"}, {"label": "Цветные рисунки · 2", "images": ["vibe-portraits-colour/06-000.jpg"], "alt": "Готовый портретный разворот с цитатами и цветными рисунками"}, {"label": "Цветные рисунки · 3", "images": ["vibe-portraits-colour/07-000.jpg"], "alt": "Готовый портретный разворот с цитатами и цветными рисунками"}, {"label": "Цветные рисунки · 4", "images": ["vibe-portraits-colour/08-000.jpg"], "alt": "Готовый портретный разворот с цитатами и цветными рисунками"}]);
const coverExamples=[
  {key:'eye',file:'00-008.jpg',label:'Глаз ученика',alt:'Полная развёртка чёрной обложки с настоящим глазом ученика',description:'На обложке — настоящий глаз ученика. Дальше — то, каким он запомнит школу.',focalX:.74},
  {key:'school',file:'00-000.jpg',label:'Школа как иллюстрация',alt:'Полная развёртка рисованной обложки со школой',description:'Знакомая школа превращается в иллюстрацию. Внутри — люди и истории, которые её оживляют.',focalX:.74},
  {key:'board',file:'cover-chalkboard-1-11a.jpg',label:'Доска вашего класса',alt:'Полная развёртка обложки из школьной доски, разрисованной учениками маркерами',description:'Ребята разрисовали школьную доску маркерами: свои фразы, рисунки и внутренние приколы стали обложкой.',focalX:.74}
];
const $ = id => document.getElementById(id);
const cover = $('coverScene'), shell = $('albumShell'), book = $('bookScene');
const start = $('startButton'), stageDialog = $('stageDialog'), contentsDialog = $('contentsDialog');
const photoDialog = $('photoDialog');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const preparationSteps=[
  {id:'style',text:'Обсудить стиль с фотографом: свет, фон, одежду и реквизит.'},
  {id:'date',text:'Выбрать дату, получить подтверждение и обеспечить доступ к школе.'},
  {id:'room',text:'Проверить кабинет, специальные помещения и ключи.'},
  {id:'class',text:'Предупредить весь класс и договориться о внешнем виде.'},
  {id:'props',text:'Собрать реквизит и подготовить доску, если она нужна.'}
];
const preparationStorageKey='vibe-preparation-v1';
let preparationChecked=new Set();
try{const saved=JSON.parse(localStorage.getItem(preparationStorageKey)||'[]');if(Array.isArray(saved))preparationChecked=new Set(saved.filter(id=>preparationSteps.some(step=>step.id===id)));}catch{/* Памятка работает и при недоступном хранилище. */}
let currentSection = 0, currentExample = 0, transitioning = false;
let stageOpener = null, contentsOpener = null, photoOpener = null;
let photoGallery = [], photoIndex = 0;
function el(tag, className, text) { const node = document.createElement(tag); if(className) node.className = className; if(text) node.textContent = text; return node; }
function toggleNotes(show) {
  $('annotationLayer').hidden = !show;
  $('notesIndex').hidden = !show;
  $('notesToggle').setAttribute('aria-expanded', String(show));
  $('notesToggle').replaceChildren(el('span','',show ? '−' : '＋'),document.createTextNode(show ? 'Скрыть пометки' : 'За кадром'));
}
function photoLink(filename, alt) {
  const a = el('a','spread-image-link'); a.href = archive + filename; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label','Рассмотреть: ' + alt);
  const image = el('img','spread-image'); image.src = archive + filename; image.alt = alt; image.decoding = 'async';
  a.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();openPhoto(filename,a);});
  a.setAttribute('aria-haspopup','dialog');
  a.append(image); return a;
}
function renderSpread(focus = false) {
  const section = sections[currentSection];
  $('sectionNumber').textContent = section.kicker;
  $('mapTitle').textContent = section.title;
  $('spreadLead').textContent = section.lead;
  $('spreadCaption').dataset.exampleType=['memories','creativeGroups'].includes(section.id)?'photos':'spread';
  $('findIdeaPrompt').hidden=!section.id.startsWith('personal');
  $('portraitArchive').hidden=section.id!=='portraits';
  $('generalArchive').hidden=!['serious','fun'].includes(section.id);
  $('spreadCaption').textContent = (section.id==='memories'&&currentExample===0?'Готовый макет фотобудки: пример расположения фотографий и рисунков. ':['memories','creativeGroups'].includes(section.id)?'Идеи для фотографий: отдельные кадры показывают позы, свет и реквизит, а не готовую компоновку разворота. ':(['serious','fun'].includes(section.id)?'Общая фотография занимает весь разворот. ':'Пример оформления разворота. '))+section.caption; $('captionDetails').open=false;
  const media = $('spreadMedia'); media.replaceChildren();
  if(section.examples) {
    const example = section.examples[currentExample];
    if(example.images.length === 1) media.append(photoLink(example.images[0],example.alt));
    else { const pair = el('div',section.id==='memories'?'photobooth-grid':'portrait-pair'); example.images.forEach((image,index)=>pair.append(photoLink(image,example.alt+' · пример '+(index+1)))); media.append(pair); }
  } else {
    const placeholder = el('div','placeholder-spread');
    const left = el('div'); left.append(el('span','placeholder-numeral',String(currentSection+1).padStart(2,'0')),el('h3','',section.name),el('small','','Место в вашем альбоме'));
    const right = el('div'); const frame = el('div','placeholder-photo',section.placeholder.replace('<br>',' ')); right.append(frame,el('small','','Фото для примера ещё подбираем'));
    placeholder.append(left,right);media.append(placeholder);
  }
  const examples = $('exampleControls');examples.replaceChildren();
  if(section.examples?.length > 1) section.examples.forEach((example,index)=> {
    const button = el('button','',example.label);button.type='button';button.setAttribute('aria-pressed',String(index===currentExample));
    button.addEventListener('click',()=>{currentExample=index;renderSpread();$('exampleControls').children[index].focus({preventScroll:true});});examples.append(button);
  });
  const layer=$('annotationLayer');layer.replaceChildren();
  // Короткие рисованные связи появляются только в режиме «За кадром».
  if(section.examples) {
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('class','annotation-arrow');svg.setAttribute('aria-hidden','true');
    const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d','M23 14 Q28 18 31 25 M29 22 L31 25 L32 21 M77 82 Q70 75 65 74 M68 73 L65 74 L67 77');svg.append(path);layer.append(svg);
  }
  section.pins.forEach((pin,index)=>{const button=el('button','annotation-pin');button.type='button';button.style.setProperty('--x',pin.x+'%');button.style.setProperty('--y',pin.y+'%');button.setAttribute('aria-label',pin.label);button.setAttribute('aria-haspopup','dialog');button.append(el('span','pin-number',String(index+1).padStart(2,'0')),el('span','pin-label',pin.label));button.addEventListener('click',()=>openNote(pin.key,button));layer.append(button);});
  const noteIndex=$('notesIndex');noteIndex.replaceChildren();
  section.pins.forEach((pin,index)=>{const button=el('button','note-index-entry');button.type='button';button.setAttribute('aria-haspopup','dialog');button.append(el('span','',String(index+1).padStart(2,'0')),document.createTextNode(pin.label),el('span','note-index-arrow','↗'));button.addEventListener('click',()=>openNote(pin.key,button));noteIndex.append(button);});
  toggleNotes(false);
  $('pageCounter').textContent = String(currentSection+1).padStart(2,'0')+' / '+String(sections.length).padStart(2,'0');
  $('currentChapterName').textContent=section.name;
  $('previousSpread').disabled = currentSection===0;$('nextSpread').disabled=currentSection===sections.length-1;
  document.querySelectorAll('.contents-entry').forEach((button,index)=>button.setAttribute('aria-current',String(index===currentSection)));
  document.querySelectorAll('.chapter-stop').forEach((button,index)=>button.setAttribute('aria-current',String(index===currentSection)));
  if(focus) $('mapTitle').focus({preventScroll:true});
}
function goToSection(index) {
  if(index<0 || index>=sections.length || transitioning)return;
  if(index===currentSection)return;
  const direction=index>currentSection?1:-1;
  currentSection=index;currentExample=0;renderSpread(true);animateSpread(direction);
  $('bookScene').scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'start'});
}
function animateSpread(direction) {
  if(reducedMotion.matches)return;
  const frame=$('spreadFrame');frame.getAnimations().forEach(animation=>animation.cancel());
  frame.animate([{opacity:.35,transform:'perspective(1900px) rotateY('+(-direction*5)+'deg) translateX('+(direction*14)+'px)'},{opacity:1,transform:'perspective(1900px) rotateY(0deg) translateX(0px)'}],{duration:520,easing:'cubic-bezier(.2,.65,.2,1)'});
  const sheen=$('pageSheen');sheen.getAnimations().forEach(animation=>animation.cancel());
  sheen.animate([{opacity:0,transform:'translateX('+(-direction*100)+'%)'},{opacity:.45,offset:.25},{opacity:0,transform:'translateX('+(direction*100)+'%)'}],{duration:650,easing:'ease-out'});
}
function openBook() {
  if(transitioning || !book.hidden)return;
  transitioning=true;start.disabled=true;
  $('coverInspect').disabled=true;
  document.querySelectorAll('[data-cover]').forEach(node=>{if(node.tagName==='BUTTON')node.disabled=true;});
  shell.classList.add('is-opening');
  setTimeout(()=>{cover.hidden=true;book.hidden=false;renderSpread();window.scrollTo({top:0,behavior:'instant'});requestAnimationFrame(()=>book.classList.add('is-visible'));$('mapTitle').focus({preventScroll:true});start.disabled=false;$('coverInspect').disabled=false;document.querySelectorAll('button[data-cover]').forEach(node=>node.disabled=false);transitioning=false;},reducedMotion.matches?0:800);
}
function closeBook() {
  if(transitioning || book.hidden)return;
  transitioning=true;$('closeBook').disabled=true;book.classList.remove('is-visible');
  setTimeout(()=>{book.hidden=true;cover.hidden=false;shell.classList.remove('is-opening');window.scrollTo({top:0,behavior:'instant'});start.focus({preventScroll:true});$('closeBook').disabled=false;transitioning=false;},reducedMotion.matches?0:260);
}
function modalSetup(dialog, opener) {
  if(dialog.open)return;
  if(dialog===stageDialog)stageOpener=opener;else if(dialog===contentsDialog)contentsOpener=opener;else photoOpener=opener;
  dialog.showModal();dialog.scrollTop=0;document.body.classList.add('dialog-open');
}
function openNote(key,opener) {
  const note=notes[key];if(!note || stageDialog.open)return;
  $('dialogStep').textContent='За кадром / '+sections[currentSection].name;
  $('dialogTitle').textContent=note.title;$('dialogLead').textContent=note.lead;
  const body=$('dialogBody');body.replaceChildren();
  const action=el('p','dialog-action');action.append(el('b','','Что сделать'),document.createTextNode(note.action));body.append(action);
  if(key==='chalk'){const frame=el('iframe','marker-video marker-youtube');frame.src='https://www.youtube-nocookie.com/embed/ixy_SEfbJ40';frame.title='Реальная история про перманентные маркеры';frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';body.append(frame);const original=el('a','dialog-link','Открыть видео на YouTube');original.href='https://youtu.be/ixy_SEfbJ40';original.target='_blank';original.rel='noopener noreferrer';body.append(original);} 
  if(note.story){const detail=el('details');detail.append(el('summary','',note.realStory?'История из наших съёмок':'Пример из практики'),el('p','',note.story));body.append(detail);}
  for(const [question,answer] of note.faq||[]){const detail=el('details');detail.append(el('summary','',question),el('p','',answer));body.append(detail);}
  if(key==='personal'||key==='idea'){const button=el('button','dialog-link','Найти идею: видео и архив фотографа');button.type='button';button.onclick=()=>{stageDialog.close();VibeIdeas.open($('findIdea'));};body.append(button);}
  modalSetup(stageDialog,opener);
}
function openPhoto(filename,opener) {
  if(photoDialog.open)return;
  const section=sections[currentSection];
  photoGallery=(section.examples||[]).flatMap(example=>example.images.map((file,index)=>({file,label:example.label,alt:example.alt+(example.images.length>1?' · пример '+(index+1):'')})));
  photoIndex=photoGallery.findIndex(photo=>photo.file===filename);if(photoIndex<0)return;
  $('photoChapter').textContent=section.name+' / из нашего архива';renderPhoto();modalSetup(photoDialog,opener);
}
function openCoverPhoto(opener) {
  if(photoDialog.open||transitioning)return;
  photoGallery=coverExamples.map(example=>({...example}));
  photoIndex=Math.max(0,coverExamples.findIndex(example=>example.key===shell.dataset.cover));
  $('photoChapter').textContent='Реальные обложки / полная развёртка';renderPhoto();modalSetup(photoDialog,opener);
}
function renderPhoto() {
  const photo=photoGallery[photoIndex];if(!photo)return;
  const image=$('photoImage');photoDialog.dataset.loading='true';
  image.src=archive+photo.file;image.alt=photo.alt;
  $('photoTitle').textContent=photo.label;$('photoOriginal').href=image.src;
  $('photoCounter').textContent=String(photoIndex+1).padStart(2,'0')+' / '+String(photoGallery.length).padStart(2,'0');
  $('photoPrevious').disabled=photoIndex===0;$('photoNext').disabled=photoIndex===photoGallery.length-1;
  setPhotoZoom(false);
  if(image.complete)photoDialog.dataset.loading='false';
}
function changePhoto(direction) {
  const next=photoIndex+direction;if(next<0||next>=photoGallery.length)return;
  photoIndex=next;renderPhoto();
}
function setPhotoZoom(zoom) {
  $('photoViewport').classList.toggle('is-zoomed',zoom);
  $('photoImage').style.width=zoom?Math.max($('photoViewport').clientWidth,Math.min($('photoImage').naturalWidth||1600,$('photoViewport').clientWidth*2.5))+'px':'';
  $('photoZoom').setAttribute('aria-pressed',String(zoom));
  $('photoZoom').textContent=zoom?'Целиком −':'Приблизить ＋';
  $('photoViewport').scrollTop=0;
  $('photoViewport').scrollLeft=zoom?Math.max(0,$('photoImage').clientWidth*(photoGallery[photoIndex]?.focalX||.5)-$('photoViewport').clientWidth/2):0;
}
function openPreparation(opener) {
  if(stageDialog.open)return;
  $('dialogStep').textContent='Первый съёмочный этап';$('dialogTitle').textContent='Начинаем с классики.';
  $('dialogLead').textContent='Знакомимся, снимаем портреты и общие фотографии. Это понятный старт перед более сложными задумками.';
  const body=$('dialogBody');body.replaceChildren();
  const progress=el('div','preparation-progress');const count=el('span');const meter=el('progress');meter.max=preparationSteps.length;meter.setAttribute('aria-label','Отмеченные пункты личной памятки');progress.append(count,meter);body.append(progress);
  const list=el('ol','dialog-checklist interactive-checklist');
  const reset=el('button','preparation-reset','Снять отметки');reset.type='button';
  function update(){count.textContent='Моя памятка / '+preparationChecked.size+' из '+preparationSteps.length;meter.value=preparationChecked.size;reset.disabled=preparationChecked.size===0;try{localStorage.setItem(preparationStorageKey,JSON.stringify([...preparationChecked]));}catch{}}
  preparationSteps.forEach(step=>{const item=el('li');const label=el('label');const check=el('input');check.type='checkbox';check.checked=preparationChecked.has(step.id);check.addEventListener('change',()=>{if(check.checked)preparationChecked.add(step.id);else preparationChecked.delete(step.id);update();});label.append(check,el('span','',step.text));item.append(label);list.append(item);});body.append(list);
  reset.addEventListener('click',()=>{preparationChecked.clear();list.querySelectorAll('input').forEach(input=>{input.checked=false;});update();list.querySelector('input').focus({preventScroll:true});});
  const footnote=el('div','preparation-footnote');footnote.append(el('span','','Личная памятка на этом устройстве.'),reset);body.append(footnote);update();
  const styleButton=el('button','dialog-link','Посмотреть варианты портретов ↗');styleButton.type='button';styleButton.addEventListener('click',()=>{stageOpener=null;stageDialog.close();goToSection(sections.findIndex(section=>section.id==='portraits'));});body.append(styleButton);
  const timing=el('details');timing.append(el('summary','','Почему срок зависит от каждого?'),el('p','',notes.timing.lead+' '+notes.timing.action));body.append(timing);
  modalSetup(stageDialog,opener);
}
start.addEventListener('click',openBook);$('closeBook').addEventListener('click',closeBook);
$('previousSpread').addEventListener('click',()=>goToSection(currentSection-1));$('nextSpread').addEventListener('click',()=>goToSection(currentSection+1));
$('notesToggle').addEventListener('click',()=>toggleNotes($('annotationLayer').hidden));
$('prepareButton').addEventListener('click',event=>openPreparation(event.currentTarget));
$('dialogClose').addEventListener('click',()=>stageDialog.close());$('contentsClose').addEventListener('click',()=>contentsDialog.close());
$('contentsButton').addEventListener('click',event=>modalSetup(contentsDialog,event.currentTarget));
for(const dialog of [stageDialog,contentsDialog,photoDialog]) {
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
  dialog.addEventListener('close',()=>{dialog.querySelectorAll('video').forEach(video=>video.pause());dialog.querySelectorAll('iframe').forEach(frame=>frame.remove());if(!stageDialog.open&&!contentsDialog.open&&!photoDialog.open)document.body.classList.remove('dialog-open');const opener=dialog===stageDialog?stageOpener:dialog===contentsDialog?contentsOpener:photoOpener;if(opener?.isConnected)opener.focus({preventScroll:true});});
}
sections.forEach((section,index)=>{const button=el('button','chapter-stop');button.type='button';button.title=section.name;button.setAttribute('aria-label',String(index+1).padStart(2,'0')+' / '+section.name);button.append(el('span'));button.addEventListener('click',()=>goToSection(index));$('chapterProgress').append(button);});
sections.forEach((section,index)=>{const button=el('button','contents-entry');button.type='button';button.setAttribute('aria-current',String(index===0));const label=el('span');label.append(el('b','',String(index+1).padStart(2,'0')),document.createTextNode(section.name));button.append(label,el('small','',section.examples?'Смотреть ↗':'Фото в подборе'));button.addEventListener('click',()=>{contentsOpener=null;contentsDialog.close();goToSection(index);});$('contentsList').append(button);});
document.querySelectorAll('button[data-cover]').forEach(button=>button.addEventListener('click',()=>{
  if(transitioning)return;const example=coverExamples.find(item=>item.key===button.dataset.cover);if(!example)return;shell.dataset.cover=example.key;
  $('coverImage').src=archive+example.file;$('coverImage').alt=example.alt;
  $('coverDescription').textContent=example.description;
  document.querySelectorAll('button[data-cover]').forEach(option=>option.setAttribute('aria-pressed',String(option===button)));
}));
// Горизонтальные жесты не заменяют обычные кнопки и не блокируют прокрутку.
let touchOrigin=null;
$('spreadFrame').addEventListener('touchstart',event=>{touchOrigin=event.touches.length===1?{x:event.touches[0].clientX,y:event.touches[0].clientY}:null;},{passive:true});
$('spreadFrame').addEventListener('touchend',event=>{if(!touchOrigin||!event.changedTouches[0])return;const dx=event.changedTouches[0].clientX-touchOrigin.x,dy=event.changedTouches[0].clientY-touchOrigin.y;touchOrigin=null;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*2)goToSection(currentSection+(dx<0?1:-1));},{passive:true});
$('spreadFrame').addEventListener('touchcancel',()=>{touchOrigin=null;},{passive:true});
$('photoClose').addEventListener('click',()=>photoDialog.close());
$('coverInspect').addEventListener('click',event=>openCoverPhoto(event.currentTarget));
$('photoPrevious').addEventListener('click',()=>changePhoto(-1));$('photoNext').addEventListener('click',()=>changePhoto(1));
$('photoZoom').addEventListener('click',()=>setPhotoZoom(!$('photoViewport').classList.contains('is-zoomed')));
$('photoImage').addEventListener('load',()=>{photoDialog.dataset.loading='false';});
document.addEventListener('keydown',event=>{
  const target=event.target instanceof Element?event.target:null;
  if(event.defaultPrevented||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||target?.closest('input,textarea,select,[contenteditable=true]'))return;
  if(photoDialog.open){if(event.key==='ArrowLeft'){event.preventDefault();changePhoto(-1);}else if(event.key==='ArrowRight'){event.preventDefault();changePhoto(1);}return;}
  if(book.hidden||transitioning||stageDialog.open||contentsDialog.open||target?.closest('.example-controls'))return;
  if(event.key==='ArrowLeft'){event.preventDefault();goToSection(currentSection-1);}else if(event.key==='ArrowRight'){event.preventDefault();goToSection(currentSection+1);}
});
renderSpread();
start.disabled=false;$('coverInspect').disabled=false;
document.querySelectorAll('button[data-cover]').forEach(button=>{button.disabled=false;});

if(location.hash==='#photobooth'){currentSection=sections.findIndex(s=>s.id==='memories');currentExample=0;openBook();}
