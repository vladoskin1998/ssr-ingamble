'use client'

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoadingProvider, useLoading } from '@/context/LoadingContext'
import { LoadingLink } from '@/components/LoadingLink'

// Mock Next.js router
jest.mock('next/navigation', () => ({
    usePathname: () => '/test',
    useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
    }),
}))

// Mock LogoLoader
jest.mock('@/components/loader/LogoLoader', () => ({
    LogoLoader: () => <div data-testid="logo-loader">Loading...</div>
}))

const TestComponent = () => {
    const { isGlobalLoading, startLoading, setContentLoaded } = useLoading()
    
    return (
        <div>
            <button onClick={startLoading} data-testid="start-loading">
                Start Loading
            </button>
            <button onClick={setContentLoaded} data-testid="stop-loading">
                Stop Loading
            </button>
            <div data-testid="loading-status">
                {isGlobalLoading ? 'Loading' : 'Not Loading'}
            </div>
            <LoadingLink href="/test-page" data-testid="test-link">
                Test Link
            </LoadingLink>
        </div>
    )
}

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <LoadingProvider>{children}</LoadingProvider>
)

describe('Global Loading System', () => {
    it('should show loader when startLoading is called', async () => {
        render(
            <TestWrapper>
                <TestComponent />
            </TestWrapper>
        )

        const startButton = screen.getByTestId('start-loading')
        const status = screen.getByTestId('loading-status')

        expect(status).toHaveTextContent('Not Loading')
        expect(screen.queryByTestId('logo-loader')).not.toBeInTheDocument()

        fireEvent.click(startButton)

        await waitFor(() => {
            expect(status).toHaveTextContent('Loading')
            expect(screen.getByTestId('logo-loader')).toBeInTheDocument()
        })
    })

    it('should hide loader when setContentLoaded is called', async () => {
        render(
            <TestWrapper>
                <TestComponent />
            </TestWrapper>
        )

        const startButton = screen.getByTestId('start-loading')
        const stopButton = screen.getByTestId('stop-loading')
        const status = screen.getByTestId('loading-status')

        // Start loading
        fireEvent.click(startButton)
        await waitFor(() => {
            expect(status).toHaveTextContent('Loading')
        })

        // Stop loading
        fireEvent.click(stopButton)
        await waitFor(() => {
            expect(status).toHaveTextContent('Not Loading')
            expect(screen.queryByTestId('logo-loader')).not.toBeInTheDocument()
        }, { timeout: 1000 })
    })

    it('should start loading when LoadingLink is clicked', async () => {
        render(
            <TestWrapper>
                <TestComponent />
            </TestWrapper>
        )

        const link = screen.getByTestId('test-link')
        const status = screen.getByTestId('loading-status')

        expect(status).toHaveTextContent('Not Loading')

        fireEvent.click(link)

        await waitFor(() => {
            expect(status).toHaveTextContent('Loading')
            expect(screen.getByTestId('logo-loader')).toBeInTheDocument()
        })
    })
})
