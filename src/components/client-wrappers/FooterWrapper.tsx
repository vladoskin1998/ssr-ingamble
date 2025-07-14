'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/footer'

export default function FooterWrapper() {
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        // Mark as hydrated immediately
        setIsHydrated(true)
        
        // Add class to body to control footer visibility via CSS
        document.body.classList.add('footer-ready')
        
        // Simple timeout to show footer after content loads
        const timer = setTimeout(() => {
            document.body.classList.add('footer-visible')
        }, 200)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    // Always render footer, but control visibility via CSS
    return (
        <div className={`footer-container ${isHydrated ? 'hydrated' : ''}`}>
            <Footer />
        </div>
    )
}
