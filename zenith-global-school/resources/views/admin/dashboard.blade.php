<x-layouts.admin title="Dashboard">
    <x-ui.page-header title="Dashboard" subtitle="Academic Session 2026–27">
        <x-slot:actions><button class="z-btn z-btn--primary">Quick Actions</button></x-slot:actions>
    </x-ui.page-header>

    <div class="z-alert-strip">
        <a href="#">Admission applications awaiting document verification</a>
        <a href="#">Fee overdue items requiring attention</a>
        <a href="#">Classes with attendance submission pending</a>
    </div>

    <div class="z-kpi-grid">
        <div class="z-kpi"><span>Students</span><strong>—</strong><small>Active students</small></div>
        <div class="z-kpi"><span>Attendance Today</span><strong>—</strong><small>Present / Total</small></div>
        <div class="z-kpi"><span>Fees Collected</span><strong>—</strong><small>Current period</small></div>
        <div class="z-kpi"><span>Admissions Pipeline</span><strong>—</strong><small>Active applicants</small></div>
    </div>

    <div class="z-grid z-grid--7-5">
        <x-ui.card title="Today's Operations"><p class="z-muted">Timetable, substitutions, room changes and pending attendance.</p></x-ui.card>
        <x-ui.card title="Quick Actions"><div class="z-quick-grid"><button class="z-btn z-btn--primary">New Admission</button><button class="z-btn z-btn--secondary">Add Student</button><button class="z-btn z-btn--secondary">Review Attendance</button><button class="z-btn z-btn--secondary">Record Fee Payment</button><button class="z-btn z-btn--secondary">Create Notice</button><button class="z-btn z-btn--secondary">Generate Report</button></div></x-ui.card>
    </div>
</x-layouts.admin>
