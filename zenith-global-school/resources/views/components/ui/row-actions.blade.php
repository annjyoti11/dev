@props([
    'label' => 'Row actions',
])

<div class="z-row-actions" x-data="{ open: false }" @keydown.escape.window="open = false">
    <button
        type="button"
        class="z-icon-btn z-row-actions__trigger"
        @click="open = !open"
        :aria-expanded="open.toString()"
        aria-haspopup="menu"
        aria-label="{{ $label }}"
    >
        ⋯
    </button>

    <div class="z-row-actions__menu" x-show="open" x-cloak @click.outside="open = false" role="menu">
        {{ $slot }}
    </div>
</div>
