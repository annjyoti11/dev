<div class="z-modal-root" x-data="zenithConfirm()" x-show="open" x-cloak @keydown.escape.window="cancel()">
    <div class="z-modal-backdrop" @click="cancel()"></div>
    <section class="z-modal" role="dialog" aria-modal="true" aria-labelledby="z-confirm-title" aria-describedby="z-confirm-message">
        <h2 id="z-confirm-title" class="z-modal__title" x-text="title"></h2>
        <p id="z-confirm-message" class="z-modal__text" x-text="message"></p>
        <div class="z-modal__actions">
            <button type="button" class="z-btn z-btn--secondary" @click="cancel()">Cancel</button>
            <button
                type="button"
                class="z-btn"
                :class="tone === 'primary' ? 'z-btn--primary' : 'z-btn--danger'"
                @click="confirm()"
                x-text="confirmLabel"
            ></button>
        </div>
    </section>
</div>
