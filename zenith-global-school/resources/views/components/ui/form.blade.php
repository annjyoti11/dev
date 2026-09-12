@props([
    'method' => 'POST',
    'action' => null,
])

@php
    $httpMethod = strtoupper($method);
    $formMethod = in_array($httpMethod, ['GET', 'POST'], true) ? $httpMethod : 'POST';
@endphp

<form
    method="{{ $formMethod }}"
    @if($action) action="{{ $action }}" @endif
    x-data="{ submitting: false }"
    @submit="submitting = true"
    {{ $attributes->class(['z-form']) }}
>
    @if($formMethod !== 'GET')
        @csrf
    @endif

    @if(!in_array($httpMethod, ['GET', 'POST'], true))
        @method($httpMethod)
    @endif

    <x-ui.form-errors />

    {{ $slot }}
</form>
