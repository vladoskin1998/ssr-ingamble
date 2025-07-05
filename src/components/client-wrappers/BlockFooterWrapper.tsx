'use client'

import dynamic from 'next/dynamic'

const BlockFooter = dynamic(() => import('@/pages-component/main-page/BlockFooter'), {
    ssr: false
})

export default function BlockFooterWrapper() {
    return <BlockFooter />
}
