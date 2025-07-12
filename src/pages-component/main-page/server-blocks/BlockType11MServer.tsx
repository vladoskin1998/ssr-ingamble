import { DataHomeItemsBlock, HomeDataBlock } from '@/types'
import '../../../styles/style-type-10-11.css'
import Link from 'next/link'
import Image from 'next/image'

export default function BlockType11MServer({
    data,
}: {
    data: HomeDataBlock<DataHomeItemsBlock>
}) {
    const arr1 = data.items_block.data_cards.slice(0, 6)
    const arr2 = data.items_block.data_cards.slice(6, 12)

    return (
        <section className="main-gamble__top-bonuses top-bonuses-gamble">
            <div className="top-bonuses-gamble__container container">
                <div className="top-bonuses-gamble__row">
                    <div className="top-bonuses-gamble__column">
                        <div className="top-bonuses-gamble__block">
                            <div className="top-bonuses-gamble__top top">
                                <div className="top__row">
                                    <div className="top__column">
                                        <div className="top__title-block">
                                            <h2 className="top__title">Top Ranked Casinos</h2>
                                        </div>
                                    </div>
                                    <div className="top__column">
                                        <Link
                                            href="/filter-casinos"
                                            className="top__btn"
                                            prefetch={false} 
                                        >
                                            <span>See All</span>
                                            <span className="top__btn-arrow">
                                                <svg>
                                                    <use xlinkHref="#arrow"></use>
                                                </svg>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="top-bonuses-gamble__body">
                                {arr1.map((item, index) => (
                                    <div className="top-bonuses-gamble__deposit deposit-top-bonuses-gamble" key={index}>
                                        <Link
                                            href={`/casino/${item?.casino_info?.casino_slug}`}
                                            className="deposit-top-bonuses-gamble__image-block"
                                            prefetch={false} 
                                        >
                                            <span className="deposit-top-bonuses-gamble__image ibg--custom">
                                                <Image
                                                    width={444}
                                                    height={444}
                                                    alt="Casino Image"
                                                    src={item?.casino_info?.casino_image || '/img/casino-logo/default.png'}
                                                />
                                            </span>
                                        </Link>
                                        <div className="deposit-top-bonuses-gamble__body">
                                            <div className="deposit-top-bonuses-gamble__main">
                                                <Link
                                                    href={`/casino/${item?.casino_info?.casino_slug}/bonuses/${item?.bonus_info?.bonus_slug}`}
                                                    className="deposit-top-bonuses-gamble__title"
                                                    prefetch={false} 
                                                >
                                                    {item?.bonus_info?.bonus_name}
                                                </Link>
                                                <div className="deposit-top-bonuses-gamble__stake">
                                                    <Link
                                                        href={`/casino/${item?.casino_info?.casino_slug}`}
                                                        aria-label="Casino details"
                                                        className="deposit-top-bonuses-gamble__stake-link"
                                                        prefetch={false} 
                                                    >
                                                        {item?.casino_info?.casino_name}
                                                    </Link>
                                                    <span
                                                        style={{ position: 'relative' }}
                                                        className="deposit-top-bonuses-gamble__stake-icon"
                                                    >
                                                        <Image src="/img/icons/star.svg" width={12} height={12} alt="star" />
                                                    </span>
                                                    <span className="deposit-top-bonuses-gamble__stake-number">
                                                        {item?.casino_info?.casino_rank}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="deposit-top-bonuses-gamble__info info-deposit-top-bonuses-gamble">
                                                <div className="info-deposit-top-bonuses-gamble__row">
                                                    <div className="info-deposit-top-bonuses-gamble__column">
                                                        <div className="info-deposit-top-bonuses-gamble__icon">
                                                            <Image
                                                                src="/img/icons/deposit-icon.svg"
                                                                alt="deposit-icon"
                                                                width={16}
                                                                height={16}
                                                            />
                                                        </div>
                                                        <div className="info-deposit-top-bonuses-gamble__text">
                                                            {`WR: ${
                                                                typeof item?.bonus_info?.wr === 'number' ? item?.bonus_info.wr + 'X' : '-'
                                                            }`}
                                                        </div>
                                                    </div>
                                                    <div className="info-deposit-top-bonuses-gamble__column">
                                                        <div className="info-deposit-top-bonuses-gamble__label">Min Dep:</div>
                                                        <div className="info-deposit-top-bonuses-gamble__value">
                                                            {typeof item?.bonus_info?.bonus_min_dep?.[0]?.min_value === 'number'
                                                                ? '$' + item?.bonus_info?.bonus_min_dep?.[0]?.min_value
                                                                : '-'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="top-bonuses-gamble__column">
                        <div className="top-bonuses-gamble__block">
                            <div className="top-bonuses-gamble__top top">
                                <div className="top__row">
                                    <div className="top__column">
                                        <div className="top__title-block">
                                            <h2 className="top__title">Best Crypto Casinos</h2>
                                        </div>
                                    </div>
                                    <div className="top__column">
                                        <Link href="/all-casinos/top-crypto-casinos" className="top__btn" prefetch={false} >
                                            <span>See All</span>
                                            <span className="top__btn-arrow">
                                                <svg>
                                                    <use xlinkHref="#arrow"></use>
                                                </svg>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="top-bonuses-gamble__body">
                                {arr2.map((item, index) => (
                                    <div key={index + 10} className="top-bonuses-gamble__deposit deposit-top-bonuses-gamble">
                                        <Link
                                            href={`/casino/${item?.casino_info?.casino_slug}`}
                                            className="deposit-top-bonuses-gamble__image-block"
                                            prefetch={false} 
                                        >
                                            <span className="deposit-top-bonuses-gamble__image ibg--custom">
                                                <Image
                                                    width={444}
                                                    height={444}
                                                    alt="Casino Image"
                                                    src={item?.casino_info?.casino_image || '/img/casino-logo/default.png'}
                                                />
                                            </span>
                                        </Link>
                                        <div className="deposit-top-bonuses-gamble__body">
                                            <div className="deposit-top-bonuses-gamble__main">
                                                <Link
                                                    href={`/casino/${item?.casino_info?.casino_slug}/bonuses/${item?.bonus_info?.bonus_slug}`}
                                                    className="deposit-top-bonuses-gamble__title"
                                                    prefetch={false} 
                                                >
                                                    {item?.bonus_info?.bonus_name}
                                                </Link>
                                                <div className="deposit-top-bonuses-gamble__stake">
                                                    <Link
                                                        href={`/casino/${item?.casino_info?.casino_slug}`}
                                                        className="deposit-top-bonuses-gamble__stake-link"
                                                        prefetch={false} 
                                                    >
                                                        {item.casino_info.casino_name}
                                                    </Link>
                                                    <span
                                                        style={{ position: 'relative' }}
                                                        className="deposit-top-bonuses-gamble__stake-icon"
                                                    >
                                                        <Image src="/img/icons/star.svg" width={12} height={12} alt="star" />
                                                    </span>
                                                    <span className="deposit-top-bonuses-gamble__stake-number">
                                                        {item.casino_info.casino_rank}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="deposit-top-bonuses-gamble__info info-deposit-top-bonuses-gamble">
                                                <div className="info-deposit-top-bonuses-gamble__row">
                                                    <div className="info-deposit-top-bonuses-gamble__column">
                                                        <div className="info-deposit-top-bonuses-gamble__icon">
                                                            <Image
                                                                src="/img/icons/deposit-icon.svg"
                                                                alt="deposit-icon"
                                                                width={16}
                                                                height={16}
                                                            />
                                                        </div>
                                                        <div className="info-deposit-top-bonuses-gamble__text">
                                                            {`WR: ${
                                                                typeof item?.bonus_info?.wr === 'number' ? item?.bonus_info.wr + 'X' : '-'
                                                            }`}
                                                        </div>
                                                    </div>
                                                    <div className="info-deposit-top-bonuses-gamble__column">
                                                        <div className="info-deposit-top-bonuses-gamble__label">Min Dep:</div>
                                                        <div className="info-deposit-top-bonuses-gamble__value">
                                                            {typeof item?.bonus_info?.bonus_min_dep?.[0]?.min_value === 'number'
                                                                ? '$' + item?.bonus_info?.bonus_min_dep?.[0]?.min_value
                                                                : '-'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}