<div class="z-toast-stack" x-data="zenithToasts()" x-init="init()" aria-live="polite" aria-atomic="true">
    <template x-for="toast in toasts" :key="toast.id">
        <div class="z-toast" :class="'z-toast--' + toast.type" x-show="toast.visible" x-transition>
            <div class="z-toast__body"><strong x-text="toast.title"></strong><span x-text="toast.message"></span></div>
            <button class="z-toast__close" type="button" @click="dismiss(toast.id)" aria-label="Dismiss notification">×</button>
        </div>
    </template>
</div>
