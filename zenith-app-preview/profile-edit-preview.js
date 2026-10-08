/* Zenith Client Profile Edit · interactive browser-only demonstration. */
(function(){
'use strict';
const root=document.getElementById('app');if(!root)return;
const KEY='zenith-preview-profile-v1';
const DEFAULT={name:'Aarav Sharma',gender:'Prefer not to say',goal:'Fat loss & strength',time:'Evening'};
const GENDERS=['Male','Female','Non-binary','Prefer not to say'];
const GOALS=['Fat loss & strength','Build muscle','Improve general fitness','Increase strength'];
const TIMES=['Morning','Afternoon','Evening','Flexible'];
const safe=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ico=n=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">'+({back:'<path d="m15 18-6-6 6-6"/>',check:'<path d="m5 12 4 4L19 6"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-8 16-8 16 0"/>',shield:'<path d="m12 3 8 4v5c0 5-4 8-8 10-4-2-8-5-8-10V7z"/><path d="m9 12 2 2 4-4"/>',chevron:'<path d="m9 18 6-6-6-6"/>'}[n]||'')+'</svg>';
let error='';
function read(){try{const v=JSON.parse(sessionStorage.getItem(KEY)||'null');if(!v)return {...DEFAULT};
return {name:typeof v.name==='string'&&v.name.trim().length>=2&&v.name.trim().length<=60?v.name.trim():DEFAULT.name,
gender:GENDERS.includes(v.gender)?v.gender:DEFAULT.gender,goal:GOALS.includes(v.goal)?v.goal:DEFAULT.goal,time:TIMES.includes(v.time)?v.time:DEFAULT.time};
}catch(e){return {...DEFAULT};}}
const entry=read();
function options(values,current){return values.map(v=>'<option value="'+safe(v)+'"'+(current===v?' selected':'')+'>'+safe(v)+'</option>').join('');}
root.innerHTML='<div class="app entry-app"><main class="main">'+
'<header class="editor-top"><a class="editor-back" href="profile-20261009.html" aria-label="Back to profile">'+ico('back')+'</a>'+
'<div class="title"><small>ZENITH · CLIENT PROFILE</small><strong>Edit your details</strong></div><span class="entry-pill">SAMPLE PROFILE</span></header>'+
'<section class="editor-intro"><div class="eyebrow">YOUR DETAILS</div><h1>Make it <span>yours.</span></h1><p>The essentials, clearly presented—so your coach can understand how you prefer to train.</p></section>'+
'<div class="editor-preview"><div class="editor-avatar">'+ico('user')+'</div><div class="name"><small>YOUR PROFILE PREVIEW</small><strong id="editor-preview-name">'+safe(entry.name)+'</strong><span>12-Week Transformation · example member</span></div></div>'+
'<form id="editor-form" class="editor-form" novalidate>'+
'<div class="group-title">Personal details</div>'+
'<div class="entry-field"><label for="editor-name">Full name</label><input id="editor-name" type="text" maxlength="60" autocomplete="name" required value="'+safe(entry.name)+'" placeholder="Your name"><small>This name appears on Home and your coaching journey.</small></div>'+
'<div class="entry-field"><label for="editor-gender">Gender</label><div class="editor-select"><select id="editor-gender">'+options(GENDERS,entry.gender)+'</select>'+ico('chevron')+'</div></div>'+
'<div class="group-title preferences">Training preferences</div>'+
'<div class="entry-field"><label for="editor-goal">Personal fitness focus</label><div class="editor-select"><select id="editor-goal">'+options(GOALS,entry.goal)+'</select>'+ico('chevron')+'</div><small>This does not modify a coach-approved training or nutrition program.</small></div>'+
'<div class="entry-field"><label for="editor-time">Preferred training time</label><div class="editor-select"><select id="editor-time">'+options(TIMES,entry.time)+'</select>'+ico('chevron')+'</div></div>'+
'<div class="editor-lock"><div class="icon">'+ico('shield')+'</div><div><strong>Coaching and account data stay protected.</strong><p>Membership, program assignments, medical information, email and phone verification are not editable here.</p></div></div>'+
'<p id="editor-error" class="entry-error" role="alert"></p>'+
'<button type="submit" class="entry-primary">Save sample profile '+ico('check')+'</button>'+
'<a href="profile-20261009.html" class="editor-cancel">Cancel and return to Profile</a></form>'+
'<p class="editor-footer">This is an interactive design prototype. Changes are saved only in this browser tab, not to a real member account.</p>'+
'</main></div>';
root.addEventListener('input',e=>{
if(e.target.id==='editor-name'){const label=root.querySelector('#editor-preview-name');if(label)label.textContent=e.target.value||'Your name';}
});
root.addEventListener('submit',e=>{
if(e.target.id!=='editor-form')return;e.preventDefault();
const value=id=>root.querySelector('#'+id)?.value||'';
const name=value('editor-name').trim().replace(/\s+/g,' ');
const gender=value('editor-gender'),goal=value('editor-goal'),time=value('editor-time');
if(name.length<2||name.length>60||/[<>]/.test(name)||!GENDERS.includes(gender)||!GOALS.includes(goal)||!TIMES.includes(time)){
error='Please enter a name between 2 and 60 characters and choose valid options.';
root.querySelector('#editor-error').textContent=error;return;
}
try{sessionStorage.setItem(KEY,JSON.stringify({name,gender,goal,time}));}
catch(e){error='Your browser did not save the sample changes. Session storage may be unavailable.';root.querySelector('#editor-error').textContent=error;return;}
window.location.href='profile-20261009.html';
});
})();