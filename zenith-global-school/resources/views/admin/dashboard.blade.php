<x-layouts.admin title="Dashboard">
    <x-ui.page-header
        title="Dashboard"
        subtitle="Daily school operations · Academic Session 2026–27"
    >
        <x-slot:actions>
            <x-ui.button>Quick Actions</x-ui.button>
        </x-slot:actions>
    </x-ui.page-header>

    <section class="z-alert-strip" aria-label="Items needing attention">
        <a href="#"><strong>Admissions</strong><span>8 applications awaiting document verification</span></a>
        <a href="#"><strong>Fees</strong><span>₹1,42,500 overdue across 23 students</span></a>
        <a href="#"><strong>Attendance</strong><span>2 classes have not submitted today's attendance</span></a>
    </section>

    <section class="z-kpi-grid" aria-label="Operational summary">
        <x-ui.kpi-card label="Students" value="842" meta="Active students" />
        <x-ui.kpi-card label="Attendance Today" value="92.9%" meta="782 / 842 present" tone="success" />
        <x-ui.kpi-card label="Fees Collected" value="₹6.42L" meta="Current month collection" />
        <x-ui.kpi-card label="Admissions Pipeline" value="86" meta="18 awaiting review · 12 selected" />
    </section>

    <section class="z-grid z-grid--7-5 z-dashboard-row">
        <x-ui.card title="Today's Operations">
            <div class="z-operation-summary">
                <span><strong>2</strong> substitutions</span>
                <span><strong>1</strong> room change</span>
                <span><strong>3</strong> attendance submissions pending</span>
            </div>

            <div class="z-operation-list">
                <div class="z-operation-row z-operation-row--head">
                    <span>Time</span><span>Class</span><span>Subject / Event</span><span>Teacher</span><span>Room</span>
                </div>
                <div class="z-operation-row"><span>08:15</span><span>X A</span><span>Mathematics</span><span>Rakesh Deka</span><span>201</span></div>
                <div class="z-operation-row"><span>09:00</span><span>VIII B</span><span>English</span><span>Madhuri Das</span><span>105</span></div>
                <div class="z-operation-row"><span>09:45</span><span>XI A</span><span>Physics</span><span>Sanjay Kalita</span><span>Lab 1</span></div>
                <div class="z-operation-row"><span>10:30</span><span>VII A</span><span>Social Science</span><span>Priyanka Bordoloi</span><span>112</span></div>
            </div>
        </x-ui.card>

        <x-ui.card title="Quick Actions">
            <div class="z-quick-grid">
                <x-ui.button>New Admission</x-ui.button>
                <x-ui.button variant="secondary">Add Student</x-ui.button>
                <x-ui.button variant="secondary">Review Attendance</x-ui.button>
                <x-ui.button variant="secondary">Record Fee Payment</x-ui.button>
                <x-ui.button variant="secondary">Create Notice</x-ui.button>
                <x-ui.button variant="secondary">Generate Report</x-ui.button>
            </div>
            <a href="#" class="z-card-link">More actions →</a>
        </x-ui.card>
    </section>

    <section class="z-grid z-grid--3 z-dashboard-row">
        <x-ui.card title="Admissions Overview">
            <div class="z-metric-list">
                <div><span>Enquiries</span><strong>124</strong></div>
                <div><span>Applications</span><strong>86</strong></div>
                <div><span>Under Review</span><strong>18</strong></div>
                <div><span>Selected</span><strong>12</strong></div>
                <div><span>Enrolled</span><strong>48</strong></div>
            </div>
        </x-ui.card>

        <x-ui.card title="Fees & Outstanding">
            <div class="z-metric-list">
                <div><span>Collected this month</span><strong>₹6.42L</strong></div>
                <div><span>Outstanding</span><strong>₹1.42L</strong></div>
                <div><span>Students overdue</span><strong>23</strong></div>
                <div><span>Due in next 7 days</span><strong>₹82K</strong></div>
            </div>
        </x-ui.card>

        <x-ui.card title="Attendance Exceptions">
            <div class="z-metric-list">
                <div><span>Classes pending</span><strong>3</strong></div>
                <div><span>Students absent</span><strong>38</strong></div>
                <div><span>Repeated absence flags</span><strong>7</strong></div>
                <div><span>Staff absent / leave</span><strong>5</strong></div>
            </div>
        </x-ui.card>
    </section>
</x-layouts.admin>
