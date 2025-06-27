import { LogoLoader } from '@/components/loader/LogoLoader'
import MainPage from '@/pages-component/main-page'

export default async function Main() {
    const src = 'get-data-home-page/'

    return (
        <>
            <MainPage src={src} />
        </>
    )
}
