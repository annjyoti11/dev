import './bootstrap';
import Alpine from 'alpinejs';
window.Alpine = Alpine;

window.zenithToasts = () => ({
    toasts: [],
    init() {
        window.addEventListener('zenith:toast', (event) => {
            const d = event.detail || {};
            this.push(d.type || 'info', d.message || '', d.title);
        });
    },
    push(type, message, title = null) {
        const id = `${Date.now()}-${Math.random()}`;
        const labels = { success: 'Saved', error: 'Something went wrong', warning: 'Attention', info: 'Information' };
        this.toasts.push({ id, type, message, title: title || labels[type], visible: true });
        setTimeout(() => this.dismiss(id), type === 'error' ? 8000 : 4500);
    },
    dismiss(id) {
        const t = this.toasts.find(i => i.id === id);
        if (t) t.visible = false;
        setTimeout(() => { this.toasts = this.toasts.filter(i => i.id !== id); }, 250);
    }
});

window.zenithConfirm = () => ({
    open: false, title: 'Confirm action', message: '', callback: null,
    init() {
        window.addEventListener('zenith:confirm', (event) => {
            const d = event.detail || {};
            this.title = d.title || 'Confirm action';
            this.message = d.message || 'Are you sure?';
            this.callback = d.onConfirm || null;
            this.open = true;
        });
    },
    confirm() { if (typeof this.callback === 'function') this.callback(); this.open = false; },
    cancel() { this.open = false; this.callback = null; }
});

Alpine.start();
