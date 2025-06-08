'use client'

import React, { JSX, memo, useEffect, useRef, useState } from "react"
import { useAccordion } from "../../hooks/useAccordion"

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
    const [maxHeight, setMaxHeight] = useState<string>( "0")
    const [isAnimating, setIsAnimating] = useState<boolean>(false)
    const [isHidden, setIsHidden] = useState<"hidden" | "visible">(
        isOpen ? "visible" : "hidden"
    )
    const { toggle } = useAccordion()
    const headerRef = useRef<HTMLDivElement>(null)
    const bodyRefAcc = useRef<HTMLDivElement | null>(null)



   

    const calculateTotalHeight = (element: HTMLElement): number => {
        let totalHeight = element.scrollHeight
        const nestedAccordions = element.querySelectorAll(".accordion-item")

        nestedAccordions.forEach((nestedAccordion) => {
            
            if (nestedAccordion instanceof HTMLElement) {
                totalHeight += calculateTotalHeight(nestedAccordion)
            }
        })

        return totalHeight
    }


    useEffect(() => {
        if (bodyRefAcc?.current) {
            const contentHeight = calculateTotalHeight(bodyRefAcc?.current)
            setMaxHeight(`${contentHeight}px`)
        }
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

        setIsOpen((prevState) => {
            if (!prevState === true) {
                setTimeout(() => {
                    setIsHidden("visible")
                }, 300)
            } else {
                setIsHidden("hidden")
            }
            return !prevState
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
            <div className="accordion-item" 
                ref={bodyRefAcc}
                style={{
                    ...styles.accordionItemPanel,
                    overflow: isHidden,
                    maxHeight: isOpen ? maxHeight  : "0",
                   
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
        cursor: "pointer",
        position: "relative" as "relative",
        zIndex: "2",
    },
    accordionItemPanel: {
        transition: "max-height 0.3s ease-in-out",
    },
}
