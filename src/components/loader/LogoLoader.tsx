'use client'

import { useEffect } from "react"
import Image from 'next/image'

export const LogoLoader = () => {

    useEffect(() => {
        // Скрыть скролл
        document.body.style.overflow = 'hidden'
        return () => {
            // Вернуть скролл при размонтировании
            document.body.style.overflow = ''
        }
    }, [])


    return (
        <div className="loader-body-line">
            <div style={{ height: '100%' }}>
                <div className="preloader-1__body">
                    <div className="loader-body-logo">
                        <div className="loader-body-logo-img">
                            <Image src="/img/logo-icon.svg" alt="Logo" width={60} height={60} />
                        </div>

                        <div className="loader-body-logo-load loader-body-infinite-fade-text">Loading...</div>
                        <div className="loader-body-progres">
                            <div className="loader-body-svg">
                                <svg width="180" height="32" viewBox="0 0 180 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask
                                        id="mask0_406_10772"
                                        style={{ maskType: 'alpha' }}
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="180"
                                        height="32"
                                    >
                                        <path
                                            d="M5.82143 27.2V26.2H4.82143H1V5.8H4.82143H5.82143V4.8V1H174.179V4.8V5.8H175.179H179V26.2H175.179H174.179V27.2V31H5.82143V27.2Z"
                                            stroke="#FFCF23"
                                            strokeWidth="2"
                                        />
                                    </mask>
                                    <g mask="url(#mask0_406_10772)">
                                        <rect y="16" width="180" height="16" fill="#F96B2F" />
                                    </g>
                                    <mask
                                        id="mask1_406_10772"
                                        style={{ maskType: 'alpha' }}
                                        maskUnits="userSpaceOnUse"
                                        x="0"
                                        y="0"
                                        width="180"
                                        height="32"
                                    >
                                        <path
                                            d="M5.82143 27.2V26.2H4.82143H1V5.8H4.82143H5.82143V4.8V1H174.179V4.8V5.8H175.179H179V26.2H175.179H174.179V27.2V31H5.82143V27.2Z"
                                            stroke="#FFCF23"
                                            strokeWidth="2"
                                        />
                                    </mask>
                                    <g mask="url(#mask1_406_10772)">
                                        <rect width="180" height="16" fill="#FFCF23" />
                                    </g>
                                </svg>
                            </div>
                            <div className="loader-body-svg-1"></div>
                            <div className="loader-body-svg-2"></div>
                            <div className="loader-body-svg-3"></div>
                            <div className="loader-body-svg-4"></div>
                            <div className="progress-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
