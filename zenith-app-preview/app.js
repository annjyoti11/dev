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
const d=trainingDays[i];
const statusClass=d.kind==='done'?'completed':'';
return '<div class="heading"><strong>'+d.title+'</strong><span class="status '+statusClass+'">'+d.status+'</span></div>'+
'<p>'+d.description+'</p><div class="training-day-summary-info">'+icon(d.kind==='done'?'check':d.kind==='today'||d.kind==='rest'?'moon':'clock')+d.detail+'</div>';
}
function training(){
const days=trainingDays.map(function(d,i){return '<button type="button" class="'+(trainingSelected===i?'selected ':'')+d.kind+'" data-training-day="'+i+'" aria-pressed="'+(trainingSelected===i?'true':'false')+'" aria-label="'+d.day+' '+d.date+' October, '+d.status+'"><span class="day-label">'+d.day+'</span><span class="day-date">'+d.date+'</span><span class="day-mark"></span></button>';}).join('');
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
'<section class="training-recovery" aria-label="Today’s training status"><div class="training-eyebrow">THURSDAY · 8 OCTOBER</div><div class="training-recovery-badge">'+icon('moon')+' RECOVERY DAY</div><h2>Today is for recovery.</h2><p>You’ve recorded three sessions this week. Your next planned workout is tomorrow.</p></section>'+
'<section class="training-momentum" aria-label="Weekly session progress"><div><div class="training-momentum-label">THIS WEEK’S MOMENTUM</div><div class="training-momentum-number">03 <span>/ 05</span></div><div class="training-momentum-copy">Sessions recorded</div></div><div class="training-momentum-right"><div class="training-momentum-percent">60% complete</div><div class="training-segments" aria-hidden="true"><span class="filled"></span><span class="filled"></span><span class="filled"></span><span></span><span></span></div></div></section>'+
'<div class="training-section-heading"><h2>Up next</h2><span class="support">Friday, 9 Oct</span></div>'+
'<section class="training-next" aria-label="Next planned session"><div class="training-next-top"><div class="training-eyebrow">SESSION 04 / 05</div><span class="training-date-pill">Scheduled</span></div>'+
'<div class="training-next-content"><div class="training-next-date"><b>09</b><span>FRI</span></div><div class="training-next-details"><h3>Upper Body<br>Strength</h3><p>'+icon('clock')+'45 min <span aria-hidden="true">·</span> 5 exercises</p></div></div>'+
'<button type="button" class="training-cta" data-action="training-preview" aria-expanded="'+(trainingPreviewOpen?'true':'false')+'" aria-controls="training-preview-panel"><span class="training-preview-label">'+(trainingPreviewOpen?'Hide session preview':'Preview next session')+'</span>'+icon('arrow')+'</button>'+
'<div class="training-preview-panel" id="training-preview-panel" '+(trainingPreviewOpen?'':'hidden')+'><h4>FRIDAY’S SESSION · EXAMPLE MOVEMENTS</h4>'+movements+'</div></section>'+
'<div class="training-section-heading" id="training-week"><h2>Your week</h2><span class="support">5–11 Oct · Sample</span></div>'+
'<section class="training-week-card" aria-label="Example weekly training schedule"><div class="training-week-title"><span>Tap any day for details</span><strong>5 training · 2 recovery</strong></div><div class="training-day-picker" role="group" aria-label="Select a training day">'+days+'</div>'+
'<div class="training-day-detail" id="training-day-summary" aria-live="polite">'+trainingDayDetail(trainingSelected)+'</div></section>'+
'<section class="training-focus" aria-label="Example weekly coach focus"><span class="training-focus-icon">'+icon('spark')+'</span><div><div class="eyebrow">SAMPLE COACH FOCUS</div><p>Use controlled repetitions and consistent form before increasing load. Keep today easy ahead of Friday’s session.</p></div></section>'+
'<p class="training-footer">Illustrative program and dates for design review only. This preview has no live workout prescriptions, coach messages or training records.</p>'+
'</div>','training');
}
function nutrition(){
shell(subhead('Nutrition','index.html')+'<div class="demo-label">NEXT DESIGN PASS · EXPLORATION</div><h1 class="page-title">Eat with direction.</h1><p class="page-intro">Your targets and meals together, with the next practical action in focus.</p>'+
'<div class="content-card"><div class="feature-kicker">ILLUSTRATIVE DAILY TARGET</div><h2>Balanced nutrition</h2><p>2,000 kcal · 150 g protein · 4 meals</p><div class="track" style="margin-top:16px"><span style="width:'+(state.dinner?'82':'58')+'%"></span></div><div class="sub-small" style="margin-top:8px">Illustrative calorie progress; not calculated from real consumption.</div></div>'+
'<div class="section-header"><h2>Today’s meals</h2></div><div class="content-card mini-list">'+
[['Breakfast','8:00 am','Recorded'],['Lunch','1:45 pm','Recorded'],['Dinner','9:00 pm',state.dinner?'Recorded':'Next up'],['Snack','Flexible','Planned']].map(function(m,i){return '<a class="list-item" href="'+(i===2?'meal.html':'#meal-note')+'"><span class="tile-icon '+(i<2||i===2&&state.dinner?'good':'')+'">'+icon('meals')+'</span><span class="item-text"><span class="title-small">'+m[0]+'</span><span class="sub-small" style="display:block">'+m[1]+'</span></span><span class="tag '+(m[2]==='Recorded'?'good':'')+'">'+m[2]+'</span></a>';}).join('')+'</div><p id="meal-note" class="info-note">Only the dinner detail is interactive in this first prototype. The other meals will be designed screen by screen.</p>','nutrition');
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
'<div class="content-card"><h2>Preview controls</h2><p>Prototype actions are stored in this browser tab only. Reset the sample dinner, walk and hydration states to revisit the original layout.</p><div class="cta-row"><button class="btn secondary" data-action="reset">Reset sample activity</button></div></div>','profile');
}
function render(){const page=document.body.getAttribute('data-page')||'home';if(page==='earlier')return earlier();if(page==='training')return training();if(page==='nutrition')return nutrition();if(page==='meal')return meal();if(page==='progress')return progress();if(page==='profile')return profile();home();}
document.addEventListener('click',function(e){
const dayButton=e.target.closest('[data-training-day]');
if(dayButton){const idx=Number(dayButton.getAttribute('data-training-day'));if(Number.isInteger(idx)&&idx>=0&&idx<trainingDays.length){trainingSelected=idx;const detail=document.getElementById('training-day-summary');if(detail)detail.innerHTML=trainingDayDetail(idx);document.querySelectorAll('[data-training-day]').forEach(function(b){const selected=Number(b.getAttribute('data-training-day'))===idx;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});}return;}
const action=e.target.closest('[data-action]');const tab=e.target.closest('[data-tab]');
if(tab){selectedTab=tab.getAttribute('data-tab');earlier();return;}
if(!action)return;
const name=action.getAttribute('data-action');
if(name==='log-dinner'){state.dinner=true;save();window.location.href='index.html';}
if(name==='walk'){state.walk=true;save();home();}
if(name==='water'){state.water=Math.min(2500,state.water+250);save();progress();}
if(name==='reset'){state={dinner:false,walk:false,water:1800};save();profile();}
if(name==='training-preview'){const box=document.getElementById('training-preview-panel');if(box){trainingPreviewOpen=!trainingPreviewOpen;box.hidden=!trainingPreviewOpen;action.setAttribute('aria-expanded',String(trainingPreviewOpen));const label=action.querySelector('.training-preview-label');if(label)label.textContent=trainingPreviewOpen?'Hide session preview':'Preview next session';}}
});
render();
})();