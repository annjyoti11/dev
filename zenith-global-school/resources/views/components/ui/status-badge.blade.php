@props([
    'tone' => 'neutral',
])

<span {{ $attributes->class(['z-badge', "z-badge--{$tone}"]) }}>
    {{ $slot }}
</span>
