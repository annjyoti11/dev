<header class="z-topbar">
    <div class="z-topbar__left">
        <button type="button" class="z-icon-btn" @click="sidebarOpen = !sidebarOpen" aria-label="Toggle sidebar">☰</button>
        <button type="button" class="z-global-search">Search students, applicants, staff, receipts… <kbd>⌘K</kbd></button>
    </div>
    <div class="z-topbar__right">
        <label class="z-session"><span>Academic Session</span><select class="z-select"><option>2026–27</option></select></label>
        <button class="z-icon-btn" type="button" aria-label="Notifications">🔔</button>
        <div class="z-user-chip"><span class="z-avatar">A</span><span><strong>Administrator</strong><small>School Admin</small></span></div>
    </div>
</header>
