@props([
    'variant' => 'primary',
    'type' => 'button',
    'loading' => false,
])

<button
    type="{{ $type }}"
    {{ $attributes->class(['z-btn', "z-btn--{$variant}", 'is-loading' => $loading]) }}
    @disabled($loading || $attributes->has('disabled'))
>
    @if($loading)
        <span class="z-spinner" aria-hidden="true"></span>
    @endif
    <span>{{ $slot }}</span>
</button>
