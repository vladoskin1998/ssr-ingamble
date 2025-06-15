'use client'

type VisitCasinoButtonProps = {
    casinoName: string
    affiliateLink: string
    urlCasino: string
}

import { cloacingFetch, cloacingLink } from '../../helper'

export function CloakingButton({ casinoName, affiliateLink, urlCasino }: VisitCasinoButtonProps) {
    return (
        <a
            href={cloacingLink(casinoName)}
            onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                cloacingFetch(affiliateLink)
                window.open(affiliateLink || urlCasino, '_blank', 'noopener,noreferrer')
            }}
            className="bottom-content-item-loyaltie-programs__btn-view"
        >
            Visit Casino
        </a>
    )
}
