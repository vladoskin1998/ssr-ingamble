// Хелпер для поступового переходу на Next.js API Routes
// Це дозволить легко перемикатися між старим і новим API без поломки проекту

const USE_NEXT_API = process.env.USE_NEXT_API === 'true' || false

// Маппінг старих ендпоінтів на нові Next.js API routes
const API_MAPPING: Record<string, string> = {
  'get-data-home-page-categories/': '/api/categories',
  'get-data-home-page/': '/api/home-data?src=get-data-home-page/',
  'get-data-hub-page-casino/': '/api/home-data?src=get-data-hub-page-casino/',
  'get-data-hub-page-bonus/': '/api/home-data?src=get-data-hub-page-bonus/',
  'get-block-by-country/': '/api/block-by-country',
  'get-toggle-play/': '/api/toggle-play',
  'casinos-in-rank-range/': '/api/casinos-rank-range',
  'bonuses-in-rank-range/': '/api/bonuses-rank-range',
  'loyalty-programs-in-rank-range/': '/api/loyalty-programs-rank-range',
}

/**
 * Універсальний API клієнт, який може використовувати як старий, так і новий API
 */
export const apiClient = {
  async get(endpoint: string, config?: { useNextApi?: boolean }) {
    const useNext = config?.useNextApi ?? USE_NEXT_API
    
    if (useNext && API_MAPPING[endpoint]) {
      const response = await fetch(API_MAPPING[endpoint])
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return { data: await response.json() }
    }
    
    // Fallback до старого API
    const $api = (await import('@/http')).default
    return $api.get(endpoint)
  },

  async post(endpoint: string, data: unknown, config?: { useNextApi?: boolean }) {
    const useNext = config?.useNextApi ?? USE_NEXT_API
    
    // Для POST запитів поки що використовуємо тільки нові API routes
    if (useNext && endpoint.startsWith('filter/')) {
      const [, type] = endpoint.split('/')
      const url = new URL(`/api/filter/${type}`, window.location.origin)
      
      // Копіюємо query параметри з оригінального ендпоінту
      const urlParts = endpoint.split('?')
      if (urlParts[1]) {
        url.search = urlParts[1]
      }
      
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return { data: await response.json() }
    }
    
    // Fallback до старого API
    const $api = (await import('@/http')).default
    return $api.post(endpoint, data)
  }
}

/**
 * Хук для поступового тестування нових API routes
 */
export function useApiClient(forceNextApi = false) {
  const useNext = forceNextApi || USE_NEXT_API
  
  return {
    get: (endpoint: string) => apiClient.get(endpoint, { useNextApi: useNext }),
    post: (endpoint: string, data: unknown) => apiClient.post(endpoint, data, { useNextApi: useNext }),
  }
}

export default apiClient
