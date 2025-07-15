'use server'

import $api from '@/http'

export type SubscribeActionState = {
    error?: string
    success?: boolean
    message?: string
}

export async function subscribeUser(
    prevState: SubscribeActionState,
    formData: FormData
): Promise<SubscribeActionState> {
    const email = formData.get('email') as string
    const agreement = formData.get('agreement') as string

    // Валідація
    if (!email) {
        return {
            error: 'Email обов\'язковий',
            success: false
        }
    }

    if (!agreement || agreement !== 'on') {
        return {
            error: 'Потрібно прийняти умови використання',
            success: false
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return {
            error: 'Неправильний формат email',
            success: false
        }
    }

    try {
        await $api.post('save-user-email/', { email })
        
        return {
            success: true,
            message: 'Ви успішно підписалися! 🎉'
        }
    } catch {
        return {
            error: 'Помилка при підписці. Спробуйте ще раз.',
            success: false
        }
    }
}
