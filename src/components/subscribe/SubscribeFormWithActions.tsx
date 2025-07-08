'use client'

import { useFormState } from 'react-dom'
import { useState, useEffect } from 'react'
import { subscribeUser } from '@/actions/subscribe-actions'
import Link from 'next/link'
import Image from 'next/image'
// ✅ ЗМІНА: style.css тепер імпортується в layout.tsx

export default function SubscribeFormWithActions() {
    const [state, formAction] = useFormState(subscribeUser, { success: false })
    const [focus, setFocus] = useState(false)
    const [email, setEmail] = useState('')
    const [isChecked, setIsChecked] = useState(false)

    // Очищення форми після успішної підписки
    useEffect(() => {
        if (state.success) {
            setEmail('')
            setIsChecked(false)
            // Автоматично приховуємо повідомлення через 5 секунд
            const timer = setTimeout(() => {
                // Можна додати логіку для приховування повідомлення
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [state.success])

    return (
        <div className="main-gamble__subscribe subscribe">
            <div className="subscribe__container container">
                <div className="subscribe__body">
                    <div className="subscribe__bg">
                        <Image width={444} height={444} loading="lazy" src="/img/bg/08.webp" alt="bg" />
                        <Image width={444} height={444} loading="lazy" src="/img/bg/11.jpg" alt="bg" />
                    </div>
                    <div className="subscribe__row">
                        <div className="subscribe__column">
                            <Link href="/" aria-label="Put your description here." rel="noopener noreferrer" className="subscribe__logo">
                                <Image src="/img/logo-icon.svg" alt="logo" width={40} height={40} />
                            </Link>
                            <div className="subscribe__content">
                                <div className="subscribe__title">
                                    <span>Subscribe</span> to our newsletter
                                </div>
                                <div className="subscribe__text">
                                    <p>Get the highest potential bonuses right into your inbox</p>
                                </div>
                            </div>
                        </div>
                        <div className="subscribe__column">
                            <form action={formAction} className="subscribe__form form-subscribe">
                                <div className="form-subscribe__row">
                                    <div
                                        className={`form-item form-subscribe__item item-form-subscribe ${focus && 'focus'} ${
                                            email && 'filled'
                                        } ${state.error && 'error'} ${state.success && 'confirmed'}`}
                                    >
                                        <span className="form-item__icon item-form-subscribe__icon">
                                            <svg>
                                                <use xlinkHref="#email"></use>
                                            </svg>
                                        </span>

                                        <input
                                            placeholder="Your e-mail..."
                                            autoComplete="off"
                                            type="email"
                                            name="email"
                                            className={`item-form-subscribe__input form-item__input ${state.error ? 'input-error' : ''}`}
                                            value={state.success ? state.message || 'Success!' : email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            onFocus={() => setFocus(true)}
                                            onBlur={() => setFocus(false)}
                                            disabled={state.success}
                                        />

                                        <button
                                            type="button"
                                            className="form-item__icon form-item__icon_delete item-form-subscribe__icon_delete"
                                            onClick={() => setEmail('')}
                                        >
                                            <svg>
                                                <use xlinkHref="#delete"></use>
                                            </svg>
                                        </button>

                                        {state.success && (
                                            <span className="form-item__icon form-item__icon_confired">
                                                <Image src="/img/icons/check-icon.svg" alt="check" width={20} height={20} />
                                            </span>
                                        )}

                                        <span className="form-item__icon form-item__icon_error">
                                            <Image src="/img/icons/error-icon.svg" alt="error" width={20} height={20} />
                                        </span>
                                    </div>
                                    <button type="submit" className="form-subscribe__btn" disabled={state.success}>
                                        Subscribe
                                    </button>
                                </div>
                                <div className="form-subscribe__bottom">
                                    <div className="form-subscribe__checkbox">
                                        <input
                                            id="formAgreement"
                                            type="checkbox"
                                            name="agreement"
                                            className="form-subscribe__checkbox-input"
                                            checked={isChecked}
                                            onChange={(e) => setIsChecked(e.target.checked)}
                                            disabled={state.success}
                                        />
                                        <label
                                            htmlFor="formAgreement"
                                            className={`form-subscribe__checkbox-label ${state.error && 'active'}`}
                                        >
                                            <span>
                                                Feel free to unsubscribe anytime. Check our{' '}
                                                <Link href="/privacy-policy" aria-label="Terms of use" rel="noopener noreferrer">
                                                    Terms of use
                                                </Link>{' '}
                                                and{' '}
                                                <Link href="/privacy-policy" aria-label="Privacy Policy" rel="noopener noreferrer">
                                                    Privacy Policy
                                                </Link>{' '}
                                                here.
                                            </span>
                                        </label>
                                    </div>
                                    {state.error && (
                                        <div className="subscribe-error" style={{ color: '#FF3232', fontSize: '14px', marginTop: '8px' }}>
                                            {state.error}
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
