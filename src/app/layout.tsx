import type { Metadata } from "next"
import "../../styles/style.css"
import '../components/loader/loader.css'
import '../../styles//header.css'
import Navbar from "@/components/navbar"

import Footer from "@/components/footer"


import { Header } from "@/components/header"
import RootLayoutProvider from "@/context/RootLayoutProvider"


export const metadata: Metadata = {
    title: "inGamble - Premium Gambling Platform",
    description:
        "Explore inGamble, the top platform for online casino reviews. Access the most extensive array of bonuses, loyalty programs, and detailed casino analysis tailored to your preferences. Trusted by players worldwide for honesty and transparency.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
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
