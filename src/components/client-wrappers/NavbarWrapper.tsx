'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/navbar'

const NavbarWrapper = () => {
    const pathname = usePathname()
    
    // Force re-render when pathname changes by using it as key
    return <Navbar key={pathname} />
}

export default NavbarWrapper
