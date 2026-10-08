/* Zenith standalone login concept. NO real OTP delivery or authentication. */
(function(){
'use strict';
const root=document.getElementById('app');
if(!root)return;
let method='email',step='entry',address='',code='',error='';
const SAMPLE='246810';
const icon=(kind)=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+({arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',check:'<path d="m5 12 4 4L19 6"/>',back:'<path d="m15 18-6-6 6-6"/>',shield:'<path d="m12 3 8 4v5c0 5-4 8-8 10-4-2-8-5-8-10V7z"/><path d="m9 12 2 2 4-4"/>'}[kind]||'')+'</svg>';
const safe=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const brand='<div class="entry-brand"><img src="../assets/zenith-symbol-white.svg" alt="Zenith symbol"><div class="lines"><small>ZENITH FITNESS HUB</small><strong>ZENITH</strong></div></div>';
function render(){
let content='';
if(step==='entry'){
content='<header class="entry-top">'+brand+'<span class="entry-pill">CLIENT PREVIEW</span></header>'+
'<section class="entry-intro"><div class="entry-eyebrow">YOUR JOURNEY STARTS HERE</div><h1>Welcome <span>back.</span></h1><p>Your training, nutrition and coaching journey, beautifully connected.</p></section>'+
'<div class="entry-glory" aria-hidden="true"><span class="circle"></span><span class="glyph">Z</span><span class="motto">MOVE WITH PURPOSE</span></div>'+
'<section class="entry-panel"><div class="entry-panel-title"><strong>Continue to Zenith</strong><small>DEMONSTRATION</small></div>'+
'<div class="entry-tabs" role="group" aria-label="Choose login method"><button type="button" data-method="email" class="'+(method==='email'?'selected':'')+'" aria-pressed="'+(method==='email')+'">Email</button><button type="button" data-method="phone" class="'+(method==='phone'?'selected':'')+'" aria-pressed="'+(method==='phone')+'">Mobile</button></div>'+
'<form id="login-entry" novalidate><div class="entry-field"><label for="auth-address">'+(method==='email'?'Email address':'Mobile number')+'</label>'+
(method==='phone'?'<div class="entry-phone"><span class="prefix">+91</span><input id="auth-address" autocomplete="tel-national" maxlength="10" type="tel" inputmode="numeric" placeholder="10-digit mobile" value="'+safe(address)+'"></div>':'<input id="auth-address" type="email" inputmode="email" autocomplete="email" placeholder="you@example.com" value="'+safe(address)+'">')+'</div>'+
'<p class="entry-error" id="entry-error" role="alert">'+safe(error)+'</p>'+
'<button class="entry-primary" type="submit">Continue to verification '+icon('arrow')+'</button></form>'+
'<p class="entry-help">This is an interactive design preview. No email or SMS is sent, and no real account is accessed.</p></section>'+
'<a class="entry-alt" href="index.html">Explore without signing in '+icon('arrow')+'</a>'+
'<p class="entry-footer">Coaching intelligence by Anvaya · Engineered by TEYRIN</p>';
}else if(step==='verify'){
content='<header class="entry-top">'+brand+'<span class="entry-pill">DEMO VERIFICATION</span></header>'+
'<button class="entry-back" type="button" data-login-action="back">'+icon('back')+' Change '+(method==='email'?'email':'number')+'</button>'+
'<section class="entry-intro"><div class="entry-eyebrow">ONE STEP CLOSER</div><h1>Confirm it’s <span>you.</span></h1>'+
'<p>This step shows the verification experience. <strong>No code was sent.</strong></p></section>'+
'<div class="entry-verify"><div class="entry-shield">'+icon('shield')+'</div><strong>Your demonstration code</strong><div class="code">'+SAMPLE+'</div>'+
'<p>Use this visible sample code below. It does not verify a real account.</p></div>'+
'<form id="login-verify" class="entry-panel" novalidate><div class="entry-field"><label for="auth-code">Six-digit code</label>'+
'<input class="entry-code" id="auth-code" type="text" inputmode="numeric" autocomplete="off" maxlength="6" placeholder="••••••" value="'+safe(code)+'"></div>'+
'<p class="entry-error" id="entry-error" role="alert">'+safe(error)+'</p><button type="submit" class="entry-primary">Open client preview '+icon('check')+'</button></form>'+
'<p class="entry-footer">No actual OTP delivery or authentication takes place in this preview.</p>';
}else{
content='<header class="entry-top">'+brand+'<span class="entry-pill">PREVIEW COMPLETE</span></header>'+
'<section class="entry-done"><div class="entry-done-mark">'+icon('check')+'</div><div class="entry-eyebrow" style="justify-content:center">INTERACTIVE DEMONSTRATION</div>'+
'<h1>Welcome to <span>Zenith.</span></h1><p>You completed the sample verification flow. You have <strong>not</strong> authenticated with a real client account.</p>'+
'<a class="entry-primary" href="index.html">Enter the client preview '+icon('arrow')+'</a>'+
'<a class="entry-alt" href="profile-20261009.html">Explore your coaching journey '+icon('arrow')+'</a></section>';
}
root.innerHTML='<div class="app entry-app"><main class="main">'+content+'</main></div>';
}
root.addEventListener('click',e=>{
const tab=e.target.closest('[data-method]');
if(tab){const v=tab.getAttribute('data-method');if(v==='email'||v==='phone'){method=v;address='';code='';error='';render();}return;}
const action=e.target.closest('[data-login-action]');
if(action&&action.getAttribute('data-login-action')==='back'){step='entry';error='';code='';render();}
});
root.addEventListener('input',e=>{
if(e.target.id==='auth-address'){address=e.target.value;}
if(e.target.id==='auth-code'){code=e.target.value.replace(/\D/g,'').slice(0,6);e.target.value=code;}
if(error){error='';const note=root.querySelector('#entry-error');if(note)note.textContent='';}
});
root.addEventListener('submit',e=>{
if(e.target.id==='login-entry'){
e.preventDefault();address=(root.querySelector('#auth-address')?.value||'').trim();
const valid=method==='email'?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address):/^[6-9]\d{9}$/.test(address);
if(!valid){error=method==='email'?'Enter a valid email address for the demo.':'Enter a 10-digit Indian mobile number.';const note=root.querySelector('#entry-error');if(note)note.textContent=error;return;}
code='';error='';step='verify';render();
}else if(e.target.id==='login-verify'){
e.preventDefault();code=(root.querySelector('#auth-code')?.value||'').trim();
if(code!==SAMPLE){error='Use the displayed demonstration code '+SAMPLE+'.';const note=root.querySelector('#entry-error');if(note)note.textContent=error;return;}
address='';code='';error='';step='done';render();
}
});
render();
})();