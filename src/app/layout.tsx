import type { Metadata } from 'next'
import '../../styles/style.css'
import '../components/loader/loader.css'
import '../../styles//header.css'
import NavbarWrapper from '@/components/client-wrappers/NavbarWrapper'
import { Header } from '@/components/header'
import RootLayoutProvider from '@/context/RootLayoutProvider'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'inGamble - Premium Gambling Platform',
    description:
        'Explore inGamble, the top platform for online casino reviews. Access the most extensive array of bonuses, loyalty programs, and detailed casino analysis tailored to your preferences. Trusted by players worldwide for honesty and transparency.',
    keywords: 'online casino, casino reviews, gambling, bonuses, loyalty programs, casino analysis, slot games, trusted casinos, casino ratings, gambling guide',
    authors: [{ name: 'inGamble Team' }],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    icons: {
        icon: '/img/favicon.png',
        shortcut: '/img/favicon.png',
        apple: '/img/favicon.png',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap" />
                <noscript>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap" />
                </noscript>

                <link rel="icon" href="/img/favicon.png" type="image/x-icon" />
            </head>
            <body>
                <RootLayoutProvider>
                    <div className="wrapper">
                        <div className="lh-gauge__wrapper">
                            <div className="lh-gauge__percentage"></div>
                            <svg className="lh-gauge-arc" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" strokeWidth="10" fill="none"></circle>
                            </svg>
                        </div>
                        <div className="gamble">
                            <NavbarWrapper />
                            <div className="gamble__body">
                                <Header />
                            < >{children}</>
                            </div>
                        </div>
                    </div>
                </RootLayoutProvider>

                <Script src={`https://www.googletagmanager.com/gtag/js?id=G-42W5MNLRR0`} strategy="afterInteractive" />
                <Script id="gtag-init" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-42W5MNLRR0');
          `}
                </Script>
            </body>
        </html>
    )
}
