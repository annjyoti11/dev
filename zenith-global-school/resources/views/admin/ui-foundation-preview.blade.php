<x-layouts.admin title="UI Foundation Preview">
    <x-ui.page-header title="UI Foundation Preview" subtitle="Temporary visual QA page for shared admin components." />

    <div class="z-grid z-grid--3 z-dashboard-row">
        <x-ui.kpi-card label="Default KPI" value="842" meta="Reusable metric card" />
        <x-ui.kpi-card label="Success KPI" value="92.9%" meta="Positive operational state" tone="success" />
        <x-ui.kpi-card label="Admissions" value="86" meta="18 awaiting review" />
    </div>

    <x-ui.card title="Statuses & Feedback" class="z-dashboard-row">
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px">
            <x-ui.status-badge>Draft</x-ui.status-badge>
            <x-ui.status-badge tone="success">Active</x-ui.status-badge>
            <x-ui.status-badge tone="warning">Pending</x-ui.status-badge>
            <x-ui.status-badge tone="danger">Rejected</x-ui.status-badge>
            <x-ui.status-badge tone="info">In Review</x-ui.status-badge>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:10px">
            <x-ui.button onclick="zenithToast('success','The record was saved successfully.')">Success Toast</x-ui.button>
            <x-ui.button variant="secondary" onclick="zenithToast('warning','This record still needs verification.')">Warning Toast</x-ui.button>
            <x-ui.button variant="secondary" onclick="zenithToast('error','The request could not be completed.')">Error Toast</x-ui.button>
            <x-ui.button variant="danger" onclick="zenithConfirmAction({title:'Deactivate record?',message:'The record will remain in history but will no longer be active.',confirmLabel:'Deactivate',onConfirm:()=>zenithToast('success','Record deactivated.')})">Confirm Action</x-ui.button>
        </div>
    </x-ui.card>

    <x-ui.card title="Form & Submission" class="z-dashboard-row">
        <x-ui.form action="#" method="POST" x-on:submit.prevent="setTimeout(() => { submitting = false; zenithToast('success','Demo form submitted successfully.'); }, 900)">
            <div class="z-form-grid">
                <x-ui.field label="Full Name" name="preview_name" required>
                    <input class="z-input" id="preview_name" name="preview_name" value="Anup Jyoti Das">
                </x-ui.field>

                <x-ui.field label="Department" name="preview_department" hint="Shared select styling">
                    <select class="z-select" id="preview_department" name="preview_department">
                        <option>Administration</option>
                        <option>Science</option>
                    </select>
                </x-ui.field>
            </div>

            <div class="z-form-actions">
                <x-ui.button variant="secondary">Cancel</x-ui.button>
                <x-ui.submit-button>Save Record</x-ui.submit-button>
            </div>
        </x-ui.form>
    </x-ui.card>

    <div class="z-grid z-grid--3 z-dashboard-row">
        <x-ui.card title="Empty State">
            <x-ui.empty-state title="No enquiries found" message="New enquiries will appear here once they are received." />
        </x-ui.card>

        <x-ui.card title="Loading State">
            <x-ui.loading-state :rows="4" />
        </x-ui.card>

        <x-ui.card title="Error State">
            <x-ui.error-state title="Unable to load records" message="The data source did not respond. Try again." />
        </x-ui.card>
    </div>

    <x-ui.card title="Table, Actions & Pagination">
        <x-ui.data-table>
            <thead>
                <tr><th>Name</th><th>Type</th><th>Status</th><th style="text-align:right">Actions</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>Sample Applicant</td>
                    <td>Admission</td>
                    <td><x-ui.status-badge tone="warning">Pending</x-ui.status-badge></td>
                    <td style="text-align:right">
                        <x-ui.row-actions>
                            <a href="#">View</a>
                            <button type="button">Edit</button>
                            <button type="button" class="is-danger" onclick="zenithConfirmAction({title:'Delete record?',message:'This destructive action requires confirmation.',confirmLabel:'Delete'})">Delete</button>
                        </x-ui.row-actions>
                    </td>
                </tr>
            </tbody>
        </x-ui.data-table>
        <div class="z-pagination">
            <div class="z-pagination__summary">Showing 1–1 of 1</div>
            <div class="z-pagination__controls">
                <span class="z-page-btn is-disabled">Previous</span>
                <span class="z-pagination__current">Page 1 of 1</span>
                <span class="z-page-btn is-disabled">Next</span>
            </div>
        </div>
    </x-ui.card>

    <div x-data="{ previewDrawer: false }" style="margin-top:20px">
        <x-ui.button variant="secondary" @click="previewDrawer = true">Open Detail Drawer</x-ui.button>
        <x-ui.drawer name="previewDrawer" title="Record Details">
            <x-slot:subtitle>Shared contextual detail panel</x-slot:subtitle>
            <p class="z-muted">This drawer pattern will be reused for Admissions, Students, Staff and Finance record details where a full page is not required.</p>
            <x-slot:footer>
                <x-ui.button variant="secondary" @click="previewDrawer = false">Close</x-ui.button>
                <x-ui.button>Edit Record</x-ui.button>
            </x-slot:footer>
        </x-ui.drawer>
    </div>
</x-layouts.admin>
