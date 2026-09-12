@props([
    'title' => 'Nothing to show yet',
    'message' => null,
    'icon' => '—',
])

<div {{ $attributes->class(['z-state', 'z-state--empty']) }} role="status">
    <div class="z-state__icon" aria-hidden="true">{{ $icon }}</div>
    <div class="z-state__content">
        <h3 class="z-state__title">{{ $title }}</h3>
        @if($message)
            <p class="z-state__message">{{ $message }}</p>
        @endif
        @isset($actions)
            <div class="z-state__actions">{{ $actions }}</div>
        @endisset
    </div>
</div>
