(() => {
  "use strict";
  const app=document.getElementById("app"), title=document.getElementById("active-title"),notice=document.getElementById("demo-notice");
  const labels={login:"Login screen",home:"Home · layout draft",plan:"My Plan · hierarchy draft",workout:"Workout · layout draft",nutrition:"Nutrition · layout draft"};
  const valid=Object.keys(labels);
  function show(screen){
    if(!valid.includes(screen))return;
    document.querySelectorAll(".screen").forEach(x=>{x.classList.toggle("active",x.dataset.screen===screen)});
    document.querySelectorAll(".screen-nav button").forEach(x=>{x.classList.toggle("active",x.dataset.target===screen);x.setAttribute("aria-current",x.dataset.target===screen?"page":"false")});
    title.textContent=labels[screen];history.replaceState(null,"","#"+screen);
    document.getElementById("phone").scrollIntoView({block:"nearest",behavior:"smooth"});
  }
  document.querySelectorAll("[data-target],[data-go]").forEach(btn=>btn.addEventListener("click",()=>show(btn.dataset.target||btn.dataset.go)));
  document.getElementById("appearance").addEventListener("change",e=>{app.dataset.theme=e.target.value});
  document.getElementById("account").addEventListener("change",e=>{app.dataset.account=e.target.value;notice.textContent="Account appearance switched for design review only. No entitlements or live API calls."});
  const phone=document.getElementById("phone"), viewport=document.getElementById("viewport");
  viewport.addEventListener("click",()=>{const wide=phone.classList.toggle("desktop");viewport.setAttribute("aria-pressed",String(wide));viewport.textContent=wide?"Mobile width":"Desktop width"});
  document.querySelectorAll("[data-login]").forEach(b=>b.addEventListener("click",()=>{
    document.querySelectorAll("[data-login]").forEach(x=>x.classList.toggle("selected",x===b));
    const identity=document.getElementById("identity");identity.placeholder=b.dataset.login==="Email"?"Email address":"Mobile number";identity.value="";
  }));
  document.getElementById("toggle-password").addEventListener("click",e=>{const input=document.getElementById("demo-password");input.type=input.type==="password"?"text":"password";e.currentTarget.textContent=input.type==="password"?"Show":"Hide"});
  document.getElementById("demo-signin").addEventListener("click",()=>{notice.textContent="Demo only — no credentials are sent or stored.";show("home")});
  document.getElementById("feedback-demo").addEventListener("click",()=>{notice.textContent="Revision request is a visual placeholder. Actual coach approval remains in Flutter/Laravel."});
  document.getElementById("start-demo").addEventListener("click",()=>{notice.textContent="Workout start is a design placeholder. Set logging remains in Flutter/Laravel."});
  const requested=location.hash.slice(1);if(valid.includes(requested))show(requested);
})();