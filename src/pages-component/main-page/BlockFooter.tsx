import MoreBonusesForYourChoise from './MoreBonusesForYourChoise'
import CheckMoreWhatSuitsYouBest from '@/components/categories/CheckMoreWhatSuitsYouBest'
import SubscribeForm from '@/components/subscribe/SubscribeForm'
import Footer from '@/components/footer'
import BottomInfo from '@/components/footer/BottomInfo'

export default function BlockFooter ()  {
    return (
        <div>
            <MoreBonusesForYourChoise />
            <CheckMoreWhatSuitsYouBest />
            <SubscribeForm />
            <BottomInfo />
            <Footer />
        </div>
    )
}
