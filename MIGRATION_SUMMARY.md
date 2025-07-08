# Міграція з React на Next.js - Детальний Звіт

## Загальний Огляд

Проект успішно мігрований з React на Next.js 15.3.3 з повною підтримкою SSR/CSR hybrid рендерингу, правильною структурою маршрутизації та оптимізованими імпортами.

## 1. Структура Файлів та Маршрутизація

### Було (React):

```
src/
  components/
  pages/ (звичайні компоненти)
  App.js (react-router)
```

### Стало (Next.js):

```
src/
  app/ (App Router)
    page.tsx (головна сторінка)
    layout.tsx (загальний layout)
    casino/[casino_slug]/bonuses/[bonus_slug]/page.tsx (динамічна маршрутизація)
    bonuses/page.tsx
  components/ (залишились без змін)
  pages-component/ (компоненти сторінок)
```

**Чому**: Next.js App Router забезпечує автоматичну маршрутизацію на основі файлової структури, SSR "з коробки" та кращу оптимізацію.

**Зміни**:

-   `index.tsx` → `page.tsx` для сторінок
-   `bonus_slug/` → `[bonus_slug]/` для динамічних маршрутів
-   Додано `layout.tsx` для загального layout'у

## 2. Імпорти та Шляхи

### Статичні Ресурси (SVG, Images)

**Було**:

```tsx
import starIcon from '@/public/img/icons/star.svg'
import { LazyCardImg } from '@/components/lazy-img/LazyCardImg'

<img src={starIcon} alt="star" />
<LazyCardImg img={imageUrl} />
```

**Стало**:

```tsx
<img src="/img/icons/star.svg" alt="star" />
<img src={imageUrl} alt="description" />
```

**Чому**: В Next.js статичні ресурси з папки `public` доступні напряму через `/`. Імпорт SVG як модулів створював проблеми з webpack.

### Шляхи Компонентів

**Було**:

```tsx
import { SomeComponent } from '../../components/SomeComponent';
import { types } from '../../../types';
```

**Стало**:

```tsx
import { SomeComponent } from '@/components/SomeComponent';
import { types } from '@/types';
```

**Чому**: Використання алиасів `@/` робить імпорти більш читабельними та стійкими до змін структури.

## 3. Маршрутизація та Навігація

### React Router → Next.js Router

**Було**:

```tsx
import { Link, useParams } from 'react-router-dom';

<Link to="/casino/some-slug">Casino</Link>;

const { bonus_slug } = useParams();
```

**Стало**:

```tsx
import Link from 'next/link';
import { useParams } from 'next/navigation';

<Link href="/casino/some-slug">Casino</Link>;

const params = useParams();
const bonus_slug = Array.isArray(params.bonus_slug) ? params.bonus_slug[0] : params.bonus_slug;
```

**Чому**: Next.js має власну систему маршрутизації, оптимізовану для SSR. Параметри можуть бути масивами, тому потрібна обробка типів.

## 4. Компоненти Сторінок

### Серверні vs Клієнтські Компоненти

**Було** (все на клієнті):

```tsx
export default function BonusPage() {
    const [data, setData] = useState();
    // вся логіка на клієнті
}
```

**Стало** (hybrid SSR/CSR):

```tsx
// page.tsx (серверний)
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bonus Details',
    description: 'Casino bonus information',
};

export default async function BonusPage({ params }: { params: Promise<{ bonus_slug: string }> }) {
    const { bonus_slug } = await params;
    return <BonusClientComponent bonusSlug={bonus_slug} />;
}

// BonusClientComponent.tsx (клієнтський)
('use client');
export function BonusClientComponent({ bonusSlug }: { bonusSlug: string }) {
    const [data, setData] = useState();
    // інтерактивна логіка
}
```

**Чому**: Розділення дозволяє отримати переваги SSR (SEO, швидкість) та зберегти інтерактивність там, де потрібно.

## 5. Динамічні Імпорти

### React.lazy → Next.js dynamic

**Було**:

```tsx
const LazyComponent = React.lazy(() => import('./Component'))

<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

**Стало**:

```tsx
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./Component'), {
  loading: () => <Loading />,
  ssr: false // для компонентів, що використовують window/document
})

<DynamicComponent />
```

**Чому**: Next.js dynamic забезпечує кращу оптимізацію та контроль над SSR для ледачо завантажених компонентів.

## 6. Обробка Параметрів (Next.js 15+)

### Promise-based Params

**Було** (Next.js 14):

```tsx
export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
}
```

**Стало** (Next.js 15):

```tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
}
```

**Чому**: Next.js 15 зробив параметри асинхронними для кращої оптимізації та підготовки до React Server Components.

## 7. CSS та Стилі

### Імпорти Стилів

**Було**:

```tsx
import '../../../../styles/style.css';
```

**Стало**:

```tsx
import '../../../styles/style.css';
```

**Чому**: Виправлені шляхи відносно нової структури папок Next.js.

## 8. API та Запити

### Без змін архітектури

```tsx
// Залишилось незмінним
import $api from '@/http';

const { data } = useQuery(['key'], () => $api.get('/endpoint'));
```

**Чому**: Існуюча система запитів (axios + react-query) добре працює з Next.js, тому не потребувала змін.

## 9. Компоненти-Обгортки

### Вирішення SSR/CSR Конфліктів

**Створено нові обгортки**:

```tsx
// components/client-wrappers/BlockFooterWrapper.tsx
'use client';
import dynamic from 'next/dynamic';

const BlockFooter = dynamic(() => import('../path/BlockFooter'), {
    ssr: false,
    loading: () => <div>Loading...</div>,
});

export default function BlockFooterWrapper(props) {
    return <BlockFooter {...props} />;
}
```

**Чому**: Деякі компоненти використовують browser-only API (window, document), тому потребують клієнтського рендерингу.

## 10. Неіснуючі Компоненти

### Видалені залежності

**Було**:

```tsx
import { LazyCardImg } from '@/components/lazy-img/LazyCardImg';
import { Wraper } from '../Wraper';
```

**Стало**:

```tsx
<img src={imageUrl} alt="description" />
<div>{children}</div>
```

**Чому**: Компоненти `LazyCardImg` та `Wraper` не існували в кодовій базі, тому замінені на стандартні HTML елементи.

## 11. TypeScript та Типізація

### Покращена типізація

**Було**:

```tsx
const { bonus_slug } = useParams(); // any
```

**Стало**:

```tsx
const params = useParams();
const bonus_slug: string = Array.isArray(params.bonus_slug) ? params.bonus_slug[0] : params.bonus_slug || '';
```

**Чому**: Next.js параметри можуть бути строками або масивами, потрібна правильна обробка типів.

## 12. SEO та Метадані

### Додано SEO оптимізацію

**Стало**:

```tsx
export const metadata: Metadata = {
    title: 'Casino Bonuses',
    description: 'Best casino bonuses and promotions',
    keywords: 'casino, bonuses, gambling',
    openGraph: {
        title: 'Casino Bonuses',
        description: 'Best casino bonuses',
        images: ['/img/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
    },
};
```

**Чому**: Next.js забезпечує кращу SEO оптимізацію через серверний рендеринг та вбудовану підтримку метаданих.

## 13. Серверні Компоненти та Блоки

### Створення Server Components для оптимізації

**Новостворені серверні компоненти**:

```tsx
// src/pages-component/main-page/server-blocks/BlockType11MServer.tsx
export default async function BlockType11MServer({ data }: { data: DataHomeItemsBlock }) {
    // серверна логіка обробки даних
    return <div>...</div>;
}

// src/pages-component/main-page/server-blocks/BlockType3MobileServer.tsx
// src/pages-component/main-page/server-blocks/BlockType4MobileServer.tsx
// src/pages-component/main-page/server-blocks/BlockType5MobileServer.tsx
// src/pages-component/main-page/server-blocks/BlockType7MobileServer.tsx
// src/pages-component/main-page/server-blocks/BlockType10MobileServer.tsx
```

**Чому створені**: Деякі блоки не потребують клієнтської інтерактивності та можуть бути відрендерені на сервері для кращої продуктивності та SEO.

### Гібридна архітектура рендерингу

**Стратегія розподілу**:

-   **Серверні блоки**: Статичний контент, списки, інформаційні блоки
-   **Клієнтські блоки**: Інтерактивні елементи, фільтри, модальні вікна

**Переваги**:

-   Швидший First Paint через серверний рендеринг
-   Менший розмір JavaScript бандлу
-   Кращий SEO для статичного контенту
-   Збереження інтерактивності там, де потрібно

## 14. Виправлення Синтаксичних Помилок

### Проблема з SVG-атрибутами

**Було** (неправильний синтаксис):

```tsx
<img src={/img/cinos / arrow - yellow.svg} alt="/img/icons/arrow-yellow.svg" />
```

**Стало**:

```tsx
<img src="/img/icons/arrow-yellow.svg" alt="arrow-yellow" />
```

**Чому**: Під час автоматичної заміни імпортів утворились некоректні JavaScript-вирази без лапок.

## Результат Міграції

✅ **Успішний білд**: `npm run build` проходить без помилок
✅ **9 маршрутів**: Всі сторінки правильно сконфігуровані
✅ **SSR/CSR hybrid**: Оптимальний баланс між продуктивністю та інтерактивністю
✅ **TypeScript**: Всі типи правильно налаштовані
✅ **SEO готовність**: Метадані та серверний рендеринг

## Структура Згенерованих Маршрутів

```
Route (app)                                        Size     First Load JS
┌ ƒ /                                             274 B    188 kB
├ ○ /_not-found                                   180 B    102 kB
├ ƒ /all-loyalties/[[...params]]                6.96 kB   176 kB
├ ○ /api-test                                     136 B    102 kB
├ ƒ /bonuses                                      882 B    189 kB
├ ƒ /casino/[casino_slug]/bonuses/[bonus_slug]  7.92 kB   186 kB
├ ƒ /casino/[casino_slug]/loyalty               5.53 kB   183 kB
├ ƒ /casinos                                      882 B    189 kB
└ ○ /privacy-policy                               203 B    105 kB

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

## Ключові Переваги Після Міграції

1. **Продуктивність**: Швидший First Load через SSR
2. **SEO**: Кращі позиції в пошуку через серверний рендеринг
3. **Розробка**: Автоматична маршрутизація та hot reload
4. **Масштабованість**: Легше додавати нові сторінки та функції
5. **Оптимізація**: Автоматичне code splitting та оптимізація бандлів
6. **Типізація**: Повна TypeScript підтримка з правильними типами
7. **Підтримка**: Готовність до майбутніх оновлень Next.js

## Рекомендації для Подальшого Розвитку

1. **Оптимізація зображень**: Розглянути міграцію `<img>` тегів на `<Image>` компонент Next.js
2. **API маршрути**: Можна перенести API виклики в Next.js API routes при потребі
3. **Кешування**: Налаштувати кешування для статичних ресурсів
4. **Моніторинг**: Додати аналітику продуктивності для відстеження покращень
