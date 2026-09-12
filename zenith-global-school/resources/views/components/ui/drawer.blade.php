@props([
    'title' => null,
    'name' => 'drawerOpen',
    'width' => '480px',
])

<div
    class="z-drawer-root"
    x-show="{{ $name }}"
    x-cloak
    @keydown.escape.window="{{ $name }} = false"
>
    <div class="z-drawer-backdrop" @click="{{ $name }} = false"></div>

    <aside
        class="z-drawer"
        role="dialog"
        aria-modal="true"
        style="--z-drawer-width: {{ $width }}"
        x-transition:enter="z-drawer-enter"
        x-transition:enter-start="z-drawer-enter-start"
        x-transition:enter-end="z-drawer-enter-end"
        x-transition:leave="z-drawer-leave"
        x-transition:leave-start="z-drawer-leave-start"
        x-transition:leave-end="z-drawer-leave-end"
    >
        <header class="z-drawer__header">
            <div>
                @if($title)
                    <h2 class="z-drawer__title">{{ $title }}</h2>
                @endif
                @isset($subtitle)
                    <div class="z-drawer__subtitle">{{ $subtitle }}</div>
                @endisset
            </div>
            <button type="button" class="z-icon-btn" @click="{{ $name }} = false" aria-label="Close panel">×</button>
        </header>

        <div class="z-drawer__body">{{ $slot }}</div>

        @isset($footer)
            <footer class="z-drawer__footer">{{ $footer }}</footer>
        @endisset
    </aside>
</div>
