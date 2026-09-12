@props([
    'variant' => 'primary',
    'label' => null,
    'loadingLabel' => 'Saving…',
])

<button
    type="submit"
    {{ $attributes->class(['z-btn', "z-btn--{$variant}"]) }}
    x-bind:disabled="submitting"
    x-bind:aria-busy="submitting.toString()"
>
    <span class="z-spinner" x-show="submitting" x-cloak aria-hidden="true"></span>
    <span x-show="!submitting">{{ $label ?? $slot }}</span>
    <span x-show="submitting" x-cloak>{{ $loadingLabel }}</span>
</button>
