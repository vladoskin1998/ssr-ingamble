import { LoyaltieProgramDataResponse } from '../../types'

export const LoyaltyText = ({ data }: { data: LoyaltieProgramDataResponse | undefined }) => {
    return (
        <section className="loyaltie__info info-loyaltie">
            <div className="info-loyaltie__container container">
                <div className="info-loyaltie__row">
                    <div className="info-loyaltie__column">
                        <div className="info-loyaltie__item">
                            <h2 className="info-loyaltie__title">{data?.casino_name} Vip Loyalty Program</h2>
                            <pre className="info-loyaltie__text">{data?.description}</pre>
                        </div>
                    </div>
                    <div className="info-loyaltie__column">
                        <div className="info-loyaltie__item">
                            <h2 className="info-loyaltie__title">Is the loyalty system easy and understandable?</h2>
                            <pre className="info-loyaltie__text">{data?.loyalty_understandable}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
