/* Zenith workout day · Screen 05.
   Sample workout data only. This page neither calls the backend nor stores real health data. */
(function(){
'use strict';
const KEY='zenith-preview-workout-v1';
const app=document.getElementById('app');
const search=(window.location&&window.location.search)||'';
function param(name,defaultValue){const match=new RegExp('(?:\\?|&)'+name+'=(\\d+)(?:&|$)').exec(search);if(!match)return defaultValue;const value=Number(match[1]);return Number.isInteger(value)?value:-1;}
const day=param('day',4),week=param('week',1);
const valid=week>=0&&week<4&&day>=0&&day<7;
const demoEnabled=week===1&&day===4;
const weekdays=['MON','TUE','WED','THU','FRI','SAT','SUN'];
const weeks=[['28 SEP','29 SEP','30 SEP','01 OCT','02 OCT','03 OCT','04 OCT'],['05 OCT','06 OCT','07 OCT','08 OCT','09 OCT','10 OCT','11 OCT'],['12 OCT','13 OCT','14 OCT','15 OCT','16 OCT','17 OCT','18 OCT'],['19 OCT','20 OCT','21 OCT','22 OCT','23 OCT','24 OCT','25 OCT']];
const titles=['Full Body A','Conditioning','Full Body B','Recovery Day','Upper Body Strength','Lower Body Strength','Recovery Day'];
const movementSets=[
 [
 {title:'Goblet Squat',zone:'Lower body · Dumbbell',reps:'8–12',rest:'90 sec',sets:3,cue:'Move through a comfortable depth while keeping your feet grounded and your trunk steady.',art:'lower'},
 {title:'Dumbbell Bench Press',zone:'Upper body · Dumbbells',reps:'8–12',rest:'90 sec',sets:3,cue:'Set your shoulder blades comfortably and use a controlled pressing path.',art:'press'},
 {title:'Lat Pulldown',zone:'Back · Cable machine',reps:'10–12',rest:'75 sec',sets:3,cue:'Pull with control toward your upper chest without leaning far backward.',art:'pull'},
 {title:'Dumbbell Romanian Deadlift',zone:'Posterior chain · Dumbbells',reps:'8–10',rest:'90 sec',sets:3,cue:'Keep the weights close and hinge only through a range you can control.',art:'lower'},
 {title:'Dead Bug',zone:'Core · Mat',reps:'8 / side',rest:'45 sec',sets:3,cue:'Move slowly and maintain a comfortable, stable trunk.',art:'core'}
 ],
 [
 {title:'Walking Warm-up',zone:'Conditioning · Treadmill',reps:'5 min',rest:'—',sets:1,cue:'Start at a comfortable pace and build gradually.',art:'cardio'},
 {title:'Steady Cycling',zone:'Conditioning · Cycle',reps:'10 min',rest:'—',sets:1,cue:'Maintain a pace that allows comfortable breathing.',art:'cardio'},
 {title:'Controlled Intervals',zone:'Conditioning · Cycle',reps:'10 min',rest:'As needed',sets:1,cue:'Alternate easy and moderately challenging efforts based on how you feel.',art:'cardio'},
 {title:'Cool Down',zone:'Recovery · Walking',reps:'5 min',rest:'—',sets:1,cue:'Ease the intensity down rather than stopping abruptly.',art:'cardio'}
 ],
 [
 {title:'Leg Press',zone:'Lower body · Machine',reps:'10–12',rest:'90 sec',sets:3,cue:'Use a comfortable controlled range of motion and keep your feet secure.',art:'lower'},
 {title:'Seated Row',zone:'Back · Cable',reps:'10–12',rest:'75 sec',sets:3,cue:'Keep your torso stable and bring the handle toward your lower ribs.',art:'pull'},
 {title:'Dumbbell Shoulder Press',zone:'Upper body · Dumbbells',reps:'8–12',rest:'90 sec',sets:3,cue:'Use a comfortable pressing range without forcing painful overhead motion.',art:'press'},
 {title:'Glute Bridge',zone:'Posterior chain · Mat',reps:'12–15',rest:'60 sec',sets:3,cue:'Raise the hips without arching excessively through the lower back.',art:'core'},
 {title:'Side Plank',zone:'Core · Mat',reps:'20–30 sec',rest:'45 sec',sets:3,cue:'Hold a comfortable braced position and stop before form deteriorates.',art:'core'}
 ],
 [],[
 {title:'Dumbbell Bench Press',zone:'Chest · Dumbbells',reps:'8–12',rest:'90 sec',sets:3,cue:'Set your shoulder blades comfortably, then press with control. Avoid bouncing or painful ranges.',art:'press'},
 {title:'Lat Pulldown',zone:'Back · Cable machine',reps:'10–12',rest:'75 sec',sets:3,cue:'Keep your torso steady and draw the handle toward the upper chest without jerking.',art:'pull'},
 {title:'Seated Row',zone:'Back · Cable machine',reps:'10–12',rest:'75 sec',sets:3,cue:'Keep your shoulders relaxed and finish each pull with a controlled return.',art:'pull'},
 {title:'Dumbbell Shoulder Press',zone:'Shoulders · Dumbbells',reps:'8–12',rest:'90 sec',sets:3,cue:'Press within a comfortable range, without forcing the shoulders into pain.',art:'press'},
 {title:'Triceps Pushdown',zone:'Arms · Cable machine',reps:'12–15',rest:'60 sec',sets:3,cue:'Keep elbows relatively steady and avoid swinging the upper body.',art:'cable'}
 ],[
 {title:'Goblet Squat',zone:'Lower body · Dumbbell',reps:'8–12',rest:'90 sec',sets:3,cue:'Keep the movement smooth and work within a comfortable depth.',art:'lower'},
 {title:'Dumbbell Romanian Deadlift',zone:'Posterior chain · Dumbbells',reps:'8–10',rest:'90 sec',sets:3,cue:'Hinge slowly, keeping the weights close to the legs.',art:'lower'},
 {title:'Step-Up',zone:'Lower body · Platform',reps:'10 / side',rest:'75 sec',sets:3,cue:'Use a stable step and rise under control without pushing off strongly from the trailing leg.',art:'lower'},
 {title:'Leg Curl',zone:'Hamstrings · Machine',reps:'10–12',rest:'75 sec',sets:3,cue:'Adjust the machine to fit and use a smooth motion.',art:'lower'},
 {title:'Calf Raise',zone:'Calves · Machine',reps:'12–15',rest:'60 sec',sets:3,cue:'Pause briefly at the top and avoid bouncing.',art:'lower'}
 ],[]
];
const currentMovements=valid?movementSets[day]:[];
const numSets=currentMovements.reduce((sum,e)=>sum+e.sets,0);
let expanded=0;
let state=loadState();
function loadState(){
 if(!demoEnabled)return {status:'preview',sets:[]};
 try{
 const saved=JSON.parse(sessionStorage.getItem(KEY)||'null');
 if(!saved||!['ready','active','completed'].includes(saved.status)||!Array.isArray(saved.sets)||saved.sets.length!==15)return {status:'ready',sets:Array(15).fill(false)};
 return {status:saved.status,sets:saved.sets.map(x=>x===true)};
 }catch(e){return {status:'ready',sets:Array(15).fill(false)};}
}
function save(){if(!demoEnabled)return;try{sessionStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
function done(){return state.sets.filter(Boolean).length;}
function ico(name){
const d={
 back:'<path d="m15 18-6-6 6-6"/>',
 chevron:'<path d="m9 18 6-6-6-6"/>',
 arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-9h.01"/>',
 spark:'<path d="m12 3 2 7 7 2-7 2-2 7-2-7-7-2 7-2z"/>'
};
return '<span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(d[name]||d.info)+'</svg></span>';
}
function art(type){
const drawings={
 press:'<path d="M7 25h34M13 20v10m22-10v10m-15-14v19m8-19v19M4 20h6v10H4m34-10h6v10h-6"/>',
 pull:'<path d="M8 11h32M24 11v25M12 11V6m24 5V6M17 28h14m-7-7v11m-9 12h18"/>',
 lower:'<path d="M4 23h40M12 18v10m24-10v10M5 20h5v6H5m33-6h5v6h-5M14 23h20"/>',
 core:'<path d="M5 38h38M12 31h25m-25-8h25m-18-9 5-7 5 7M24 14v17"/>',
 cardio:'<circle cx="24" cy="27" r="13"/><path d="m24 27 7-7m-7 7-8 6M9 9h30m-5 0 4 10"/>',
 cable:'<path d="M10 7h28M24 7v20m-11 9h22m-11-9-7 9m7-9 7 9m-19 7h24"/>'
};
return '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">'+(drawings[type]||drawings.press)+'</svg>';
}
function shell(body){
const nav=[['index.html','Home','home'],['training.html','Training','training'],['nutrition.html','Nutrition','meals'],['progress.html','Progress','progress'],['profile.html','Profile','profile']]
.map(([href,label,type])=>{
const p={home:'<path d="m3 11 9-7 9 7v10h-7v-7h-4v7H3z"/>',training:'<path d="M5 5v14M19 5v14M2 8h6v8H2m14-8h6v8h-6M8 12h8"/>',meals:'<path d="M4 3v8c0 3 3 4 4 0V3m-2 0v18m11-18v18m0-18c5 2 4 8 0 10"/>',progress:'<path d="M4 20v-8h4v8m4 0V4h4v16m4 0v-8h3v8"/>',profile:'<circle cx="12" cy="7" r="4"/><path d="M4 21c0-8 16-8 16 0"/>'}[type];
return '<a href="'+href+'"'+(type==='training'?' class="current" aria-current="page"':'')+'><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg></span><span>'+label+'</span><span class="mark"></span></a>';
}).join('');
app.innerHTML='<div class="app"><main class="main"><div class="session-page">'+body+'</div></main><nav class="bottom-nav" aria-label="App preview navigation">'+nav+'</nav></div>';
}
function header(){
return '<header class="session-top"><a class="back" href="workout-plan.html?week='+week+'" aria-label="Back to complete workout plan">'+ico('back')+'</a><span class="session-top-text"><small>ZENITH · SESSION DETAIL</small><strong>Workout day</strong></span><span class="session-top-tag">WEEK '+String(week+1).padStart(2,'0')+'</span></header>';
}
function top(){
return '<section class="session-hero"><div class="session-overline">'+weekdays[day]+' · '+weeks[week][day]+' · SAMPLE PROGRAM</div>'+
'<h1>'+((titles[day]==='Upper Body Strength')?'Upper Body <span>Strength.</span>':titles[day].replace(' Strength','')+'<span>'+ (titles[day].endsWith(' Strength')?' Strength.':' Session.')+'</span>')+'</h1>'+
'<p>Move with intention. A clear view of every movement and the next step.</p>'+
'<div class="session-hero-facts"><div><b>'+currentMovements.length+'</b><small>Movements</small></div><div><b>'+numSets+'</b><small>Example sets</small></div><div><b>'+(day===1?'30':'45')+' min</b><small>Estimate</small></div></div></section>';
}
function setLabel(i,j){return i*3+j;}
function progress(){
let count=demoEnabled?done():0;
let pct=demoEnabled?Math.round(count/numSets*100):0;
return '<section class="session-progress" aria-label="Demo workout progress"><div class="session-progress-head"><div><small>'+(demoEnabled?'SAMPLE SET PROGRESS':'SESSION STRUCTURE')+'</small><strong>'+(demoEnabled?String(count).padStart(2,'0'):'—')+' <span>/ '+numSets+'</span></strong></div><span class="phase" id="session-phase">'+(demoEnabled?state.status==='completed'?'Sample complete':state.status==='active'?'In progress':'Not started':'Read-only preview')+'</span></div>'+
'<div class="session-progress-track" role="progressbar" aria-label="Sets logged in demo" aria-valuemin="0" aria-valuemax="'+numSets+'" aria-valuenow="'+count+'"><span id="session-progress-fill" style="width:'+pct+'%"></span></div>'+
'<p class="session-progress-note" id="session-progress-note">'+(demoEnabled?state.status==='completed'?'All sets recorded in this sample session.':state.status==='active'?'Set entries remain in this browser tab when you leave and return.':'Start the sample session to explore set-by-set logging.':'You can inspect the example plan. Logging is only enabled for Week 2, Friday.')+'</p></section>';
}
function movementCard(m,i){
const previous=currentMovements.slice(0,i).reduce((sum,e)=>sum+e.sets,0);
const logged=demoEnabled?state.sets.slice(previous,previous+m.sets).filter(Boolean).length:0;
const finished=demoEnabled&&logged===m.sets;
return '<article class="session-exercise '+(expanded===i?'active ':'')+(finished?'completed':'')+'" data-exercise="'+i+'">'+
'<button class="session-exercise-button" type="button" data-exercise-toggle="'+i+'" aria-expanded="'+(expanded===i)+'" aria-controls="exercise-panel-'+i+'">'+
'<span class="session-movement-art"><span class="ordinal">'+String(i+1).padStart(2,'0')+'</span>'+art(m.art)+'</span>'+
'<span class="session-exercise-info"><span class="muscle">'+m.zone+'</span><h3>'+m.title+'</h3><span class="prescription">'+m.sets+' '+(m.sets===1?'set':'sets')+' × '+m.reps+' &nbsp;·&nbsp; '+m.rest+' rest</span><span class="hint">'+(finished?'All sets logged':'Tap for movement details')+'</span></span>'+
'<span class="session-toggle-icon">'+ico(finished?'check':'chevron')+'</span></button>'+
'<div class="session-exercise-details" id="exercise-panel-'+i+'" '+(expanded===i?'':'hidden')+'>'+
'<div class="session-detail-label">MOVEMENT GUIDANCE</div><p class="session-cue">'+m.cue+'</p>'+
'<div class="session-spec"><div><strong>'+m.sets+'</strong><small>Sets</small></div><div><strong>'+m.reps+'</strong><small>Reps / time</small></div><div><strong>'+m.rest+'</strong><small>Rest</small></div></div>'+
(demoEnabled?'<div class="session-set-head"><strong>Sample set log</strong><span>'+logged+' of '+m.sets+' complete</span></div>'+
'<div class="session-sets">'+Array.from({length:m.sets},(_,j)=>{
const on=state.sets[previous+j]===true;
return '<button type="button" class="session-set" data-set="'+i+':'+j+'" aria-pressed="'+on+'" '+(state.status!=='active'?'disabled':'')+'>'+ico(on?'check':'info')+' Set '+(j+1)+'</button>';
}).join('')+'</div><p class="session-exercise-foot">'+(state.status==='ready'?'Start the demo session above to enable set logging.':state.status==='completed'?'The sample session is complete.':'Tap a set after completing it; tap again to correct a mistake.')+'</p>':
'<p class="session-exercise-foot">Preview only. Movement demonstrations and individualized technique review are not connected yet.</p>')+
'</div></article>';
}
function controls(){
if(!demoEnabled)return '';
if(state.status==='completed'){
return '<div class="session-summary" id="session-status">'+ico('check')+'<h2>Session captured.</h2><p>All '+numSets+' sets are marked complete in this fictional training session. The sample state will also be reflected in the Training and Complete Plan previews when revisited.</p>'+
'<button class="session-secondary" type="button" data-session-action="reset">Reset this demo session</button></div>';
}
if(state.status==='ready')return '<div class="session-control"><button class="session-primary" type="button" data-session-action="start">Start sample session '+ico('arrow')+'</button></div>';
return '<div class="session-control"><button class="session-primary" type="button" data-session-action="finish" id="session-finish" '+(done()===numSets?'':'disabled')+'>'+ (done()===numSets?'Finish sample session':'Log all sets to finish')+' '+ico('check')+'</button>'+
'<button class="session-secondary" type="button" data-session-action="continue">Go to next unlogged set</button></div>';
}
function render(){
if(!valid){shell(header()+'<div class="session-empty"><h1>Session not available.</h1><p>Open a valid example workout from the complete plan.</p><a class="session-secondary" style="display:block" href="workout-plan.html">Back to plan</a></div>');return;}
if(currentMovements.length===0){shell(header()+'<div class="session-empty"><h1>Recovery is part of the plan.</h1><p>No strength workout is prescribed on this example recovery day. Return to your program to explore another session.</p><a class="session-secondary" style="display:block" href="workout-plan.html?week='+week+'">Back to plan</a></div>');return;}
shell(header()+top()+
'<p class="session-alert"><strong>Design prototype.</strong> Exercise order, set counts, repetitions and movement cues are illustrative, not an assigned workout or a video demonstration.</p>'+
progress()+controls()+
'<div class="session-section-heading"><h2>Session movements</h2><small>'+currentMovements.length+' exercises</small></div>'+
'<section class="session-list" aria-label="Exercise detail cards">'+currentMovements.map(movementCard).join('')+'</section>'+
'<section class="session-flow-footer"><strong>Quality over speed.</strong><p>Every repetition should be controlled. Stop if an exercise causes pain, and follow your own coach’s approved instructions instead of this example.</p><a href="workout-plan.html?week='+week+'" class="session-secondary" style="display:block;text-align:center">Return to complete plan</a></section>'+
'<p class="session-footnote">All workout data is fictional. Demo set logging is held only in browser session storage. No sensor, timer, coaching AI, real attendance, or backend is connected.</p>');
}
function updateProgress(){
const count=done();
const indicator=document.querySelector('.session-progress-head strong');
if(indicator)indicator.innerHTML=String(count).padStart(2,'0')+' <span>/ '+numSets+'</span>';
const fill=document.getElementById('session-progress-fill');if(fill)fill.style.width=(Math.round(count/numSets*100))+'%';
const track=document.querySelector('.session-progress-track');if(track)track.setAttribute('aria-valuenow',String(count));
const finish=document.getElementById('session-finish');if(finish){finish.disabled=count!==numSets;finish.innerHTML=(count===numSets?'Finish sample session':'Log all sets to finish')+' '+ico('check');}
for(let i=0;i<currentMovements.length;i++){
const article=document.querySelector('[data-exercise="'+i+'"]');if(!article)continue;
const index=currentMovements.slice(0,i).reduce((acc,x)=>acc+x.sets,0);
const logged=state.sets.slice(index,index+currentMovements[i].sets).filter(Boolean).length;
article.classList.toggle('completed',logged===currentMovements[i].sets);
const label=article.querySelector('.session-set-head span');if(label)label.textContent=logged+' of '+currentMovements[i].sets+' complete';
const hint=article.querySelector('.session-exercise-info .hint');if(hint)hint.textContent=logged===currentMovements[i].sets?'All sets logged':'Tap for movement details';
}
}
document.addEventListener('click',function(event){
const target=event.target;
const expand=target.closest('[data-exercise-toggle]');
if(expand){
 const idx=Number(expand.getAttribute('data-exercise-toggle'));
 expanded=expanded===idx?null:idx;
 document.querySelectorAll('[data-exercise-toggle]').forEach(function(btn){const j=Number(btn.getAttribute('data-exercise-toggle'));const yes=j===expanded;btn.setAttribute('aria-expanded',String(yes));const panel=document.getElementById('exercise-panel-'+j);if(panel)panel.hidden=!yes;const card=btn.closest('[data-exercise]');if(card)card.classList.toggle('active',yes);});
 return;
}
const set=target.closest('[data-set]');
if(set&&demoEnabled&&state.status==='active'){
 const values=set.getAttribute('data-set').split(':').map(Number);
 const [i,j]=values;
 if(!Number.isInteger(i)||!Number.isInteger(j)||!currentMovements[i]||j<0||j>=currentMovements[i].sets)return;
 const offset=currentMovements.slice(0,i).reduce((acc,m)=>acc+m.sets,0)+j;
 state.sets[offset]=!state.sets[offset];save();
 set.setAttribute('aria-pressed',String(state.sets[offset]));
 set.innerHTML=ico(state.sets[offset]?'check':'info')+' Set '+(j+1);
 updateProgress();return;
}
const action=target.closest('[data-session-action]');
if(!action||!demoEnabled)return;
const name=action.getAttribute('data-session-action');
if(name==='start'&&state.status==='ready'){state.status='active';expanded=0;save();render();return;}
if(name==='finish'&&state.status==='active'&&done()===numSets){state.status='completed';save();render();if(window.scrollTo)window.scrollTo({top:0,behavior:'instant'});return;}
if(name==='reset'&&state.status==='completed'){state={status:'ready',sets:Array(15).fill(false)};expanded=0;save();render();return;}
if(name==='continue'&&state.status==='active'){
 const first=state.sets.findIndex(done=>!done);
 if(first<0)return;
 let total=0,where=0;
 for(let i=0;i<currentMovements.length;i++){if(first<total+currentMovements[i].sets){where=i;break;}total+=currentMovements[i].sets;}
 expanded=where;
 document.querySelectorAll('[data-exercise-toggle]').forEach(function(btn){const j=Number(btn.getAttribute('data-exercise-toggle'));const yes=j===expanded;btn.setAttribute('aria-expanded',String(yes));const panel=document.getElementById('exercise-panel-'+j);if(panel)panel.hidden=!yes;const card=btn.closest('[data-exercise]');if(card)card.classList.toggle('active',yes);});
 const targetCard=document.querySelector('[data-exercise="'+where+'"]');
 if(targetCard&&targetCard.scrollIntoView)targetCard.scrollIntoView({behavior:'smooth',block:'center'});
}
});
render();
})();