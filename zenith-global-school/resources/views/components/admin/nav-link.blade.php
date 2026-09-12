@props(['route','label'])
@php
    $href = Route::has($route) ? route($route) : '#';
    $active = Route::has($route) ? request()->routeIs($route) : false;
@endphp
<a href="{{ $href }}" @class(['z-nav-link','is-active' => $active]) @if($active) aria-current="page" @endif>
    <span class="z-nav-link__label">{{ $label }}</span>
</a>
