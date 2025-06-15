import type { Metadata } from 'next'
import '../../styles/style.css'
import '../components/loader/loader.css'
import '../../styles//header.css'
import Navbar from '@/components/navbar'

import Footer from '@/components/footer'

import { Header } from '@/components/header'
import RootLayoutProvider from '@/context/RootLayoutProvider'
import Script from 'next/script'

export const metadata: Metadata = {
    title: 'inGamble - Premium Gambling Platform',
    description:
        'Explore inGamble, the top platform for online casino reviews. Access the most extensive array of bonuses, loyalty programs, and detailed casino analysis tailored to your preferences. Trusted by players worldwide for honesty and transparency.',
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
                <link rel="icon" href="/src/assets/img/favicon.png" type="image/x-icon" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap" />
                <noscript>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap" />
                </noscript>

                <Script src={`https://www.googletagmanager.com/gtag/js?id=G-42W5MNLRR0`} strategy="afterInteractive" async />
                <Script id="gtag-init" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-42W5MNLRR0');
          `}
                </Script>

                <link rel="icon" href="/src/assets/img/favicon.png" type="image/x-icon" />

                <meta name="description" content="%VITE_META_DESCRIPTION%" />
                <meta name="keywords" content="%VITE_META_KEYWORDS%" />
                <meta name="author" content="%VITE_META_AUTHOR%" />
                <title>inGamble - Premium Gambling Platform</title>
                <base href="/" />
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
                            <Navbar />
                            <div className="gamble__body">
                                <Header />
                                <>{children}</>
                                <Footer />
                            </div>
                        </div>
                    </div>
                </RootLayoutProvider>
            </body>
        </html>
    )
}
