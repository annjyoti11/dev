@if ($errors->any())
    <div class="z-form-errors" role="alert" aria-live="assertive">
        <div class="z-form-errors__title">Please review the highlighted fields.</div>
        <ul class="z-form-errors__list">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
