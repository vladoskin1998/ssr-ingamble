'use client'

import Icons from "@/components/wraper/Icons"
import { QueryClient, QueryClientProvider } from "react-query"
import { AdaptiveProvider } from "./AppContext"
import { FilterProvider } from "./FilterContext"



const queryClient = new QueryClient()

export default function RootLayoutProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AdaptiveProvider>
                <FilterProvider>
                    <Icons />
                    {children}
                </FilterProvider>
            </AdaptiveProvider>
        </QueryClientProvider>
    )
}