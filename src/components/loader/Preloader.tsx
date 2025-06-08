'use client'

import BigLogo from '/img/preloader/preloader-1/big-logo.svg'

export const PreloaderPuls = () => {
    return (
        <div className="wrapper">
            <div className="preloader-2">
                <div className="preloader-2__container container">
                    <div className="preloader-2__body">
                        <div className="preloader-2__content">
                            <div className="preloader-2__circle preloader-2__circle_1"></div>
                            <div className="preloader-2__circle preloader-2__circle_2"></div>
                            <div className="preloader-2__circle preloader-2__circle_3"></div>
                            <div className="preloader-2__logo">
                                <img src={BigLogo} alt="big-logo" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const PreloaderSpin = () => {
    return (
        <div className="wrapper">
            <div className="preloader-3">
                <div className="preloader-3__container container">
                    <div className="preloader-3__body">
                        <div className="preloader-3__content">
                            <div className="preloader-3__circle"></div>
                            <div className="preloader-3__circle-small"></div>
                            <div className="preloader-3__circle-big"></div>
                            <div className="preloader-3__logo">
                                <img src={BigLogo} alt="big-logo" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
