import { DataHomeItemsBlock, HomeDataBlock } from '@/types'
import { getTagColorByindex } from '@/helper'
import Link from 'next/link'
import Image from 'next/image'

export default function BlockType3MobileServer({
    data,
}: {
    data: HomeDataBlock<DataHomeItemsBlock>
}) {
    const {
        block_title,
        subtitle,
        title_image,
        data_cards,
        category
    } = data.items_block

    return (
        <section
            aria-label="BlockType3Mobile Server"
            className="main-gamble__vpn-friendly-casinos-2 vpn-friendly-casinos-2-gamble main-gamble__fastest-payout-casinos fastest-payout-casinos-gamble"
        >
            <div className="vpn-friendly-casinos-2-gamble__container container">
                <div className="vpn-friendly-casinos-2-gamble__top top">
                    <div className="top__row">
                        <div className="top__column">
                            <div className="top__title-block">
                                {title_image && (
                                    <div className="top__title-icon">
                                        <Image
                                            src={title_image}
                                            alt="Title icon"
                                            width={32}
                                            height={32}
                                        />
                                    </div>
                                )}
                                <h2 className="top__title">
                                    {block_title}
                                </h2>
                            </div>
                            {subtitle && (
                                <div className="top__subtitle">
                                    {subtitle}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="vpn-friendly-casinos-2-gamble__body">
                    <div className="vpn-friendly-casinos-2-gamble__grid">
                        {data_cards.slice(0, 6).map((card) => (
                            <div
                                key={`${card.casino_info.casino_id}-${card.bonus_info.bonus_id}`}
                                className="vpn-friendly-casinos-2-gamble__card"
                            >
                                <div className="cards-casino-gamble__card-body">
                                    <div className="card-casino__logo">
                                        <Image
                                            src={card.casino_info.casino_image || '/img/casino-logo/default.png'}
                                            alt={card.casino_info.casino_name}
                                            width={80}
                                            height={80}
                                        />
                                    </div>
                                    <div className="card-casino__content">
                                        <h3 className="card-casino__name">
                                            {card.casino_info.casino_name}
                                        </h3>
                                        <div className="card-casino__bonus">
                                            {card.bonus_info.bonus_name}
                                        </div>
                                        {card.bonus_info.labels && (
                                            <div className="card-casino__labels">
                                                {card.bonus_info.labels.slice(0, 3).map((label, labelIndex) => (
                                                    <span
                                                        key={labelIndex}
                                                        className={`card-casino__label ${getTagColorByindex(labelIndex)}`}
                                                    >
                                                        {label}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-casino__actions">
                                        <Link
                                            href={`/bonuses/${card.bonus_info.bonus_slug}`}
                                            className="card-casino__button btn btn-primary"
                                        >
                                            View Bonus
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="vpn-friendly-casinos-2-gamble__bottom">
                        <Link
                            href={`/bonuses/${category.slug}`}
                            className="vpn-friendly-casinos-2-gamble__btn btn btn-secondary"
                        >
                            See All {category.name}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
