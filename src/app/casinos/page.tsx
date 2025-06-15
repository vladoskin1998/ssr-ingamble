import { LogoLoader } from '@/components/loader/LogoLoader'
import MainPage from '@/pages-component/main-page'
import { Suspense } from 'react'

export default async function Casino() {
    const src = 'get-data-hub-page-casino/'

    return (
        <Suspense fallback={<LogoLoader />}>
            <MainPage src={src} />
        </Suspense>
    )
}
