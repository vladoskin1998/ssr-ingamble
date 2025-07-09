'use client'

import React, { JSX, memo, useEffect, useRef, useState } from "react"
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
    const [isOpen, setIsOpen] = useState(defaultOpen ||  isNested)
    const [isAnimating, setIsAnimating] = useState<boolean>(false)
    const { toggle } = useAccordion()
    const headerRef = useRef<HTMLDivElement>(null)
    const bodyRefAcc = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        // Remove the maxHeight calculation since we're using transform
    }, [])



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
        setIsOpen((prevState) => !prevState)
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
            <div className={`accordion-item ${isOpen ? 'accordion-open' : 'accordion-closed'}`} 
                ref={bodyRefAcc}
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
        transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
        willChange: "transform, opacity",
    },
}
