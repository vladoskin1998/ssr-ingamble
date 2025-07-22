import { useEffect, useState } from 'react'
import { sanitizeLink } from '@/helper'

/**
 * Hook to handle cloaking links safely for SSR/hydration
 * Returns a consistent value during SSR and updates on client-side
 */
export const useHydratedLink = (name: string | undefined): string => {
    const [link, setLink] = useState<string>('https://ingamble.com/go')
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!name) {
                setLink(`https://${window.location.host}`)
            } else {
                const domain = name.toLocaleLowerCase().replace(/\s/gm, '-')
                setLink(`https://${window.location.host}${domain && '/' + sanitizeLink(domain)}/go`)
            }
        }
    }, [name])
    
    return link
}
