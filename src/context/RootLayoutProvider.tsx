'use client'

import Icons from "@/components/wraper/Icons"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AdaptiveProvider } from "./AppContext"
import { FilterProvider } from "./FilterContext"
import { LoadingProvider } from "./LoadingContext"



const queryClient = new QueryClient()

export default function RootLayoutProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <LoadingProvider>
                <AdaptiveProvider>
                    <FilterProvider>
                        <Icons />
                        {children}
                    </FilterProvider>
                </AdaptiveProvider>
            </LoadingProvider>
        </QueryClientProvider>
    )
}