'use client'
interface ParentOriginal {
    parent: HTMLElement;
    index: number;
}
const dinamicAdapt = (
    da_elements: NodeListOf<HTMLElement>,
    attr_elements: string[],
    match_media: MediaQueryList[],
    parents_original: ParentOriginal[]
) => {
    // Add requestAnimationFrame to reduce layout thrashing
    requestAnimationFrame(() => {
        match_media.forEach((mediaQuery, i) => {
            // 🛡️ ЗАХИСТ: Перевіряємо чи елемент не є лодером
            if (da_elements[i] && (
                da_elements[i].classList.contains('loader-body-line') ||
                da_elements[i].classList.contains('preloader-1__body') ||
                da_elements[i].classList.contains('loader-body') ||
                da_elements[i].closest('.loader-body-line') ||
                da_elements[i].closest('.preloader-1__body')
            )) {
                return; // Пропускаємо лодери
            }

            const [className, index] = attr_elements[i].split(', ');
            const element = document.querySelector(`.${className}`);
            const targetIndex = parseInt(index, 10);

            if (mediaQuery.matches && element) {
                const childElement = element.children[targetIndex];
                if (childElement && da_elements[i].parentElement !== element) {
                    element.insertBefore(da_elements[i], childElement);
                }
            } else {
                const { parent, index } = parents_original[i];
                if (da_elements[i].parentElement !== parent) {
                    parent.insertBefore(da_elements[i], parent.children[index]);
                }
            }
        });
    });
};

export default function initializeAdaptiveBehavior() {
    // SSR safe check - avoid running on server
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
    }
    
    // 🛡️ ФІЛЬТРАЦІЯ: Виключаємо лодери з adaptive behavior
    const allDataDaElements = document.querySelectorAll('[data-da]') as NodeListOf<HTMLElement>;
    const filteredElements = Array.from(allDataDaElements).filter(item => {
        // Виключаємо елементи лодера
        return !(
            item.classList.contains('loader-body-line') ||
            item.classList.contains('preloader-1__body') ||
            item.classList.contains('loader-body') ||
            item.closest('.loader-body-line') ||
            item.closest('.preloader-1__body')
        );
    });
    
    // Конвертуємо відфільтрований масив в NodeList-подібну структуру
    const da_elements = {
        length: filteredElements.length,
        forEach: (callback: (item: HTMLElement, index: number) => void) => {
            filteredElements.forEach(callback);
        },
        [Symbol.iterator]: function* () {
            for (const element of filteredElements) {
                yield element;
            }
        }
    } as unknown as NodeListOf<HTMLElement>;
    
    // Додаємо індексер для доступу по індексу
    filteredElements.forEach((element, index) => {
        (da_elements as NodeListOf<HTMLElement> & Record<number, HTMLElement>)[index] = element;
    });
    
    const parents_original: ParentOriginal[] = [];
    const attr_elements: string[] = [];
    const match_media: MediaQueryList[] = [];

    da_elements.forEach((item) => {
        const parentChildren = item.parentElement?.children;
        if (parentChildren) {
            for (let i = 0; i < parentChildren.length; i++) {
                if (parentChildren[i] === item) {
                    parents_original.push({
                        parent: item.parentElement as HTMLElement,
                        index: i,
                    });
                }
            }
        }
    });


    attr_elements.push(...Array.from(da_elements).map((item) => item.dataset.da || ''));
    attr_elements.forEach((attr_element) => {
        const [, , maxWidth]: string[] = attr_element.split(', ');
        if (maxWidth) {
            const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);
            match_media.push(mediaQuery);
            mediaQuery.addEventListener('change', () => dinamicAdapt(da_elements, attr_elements, match_media, parents_original));
        }
    });

 
    // const ibg = document.querySelectorAll('.ibg') as NodeListOf<HTMLElement>;
    // ibg.forEach((item) => {
    //     const ibgImg = item.querySelector('img');
    //     const ibgImgSrc = ibgImg?.getAttribute('src');
    //     if (ibgImgSrc) {
    //         item.style.backgroundImage = `url(${ibgImgSrc})`;
    //     }
    // });

     
    dinamicAdapt(da_elements, attr_elements, match_media, parents_original);
}

import { useState, useEffect } from 'react';

// Функція для визначення мобільного пристрою на основі CSS медіа-запитів
export const isMobileDevice = (): boolean => {
    if (typeof window === 'undefined') return false; // SSR check
    
    // Використовуємо window.matchMedia для перевірки CSS медіа-запитів
    return window.matchMedia('(max-width: 768px)').matches;
};

// Хук для відстеження змін розміру екрану
export const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(isMobileDevice());
        };
        
        // Початкова перевірка
        checkMobile();
        
        // Відстеження змін розміру
        const handleResize = () => {
            checkMobile();
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return isMobile;
};
