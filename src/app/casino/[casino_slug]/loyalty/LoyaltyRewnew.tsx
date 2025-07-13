
import React from "react"
import { SeeAllEssentialLoyaltyKeypoint } from "@/types"
import Image from "next/image"
import { LazyCardImg } from "@/components/lazy-img/LazyCardImg"

const color_gifts = ['item-deposits_grass', 'item-deposits_ocean', 'item-deposits_purple', 'item-deposits_green']
const blockWidth = (l: number | undefined) => {
    if (!l) {
        return 'deposits__column_medium'
    }
    switch (l) {
        case 2:
            return 'deposits__column_big'
        case 4:
            return 'deposits__column_small'
        default:
            return 'deposits__column_medium'
    }
}

export const LoyaltyRewnew = ({ loyalty_subtype }: { loyalty_subtype: SeeAllEssentialLoyaltyKeypoint[] | undefined }) => {
    if (!loyalty_subtype?.length) {
        return null
    }

    return (
        <section className="simple-bonus__deposits deposits loyaltie__loyalty loyalty-review">
            <div className="deposits__container container loyalty-review__container ">
                <div className="loyalty-review__top top">
                    <div className="top__row">
                        <div className="top__column">
                            <div className="top__title-block">
                                <h2 className="top__title">Loyalty Highlights</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="deposits__body">
                    <div className="deposits__block">
                        <div className="deposits__row">
                            {loyalty_subtype?.map((item, index) => {
                                return (
                                    <div key='`${item.text_1}-${item.text_2}-${index}`'
                                     className={`deposits__column ${blockWidth(loyalty_subtype?.length)}`}>
                                        <div className={`deposits__item item-deposits ${color_gifts[index % 4]}`}>
                                            <div className="item-loyalty-review__image">
                                            <LazyCardImg img={item?.image || ''} height="100%" width="100%" />
                                            </div>
                                            <div className="item-loyalty-review__content">
                                                <div className="item-loyalty-review__label">{item?.text_1}</div>
                                                <div className="item-loyalty-review__value">{item?.text_2}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
