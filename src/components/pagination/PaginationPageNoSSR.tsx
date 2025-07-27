'use client'
import dynamic from 'next/dynamic'

// Повністю відключаємо SSR для компонента пагінації
const PaginationPageClient = dynamic(
    () => import('./PaginationPage').then(mod => ({ default: mod.PaginationPage })),
    {
        ssr: false,
        loading: () => <div className="pagination-loading">Loading...</div>
    }
)

export default PaginationPageClient
