<aside class="z-sidebar" :class="{ 'is-collapsed': !sidebarOpen }" aria-label="Primary">
    <div class="z-sidebar__brand">
        <a href="{{ route('admin.dashboard') }}" class="z-brand">
            <span class="z-brand__mark" aria-hidden="true">ZG</span>
            <span class="z-brand__text"><strong>Zenith Global</strong><small>Senior Secondary School</small></span>
        </a>
        <button type="button" class="z-icon-btn" @click="sidebarOpen = !sidebarOpen" aria-label="Toggle sidebar">☰</button>
    </div>

    <nav class="z-nav">
        <x-admin.nav-link route="admin.dashboard" label="Dashboard" />
        <x-admin.nav-link route="admin.admissions.index" label="Admissions" />
        <x-admin.nav-link route="admin.students.index" label="Students" />
        <x-admin.nav-link route="admin.attendance.students.index" label="Attendance" />
        <x-admin.nav-link route="admin.fees.index" label="Fees & Accounts" />
        <x-admin.nav-link route="admin.staff.index" label="Staff" />
        <x-admin.nav-link route="admin.timetable.index" label="Timetable" />
        <x-admin.nav-link route="admin.notices.index" label="Notices" />
        <x-admin.nav-link route="admin.reports.index" label="Reports" />
        <div class="z-nav__section-label">Academic Platform</div>
        <x-admin.nav-link route="admin.examinations.index" label="Examinations" />
        <x-admin.nav-link route="admin.community.index" label="Community Centre" />
        <x-admin.nav-link route="admin.learning.index" label="Digital Learning" />
    </nav>
</aside>
