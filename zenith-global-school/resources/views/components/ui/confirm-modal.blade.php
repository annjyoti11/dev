<div class="z-modal-root" x-data="zenithConfirm()" x-show="open" x-cloak @keydown.escape.window="cancel()">
    <div class="z-modal-backdrop" @click="cancel()"></div>
    <section class="z-modal" role="dialog" aria-modal="true">
        <h2 class="z-modal__title" x-text="title"></h2>
        <p class="z-modal__text" x-text="message"></p>
        <div class="z-modal__actions">
            <button type="button" class="z-btn z-btn--secondary" @click="cancel()">Cancel</button>
            <button type="button" class="z-btn z-btn--danger" @click="confirm()">Confirm</button>
        </div>
    </section>
</div>
