import { RewievCasinoDataResponse } from '../../types'

export const CasinoReview = ({
    handlerOpen,
    //@ts-ignore
    data,
}: {
    handlerOpen: (s: boolean) => void
    //@ts-ignore
    data: undefined | RewievCasinoDataResponse
}) => {
    
    return (
        <>
            <div className="iwild-review__item item-iwild-review item-iwild-review_main">
                <h2 className="item-iwild-review__title">{data?.name} review</h2>
                <div className="item-iwild-review__text">
                    <p>{data?.review}</p>
                </div>
                <button onClick={() => handlerOpen(true)} className="item-iwild-review__btn item-content-bonus-information__link popup-review-btn">
                    Read More
                </button>
            </div>
        </>
    )
}
