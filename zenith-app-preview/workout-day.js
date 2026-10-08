/* Zenith workout day — one-set coaching flow. Demo only, never a live prescription. */
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

const SET_VERSION=2;
const totalSets=currentMovements.reduce((n,m)=>n+m.sets,0);
const steps=[];
currentMovements.forEach((m,i)=>{for(let j=0;j<m.sets;j++)steps.push({exercise:i,set:j});});
const now=()=>Date.now();
let countdown=null;
let error='';
let state=loadState();
function initial(){return {version:SET_VERSION,status:'ready',mode:'set',cursor:0,sets:Array(15).fill(false),records:Array(15).fill(null),draft:{weight:'',reps:''},restEnd:0,restStart:0,restSeconds:0};}
function loadState(){
 if(!demoEnabled)return {status:'preview'};
 try{
 const raw=JSON.parse(sessionStorage.getItem(KEY)||'null');
 if(!raw||raw.version!==SET_VERSION||!Array.isArray(raw.sets)||raw.sets.length!==15||!Array.isArray(raw.records)||raw.records.length!==15||!['ready','active','completed'].includes(raw.status))return initial();
 const cursor=Math.min(14,Math.max(0,Number.isInteger(raw.cursor)?raw.cursor:0));
 const status=raw.status;
 const sets=raw.sets.map(Boolean),records=raw.records.map(x=>x&&typeof x==='object'&&Number.isFinite(x.weight)&&Number.isInteger(x.reps)&&x.reps>0&&x.weight>=0?{weight:x.weight,reps:x.reps}:null);
 // Keep a completed set only when actual recorded values are present.
 for(let i=0;i<15;i++)if(!records[i])sets[i]=false;
 const confirmed=sets.filter(Boolean).length;
 return {version:SET_VERSION,status:status==='completed'&&confirmed!==15?'active':status,mode:raw.mode==='rest'?'rest':'set',cursor,sets,records,draft:{weight:String(raw.draft&&raw.draft.weight||''),reps:String(raw.draft&&raw.draft.reps||'')},restEnd:Number.isFinite(raw.restEnd)?raw.restEnd:0,restStart:Number.isFinite(raw.restStart)?raw.restStart:0,restSeconds:Number.isFinite(raw.restSeconds)?raw.restSeconds:0};
 }catch(e){return initial();}
}
function save(){if(!demoEnabled)return;try{sessionStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
function ico(name){
const d={
 back:'<path d="m15 18-6-6 6-6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
 check:'<path d="m5 12 4 4L19 6"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-9h.01"/>',spark:'<path d="m12 3 2 7 7 2-7 2-2 7-2-7-7-2 7-2z"/>',
 minus:'<path d="M5 12h14"/>',plus:'<path d="M12 5v14M5 12h14"/>',pause:'<path d="M9 5v14m6-14v14"/>',
 dumbbell:'<path d="M5 5v14M19 5v14M2 8h6v8H2m14-8h6v8h-6M8 12h8"/>'
};
return '<span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">'+(d[name]||d.info)+'</svg></span>';
}
function nav(){
const items=[['index.html','Home','<path d="m3 11 9-7 9 7v10h-7v-7h-4v7H3z"/>'],['training.html','Training','<path d="M5 5v14M19 5v14M2 8h6v8H2m14-8h6v8h-6M8 12h8"/>'],['nutrition.html','Nutrition','<path d="M4 3v8c0 3 3 4 4 0V3m-2 0v18m11-18v18m0-18c5 2 4 8 0 10"/>'],['progress.html','Progress','<path d="M4 20v-8h4v8m4 0V4h4v16m4 0v-8h3v8"/>'],['profile.html','Profile','<circle cx="12" cy="7" r="4"/><path d="M4 21c0-8 16-8 16 0"/>']];
return '<nav class="bottom-nav" aria-label="App preview navigation">'+items.map(([href,label,shape],i)=>'<a href="'+href+'"'+(i===1?' class="current" aria-current="page"':'')+'><span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+shape+'</svg></span><span>'+label+'</span><span class="mark"></span></a>').join('')+'</nav>';
}
function shell(body,immersive=false){
app.innerHTML='<div class="app'+(immersive?' focus-app':'')+'"><main class="main"><div class="session-page">'+body+'</div></main>'+(immersive?'':nav())+'</div>';
if(window.scrollTo)window.scrollTo(0,0);
}
function header(focus){
return '<header class="session-top"><a class="back" href="workout-plan.html?week='+week+'" aria-label="'+(focus?'Leave session and keep demo progress':'Back to complete workout plan')+'">'+ico('back')+'</a><span class="session-top-text"><small>ZENITH · '+(focus?'LIVE SESSION DEMO':'WORKOUT DAY')+'</small><strong>'+(focus?'One set at a time':'Session overview')+'</strong></span><span class="session-top-tag">'+(focus?'SET '+Math.min(state.cursor+1,15)+' / 15':'WEEK '+String(week+1).padStart(2,'0'))+'</span></header>';
}
function title(){return titles[day];}
function summarize(){
return '<section class="session-hero"><div class="session-overline">'+weekdays[day]+' · '+weeks[week][day]+' · SAMPLE PROGRAM</div><h1>'+title().split(' ').slice(0,-1).join(' ')+' <span>'+title().split(' ').slice(-1)[0]+'.</span></h1>'+
'<p>'+(demoEnabled?'Five focused movements. One complete set at a time when you start.':'Inspect the sample session structure. Logging is available for the Friday demo only.')+'</p><div class="session-hero-facts"><div><b>'+currentMovements.length+'</b><small>Movements</small></div><div><b>'+totalSets+'</b><small>Sets</small></div><div><b>≈45 min</b><small>Est. session</small></div></div></section>';
}
function intro(){
return '<div class="session-alert"><strong>Demonstration only.</strong> This sample is not a published coaching prescription. Numbers, exercises and resistance are not personal advice.</div>'+
'<div class="focus-preview-summary"><div class="focus-preview-header"><strong>Today’s sequence</strong><span>5 exercises · 15 sets</span></div>'+
currentMovements.map((m,i)=>'<div class="focus-preview-row"><span class="focus-preview-number">'+String(i+1).padStart(2,'0')+'</span><div><strong>'+m.title+'</strong><small>'+m.sets+' sets · '+m.reps+' reps</small></div>'+ico('chevron')+'</div>').join('')+'</div>';
}
function done(){return demoEnabled?state.sets.filter(Boolean).length:0;}
function prepareCursor(){
 const previous=state.records[state.cursor-1];
 const previousStep=steps[state.cursor-1];
 const currentStep=steps[state.cursor];
 const sameExercise=previous&&previousStep&&currentStep&&previousStep.exercise===currentStep.exercise;
 state.draft={weight:sameExercise?String(previous.weight):'',reps:''};
}
function advance(){
 state.mode='set';state.restEnd=0;state.restStart=0;state.restSeconds=0;prepareCursor();save();
}
function resolveOverdueRest(){
 if(state.status==='active'&&state.mode==='rest'&&state.restEnd>0&&now()>=state.restEnd){advance();}
}
function activeProgress(){
return '<div class="focus-progress"><div class="focus-progress-caption"><span>'+done()+' of '+totalSets+' sets recorded</span><span>'+Math.round(done()/totalSets*100)+'%</span></div><div class="focus-progress-rail" role="progressbar" aria-valuemin="0" aria-valuemax="'+totalSets+'" aria-valuenow="'+done()+'" aria-label="Recorded sets"><span style="width:'+(done()/totalSets*100)+'%"></span></div></div>';
}
function stepContext(cursor){const step=steps[cursor],m=currentMovements[step.exercise];return {step,m};}
function activeSet(){
 const {step,m}=stepContext(state.cursor);
 return '<div class="focus-stage" aria-label="Current set"><div class="focus-superline">EXERCISE '+String(step.exercise+1).padStart(2,'0')+' / '+String(currentMovements.length).padStart(2,'0')+
'<span>SET '+(step.set+1)+' OF '+m.sets+'</span></div>'+
'<div class="focus-art">'+ico('dumbbell')+'</div>'+
'<h1 class="focus-exercise-title">'+m.title+'</h1><p class="focus-muscle">'+m.zone+'</p>'+
'<div class="focus-prescription"><div><small>TARGET REPS</small><strong>'+m.reps+'</strong></div><div><small>REST AFTER SET</small><strong>'+m.rest+'</strong></div></div>'+
'<details class="focus-cue"><summary>Movement guidance '+ico('chevron')+'</summary><p>'+m.cue+'</p></details></div>'+
'<form id="focus-set-form" class="focus-entry" novalidate>'+
'<div class="focus-entry-title"><strong>Record your set</strong><span>Actual performance</span></div>'+
'<div class="focus-inputs">'+
inputField('weight','Weight','kg',state.draft.weight,'0','1000','0.5','decimal')+
inputField('reps','Reps','reps',state.draft.reps,'1','200','1','numeric')+
'</div><p id="focus-error" class="focus-error" role="alert">'+error+'</p>'+
'<button type="submit" class="focus-success">'+ico('check')+' Set completed</button>'+
'<p class="focus-input-foot">Completing the set saves your numbers and opens the rest timer.</p></form>';
}
function inputField(id,label,unit,value,min,max,step,inputmode){
 return '<div class="focus-input-column"><label for="focus-'+id+'">'+label+' <small>('+unit+')</small></label><div class="focus-input-control">'+
'<button type="button" data-stepper="'+id+':minus" aria-label="Decrease '+label.toLowerCase()+'">'+ico('minus')+'</button>'+
'<input id="focus-'+id+'" name="'+id+'" aria-label="'+label+' '+unit+'" autocomplete="off" type="number" inputmode="'+inputmode+'" min="'+min+'" max="'+max+'" step="'+step+'" placeholder="—" value="'+value+'">'+
'<button type="button" data-stepper="'+id+':plus" aria-label="Increase '+label.toLowerCase()+'">'+ico('plus')+'</button></div></div>';
}
function numberSeconds(ms){const sec=Math.max(0,Math.ceil(ms/1000)),minutes=Math.floor(sec/60),seconds=sec%60;return String(minutes).padStart(2,'0')+':'+String(seconds).padStart(2,'0');}
function restDisplay(){
 const next=stepContext(state.cursor),last=state.records[state.cursor-1]||{weight:0,reps:0};
 const remaining=Math.max(0,state.restEnd-now());
 const circumference=314.159;
 const pct=Math.max(0,Math.min(1,remaining/(state.restSeconds*1000||1)));
 return '<section class="rest-screen" aria-label="Rest timer">'+
 '<div class="rest-confirm">'+ico('check')+' SET RECORDED</div>'+
 '<p class="rest-last">'+last.weight+' kg × '+last.reps+' reps</p>'+
 '<h1>Recover well.</h1><p class="rest-guidance">Your next set is ready when the timer ends.</p>'+
 '<div class="rest-dial" role="timer" aria-label="Rest countdown"><svg viewBox="0 0 120 120" aria-hidden="true"><circle class="rest-dial-base" cx="60" cy="60" r="50"/><circle id="rest-dial-progress" class="rest-dial-progress" cx="60" cy="60" r="50" style="stroke-dasharray:'+circumference+';stroke-dashoffset:'+(circumference*(1-pct))+'"/></svg><div class="rest-dial-text"><strong id="rest-time">'+numberSeconds(remaining)+'</strong><small>REST REMAINING</small></div></div>'+
 '<div class="rest-up-next"><span>COMING UP</span><strong>'+next.m.title+'</strong><small>Set '+(next.step.set+1)+' of '+next.m.sets+'</small></div>'+
 '<div class="rest-buttons"><button type="button" data-workflow="skip" class="focus-success">Skip rest '+ico('arrow')+'</button><button type="button" class="focus-button-light" data-workflow="add-rest">+15 sec</button></div>'+
 '<button type="button" class="rest-edit" data-workflow="edit-last">Edit last set</button><p class="rest-note">Demo timer continues using the saved deadline while this page is closed.</p></section>';
}
function complete(){
 const rows=currentMovements.map((m,i)=>{
 const base=currentMovements.slice(0,i).reduce((n,e)=>n+e.sets,0);
 const records=state.records.slice(base,base+m.sets);
 return '<div class="focus-report-exercise"><strong>'+m.title+'</strong><div class="focus-report-sets">'+records.map((r,j)=>'<span><b>Set '+(j+1)+'</b>'+r.weight+' kg · '+r.reps+' reps</span>').join('')+'</div></div>';
 }).join('');
 return '<section class="focus-finished"><div class="focus-complete-mark">'+ico('check')+'</div><div class="focus-superline">SESSION COMPLETE · DEMO</div><h1>Strong work.</h1><p>All '+totalSets+' sample sets are recorded. You can review the numbers below or return to Training, where the weekly sample advances to 4 of 5 sessions.</p>'+
 '<div class="focus-finished-stats"><div><b>'+totalSets+'</b><small>Sets logged</small></div><div><b>'+currentMovements.length+'</b><small>Exercises</small></div></div>'+
 '<a href="training.html" class="focus-success focus-anchor">Return to Training '+ico('arrow')+'</a><button type="button" data-workflow="reset" class="focus-button-light">Reset sample session</button>'+
 '<div class="focus-report"><div class="focus-report-heading">Session record <span>Illustrative</span></div>'+rows+'</div></section>';
}
function render(){
 stopTick();
 if(!valid){shell(header(false)+'<div class="session-empty"><h1>Session not available.</h1><p>Select a valid session from the complete plan.</p><a class="session-secondary" href="workout-plan.html">Back to plan</a></div>');return;}
 if(!currentMovements.length){shell(header(false)+'<div class="session-empty"><h1>Recovery is part of the plan.</h1><p>No strength session is scheduled on this sample recovery day.</p><a class="session-secondary" href="workout-plan.html?week='+week+'">Back to plan</a></div>');return;}
 resolveOverdueRest();
 if(!demoEnabled){shell(header(false)+summarize()+'<div class="session-alert"><strong>Read-only sample.</strong> Recording is enabled only for the fictional Week 2 Friday session.</div>'+intro().replace('5 exercises · 15 sets',currentMovements.length+' exercises · '+totalSets+' sets')+'<a href="workout-plan.html?week='+week+'" class="session-secondary focus-anchor">Back to plan</a>');return;}
 if(state.status==='completed'){shell(header(false)+complete());return;}
 if(state.status==='ready'){shell(header(false)+summarize()+intro()+'<div class="focus-ready-cta"><button type="button" data-workflow="start" class="focus-success">Start sample session '+ico('arrow')+'</button><p>The next screen shows only one exercise and one set.</p></div>');return;}
 shell(header(true)+activeProgress()+(state.mode==='rest'?restDisplay():activeSet())+'<p class="focus-session-note">Sample logging only · <a href="workout-plan.html?week='+week+'">Leave and resume later</a></p>',true);
 if(state.mode==='rest')startTick();
}
function stopTick(){if(countdown!==null){clearInterval(countdown);countdown=null;}}
function startTick(){
 stopTick();
 countdown=setInterval(function(){
 if(state.status!=='active'||state.mode!=='rest'){stopTick();return;}
 const remain=state.restEnd-now();
 if(remain<=0){advance();render();return;}
 const el=document.getElementById('rest-time');if(el)el.textContent=numberSeconds(remain);
 const ring=document.getElementById('rest-dial-progress');if(ring)ring.setAttribute('stroke-dashoffset',String(314.159*(1-Math.max(0,Math.min(1,remain/(state.restSeconds*1000||1))))));
 },250);
}
function getInput(name){const el=document.getElementById('focus-'+name);return el?el.value:'';}
function syncDraft(){
 if(state.status!=='active'||state.mode!=='set')return;
 state.draft={weight:getInput('weight'),reps:getInput('reps')};save();
}
function commitSet(){
 if(state.status!=='active'||state.mode!=='set'||done()!==state.cursor)return;
 const w=getInput('weight').trim(),r=getInput('reps').trim(),weight=Number(w),reps=Number(r);
 if(!w||!r||!Number.isFinite(weight)||weight<0||weight>1000||!Number.isInteger(reps)||reps<1||reps>200){
 error='Enter a valid weight (0–1000 kg) and whole-number reps (1–200).';
 const msg=document.getElementById('focus-error');if(msg)msg.textContent=error;return;
 }
 error='';
 const current=stepContext(state.cursor);
 state.records[state.cursor]={weight,reps};
 state.sets[state.cursor]=true;
 state.cursor++;
 if(state.cursor>=totalSets){state.status='completed';state.mode='set';state.restEnd=0;save();render();return;}
 const restSecs=Number.parseInt(current.m.rest,10)||0;
 if(restSecs>0){
 state.mode='rest';state.restSeconds=restSecs;state.restStart=now();state.restEnd=state.restStart+restSecs*1000;save();render();
 }else{advance();render();}
}
function stepValue(field,change){
 const el=document.getElementById('focus-'+field);if(!el)return;
 const base=Number(el.value||0);const step=field==='weight'?2.5:1;
 const min=field==='weight'?0:1,max=field==='weight'?1000:200;
 const value=Math.max(min,Math.min(max,Math.round((base+change*step)*10)/10));
 el.value=String(value);syncDraft();el.focus();
}
document.addEventListener('input',function(event){
 if(event.target&&['focus-weight','focus-reps'].includes(event.target.id)){syncDraft();if(error){error='';const node=document.getElementById('focus-error');if(node)node.textContent='';}}
});
document.addEventListener('submit',function(event){
 if(event.target&&event.target.id==='focus-set-form'){event.preventDefault();commitSet();}
});
document.addEventListener('click',function(event){
 const button=event.target.closest('[data-workflow]');
 const stepper=event.target.closest('[data-stepper]');
 if(stepper){const parts=stepper.getAttribute('data-stepper').split(':');if(['weight','reps'].includes(parts[0])&&['plus','minus'].includes(parts[1]))stepValue(parts[0],parts[1]==='plus'?1:-1);return;}
 if(!button)return;
 const cmd=button.getAttribute('data-workflow');
 if(cmd==='start'&&state.status==='ready'){state.status='active';state.cursor=0;state.mode='set';state.draft={weight:'',reps:''};save();render();return;}
 if(cmd==='skip'&&state.status==='active'&&state.mode==='rest'){advance();render();return;}
 if(cmd==='edit-last'&&state.status==='active'&&state.mode==='rest'&&state.cursor>0){
 const i=state.cursor-1;const last=state.records[i];state.records[i]=null;state.sets[i]=false;state.cursor=i;state.mode='set';state.restEnd=0;state.restStart=0;state.restSeconds=0;state.draft={weight:last?String(last.weight):'',reps:last?String(last.reps):''};save();render();return;}
 if(cmd==='add-rest'&&state.status==='active'&&state.mode==='rest'){state.restEnd+=15000;state.restSeconds+=15;save();render();return;}
 if(cmd==='reset'&&state.status==='completed'){state=initial();save();render();}
});
render();
})();