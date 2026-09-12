@props([
    'paginator' => null,
])

@if($paginator && $paginator->hasPages())
    <nav class="z-pagination" aria-label="Pagination">
        <div class="z-pagination__summary">
            Showing {{ $paginator->firstItem() }}–{{ $paginator->lastItem() }} of {{ $paginator->total() }}
        </div>

        <div class="z-pagination__controls">
            @if($paginator->onFirstPage())
                <span class="z-page-btn is-disabled" aria-disabled="true">Previous</span>
            @else
                <a class="z-page-btn" href="{{ $paginator->previousPageUrl() }}" rel="prev">Previous</a>
            @endif

            <span class="z-pagination__current">Page {{ $paginator->currentPage() }} of {{ $paginator->lastPage() }}</span>

            @if($paginator->hasMorePages())
                <a class="z-page-btn" href="{{ $paginator->nextPageUrl() }}" rel="next">Next</a>
            @else
                <span class="z-page-btn is-disabled" aria-disabled="true">Next</span>
            @endif
        </div>
    </nav>
@endif
