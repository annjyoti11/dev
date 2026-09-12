import './bootstrap';
import Alpine from 'alpinejs';
window.Alpine = Alpine;

window.zenithToasts = () => ({
    toasts: [],
    init() {
        const flash = window.__Z_FLASH__ || {};
        ['success', 'error', 'warning', 'info'].forEach((type) => {
            if (flash[type]) this.push(type, flash[type]);
        });

        window.addEventListener('zenith:toast', (event) => {
            const d = event.detail || {};
            this.push(d.type || 'info', d.message || '', d.title);
        });
    },
    push(type, message, title = null) {
        if (!message) return;

        const id = `${Date.now()}-${Math.random()}`;
        const labels = {
            success: 'Saved',
            error: 'Something went wrong',
            warning: 'Attention',
            info: 'Information',
        };

        this.toasts.push({
            id,
            type,
            message,
            title: title || labels[type] || labels.info,
            visible: true,
        });

        setTimeout(() => this.dismiss(id), type === 'error' ? 8000 : 4500);
    },
    dismiss(id) {
        const toast = this.toasts.find((item) => item.id === id);
        if (toast) toast.visible = false;

        setTimeout(() => {
            this.toasts = this.toasts.filter((item) => item.id !== id);
        }, 250);
    },
});

window.zenithConfirm = () => ({
    open: false,
    title: 'Confirm action',
    message: '',
    confirmLabel: 'Confirm',
    tone: 'danger',
    callback: null,
    init() {
        window.addEventListener('zenith:confirm', (event) => {
            const d = event.detail || {};
            this.title = d.title || 'Confirm action';
            this.message = d.message || 'Are you sure?';
            this.confirmLabel = d.confirmLabel || 'Confirm';
            this.tone = d.tone || 'danger';
            this.callback = d.onConfirm || null;
            this.open = true;
        });
    },
    confirm() {
        if (typeof this.callback === 'function') this.callback();
        this.open = false;
        this.callback = null;
    },
    cancel() {
        this.open = false;
        this.callback = null;
    },
});

window.zenithToast = (type, message, title = null) => {
    window.dispatchEvent(new CustomEvent('zenith:toast', {
        detail: { type, message, title },
    }));
};

window.zenithConfirmAction = ({
    title = 'Confirm action',
    message = 'Are you sure?',
    confirmLabel = 'Confirm',
    tone = 'danger',
    onConfirm = null,
} = {}) => {
    window.dispatchEvent(new CustomEvent('zenith:confirm', {
        detail: { title, message, confirmLabel, tone, onConfirm },
    }));
};

Alpine.start();
