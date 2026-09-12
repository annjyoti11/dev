@props(['title' => null])
<section {{ $attributes->class(['z-card']) }}>
    @if($title || isset($actions))
        <header class="z-card__header">
            @if($title)<h2 class="z-card__title">{{ $title }}</h2>@endif
            @isset($actions)<div class="z-card__actions">{{ $actions }}</div>@endisset
        </header>
    @endif
    <div class="z-card__body">{{ $slot }}</div>
</section>
