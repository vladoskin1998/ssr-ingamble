import { BonusInformation } from './BonusInformation'
import { GetDataBonusResponse } from '../../types'
import { useAdaptiveBehavior } from '../../context/AppContext'

interface LastUpdateProps {
    data?: GetDataBonusResponse
}

export const LastUpdate: React.FC<LastUpdateProps> = ({ data }) => {
    const { lastUpdate } = useAdaptiveBehavior()

    return (
        <section className="simple-bonus__bonus-information bonus-information">
            <div className="bonus-information__container container">
                <div className="bonus-information__top top-bonus-information">
                    <div className="top-bonus-information__row">
                        <h2 className="top-bonus-information__title">Bonus Information</h2>
                        <div className="top-bonus-information__update update-top-bonus-information">
                            <div className="update-top-bonus-information__label">Last update:</div>
                            <div className="update-top-bonus-information__value">{lastUpdate}</div>
                        </div>
                    </div>
                </div>
                <BonusInformation data={data} />
            </div>
        </section>
    )
}
