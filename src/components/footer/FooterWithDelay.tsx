'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import '../../../styles/footer.css';

export default function Footer() {
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    useEffect(() => {
        // Wait for main content to load and settle
        const timer = setTimeout(() => {
            setIsContentLoaded(true);
        }, 100); // Small delay to ensure content has rendered

        // Also check if content is fully loaded
        const checkContentLoaded = () => {
            const mainContent = document.querySelector('.main-page, .casino-page, .bonuses-page, [class*="page"]');
            if (mainContent && (mainContent as HTMLElement).offsetHeight > 100) {
                setIsContentLoaded(true);
            }
        };

        // Check immediately and on DOM changes
        checkContentLoaded();
        const observer = new MutationObserver(checkContentLoaded);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    // Reserve space for footer while loading
    if (!isContentLoaded) {
        return (
            <div 
                style={{ 
                    height: '600px', 
                    width: '100%',
                    backgroundColor: 'transparent',
                    display: 'block'
                }}
                aria-hidden="true"
            />
        );
    }

    return (
        <footer className="footer">
            <div className="footer__top top-footer">
                <div className="top-footer__container container">
                    <nav className="top-footer__menu menu-footer">
                        {/* Menu lists */}
                        <ul className="menu-footer__list">
                            <li className="menu-footer__item menu-footer__item_title">
                                <span className="menu-footer__title">CASINO BONUSES</span>
                            </li>
                            <li className="menu-footer__item">
                                <a
                                    rel="nofollow noopener"
                                    href=""
                                    aria-label="Put your description here."
                                    target="_blank"
                                    className="menu-footer__link"
                                >
                                    No wagering casino bonuses
                                </a>
                            </li>
                            <li className="menu-footer__item">
                                <a
                                    rel="nofollow noopener"
                                    href=""
                                    aria-label="Put your description here."
                                    target="_blank"
                                    className="menu-footer__link"
                                >
                                    Low wagering casino bonuses
                                </a>
                            </li>
                        </ul>
                        <ul className="menu-footer__list">
                            <li className="menu-footer__item menu-footer__item_title">
                                <span className="menu-footer__title">CRYPTO CASINOS</span>
                            </li>
                            <li className="menu-footer__item">
                                <a
                                    rel="nofollow noopener"
                                    href=""
                                    aria-label="Put your description here."
                                    target="_blank"
                                    className="menu-footer__link"
                                >
                                    Bitcoin lightning casinos
                                </a>
                            </li>
                        </ul>
                        <ul className="menu-footer__list">
                            <li className="menu-footer__item menu-footer__item_title">
                                <span className="menu-footer__title">LEGAL</span>
                            </li>
                            <li className="menu-footer__item">
                                <a
                                    rel="nofollow noopener"
                                    href="https://docs.google.com/document/d/1fXioVQKwHQWs2-6G6vXwiCEChkR1USmhXJpWr5ZPguo/edit?usp=sharing"
                                    aria-label="Put your description here."
                                    target="_blank"
                                    className="menu-footer__link"
                                >
                                    Privacy policy
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="top-footer__socials-block" style={{ minHeight: '120px' }}>
                        <a href="" target="_blank" className="footer__logo logo">
                            <div className="logo__img">
                                <Image src="/img/logo-ingamble.svg" alt="logo" width={140} height={25} loading="lazy" />
                            </div>
                            <div className="logo__text">IN GAMBLE WE TRUST</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer__bottom bottom-footer">
                <div className="bottom-footer__container container">
                    <div className="bottom-footer__body">
                        <div className="bottom-footer__title">PLAY RESPONSIBLY AND IN MODERATION</div>
                        <div className="bottom-footer__copyright">
                            <p>inGamble © {new Date().getFullYear()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
