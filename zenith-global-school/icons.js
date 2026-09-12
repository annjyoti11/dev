(() => {
  const iconMap = {
    'Dashboard':'layout-dashboard','Admissions':'clipboard-list','Students':'graduation-cap','Attendance':'calendar-check-2','Fees & Accounts':'indian-rupee','Staff':'users-round','Timetable':'calendar-days','Notices':'megaphone','Reports':'chart-no-axes-combined','Examinations':'file-check-2','Community Centre':'messages-square','Digital Learning':'monitor-play',
    'Default KPI':'gauge','Success KPI':'circle-check-big','Open Enquiries':'message-circle-question','Applications':'files','Verification Pending':'badge-alert','Selected':'circle-check-big','Total Students':'users','Active':'user-check','New Admissions':'user-plus','Needs Attention':'triangle-alert','Admissions':'clipboard-list'
  };
  const actionMap = [
    ['New Enquiry','plus'],['Add Student','user-plus'],['Filter','list-filter'],['Reset','rotate-ccw'],['View','eye'],['Edit','pencil'],['Delete','trash-2'],['Close','x'],['Convert to Application','arrow-right-circle'],['Open Full Profile','external-link'],['Open Detail Drawer','panel-right-open'],['Save Record','save'],['Cancel','x'],['Success Toast','circle-check'],['Warning Toast','triangle-alert'],['Error Toast','circle-x'],['Confirm Action','shield-alert']
  ];
  const mk = name => { const i=document.createElement('i'); i.setAttribute('data-lucide',name); i.className='z-icon'; return i; };
  document.querySelectorAll('.nav a').forEach(a=>{ const t=a.textContent.trim(); if(iconMap[t] && !a.querySelector('[data-lucide]')) a.prepend(mk(iconMap[t])); });
  document.querySelectorAll('.kpi').forEach(k=>{ const l=k.querySelector('label'); const t=l?.textContent.trim(); if(t && iconMap[t] && !k.querySelector('.kpi-icon')) { const w=document.createElement('div'); w.className='kpi-icon'; w.appendChild(mk(iconMap[t])); k.prepend(w); } });
  document.querySelectorAll('button,a').forEach(el=>{ const txt=el.textContent.trim(); const hit=actionMap.find(([label])=>txt===label || txt.endsWith(label)); if(hit && !el.querySelector('[data-lucide]')) el.prepend(mk(hit[1])); });
  document.querySelectorAll('.search').forEach(input=>{ if(input.parentElement?.classList.contains('search-wrap')) return; const w=document.createElement('label'); w.className='search-wrap'; const p=input.parentNode; p.insertBefore(w,input); w.appendChild(mk('search')); w.appendChild(input); });
  const style=document.createElement('style');
  style.textContent=`
    .z-icon{width:18px;height:18px;stroke-width:1.9;flex:0 0 auto}.nav a{gap:11px!important}.nav a .z-icon{color:#64748b}.nav a.active .z-icon{color:var(--primary)}
    .btn,.actions button,.rowactions button,.rowactions a{display:inline-flex;align-items:center;justify-content:center;gap:7px}.btn .z-icon,.actions .z-icon,.rowactions .z-icon{width:16px;height:16px}
    .kpi{position:relative}.kpi-icon{position:absolute;right:16px;top:16px;width:34px;height:34px;border-radius:9px;background:var(--soft);color:var(--primary);display:grid;place-items:center}.kpi-icon .z-icon{width:17px;height:17px}
    .search-wrap{position:relative;display:block}.search-wrap>.z-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);width:16px;height:16px;color:var(--muted);pointer-events:none}.search-wrap>.search{padding-left:36px!important}
    @media(max-width:1279px){.nav a{justify-content:center}.nav a .z-icon{width:20px;height:20px}.search-wrap>.z-icon{left:12px}.search-wrap>.search{padding-left:36px!important}}
  `;
  document.head.appendChild(style);
  if(window.lucide) window.lucide.createIcons();
})();