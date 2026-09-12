@props([
    'label',
    'name',
    'hint' => null,
    'required' => false,
])

<div class="z-field" @class(['has-error' => $errors->has($name)])>
    <label class="z-field__label" for="{{ $name }}">
        {{ $label }}
        @if($required)
            <span class="z-field__required" aria-hidden="true">*</span>
        @endif
    </label>

    <div class="z-field__control">
        {{ $slot }}
    </div>

    @error($name)
        <p class="z-field__error" id="{{ $name }}-error">{{ $message }}</p>
    @else
        @if($hint)
            <p class="z-field__hint">{{ $hint }}</p>
        @endif
    @enderror
</div>
