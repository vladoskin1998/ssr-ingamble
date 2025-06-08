// import { Wraper } from '../Wraper'
import { BreadCrumb } from '@/components/breadcrumb'
import './style.css'
export default function PrivacyPolicy() {
    return (
 
            <main className="gamble__privacy-policy main-gamble privacy-policy">
                <div className="main-gamble__body">
                    <BreadCrumb
                        path={[
                            {
                                name: 'Home',
                                link: '/',
                            },
                            {
                                name: 'Privacy Policy',
                                link: '#',
                            },
                        ]}
                    />

                    <section className="privacy-policy__main main-privacy-policy">
                        <div className="main-privacy-policy__container container">
                            <div className="main-privacy-policy__top top">
                                <div className="top__row">
                                    <div className="top__column">
                                        <div className="top__title-block">
                                            <h1 className="top__title">Privacy Policy</h1>
                                        </div>
                                    </div>
                                    <div className="top__column">
                                        <div className="top__date">Last Updated: 7 May 2024</div>
                                    </div>
                                </div>
                            </div>
                            <div className="main-privacy-policy__body">
                                <div className="main-privacy-policy__item">
                                    <p>
                                        At{' '}
                                        <a href={`https://ingamble.com`} target="_blank" aria-label="Put your description here.">
                                            ingamble.com
                                        </a>
                                        , we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect the information you
                                        provide to us when you visit our website.
                                    </p>
                                    <p>
                                        We reserve the right to change this Privacy Policy at any given time, of which you will be promptly updated. If you want to make sure that you are up to date with the latest changes, we advise you to
                                        frequently visit this page.
                                    </p>
                                </div>
                                <div className="main-privacy-policy__item">
                                    <h2 className="main-privacy-policy__title">Information We Collect</h2>
                                    <ul className="main-privacy-policy__list">
                                        <li className="main-privacy-policy__list-item">
                                            <span>
                                                Personal Information: We may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may
                                                include, but is not limited to, the following:
                                            </span>
                                            <ul className="main-privacy-policy__sublist">
                                                <li className="main-privacy-policy__sublist-item">Email address;</li>
                                                <li className="main-privacy-policy__sublist-item">First name and last name;</li>
                                                <li className="main-privacy-policy__sublist-item">Phone number;</li>
                                                <li className="main-privacy-policy__sublist-item">Address, State, Province, ZIP/Postal code, City;</li>
                                                <li className="main-privacy-policy__sublist-item">Bank account information for payment of products and/or services under the Service;</li>
                                                <li className="main-privacy-policy__sublist-item">Date of birth.</li>
                                            </ul>
                                        </li>
                                        <li className="main-privacy-policy__list-item">
                                            <span>
                                                When you pay for a product and/or service by wire transfer, we may ask you to provide information to facilitate the transaction and verify your identity. Such information may include, but is
                                                not limited to:
                                            </span>
                                            <ul className="main-privacy-policy__sublist">
                                                <li className="main-privacy-policy__sublist-item">Passport or National ID card;</li>
                                                <li className="main-privacy-policy__sublist-item">Bank card statement;</li>
                                                <li className="main-privacy-policy__sublist-item">Other information linking you to an address.</li>
                                            </ul>
                                        </li>
                                        <li className="main-privacy-policy__list-item">
                                            <span>Usage Information: We may collect information about how you use our website, including your IP address, browser type, referring/exit pages, and operating system.</span>
                                        </li>
                                        <li className="main-privacy-policy__list-item">
                                            <span>
                                                Cookies: We use cookies and similar technologies to improve your browsing experience and collect information about your preferences. Please see our{' '}
                                                <a href="" target="_blank" aria-label="Put your description here.">
                                                    Cookie Policy
                                                </a>{' '}
                                                for more details.
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="main-privacy-policy__item">
                                    <h2 className="main-privacy-policy__title">How We Use Your Information</h2>
                                    <ul className="main-privacy-policy__list main-privacy-policy__list_small">
                                        <li className="main-privacy-policy__list-item">
                                            <span>To provide and maintain our services, including processing transactions and providing customer support.</span>
                                        </li>
                                        <li className="main-privacy-policy__list-item">
                                            <span>To personalize your experience and deliver content and product offerings relevant to your interests.</span>
                                        </li>
                                        <li className="main-privacy-policy__list-item">
                                            <span>To communicate with you about your account, updates to our services, and promotional offers.</span>
                                        </li>
                                        <li className="main-privacy-policy__list-item">
                                            <span>To detect, prevent, and address technical issues and fraudulent or illegal activities.</span>
                                        </li>
                                        <li className="main-privacy-policy__list-item">
                                            <span>To compile aggregate data for internal and external business purposes.</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="main-privacy-policy__item">
                                    <h2 className="main-privacy-policy__title">Information Sharing and Disclosure</h2>
                                    <p>
                                        We may share your personal information with third-party service providers who assist us in operating our website and conducting our business. These service providers are obligated to keep your
                                        information confidential and are prohibited from using it for any other purpose.
                                    </p>
                                    <p>
                                        We may also disclose your personal information if required to do so by law or in the good-faith belief that such action is necessary to comply with legal obligations, protect and defend our rights or
                                        property, or act in urgent circumstances to protect the personal safety of our users or the public.
                                    </p>
                                </div>
                                <div className="main-privacy-policy__item">
                                    <h2 className="main-privacy-policy__title">Data Security</h2>
                                    <p>
                                        We implement a variety of security measures to maintain the safety of your personal information. However, please be aware that no method of transmission over the Internet or electronic storage is 100%
                                        secure.
                                    </p>
                                </div>
                                <div className="main-privacy-policy__item">
                                    <h2 className="main-privacy-policy__title">Third-Party Links</h2>
                                    <p>Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites.</p>
                                </div>
                                <div className="main-privacy-policy__item">
                                    <h2 className="main-privacy-policy__title">GDPR Compliance</h2>
                                    <span>For users residing in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR). Under the GDPR, you have the following rights:</span>
                                    <ul className="main-privacy-policy__sublist main-privacy-policy__sublist_big">
                                        <li className="main-privacy-policy__sublist-item">The right to access your personal data;</li>
                                        <li className="main-privacy-policy__sublist-item">The right to request correction of your personal data;</li>
                                        <li className="main-privacy-policy__sublist-item">The right to request erasure of your personal data;</li>
                                        <li className="main-privacy-policy__sublist-item">The right to object to processing of your personal data;</li>
                                        <li className="main-privacy-policy__sublist-item">The right to request restriction of processing your personal data;</li>
                                        <li className="main-privacy-policy__sublist-item">The right to request transfer of your personal data;</li>
                                        <li className="main-privacy-policy__sublist-item">The right to withdraw consent.</li>
                                    </ul>
                                    <p>To exercise any of these rights, please contact us using the information provided in the "Contact Us" section below. We will respond to your request within 30 days.</p>
                                </div>
                                <div className="main-privacy-policy__item">
                                    <h2 className="main-privacy-policy__title">Contact Us</h2>
                                    <p>
                                        If you have any questions or concerns about our Privacy Policy or our practices, please contact us at{' '}
                                        <a href="mailto:support@ingamble.com" target="_blank" aria-label="Put your description here.">
                                            support@ingamble.com
                                        </a>
                                        .
                                    </p>
                                    <p>By using our website, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

    )
}
