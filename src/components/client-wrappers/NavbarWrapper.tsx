'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import Navbar from '@/components/navbar'
import { useFilterContext, initialCasinoFilters, initialBonusFilters, initialLoyaltiesFilters, RouteToNextFilter } from '@/context/FilterContext'

const NavbarWrapper = () => {
    const pathname = usePathname()
    const { setCasinoFilters, setBonusFilters, setLoyaltiesFilters, handlerCurrentRouteFilter } = useFilterContext()
    const prevPathnameRef = useRef<string | null>(null)
    
    useEffect(() => {
        // Only reset filters if pathname actually changed (not on first render)
        if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
            handlerCurrentRouteFilter(RouteToNextFilter.DEFAULT)
            setCasinoFilters(initialCasinoFilters)
            setBonusFilters(initialBonusFilters)
            setLoyaltiesFilters(initialLoyaltiesFilters)
        }
        prevPathnameRef.current = pathname
    }, [pathname, setCasinoFilters, setBonusFilters, setLoyaltiesFilters, handlerCurrentRouteFilter])
    
    // Force re-render when pathname changes by using it as key
    return <Navbar key={pathname} />
}

export default NavbarWrapper
