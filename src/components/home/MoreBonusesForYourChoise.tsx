'use client'

import Image from 'next/image'



import { useAdaptiveBehavior, useHandlerSidebarActive } from '../../context/AppContext'

export default function MoreBonusesForYourChoise() {
    const { isSidebarActive } = useAdaptiveBehavior()
    const { handlerSidebarActive } = useHandlerSidebarActive()
    return (
        <section className="main-gamble__best-live-dealer-casinos best-live-dealer-casinos-gamble best-live-dealer-casinos-gamble_mobile main-gamble__fastest-payout-casinos fastest-payout-casinos-gamble">
            <div className="best-live-dealer-casinos-gamble__container container">
                <div className="best-live-dealer-casinos-gamble__row">
                    <div className="best-live-dealer-casinos-gamble__bg ibg--custom">
                        <Image width={444} height={444} src="/img/bg/07.webp" alt="bg" loading="lazy" />
                    </div>
                    <div className="best-live-dealer-casinos-gamble__body">
                        <div className="best-live-dealer-casinos-gamble__waves">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="best-live-dealer-casinos-gamble__girl">
                            <Image width={444} height={444} src="/img/girls/03.png" alt="girl" loading="lazy" />
                        </div>
                        <div className="best-live-dealer-casinos-gamble__content">
                            <div className="best-live-dealer-casinos-gamble__title">
                                <span>More bonuses</span> for your choice
                            </div>
                            <button
                                className="best-live-dealer-casinos-gamble__btn filter-open"
                                onClick={() => handlerSidebarActive(!isSidebarActive)}
                            >
                                <span>
                                    <svg>
                                        <use xlinkHref="#filter"></use>
                                    </svg>
                                </span>
                                Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
