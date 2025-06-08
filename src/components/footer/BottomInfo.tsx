

export const workFooterBlock = {
    h_1: "inGamble – Leading online casino review website",
    p1_1: "inGamble stands as a well-known and respected name in the gambling industry. As the go-to platform for casino reviews, we attract casinos who want to gain maximum visibility. Our platform ensures continuous access to the latest and most accurate information. Many casinos debut on inGamble before appearing on other review platforms, making us the preferred choice for both new and established projects. Furthermore, our platform provides a range of tools for comprehensive analysis, enabling visitors to choose the best casino tailored to their preferences. With various rankings and filters at their disposal, visitors can make informed decisions.",
    p1_2: "The inGamble team can proudly state that our platform features the most extensive array of bonuses and slots in comparison to the competition. Unlike our competitors, we don’t limit ourselves to just collecting and displaying welcome deposit bonuses. Our dedicated team employs a variety of tools to systematically collect and monitor information from each casino featured on our website, ensuring that all bonuses from these casinos are added for our users. This process demands significant time and effort, but we are committed to providing players with the information they need to make informed choices about which casino to play in.",

    h_2: "What makes inGamble special?",
    p2_1: "Our dedication has led us to create the top online casino review platform. And thanks to that, we stand out from the competition due to the 3 main key factors - inGamble takes pride in being the first platform to introduce casino loyalty programs. As gambling enthusiasts, we recognize that a thoroughly planned loyalty VIP program is crucial for a player’s long-term enjoyment. With the tools and features at our disposal, we efficiently gather the data from online casinos and present it on our website. Players can rest assured, as we monitor changes daily with our staff working 24/7. Finally, here’s a place where you can discover the most suitable program based on your preferences, whether it’s substantial cashback, a personal VIP manager from the first level, or a wide range of levels with bonuses and prizes as you progress. Whatever you desire, we’ve got it all!",
    p2_2: "Trust is the key element that helps us to build and maintain a strong relationship with our readers. Our reviews are honest, and based on a detailed analysis of every casino, bonus, or loyalty program aspect. Our ratings are unbiased, and we don’t favor specific casinos or providers. We’re all about honesty and transparency!"
}


export default function BottomInfo() {
   
    return (
        <section className="main-gamble__bottom-info bottom-info-gamble">
            <div className="bottom-info-gamble__container container">
                <div className="bottom-info-gamble__row">
                    <div className="bottom-info-gamble__column">
                        <div className="bottom-info-gamble__item">
                            <h2 className="bottom-info-gamble__title">{workFooterBlock.h_1}</h2>
                            <div className="bottom-info-gamble__text">
                                <p>{workFooterBlock.p1_1}</p>
                                <p>{workFooterBlock.p1_2}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-info-gamble__column">
                        <div className="bottom-info-gamble__item">
                            <h2 className="bottom-info-gamble__title">{workFooterBlock.h_2}</h2>
                            <div className="bottom-info-gamble__text">
                                <p>{workFooterBlock.p2_1}</p>
                                <p>{workFooterBlock.p2_2}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
