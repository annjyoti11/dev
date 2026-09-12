@props(['label' => null])

<div class="z-table-wrap" @if($label) role="region" aria-label="{{ $label }}" tabindex="0" @endif>
    <table {{ $attributes->class(['z-table']) }}>
        {{ $slot }}
    </table>
</div>
