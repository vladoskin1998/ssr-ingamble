// Приклад використання нових API Routes
// Цей файл демонструє, як безпечно перейти на нові API

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

// Приклад використання для категорій
export function useCategoriesApi(useNextApi = false) {
  return useQuery({
    queryKey: ['categories', useNextApi ? 'next-api' : 'direct'],
    queryFn: () => {
      if (useNextApi) {
        // Використовуємо новий Next.js API route
        return apiClient.get('get-data-home-page-categories/', { useNextApi: true })
      } else {
        // Використовуємо старий прямий API виклик
        return apiClient.get('get-data-home-page-categories/', { useNextApi: false })
      }
    },
    staleTime: 1000 * 60 * 60, // 1 година
    gcTime: 1000 * 60 * 60 * 24, // 24 години
  })
}

// Приклад використання для головних даних
export function useHomeDataApi(src: string, useNextApi = false) {
  return useQuery({
    queryKey: ['home-data', src, useNextApi ? 'next-api' : 'direct'],
    queryFn: () => {
      if (useNextApi) {
        // Використовуємо новий Next.js API route
        return fetch(`/api/home-data?src=${encodeURIComponent(src)}`).then(res => {
          if (!res.ok) throw new Error('Failed to fetch')
          return res.json().then(data => ({ data }))
        })
      } else {
        // Використовуємо старий прямий API виклик
        return apiClient.get(src, { useNextApi: false })
      }
    },
    staleTime: 1000 * 60 * 30, // 30 хвилин
    gcTime: 1000 * 60 * 60 * 2, // 2 години
  })
}

// Приклад використання для казино
export function useCasinoDataApi(slug: string, useNextApi = false) {
  return useQuery({
    queryKey: ['casino', slug, useNextApi ? 'next-api' : 'direct'],
    queryFn: () => {
      if (useNextApi) {
        return fetch(`/api/casino/${slug}`).then(res => {
          if (!res.ok) throw new Error('Failed to fetch')
          return res.json().then(data => ({ data }))
        })
      } else {
        return apiClient.get(`get-data-casino/${slug}/`, { useNextApi: false })
      }
    },
    staleTime: 1000 * 60 * 30, // 30 хвилин
    gcTime: 1000 * 60 * 60, // 1 година
  })
}

// Функція для тестування обох API і порівняння результатів
export async function compareApiResults(endpoint: string) {
  const [oldResult, newResult] = await Promise.allSettled([
    apiClient.get(endpoint, { useNextApi: false }),
    apiClient.get(endpoint, { useNextApi: true }),
  ])
  
  return {
    oldResult: oldResult.status === 'fulfilled' ? oldResult.value : null,
    newResult: newResult.status === 'fulfilled' ? newResult.value : null,
  }
}
