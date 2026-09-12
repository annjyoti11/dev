@props([
    'label',
    'value' => '—',
    'meta' => null,
    'tone' => 'default',
])

<article {{ $attributes->class(['z-kpi', "z-kpi--{$tone}"]) }}>
    <span class="z-kpi__label">{{ $label }}</span>
    <strong class="z-kpi__value">{{ $value }}</strong>
    @if($meta)
        <small class="z-kpi__meta">{{ $meta }}</small>
    @endif
</article>
