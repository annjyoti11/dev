/* Zenith app UI exploration. Demo-only data; no backend, sensors or analytics. */
(function(){
'use strict';
const ICONS={
 home:'<path d="m3 11 9-7 9 7v10h-7v-7h-4v7H3z"/>',
 training:'<path d="M5 5v14M19 5v14M2 8h6v8H2m14-8h6v8h-6M8 12h8"/>',
 nutrition:'<path d="M4 3v8c0 3 3 4 4 0V3M6 3v18m11-18v18m0-18c5 2 4 8 0 10"/>',
 progress:'<path d="M4 20v-8h4v8m4 0V4h4v16m4 0v-8h3v8"/>',
 profile:'<circle cx="12" cy="7" r="4"/><path d="M4 21c0-8 16-8 16 0"/>',
 steps:'<path d="M3 5c1 5 3 8 9 10 3 1 6 2 9 1v3c-3 2-7 2-11 1C5 19 3 16 3 12V5Z"/><path d="m9 10 2-2m1 4 2-2"/>',
 water:'<path d="M12 2s-7 8-7 13a7 7 0 0 0 14 0C19 10 12 2 12 2z"/>',
 meals:'<path d="M4 3v8c0 3 3 4 4 0V3m-2 0v18m11-18v18m0-18c5 2 4 8 0 10"/>',
 walk:'<circle cx="14" cy="4" r="2"/><path d="m11 8-3 4 4 3 3 6m-4-13 4 4 4 1m-9 3-6 4"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
 check:'<path d="m4 12 5 5L20 6"/>',
 back:'<path d="m15 18-6-6 6-6"/>',
 arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
 chevron:'<path d="m9 18 6-6-6-6"/>',
 moon:'<path d="M20 15A8 8 0 0 1 9 4a8 8 0 1 0 11 11Z"/>',
 bar:'<path d="M5 20V13m5 7V9m5 11V4m5 16V11"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 10v6m0-10h.01"/>',
 shield:'<path d="m12 3 8 4v5c0 5-4 8-8 10-4-2-8-5-8-10V7z"/><path d="m9 12 2 2 4-4"/>',
 spark:'<path d="m12 3 2 7 7 2-7 2-2 7-2-7-7-2 7-2z"/>'
};
function icon(name){return '<span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24">'+(ICONS[name]||ICONS.info)+'</svg></span>';}
const urls={home:'index.html',training:'training.html',nutrition:'nutrition.html',progress:'progress.html',profile:'profile.html'};
const navLabels={home:'Home',training:'Training',nutrition:'Nutrition',progress:'Progress',profile:'Profile'};
function nav(active){return '<nav class="bottom-nav" aria-label="App preview navigation">'+Object.keys(urls).map(function(key){return '<a href="'+urls[key]+'" '+(key===active?'class="current" aria-current="page"':'')+'>'+icon(key)+'<span>'+navLabels[key]+'</span><span class="mark"></span></a>';}).join('')+'</nav>';}
function logo(){return '<img src="../assets/zenith-symbol-white.svg" class="brand-logo" alt="Zenith Fitness Hub Z symbol">';}
function shell(content,active){document.getElementById('app').innerHTML='<div class="app"><div class="main">'+content+'</div>'+nav(active)+'</div>';}
function subhead(title,link){return '<header class="subheader"><a class="back" href="'+(link||'index.html')+'" aria-label="Back">'+icon('back')+'</a><span class="heading">'+title+'</span></header>';}
const STORAGE='zenith_app_preview_demo_1';
function read(){try{let value=JSON.parse(sessionStorage.getItem(STORAGE)||'{}');return {dinner:!!value.dinner,walk:!!value.walk,water:Math.min(2500,Math.max(0,Number(value.water)||1800))};}catch(e){return {dinner:false,walk:false,water:1800};}}
let state=read();
function save(){try{sessionStorage.setItem(STORAGE,JSON.stringify(state));}catch(e){}}
function pill(label,detail){return '<div class="step-pill">'+icon('steps')+'<strong>6,420</strong><span>steps</span>'+icon('chevron')+'</div>';}
function metric(name,value,goal,pct,ico){return '<div class="metric"><div class="label">'+icon(ico)+'<span>'+name+'</span></div><strong>'+value+'</strong><small>'+goal+'</small><div class="track" role="progressbar" aria-label="'+name+'" aria-valuenow="'+Math.round(pct)+'" aria-valuemin="0" aria-valuemax="100"><span style="width:'+pct+'%"></span></div></div>';}
function home(){
let hero=state.dinner?
'<section class="hero"><div class="eyebrow"><span class="glow-dot"></span>DINNER RECORDED</div><h2>Nicely done.</h2><p class="meta">Your meal is in today’s log.</p><div class="schedule">'+icon('walk')+'A short walk is available now</div><div class="buttons">'+(state.walk?'<span class="tag good">Walk recorded</span>':'<button class="btn" data-action="walk">Record a 10-minute walk '+icon('arrow')+'</button>')+'<a class="text-link" href="earlier-today.html">View today’s activity ›</a></div></section>':
'<section class="hero"><div class="eyebrow"><span class="glow-dot"></span>UP NEXT · NUTRITION</div><h2>Dinner</h2><p class="meta">Rohu fish · Rice · Dal</p><div class="schedule">'+icon('clock')+'Scheduled for 9:00 pm</div><div class="buttons"><a class="btn" href="meal.html">View dinner '+icon('arrow')+'</a><a class="text-link" href="nutrition.html">Meal plan ›</a></div></section>';
let next=state.dinner ? (state.walk?'The next activity will appear when due.':'Available after your recorded dinner') : 'Available after you record dinner';
shell('<header class="header">'+logo()+'<a href="progress.html" aria-label="View step progress">'+pill()+'</a></header>'+
'<div class="lead"><div class="eyebrow">DEMO EVENING · SAMPLE DAY</div><h1>Evening, Aarav.</h1><p>One clear step at a time.</p></div>'+
hero+
'<div class="section-header"><h2>Today’s momentum</h2><a href="earlier-today.html">Earlier today →</a></div>'+
'<div class="metrics">'+metric('Steps','6,420','of 8,000',80.25,'steps')+metric('Water',(state.water/1000).toFixed(1)+' L','of 2.5 L',100*state.water/2500,'water')+metric('Meals',state.dinner?'3 / 3':'2 / 3','logged today',state.dinner?100:66.67,'meals')+'</div>'+
'<div class="section-header"><h2>After your meal</h2><span class="eyebrow">NEXT</span></div>'+
'<div class="panel next"><div class="tile-icon">'+icon('walk')+'</div><div class="copy"><div class="title-small">A gentle 10-minute walk</div><div class="sub-small">'+next+'</div></div><span class="tag '+(state.walk?'good':'')+'">'+(state.walk?'Done':state.dinner?'Ready':'Later')+'</span></div>'+
'<p class="foot-note">Preview uses fictional client details and demo activity. No real account, health data or sensor data is connected.</p>','home');
}
function timelineRow(symbol,title,detail,status,kind,action){return '<div class="timeline-row"><span class="tile-icon '+(kind==='good'?'good':kind==='warn'?'warn':'')+'">'+icon(symbol)+'</span><div class="info"><div class="title-small">'+title+'</div><div class="detail">'+detail+'</div></div>'+(action?'<button data-action="'+action+'">'+status+'</button>':'<span class="status '+(kind==='warn'?'muted':'')+'">'+status+'</span>')+'</div>';}
let selectedTab='today';
function earlier(){
let header=subhead('Earlier today')+'<div class="summary"><div class="feature-kicker">YOUR DAILY RECORD</div><h1>Small actions add up.</h1><p>See what was recorded and what has passed its time window.</p><div class="summary-stats"><div class="summary-stat"><strong>'+(state.dinner?3:2)+'</strong><span>Meals recorded</span></div><div class="summary-stat"><strong>1</strong><span>Not recorded</span></div></div></div>'+
'<div class="tabs" role="tablist" aria-label="Activity period"><button role="tab" aria-selected="'+(selectedTab==='today')+'" class="'+(selectedTab==='today'?'selected':'')+'" data-tab="today">Today</button><button role="tab" aria-selected="'+(selectedTab==='week')+'" class="'+(selectedTab==='week'?'selected':'')+'" data-tab="week">This week</button></div>';
let today='<h2 class="group-title">RECORDED</h2><div class="timeline">'+
timelineRow('meals','Breakfast','8:00 am · Breakfast','Recorded','good')+
timelineRow('meals','Lunch','1:45 pm · Lunch','Recorded','good')+
(state.dinner?timelineRow('meals','Dinner','9:00 pm · Demo log','Recorded','good'):'')+
(state.walk?timelineRow('walk','Post-meal walk','10 minutes · Demo log','Recorded','good'):'')+
'</div><h2 class="group-title">PAST TIME WINDOWS</h2><div class="timeline">'+timelineRow('water','Morning water','7:00–9:00 am · Time window ended','Not recorded','warn')+'</div>'+
'<p class="info-note">Not recorded does not mean not completed. Expired tasks stay visible here without inviting late entries when they are not allowed.</p>';
let week='<h2 class="group-title">WEEK AT A GLANCE</h2><div class="content-card"><h2>Consistency is built daily.</h2><p>This is an illustrative weekly summary. A real weekly report will show only activity supported by the connected data.</p><div class="chart" aria-label="Illustrative activity chart"><span style="height:44%"></span><span style="height:80%"></span><span style="height:65%"></span><span style="height:92%"></span><span style="height:59%"></span><span style="height:76%"></span><span style="height:70%"></span></div></div>';
shell(header+(selectedTab==='today'?today:week)+'<p class="foot-note">Prototype states reset by using the Reset demo control under Profile.</p>','home');
}
/* Training screen: fictional, internally consistent week for UX exploration. */
/* Session demo state shared with Screen 05 (sample only). */
const WORKOUT_SAMPLE_KEY='zenith-preview-workout-v1';
function workoutPreviewSnapshot(){
try{
const data=JSON.parse(sessionStorage.getItem(WORKOUT_SAMPLE_KEY)||'null');
if(!data||!['ready','active','completed'].includes(data.status)||!Array.isArray(data.sets)||data.sets.length!==15)return {phase:'ready',logged:0};
const count=data.sets.filter(x=>x===true).length;
return {phase:data.status==='completed'&&count===15?'completed':data.status==='completed'?'active':data.status,logged:count};
}catch(e){return {phase:'ready',logged:0};}
}
function effectiveTrainingDay(i,snapshot){
const d=trainingDays[i];
if(i===4&&snapshot.phase==='completed')return Object.assign({},d,{status:'Demo logged',kind:'done',description:'This sample Friday session was recorded in the browser-only preview.',detail:'15 example sets · demo recorded'});
if(i===4&&snapshot.phase==='active')return Object.assign({},d,{status:'In progress',kind:'nextup',description:'Your sample Friday session is in progress in this preview.',detail:snapshot.logged+' / 15 example sets logged'});
if(i===5&&snapshot.phase==='completed')return Object.assign({},d,{status:'Up next',kind:'nextup'});
return d;
}

const trainingDays=[
{day:'Mon',date:'05',title:'Full Body A',status:'Completed',kind:'done',description:'A foundation session focused on compound movements and good technique.',detail:'45 min · 5 exercises · example recorded session'},
{day:'Tue',date:'06',title:'Conditioning',status:'Completed',kind:'done',description:'A steady conditioning session to build aerobic capacity.',detail:'30 min · example recorded session'},
{day:'Wed',date:'07',title:'Full Body B',status:'Completed',kind:'done',description:'The second full-body session of the week, with a focus on consistent form.',detail:'45 min · 5 exercises · example recorded session'},
{day:'Thu',date:'08',title:'Recovery day',status:'Today',kind:'today',description:'No strength session scheduled. Give yourself space to recover before your next training day.',detail:'Optional gentle movement · no workout due'},
{day:'Fri',date:'09',title:'Upper Body Strength',status:'Up next',kind:'nextup',description:'Your next planned session builds on the strength work already completed this week.',detail:'45 min · 5 exercises · scheduled'},
{day:'Sat',date:'10',title:'Lower Body Strength',status:'Scheduled',kind:'planned',description:'Your fifth planned session for this example week.',detail:'45 min · 5 exercises · scheduled'},
{day:'Sun',date:'11',title:'Recovery day',status:'Recovery',kind:'rest',description:'A rest day in the sample weekly schedule.',detail:'No strength session scheduled'}
];
let trainingSelected=3;
let trainingPreviewOpen=false;
function trainingDayDetail(i){
const d=effectiveTrainingDay(i,workoutPreviewSnapshot());
const statusClass=d.kind==='done'?'completed':'';
return '<div class="heading"><strong>'+d.title+'</strong><span class="status '+statusClass+'">'+d.status+'</span></div>'+
'<p>'+d.description+'</p><div class="training-day-summary-info">'+icon(d.kind==='done'?'check':d.kind==='today'||d.kind==='rest'?'moon':'clock')+d.detail+'</div>';
}
function training(){
const snapshot=workoutPreviewSnapshot();
const sessionsDone=snapshot.phase==='completed'?4:3;
const nextIndex=snapshot.phase==='completed'?5:4;
const nextDate=nextIndex===5?'Saturday, 10 Oct':'Friday, 9 Oct';
const nextTitle=nextIndex===5?'Lower Body':'Upper Body';
const nextSet=String(nextIndex===5?5:4).padStart(2,'0');
const nextDay=String(nextIndex===5?10:9).padStart(2,'0');
const nextWeekday=nextIndex===5?'SAT':'FRI';
const days=trainingDays.map(function(entry,i){const d=effectiveTrainingDay(i,snapshot);return '<button type="button" class="'+(trainingSelected===i?'selected ':'')+d.kind+'" data-training-day="'+i+'" aria-pressed="'+(trainingSelected===i?'true':'false')+'" aria-label="'+d.day+' '+d.date+' October, '+d.status+'"><span class="day-label">'+d.day+'</span><span class="day-date">'+d.date+'</span><span class="day-mark"></span></button>';}).join('');
const movements=[
['Dumbbell Bench Press','Pressing strength'],
['Lat Pulldown','Upper-body pulling'],
['Seated Row','Back strength'],
['Dumbbell Shoulder Press','Shoulder strength'],
['Triceps Pushdown','Accessory work']
].map(function(m,i){return '<div class="training-movement"><span class="index">'+String(i+1).padStart(2,'0')+'</span><div><div class="name">'+m[0]+'</div><div class="meta">'+m[1]+'</div></div></div>';}).join('');
shell(
'<div class="training-main">'+
'<header class="training-header"><div class="training-identity">'+logo()+'<div class="training-identity-copy"><span>ZENITH · CLIENT APP</span><strong>Training</strong></div></div><div class="training-week-chip">WEEK 02 <span>/ 04</span></div></header>'+
'<section class="training-intro"><div class="training-eyebrow"><span class="training-line"></span>YOUR TRAINING JOURNEY</div><h1>Build what <em>lasts.</em></h1><p>A clear plan, progress you can follow, and space to recover.</p></section>'+
'<section class="training-recovery" aria-label="Today’s training status"><div class="training-eyebrow">THURSDAY · 8 OCTOBER</div><div class="training-recovery-badge">'+icon('moon')+' RECOVERY DAY</div><h2>Today is for recovery.</h2><p>Your sample program balances five training days with two recovery days.</p></section>'+
'<section class="training-momentum" aria-label="Weekly session progress"><div><div class="training-momentum-label">THIS WEEK’S MOMENTUM</div><div class="training-momentum-number">'+String(sessionsDone).padStart(2,'0')+' <span>/ 05</span></div><div class="training-momentum-copy">Sample sessions recorded</div></div><div class="training-momentum-right"><div class="training-momentum-percent">'+(sessionsDone*20)+'% complete</div><div class="training-segments" aria-hidden="true">'+Array.from({length:5},(_,i)=>'<span '+(i<sessionsDone?'class="filled"':'')+'></span>').join('')+'</div></div></section>'+
'<a class="training-plan-entry" href="workout-plan.html" aria-label="Open your complete four-week Foundation Strength plan"><span class="training-plan-entry-icon">'+icon('bar')+'</span><span class="training-plan-entry-copy"><strong>Foundation Strength · Full plan</strong><small>Explore all four weeks and sessions</small></span>'+icon('chevron')+'</a>'+
'<div class="training-section-heading"><h2>Up next</h2><span class="support">'+nextDate+'</span></div>'+
'<section class="training-next" aria-label="Next planned session"><div class="training-next-top"><div class="training-eyebrow">SESSION '+nextSet+' / 05</div><span class="training-date-pill">'+(snapshot.phase==='active'?'Demo in progress':'Scheduled')+'</span></div>'+
'<div class="training-next-content"><div class="training-next-date"><b>'+nextDay+'</b><span>'+nextWeekday+'</span></div><div class="training-next-details"><h3>'+nextTitle+'<br>Strength</h3><p>'+icon('clock')+'45 min <span aria-hidden="true">·</span> 5 exercises</p></div></div>'+
'<a href="workout-day.html?week=1&day='+nextIndex+'" class="training-cta">Open '+nextTitle.toLowerCase()+' session '+icon('arrow')+'</a>'+
'<div class="training-next-subaction"><button type="button" class="text-link" data-action="training-preview" aria-expanded="'+(trainingPreviewOpen?'true':'false')+'" aria-controls="training-preview-panel"><span class="training-preview-label">'+(trainingPreviewOpen?'Hide movement preview':'Preview movements')+'</span></button><a class="text-link" href="workout-plan.html">Complete plan ↗</a></div>'+
'<div class="training-preview-panel" id="training-preview-panel" '+(trainingPreviewOpen?'':'hidden')+'><h4>'+nextWeekday+'’S SESSION · EXAMPLE MOVEMENTS</h4>'+
(nextIndex===4?movements:['Goblet Squat','Dumbbell Romanian Deadlift','Step-Up','Leg Curl','Calf Raise'].map(function(n,i){return '<div class="training-movement"><span class="index">'+String(i+1).padStart(2,'0')+'</span><div class="name">'+n+'</div></div>';}).join(''))+
'</div></section>'+
'<div class="training-section-heading" id="training-week"><h2>Your week</h2><span class="support">5–11 Oct · Sample</span></div>'+
'<section class="training-week-card" aria-label="Example weekly training schedule"><div class="training-week-title"><span>Tap any day for details</span><strong>5 training · 2 recovery</strong></div><div class="training-day-picker" role="group" aria-label="Select a training day">'+days+'</div>'+
'<div class="training-day-detail" id="training-day-summary" aria-live="polite">'+trainingDayDetail(trainingSelected)+'</div></section>'+
'<section class="training-focus" aria-label="Example weekly coach focus"><span class="training-focus-icon">'+icon('spark')+'</span><div><div class="eyebrow">SAMPLE COACH FOCUS</div><p>Use controlled repetitions and consistent form before increasing load. Keep today easy ahead of Friday’s session.</p></div></section>'+
'<p class="training-footer">Illustrative program and dates for design review only. This preview has no live workout prescriptions, coach messages or training records.</p>'+
'</div>','training');
}
/* Screen 04 · Complete Program. Illustrative content only; no coach or member API. */
const programWeeks=[
{label:'WEEK 01',period:'28 Sep – 4 Oct',focus:'Learn the movement patterns',description:'Get comfortable with the routine and prioritize technique. This is a sample program structure, not a prescribed training progression.'},
{label:'WEEK 02',period:'5–11 Oct',focus:'Build control & consistency',description:'A steady second week, balancing the five planned sessions with two recovery days.'},
{label:'WEEK 03',period:'12–18 Oct',focus:'Practice with confidence',description:'Keep the same weekly rhythm. Adjustments would be determined by your coach using actual training feedback.'},
{label:'WEEK 04',period:'19–25 Oct',focus:'Consolidate & review',description:'Reflect on your consistency and discuss the next block with your coach before making changes.'}
];
const programMovements=[
{type:'training',duration:'45 min',count:'5 movements',note:'A balanced full-body training template.',items:['Goblet Squat','Dumbbell Bench Press','Lat Pulldown','Dumbbell Romanian Deadlift','Dead Bug']},
{type:'training',duration:'30 min',count:'4 blocks',note:'A conditioning session with a gentle start and finish.',items:['Walking warm-up','Steady cycling','Controlled intervals','Cool down']},
{type:'training',duration:'45 min',count:'5 movements',note:'Continue practicing steady, well-controlled repetitions.',items:['Leg Press','Seated Row','Dumbbell Shoulder Press','Glute Bridge','Side Plank']},
{type:'recovery',duration:'Recovery',count:'No workout planned',note:'Unscheduled training is not required. Gentle movement is optional if appropriate.',items:[]},
{type:'training',duration:'45 min',count:'5 movements',note:'The next scheduled session in the sample plan.',items:['Dumbbell Bench Press','Lat Pulldown','Seated Row','Dumbbell Shoulder Press','Triceps Pushdown']},
{type:'training',duration:'45 min',count:'5 movements',note:'A lower-body strength session within the illustrative weekly structure.',items:['Goblet Squat','Dumbbell Romanian Deadlift','Step-Up','Leg Curl','Calf Raise']},
{type:'recovery',duration:'Recovery',count:'No workout planned',note:'Use the day to recover before another training week.',items:[]}
];
let programSelectedWeek=(function(){const match=/(?:\?|&)week=(\d+)(?:&|$)/.exec((window.location&&window.location.search)||'');return match&&Number(match[1])>=0&&Number(match[1])<4?Number(match[1]):1;})();
let programExpandedDay=null;
function programStatus(dayIndex){
const snapshot=workoutPreviewSnapshot();
const d=effectiveTrainingDay(dayIndex,snapshot);
if(d.kind==='rest'||d.kind==='today')return 'RECOVERY';
if(programSelectedWeek!==1)return programSelectedWeek<1?'EXAMPLE':'PLANNED';
if(dayIndex===4&&snapshot.phase==='completed')return 'DEMO LOGGED';
if(dayIndex===4&&snapshot.phase==='active')return 'IN PROGRESS';
if(d.kind==='done')return 'RECORDED';
if(d.kind==='nextup')return 'UP NEXT';
return 'PLANNED';
}
function programDayDate(dayIndex){
const date=Number(trainingDays[dayIndex].date);
if(programSelectedWeek===0)return ['28 SEP','29 SEP','30 SEP','01 OCT','02 OCT','03 OCT','04 OCT'][dayIndex];
if(programSelectedWeek===1)return String(date).padStart(2,'0')+' OCT';
return String(date+7*(programSelectedWeek-1)).padStart(2,'0')+' OCT';
}
function programWeekFocus(){
const w=programWeeks[programSelectedWeek];
return '<div class="program-week-focus-head"><span class="overline">'+w.label+(programSelectedWeek===1?' · CURRENT':' · PREVIEW')+'</span><span class="period">'+w.period+'</span></div>'+
'<h3>'+w.focus+'</h3><p>'+w.description+'</p>';
}
function programDayDetail(dayIndex){
const m=programMovements[dayIndex];
if(m.type==='recovery')return '<div class="program-recovery-details">'+m.note+'</div>';
return '<p class="detail-intro">'+m.note+'</p>'+
'<ul class="program-session-movements">'+m.items.map(function(item){return '<li>'+item+'</li>';}).join('')+'</ul>'+
'<p class="detail-note">Exercise order is illustrative; full prescriptions, loads and set logging belong in the individual session view.</p>'+'<a class="program-view-link" href="workout-day.html?week='+programSelectedWeek+'&day='+dayIndex+'">Open individual workout day '+icon('arrow')+'</a>';
}
function programSessionRows(){
return trainingDays.map(function(d,i){
const m=programMovements[i];
const opened=programExpandedDay===i;
const status=programStatus(i);
const note=m.type==='recovery'?'RECOVERY · NO SESSION':m.duration.toUpperCase()+' · '+m.count.toUpperCase();
return '<div class="program-session">'+
'<button type="button" class="program-session-toggle" data-plan-day="'+i+'" aria-expanded="'+String(opened)+'" aria-controls="plan-session-panel-'+i+'">'+
'<span class="number">'+String(i+1).padStart(2,'0')+'</span>'+
'<span class="body"><span class="dayline">'+d.day.toUpperCase()+' · '+programDayDate(i)+' <span class="'+(status==='RECORDED'?'activity-pill':'')+'">'+status+'</span></span>'+
'<span class="name">'+d.title+'</span><span class="subtitle">'+note+'</span></span>'+
'<span class="trailing">'+icon('chevron')+'</span></button>'+
'<div class="program-session-details" id="plan-session-panel-'+i+'" '+(opened?'':'hidden')+'>'+programDayDetail(i)+'</div></div>';
}).join('');
}
function workoutPlan(){
const weeks=programWeeks.map(function(w,i){
return '<button type="button" data-plan-week="'+i+'" class="program-week-button '+(i===programSelectedWeek?'selected ':'')+(i<1?'past-week':'')+'" aria-label="Week '+(i+1)+', '+w.period+(i===1?', current week':'')+'" aria-pressed="'+String(programSelectedWeek===i)+'" aria-controls="program-week-focus"><span class="ordinal">WEEK</span><strong>'+String(i+1).padStart(2,'0')+'</strong></button>';
}).join('');
shell(
'<div class="program-page">'+
'<header class="program-top"><div class="program-top-left"><a class="back" href="training.html" aria-label="Back to Training">'+icon('back')+'</a><span class="program-top-label"><small>ZENITH · TRAINING</small><strong>Your complete plan</strong></span></div><span class="program-phase">WEEK 02 <em>/ 04</em></span></header>'+
'<section class="program-hero" aria-label="Program overview"><div class="program-hero-overline">YOUR FOUR-WEEK FOUNDATION</div>'+
'<h1>Foundation <span>Strength.</span></h1><p class="program-hero-description">A balanced weekly rhythm built around strength, movement and recovery.</p>'+
'<div class="program-hero-progress"><small>Current program week</small><strong>02 of 04</strong></div>'+
'<div class="program-progress-bar" aria-label="Current week 2 of 4"><span class="past"></span><span class="present"></span><span></span><span></span></div></section>'+
'<div class="program-stats" aria-label="Program structure"><div class="program-stat"><strong>04</strong><span>Weeks</span></div><div class="program-stat"><strong>05</strong><span>Sessions / week</span></div><div class="program-stat"><strong>02</strong><span>Recovery days</span></div></div>'+
'<div class="program-section-title"><h2>Four weeks. One direction.</h2></div>'+
'<div class="program-week-select" role="group" aria-label="Explore program weeks">'+weeks+'</div>'+
'<div class="program-week-focus" id="program-week-focus" aria-live="polite">'+programWeekFocus()+'</div>'+
'<div class="program-section-title"><h2>Weekly rhythm</h2><small>7 days</small></div>'+
'<p class="program-session-caption">Explore each training day. Your actual sets and weights belong in your approved session plan.</p>'+
'<section class="program-session-list" id="program-session-list" aria-label="Seven-day program outline">'+programSessionRows()+'</section>'+
'<div class="program-section-title"><h2>Coach’s approach</h2></div>'+
'<section class="program-coach"><div class="program-coach-heading"><span class="program-coach-icon">'+icon('spark')+'</span><div><h3>Strong foundations first.</h3><p class="program-coach-subtitle">An overview, not a technical instruction sheet</p></div></div>'+
'<p class="program-coach-brief">Build consistency, learn confident movement patterns and leave room for recovery. Your coach reviews what changes next.</p>'+
'<details><summary>Why is the week structured this way? '+icon('chevron')+'</summary>'+
'<ul><li>Training days alternate movement demands to give the week a manageable rhythm.</li>'+
'<li>Recovery days are part of the plan, not missed workouts.</li>'+
'<li>Progressions should follow your coach’s assessment and your recorded response, rather than automatic increases.</li></ul></details></section>'+
'<p class="program-disclaimer">Sample four-week program created for this design prototype. No live coach approval, prescribed loads or client data are represented. <a href="training.html">Return to Training</a>.</p>'+
'</div>','training');
}

/* Screen 06 — Nutrition Overview. All diary entries and targets are fictional examples.
   Do not present simulated nutrient values as real intake or synced client data. */
const demoNutrition={
target:{kcal:2000,protein:140,carbs:220,fat:62},
meals:[
{id:'breakfast',title:'Breakfast',time:'8:00 AM',kcal:410,protein:28,carbs:50,fat:11,detail:'Oats, curd and seasonal fruit.',status:'recorded'},
{id:'lunch',title:'Lunch',time:'1:45 PM',kcal:710,protein:41,carbs:82,fat:24,detail:'Rice, dal, vegetables and paneer.',status:'recorded'},
{id:'dinner',title:'Dinner',time:'9:00 PM',kcal:620,protein:42,carbs:78,fat:16,detail:'Rohu fish, white rice and moong dal.',status:'linked'},
{id:'snack',title:'Optional snack',time:'Flexible time',kcal:260,protein:29,carbs:10,fat:11,detail:'An optional example. Not recorded and not included in intake totals.',status:'optional'}
]};
let nutritionExpanded=null;
function nutritionLedger(){
const recorded=demoNutrition.meals.filter(function(m){return m.status==='recorded'||(m.id==='dinner'&&state.dinner);});
return recorded.reduce(function(a,m){a.kcal+=m.kcal;a.protein+=m.protein;a.carbs+=m.carbs;a.fat+=m.fat;return a;},{kcal:0,protein:0,carbs:0,fat:0});
}
function nutritionRing(percent){
const perimeter=301.593,offset=(perimeter*(1-percent/100)).toFixed(2);
return '<div class="nutrition-ring" role="img" aria-label="'+Math.round(percent)+' percent of sample calorie target logged">'+
'<svg viewBox="0 0 120 120" aria-hidden="true"><circle class="base" cx="60" cy="60" r="48"/><circle class="progress" cx="60" cy="60" r="48" stroke-dasharray="'+perimeter+'" stroke-dashoffset="'+offset+'"/></svg>'+
'<div class="nutrition-ring-label"><strong>'+Math.round(percent)+'%</strong><small>LOGGED</small></div></div>';
}
function nutritionMacro(label,logged,target){
const percentage=Math.max(0,Math.min(100,Math.round(100*logged/target)));
return '<div class="nutrition-macro"><div class="nutrition-macro-name">'+label+'</div>'+
'<div class="nutrition-macro-data"><strong>'+logged+'g</strong><span> / '+target+'g</span></div>'+
'<div class="meter" role="progressbar" aria-label="'+label+' sample logged against target" aria-valuemin="0" aria-valuemax="'+target+'" aria-valuenow="'+logged+'"><span style="width:'+percentage+'%"></span></div></div>';
}
function nutritionMealRow(m){
const recorded=m.status==='recorded'||m.id==='dinner'&&state.dinner;
const isDinner=m.id==='dinner';
const optional=m.id==='snack';
const status=recorded?'Recorded':isDinner?'Next up':'Optional';
const statusClass=recorded?'good':isDinner?'next':'';
const inner='<span class="nutrition-meal-marker '+(recorded?'recorded':optional?'optional':'')+'">'+icon(recorded?'check':optional?'clock':'meals')+'</span>'+
'<span class="nutrition-meal-body"><strong>'+m.title+'</strong><span class="time">'+m.time+'</span></span>'+
'<span class="nutrition-meal-trailing"><strong>'+m.kcal+' kcal</strong><span class="status '+statusClass+'">'+status+'</span></span>';
if(isDinner){
return '<article class="nutrition-meal"><a class="nutrition-meal-button" href="meal.html?from=nutrition" aria-label="View dinner details, '+(recorded?'recorded in demo':'planned')+'">'+inner+'</a></article>';
}
const expanded=nutritionExpanded===m.id;
return '<article class="nutrition-meal" aria-expanded="'+expanded+'">'+
'<button type="button" class="nutrition-meal-button" data-nutrition-detail="'+m.id+'" aria-expanded="'+expanded+'" aria-controls="nutrition-detail-'+m.id+'">'+inner+'</button>'+
'<div class="nutrition-meal-expand" id="nutrition-detail-'+m.id+'" '+(expanded?'':'hidden')+'>'+
'<p>'+m.detail+'</p><div class="facts"><span><b>'+m.protein+'g</b> protein</span><span><b>'+m.carbs+'g</b> carbs</span><span><b>'+m.fat+'g</b> fat</span></div>'+
'<p class="small-note">'+(optional?'Illustrative only · this item is not logged.':'Illustrative entry · these figures are not verified intake data.')+'</p></div></article>';
}
function nutrition(){
const totals=nutritionLedger();
const remaining=Math.max(0,demoNutrition.target.kcal-totals.kcal);
const pct=Math.min(100,totals.kcal/demoNutrition.target.kcal*100);
const recordedMain=state.dinner?3:2;
const focused=state.dinner;
shell(
'<div class="nutrition-page">'+
'<header class="nutrition-top"><div class="nutrition-brand">'+logo()+'<div class="nutrition-brand-copy"><span>ZENITH · CLIENT APP</span><strong>Nutrition</strong></div></div><span class="nutrition-day">THU · 08 OCT</span></header>'+
'<section class="nutrition-intro"><div class="overline">YOUR NUTRITION JOURNEY</div><h1>Fuel the <span>work.</span></h1><p>Your recorded meals, daily targets and one clear next step.</p></section>'+
'<section class="nutrition-energy" aria-label="Illustrative nutrition intake"><div class="nutrition-energy-head"><span class="label">TODAY’S ENERGY</span><span class="sample-chip">DEMO VALUES</span></div>'+
'<div class="nutrition-energy-content"><div class="nutrition-kcal"><strong>'+totals.kcal.toLocaleString('en-IN')+'</strong><span>of '+demoNutrition.target.kcal.toLocaleString('en-IN')+' kcal target</span>'+
'<div class="remaining"><b>'+remaining+'</b> kcal remaining<br>in this example</div></div>'+nutritionRing(pct)+'</div>'+
'<div class="nutrition-energy-foot">'+icon('check')+' Based on '+recordedMain+' sample recorded main meals</div></section>'+
'<div class="nutrition-section-title"><h2>Your nutrition balance</h2><span class="aside">Logged / target</span></div>'+
'<section class="nutrition-macros" aria-label="Illustrative daily macronutrients">'+
nutritionMacro('Protein',totals.protein,demoNutrition.target.protein)+
nutritionMacro('Carbs',totals.carbs,demoNutrition.target.carbs)+
nutritionMacro('Fat',totals.fat,demoNutrition.target.fat)+'</section>'+
'<div class="nutrition-section-title"><h2>'+(focused?'Main meals complete':'Your next meal')+'</h2><span class="aside">'+(focused?'3 / 3 main meals':'Scheduled · 9:00 PM')+'</span></div>'+
'<section class="nutrition-focus"><div class="nutrition-focus-overline"><span class="dot"></span>'+(focused?'MEAL RECORDED':'UP NEXT · DINNER')+'</div>'+
'<h3>'+(focused?'Dinner is logged.':'A balanced evening plate.')+'</h3>'+
'<p>'+(focused?'Your three main meals are recorded in this example. The optional snack remains unlogged.':'Rohu fish, rice and moong dal · a planned 620 kcal sample meal.')+'</p>'+
'<div class="focus-meta">'+icon(focused?'check':'clock')+(focused?'620 kcal · sample entry recorded':'9:00 PM · planned, not yet logged')+'</div>'+
'<div class="nutrition-focus-actions"><a class="main-action" href="meal.html?from=nutrition">'+(focused?'Review dinner':'View dinner')+' '+icon('arrow')+'</a>'+
'<a class="quiet-action" href="earlier-today.html">Earlier today '+icon('chevron')+'</a></div></section>'+
'<div class="nutrition-section-title"><h2>Meals today</h2><span class="aside">'+recordedMain+' / 3 main meals</span></div>'+
'<section class="nutrition-timeline" aria-label="Today’s sample meal timeline">'+demoNutrition.meals.map(nutritionMealRow).join('')+'</section>'+
'<div class="nutrition-section-title"><h2>A useful reminder</h2></div>'+
'<section class="nutrition-lesson"><span class="tile">'+icon('spark')+'</span><div><strong>Record what you actually eat.</strong>'+
'<p>A planned meal is not the same as a consumed meal. Your coach can make better decisions from accurate entries than from perfect-looking numbers.</p></div></section>'+
'<p class="nutrition-footer">This screen contains fictional meals, macro estimates and targets for design review. No food tracking, coach assignment or backend is connected. <a href="profile.html">Preview settings</a>.</p>'+
'</div>','nutrition');
}
function meal(){
shell(subhead('Dinner','nutrition.html')+'<div class="demo-label">INTERACTIVE SAMPLE MEAL</div><h1 class="page-title">Dinner.</h1><p class="page-intro">Rohu fish, rice and dal · scheduled for 9:00 pm</p>'+
'<div class="summary"><div class="feature-kicker">PLANNED MEAL</div><h1 style="font-size:26px">A balanced evening plate</h1><p>Food items and approximate portions in this illustration are for demonstration only.</p><div class="summary-stats"><div class="summary-stat"><strong>620</strong><span>kcal · example</span></div><div class="summary-stat"><strong>42 g</strong><span>protein · example</span></div></div></div>'+
'<div class="section-header"><h2>On your plate</h2></div><div class="content-card mini-list">'+
[['Rohu fish','150 g'],['White rice','200 g'],['Moong dal','100 g'],['Bottle gourd','100 g'],['Olive oil','1 tsp']].map(function(m){return '<div class="list-item"><span class="title-small">'+m[0]+'</span><span class="sub-small">'+m[1]+'</span></div>';}).join('')+'</div>'+
'<div class="content-card"><h2>Record your meal</h2><p>In the finished product, clients will be able to confirm what they actually ate or adjust quantities. This prototype only demonstrates a planned-meal confirmation state.</p><div class="cta-row">'+(state.dinner?'<span class="tag good">Dinner recorded in demo</span>':'<button class="btn" data-action="log-dinner">Mark planned dinner as logged '+icon('check')+'</button>')+'<a class="btn secondary" href="nutrition.html">Back to nutrition</a></div></div>','nutrition');
}
function progress(){
shell(subhead('Progress','index.html')+'<div class="demo-label">NEXT DESIGN PASS · EXPLORATION</div><h1 class="page-title">Every step matters.</h1><p class="page-intro">Progress should include consistency and strength, not only body weight.</p>'+
'<div class="content-card"><div class="feature-kicker">SAMPLE ACTIVITY</div><h2>Today’s steps</h2><div style="font-size:32px;font-weight:740;margin:10px 0">6,420 <span style="font-size:13px;color:#abc3cf">/ 8,000</span></div><div class="track"><span style="width:80.25%"></span></div><p style="margin-top:12px">Illustrative step reading. No device sensor is connected.</p></div>'+
'<div class="section-header"><h2>Recovery & hydration</h2></div><div class="content-card"><h2>'+(state.water/1000).toFixed(2)+' L of 2.5 L</h2><p>Demo hydration target</p><div class="track"><span style="width:'+100*state.water/2500+'%"></span></div><div class="cta-row"><button class="btn" data-action="water">+250 ml water</button></div></div>'+
'<div class="content-card"><h2>Beyond the scale</h2><p>Strength progression, attendance trends and body measurements will appear here when supported by real client records.</p></div>','progress');
}
function profile(){
shell(subhead('My Zenith','index.html')+'<div class="demo-label">FICTIONAL MEMBER · SAMPLE DATA</div><h1 class="page-title">Aarav Sharma.</h1><p class="page-intro">Your coaching space. A clear place for your active program, support and preferences.</p>'+
'<div class="content-card"><div class="feature-kicker">CURRENT COACHING</div><h2>12-Week Transformation</h2><p>Personal coaching, nutrition guidance and scheduled progress reviews.</p><div class="cta-row"><a class="btn secondary" href="training.html">Training</a><a class="btn secondary" href="nutrition.html">Nutrition</a></div></div>'+
'<div class="section-header"><h2>Your account</h2></div><div class="content-card mini-list">'+
[['Gym & membership','Membership information needs validation in the live app'],['Coaching roadmap','Personal weekly focus and reviews'],['Privacy & data','Know what your coach can access']].map(function(m){return '<div class="list-item"><span class="item-text"><span class="title-small">'+m[0]+'</span><span class="sub-small" style="display:block">'+m[1]+'</span></span>'+icon('chevron')+'</div>';}).join('')+'</div>'+
'<div class="content-card"><h2>Preview controls</h2><p>Prototype actions are stored in this browser tab only. Reset the sample meal, walking, hydration and workout set logs to revisit the initial demo.</p><div class="cta-row"><button class="btn secondary" data-action="reset">Reset sample activity</button></div></div>','profile');
}
function render(){const page=document.body.getAttribute('data-page')||'home';if(page==='earlier')return earlier();if(page==='training')return training();if(page==='workout-plan')return workoutPlan();if(page==='nutrition')return nutrition();if(page==='meal')return meal();if(page==='progress')return progress();if(page==='profile')return profile();home();}
document.addEventListener('click',function(e){
const mealDetail=e.target.closest('[data-nutrition-detail]');
if(mealDetail){const id=mealDetail.getAttribute('data-nutrition-detail');const valid=demoNutrition.meals.some(m=>m.id===id&&m.id!=='dinner');if(valid){
nutritionExpanded=nutritionExpanded===id?null:id;
document.querySelectorAll('[data-nutrition-detail]').forEach(function(b){const active=b.getAttribute('data-nutrition-detail')===nutritionExpanded;b.setAttribute('aria-expanded',String(active));const container=b.closest('.nutrition-meal');if(container)container.setAttribute('aria-expanded',String(active));const node=document.getElementById('nutrition-detail-'+b.getAttribute('data-nutrition-detail'));if(node)node.hidden=!active;});
}return;}
const planWeekButton=e.target.closest('[data-plan-week]');
if(planWeekButton){const i=Number(planWeekButton.getAttribute('data-plan-week'));if(Number.isInteger(i)&&i>=0&&i<programWeeks.length){
programSelectedWeek=i;programExpandedDay=null;
if(window.history&&typeof window.history.replaceState==='function')window.history.replaceState(null,'','workout-plan.html?week='+i);
const focus=document.getElementById('program-week-focus');if(focus)focus.innerHTML=programWeekFocus();
const list=document.getElementById('program-session-list');if(list)list.innerHTML=programSessionRows();
document.querySelectorAll('[data-plan-week]').forEach(function(b){const selected=Number(b.getAttribute('data-plan-week'))===i;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
}return;}
const planDayButton=e.target.closest('[data-plan-day]');
if(planDayButton){const i=Number(planDayButton.getAttribute('data-plan-day'));if(Number.isInteger(i)&&i>=0&&i<programMovements.length){
programExpandedDay=programExpandedDay===i?null:i;
document.querySelectorAll('[data-plan-day]').forEach(function(b){const j=Number(b.getAttribute('data-plan-day'));const expanded=j===programExpandedDay;b.setAttribute('aria-expanded',String(expanded));const panel=document.getElementById('plan-session-panel-'+j);if(panel)panel.hidden=!expanded;});
}return;}
const dayButton=e.target.closest('[data-training-day]');
if(dayButton){const idx=Number(dayButton.getAttribute('data-training-day'));if(Number.isInteger(idx)&&idx>=0&&idx<trainingDays.length){trainingSelected=idx;const detail=document.getElementById('training-day-summary');if(detail)detail.innerHTML=trainingDayDetail(idx);document.querySelectorAll('[data-training-day]').forEach(function(b){const selected=Number(b.getAttribute('data-training-day'))===idx;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});}return;}
const action=e.target.closest('[data-action]');const tab=e.target.closest('[data-tab]');
if(tab){selectedTab=tab.getAttribute('data-tab');earlier();return;}
if(!action)return;
const name=action.getAttribute('data-action');
if(name==='log-dinner'){state.dinner=true;save();window.location.href=(window.location&&window.location.search&&window.location.search.includes('from=nutrition'))?'nutrition.html':'index.html';}
if(name==='walk'){state.walk=true;save();home();}
if(name==='water'){state.water=Math.min(2500,state.water+250);save();progress();}
if(name==='reset'){state={dinner:false,walk:false,water:1800};save();try{sessionStorage.setItem(WORKOUT_SAMPLE_KEY,JSON.stringify({status:'ready',sets:Array(15).fill(false)}));}catch(e){}profile();}
if(name==='training-preview'){const box=document.getElementById('training-preview-panel');if(box){trainingPreviewOpen=!trainingPreviewOpen;box.hidden=!trainingPreviewOpen;action.setAttribute('aria-expanded',String(trainingPreviewOpen));const label=action.querySelector('.training-preview-label');if(label)label.textContent=trainingPreviewOpen?'Hide movement preview':'Preview movements';}}
});
render();
})();