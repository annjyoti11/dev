@props([
    'title' => 'Unable to load this section',
    'message' => 'Please try again. If the problem continues, contact an administrator.',
])

<div {{ $attributes->class(['z-state', 'z-state--error']) }} role="alert">
    <div class="z-state__icon" aria-hidden="true">!</div>
    <div class="z-state__content">
        <h3 class="z-state__title">{{ $title }}</h3>
        <p class="z-state__message">{{ $message }}</p>
        @isset($actions)
            <div class="z-state__actions">{{ $actions }}</div>
        @endisset
    </div>
</div>
