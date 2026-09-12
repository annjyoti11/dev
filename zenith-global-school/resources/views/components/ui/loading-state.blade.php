@props([
    'rows' => 4,
    'label' => 'Loading content',
])

<div {{ $attributes->class(['z-loading-state']) }} role="status" aria-live="polite" aria-label="{{ $label }}">
    <span class="sr-only">{{ $label }}</span>
    @for($i = 0; $i < $rows; $i++)
        <div class="z-skeleton-row" aria-hidden="true">
            <span class="z-skeleton z-skeleton--short"></span>
            <span class="z-skeleton"></span>
            <span class="z-skeleton z-skeleton--medium"></span>
        </div>
    @endfor
</div>
