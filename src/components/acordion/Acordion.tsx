'use client' 

import React, { JSX, memo, useCallback, useEffect, useRef, useState } from "react"
import { useAccordion } from "@/hooks/useAccordion"

type AccordionItemProps = {
    heading: JSX.Element | string
    content: JSX.Element | string
    defaultOpen?: boolean
    isNested?: boolean
}

//всегда в хедерт) добавлять accordion--title--element!!!!!!!!
export const AccordionItem: React.FC<AccordionItemProps> = memo( ({
    heading,
    content,
    defaultOpen = false,
    isNested = false,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen || isNested)
    const [isAnimating, setIsAnimating] = useState<boolean>(false)
    const [isHydrated, setIsHydrated] = useState<boolean>(false)
    const { toggle } = useAccordion()
    const headerRef = useRef<HTMLDivElement>(null)
    const bodyRefAcc = useRef<HTMLDivElement | null>(null)

    const calculateTotalHeight = useCallback((element: HTMLElement): number => {
        let totalHeight = element.scrollHeight
        
        // Додаткова перевірка для вкладених елементів
        const children = element.children
        for (let i = 0; i < children.length; i++) {
            const child = children[i] as HTMLElement
            if (child && child.scrollHeight > 0) {
                const childHeight = child.scrollHeight
                // Уникаємо подвійного підрахунку
                if (childHeight > totalHeight) {
                    totalHeight = Math.max(totalHeight, childHeight)
                }
            }
        }

        const nestedAccordions = element.querySelectorAll(".accordion-item")
        nestedAccordions.forEach((nestedAccordion) => {
            if (nestedAccordion instanceof HTMLElement) {
                totalHeight += calculateTotalHeight(nestedAccordion)
            }
        })

        return totalHeight
    }, [])

    // Set up hydration flag to avoid SSR mismatch
    useEffect(() => {
        setIsHydrated(true)
    }, [])

    useEffect(() => {
        if (bodyRefAcc?.current && isHydrated) {
            const contentHeight = calculateTotalHeight(bodyRefAcc?.current)
            if (isOpen) {
                bodyRefAcc.current.style.maxHeight = `${contentHeight}px`
            } else {
                bodyRefAcc.current.style.maxHeight = "0px"
            }
        }
    }, [calculateTotalHeight, content, isOpen, isHydrated])

    // ResizeObserver для динамічного відстеження змін контенту
    useEffect(() => {
        if (!bodyRefAcc?.current || !isHydrated) return

        const resizeObserver = new ResizeObserver(() => {
            if (bodyRefAcc?.current && isOpen) {
                const contentHeight = calculateTotalHeight(bodyRefAcc?.current)
                bodyRefAcc.current.style.maxHeight = `${contentHeight}px`
            }
        })

        resizeObserver.observe(bodyRefAcc.current)

        return () => {
            resizeObserver.disconnect()
        }
    }, [calculateTotalHeight, isOpen, isHydrated])

    // Sync internal state with defaultOpen prop changes
    useEffect(() => {
        setIsOpen(defaultOpen || isNested)
    }, [defaultOpen, isNested])

    useEffect(() => {
        const headerElement = headerRef.current

        if (headerElement) {
            const targetElement = headerElement.querySelector(
                ".accordion--title--element"
            ) as HTMLElement | null

            if (targetElement) {
                if (isOpen) {
                    targetElement.classList.add("active")
                } else {
                    targetElement.classList.remove("active")
                }
            }
        }
    }, [isOpen])
    
    const handleClick = () => {
        if (isAnimating) return

        setIsAnimating(true)

        setIsOpen((prevState) => {
            const newState = !prevState
            if (newState === true && bodyRefAcc?.current) {
                // Calculate and set height immediately when opening
                const contentHeight = calculateTotalHeight(bodyRefAcc.current)
                bodyRefAcc.current.style.maxHeight = `${contentHeight}px`
            } else if (newState === false && bodyRefAcc?.current) {
                // Set height to 0 when closing
                bodyRefAcc.current.style.maxHeight = "0px"
            }
            return newState
        })

        toggle()

        setTimeout(() => {
            setIsAnimating(false)
        }, 300)
    }

    return (
        <div className="cusom-react-accordion">
            <div
                ref={headerRef}
                style={styles.accordionItemHeader}
                onClick={handleClick}
                className="active"
            >
                {heading}
            </div>
            <div 
                className={`accordion-item ${isOpen ? 'accordion-item--open' : 'accordion-item--closed'}`}
                ref={bodyRefAcc}
                style={{
                    ...styles.accordionItemPanel,
                    ...(isHydrated ? {} : { maxHeight: isOpen ? 'auto' : '0', visibility: isOpen ? 'visible' : 'hidden' })
                }}
            >
                {content}
            </div>
        </div>
    )
})

AccordionItem.displayName = 'AccordionItem'

const styles = {
    accordionItemHeader: {
        cursor: "pointer" as const,
        position: "relative" as const,
        zIndex: "2",
    },
    accordionItemPanel: {
        transition: "max-height 0.3s ease-in-out",
        overflow: "hidden" as const,
        position: "relative" as const,
    },
}
