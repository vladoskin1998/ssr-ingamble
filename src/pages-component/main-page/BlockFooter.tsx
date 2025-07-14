import MoreBonusesForYourChoise from './MoreBonusesForYourChoise'
import CheckMoreWhatSuitsYouBest from '@/components/categories/CheckMoreWhatSuitsYouBest'
import SubscribeForm from '@/components/subscribe/SubscribeForm'
import Footer from '@/components/footer'

export default function BlockFooter ()  {
    return (
        <div>
            <MoreBonusesForYourChoise />
            <CheckMoreWhatSuitsYouBest />
            <SubscribeForm />
            <Footer />
        </div>
    )
}
