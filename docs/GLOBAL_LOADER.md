# Глобальний контекст для лоадера

## Опис рішення

Створено систему глобального управління лоадером, яка показує `LogoLoader` від моменту натискання на посилання до повного рендерингу контенту на новій сторінці.

## Структура рішення

### 1. LoadingContext (`/src/context/LoadingContext.tsx`)

Основний контекст для управління станом завантаження:

-   `isGlobalLoading` - поточний стан лоадера
-   `startLoading()` - запуск лоадера
-   `stopLoading()` - зупинка лоадера
-   `setContentLoaded()` - позначення контенту як завантаженого
-   `isContentLoaded` - стан завантаженості контенту

### 2. LoadingLink (`/src/components/LoadingLink.tsx`)

Компонент-замінник стандартного `Link` який автоматично запускає лоадер:

```tsx
import { LoadingLink } from '@/components/LoadingLink';

<LoadingLink href="/casino/some-casino">Casino Name</LoadingLink>;
```

### 3. usePageLoading (`/src/hooks/usePageLoading.ts`)

Хук для управління завантаженням на сторінках:

```tsx
import { usePageLoading } from '@/hooks/usePageLoading';

const { markAsLoaded } = usePageLoading({
    autoComplete: false, // ручне керування
    dependencies: [data, allData], // залежності
});

// Позначити як завантажене вручну
markAsLoaded();
```

### 4. useNavigate (`/src/hooks/useNavigate.ts`)

Хук для програмної навігації з лоадером:

```tsx
import { useNavigate } from '@/hooks/useNavigate';

const { navigate } = useNavigate();

const handleClick = () => {
    navigate('/some-route');
};
```

## Інтеграція

### Додано до RootLayoutProvider

```tsx
// src/context/RootLayoutProvider.tsx
<QueryClientProvider client={queryClient}>
    <LoadingProvider>
        {' '}
        {/* Новий провайдер */}
        <AdaptiveProvider>
            <FilterProvider>
                <Icons />
                {children}
            </FilterProvider>
        </AdaptiveProvider>
    </LoadingProvider>
</QueryClientProvider>
```

## Впроваджені сторінки

### ✅ /all-loyalties
- **Архітектура**: Server page → AllLoyaltiesClient → SeeAllEssentialsLoyalty
- **Стан**: Повністю впроваджено з колбек-системою
- **LoadingLink**: ✅ Впроваджено у всіх посиланнях
- **Затримка**: 800ms для плавного відображення контенту

### ✅ /all-casinos  
- **Архітектура**: Server page → AllCasinosClient → SeeAllCasinos
- **Стан**: Повністю впроваджено з колбек-системою
- **LoadingLink**: ✅ Впроваджено у всіх посиланнях
- **Затримка**: 800ms для плавного відображення контенту

### ✅ /all-bonuses  
- **Архітектура**: Server page → AllBonusesClient → SeeAllBonus
- **Стан**: Повністю впроваджено з колбек-системою
- **LoadingLink**: ✅ Впроваджено у всіх посиланнях
- **Затримка**: 800ms для плавного відображення контенту

### LoadingLink впроваджено в компонентах:
- ✅ `src/components/header/index.tsx` - навігаційне меню (2 посилання на /all-loyalties)
- ✅ `src/components/simple-casino/HighRankedCasinos.tsx` - кнопка "See All" → /all-casinos
- ✅ `src/app/casino/[casino_slug]/bonuses/[bonus_slug]/SiblingBonus.tsx` - "See All" → /all-casinos
- ✅ `src/app/casino/[casino_slug]/bonuses/[bonus_slug]/EssentialVIPLoyaltyPrograms.tsx` - "See All" → /all-loyalties
- ✅ `src/pages-component/main-page/BlockType9.tsx` - "See All" → /all-loйalties
- ✅ `src/app/casino/[casino_slug]/bonuses/[bonus_slug]/OtherBestBonus.tsx` - "See All" → /all-bonuses

## Приклад використання на сторінці

```tsx
'use client'

import { usePageLoading } from '@/hooks/usePageLoading'
import { LoadingLink } from '@/components/LoadingLink'

export default function MyPage() {
    const { data, isLoading } = useQuery({...})

    const { markAsLoaded } = usePageLoading({
        autoComplete: false,
        dependencies: [data]
    })

    useEffect(() => {
        if (!isLoading && data) {
            // Коли всі дані завантажені
            setTimeout(() => {
                markAsLoaded()
            }, 300)
        }
    }, [isLoading, data, markAsLoaded])

    return (
        <div>
            {/* Замість Link використовуємо LoadingLink */}
            <LoadingLink href="/another-page">
                Go to another page
            </LoadingLink>
        </div>
    )
}
```

## Як це працює

1. **Натискання на посилання**: `LoadingLink` автоматично викликає `startLoading()`
2. **Навігація**: Next.js переходить на нову сторінку
3. **Показ лоадера**: `LoadingContext` показує `LogoLoader` поверх всього контенту
4. **Завантаження контенту**: Нова сторінка завантажується і рендериться
5. **Завершення**: Сторінка викликає `markAsLoaded()` коли контент готовий
6. **Приховання лоадера**: `LoadingContext` приховує лоадер

## Переваги

✅ **Єдине рішення**: Один лоадер для всього додатку  
✅ **Автоматичність**: Мінімальні зміни в існуючому коді  
✅ **Гнучкість**: Можна управляти вручну через хуки  
✅ **Типобезпека**: Повна типізація TypeScript  
✅ **Продуктивність**: Мінімальний вплив на продуктивність  
✅ **SSR сумісність**: Працює з Next.js SSR/SSG

## Міграція існуючого коду

### Замінити Link на LoadingLink:

```tsx
// Було
import Link from 'next/link';
<Link href="/page">Text</Link>;

// Стало
import { LoadingLink } from '@/components/LoadingLink';
<LoadingLink href="/page">Text</LoadingLink>;
```

### Додати управління завантаженням:

```tsx
// Додати хук
const { markAsLoaded } = usePageLoading({
    autoComplete: false,
    dependencies: [data, isReady],
});

// Позначити як завантажене коли готово
useEffect(() => {
    if (dataLoaded && componentsReady) {
        markAsLoaded();
    }
}, [dataLoaded, componentsReady, markAsLoaded]);
```

## Додаткові можливості

### Кастомний лоадер для окремих елементів:

```tsx
import { useLoading } from '@/context/LoadingContext';

const { isGlobalLoading } = useLoading();

if (isGlobalLoading) {
    return <CustomLoader />;
}
```

### Умовний запуск лоадера:

```tsx
<LoadingLink
    href="/page"
    onClick={(e) => {
        if (shouldPreventNavigation) {
            e.preventDefault();
            return;
        }
        // Лоадер запуститься автоматично
    }}
>
    Conditional navigation
</LoadingLink>
```
