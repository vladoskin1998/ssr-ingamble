import MoreBonusesForYourChoise from './MoreBonusesForYourChoise'
import CheckMoreWhatSuitsYouBest from '../categories/CheckMoreWhatSuitsYouBest'
import SubscribeForm from '../subscribe/SubscribeForm'
import BottomInfo from '../footer/BottomInfo'

export const BlockFooter = () => {
    return (
        <div>
            <MoreBonusesForYourChoise />
            <CheckMoreWhatSuitsYouBest />
            <SubscribeForm />
            <BottomInfo />
        </div>
    )
}
