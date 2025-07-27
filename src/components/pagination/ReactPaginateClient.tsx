'use client'
import dynamic from 'next/dynamic'

// Динамічне завантаження ReactPaginate без SSR
const ReactPaginate = dynamic(() => import('react-paginate'), {
    ssr: false,
    loading: () => <div className="pagination-loading">Loading pagination...</div>
})

export default ReactPaginate
