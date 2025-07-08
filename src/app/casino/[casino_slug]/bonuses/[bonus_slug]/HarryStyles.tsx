
import Image from 'next/image';
import '../../../../../../styles/casino-person.css'

export const HarryStyles = ({ img, title, subtitle }: { img: string; title: string; subtitle: string }) => {
    return (
        <>
            <section className="simple-bonus__casino-person simple-bonus__casino-person_desktop casino-person">
                <div className="casino-person__container container">
                    <div className="casino-person__body">
                        <div className="casino-person__row">
                            <div className="casino-person__info info-casino-person">
                                <div className="info-casino-person__img">
                                    <Image src={img} alt="HARRY STYLES" width={200} height={200} />
                                </div>
                                <div className="info-casino-person__content">
                                    <h3 className="info-casino-person__name h3">{title}</h3>
                                    <div className="info-casino-person__position">{subtitle}</div>
                                </div>
                            </div>
                            {/* <div className="casino-person__socials">
                                <div className="socials-top-footer__items">
                                    <div className="socials-top-footer__item">
                                        <a
                                            href=""
                                            aria-label="Put your description here."
                                            target="_blank"
                                            className="socials-top-footer__link"
                                        >
                                            <svg>
                                                <use xlinkHref="#x"></use>
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="socials-top-footer__item">
                                        <a
                                            href=""
                                            aria-label="Put your description here."
                                            target="_blank"
                                            className="socials-top-footer__link"
                                        >
                                            <svg>
                                                <use xlinkHref="#facebook"></use>
                                            </svg>
                                        </a>
                                    </div>
                                    <div className="socials-top-footer__item">
                                        <a
                                            href=""
                                            aria-label="Put your description here."
                                            target="_blank"
                                            className="socials-top-footer__link"
                                        >
                                            <svg>
                                                <use xlinkHref="#linkedin"></use>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="casino-person__waves">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="simple-bonus__casino-person simple-bonus__casino-person_mobile casino-person">
                <div className="casino-person__container container">
                    <div className="iwild-review__item item-iwild-review item-iwild-review_author">
                        <div className="item-iwild-review__content content-item-iwild-review">
                            <div className="content-item-iwild-review__image">
                                <Image src={img} alt="HARRY STYLES" width={444} height={444} />
                            </div>
                            <div className="content-item-iwild-review__body">
                                <div className="content-item-iwild-review__label">Author</div>
                                <div className="content-item-iwild-review__name">{title}</div>
                                <div className="content-item-iwild-review__text">
                                    <p>
                                        {subtitle}

                                        {/* <br />I also summarise books on my{" "}
                                        <span>personal blog</span>. */}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* <div className="item-iwild-review__socials">
                            <div className="socials-top-footer__items">
                                <div className="socials-top-footer__item">
                                    <a
                                        href=""
                                        aria-label="Put your description here."
                                        target="_blank"
                                        className="socials-top-footer__link"
                                    >
                                        <svg>
                                            <use xlinkHref="#x"></use>
                                        </svg>
                                    </a>
                                </div>
                                <div className="socials-top-footer__item">
                                    <a
                                        href=""
                                        aria-label="Put your description here."
                                        target="_blank"
                                        className="socials-top-footer__link"
                                    >
                                        <svg>
                                            <use xlinkHref="#facebook"></use>
                                        </svg>
                                    </a>
                                </div>
                                <div className="socials-top-footer__item">
                                    <a
                                        href=""
                                        aria-label="Put your description here."
                                        target="_blank"
                                        className="socials-top-footer__link"
                                    >
                                        <svg>
                                            <use xlinkHref="#linkedin"></use>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}
