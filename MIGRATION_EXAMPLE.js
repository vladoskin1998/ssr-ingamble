// Приклад міграції casino сторінки

// Було у /src/app/casino/[casino_slug]/page.tsx:
/*
import Link from 'next/link'

if (isLoading || !geoLocation.isLoadedGeo) return <LogoLoader />

return (
    <main>
        <Link href="/all-casinos">Back to casinos</Link>
        // контент...
    </main>
)
*/

// Стало:
/*
import { LoadingLink } from '@/components/LoadingLink'
import { usePageLoading } from '@/hooks/usePageLoading'

const { markAsLoaded } = usePageLoading({
    autoComplete: false,
    dependencies: [data, geoLocation.isLoadedGeo]
})

useEffect(() => {
    if (!isLoading && geoLocation.isLoadedGeo && data) {
        // Всі дані завантажені, контент готовий
        setTimeout(() => {
            markAsLoaded()
        }, 200)
    }
}, [isLoading, geoLocation.isLoadedGeo, data, markAsLoaded])

// Видаляємо локальний лоадер:
// if (isLoading || !geoLocation.isLoadedGeo) return <LogoLoader />

return (
    <main>
        <LoadingLink href="/all-casinos">Back to casinos</LoadingLink>
        // контент...
    </main>
)
*/
