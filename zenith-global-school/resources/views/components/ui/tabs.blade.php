@props([
    'items' => [],
    'active' => null,
])

<nav class="z-tabs" aria-label="Page sections">
    @foreach($items as $item)
        @php
            $label = is_array($item) ? ($item['label'] ?? '') : $item;
            $href = is_array($item) ? ($item['href'] ?? '#') : '#';
            $isActive = is_array($item) ? ($item['active'] ?? false) : ($active === $label);
        @endphp
        <a href="{{ $href }}" @class(['z-tab', 'is-active' => $isActive]) @if($isActive) aria-current="page" @endif>
            {{ $label }}
        </a>
    @endforeach
</nav>
