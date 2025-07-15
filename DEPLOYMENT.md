# 🚀 Deployment Instructions для ingamble.com

## Налаштування змінних середовища для продакшену

### 1. Для Vercel:

```bash
vercel env add NEXT_PUBLIC_SITE_URL
# Вводите: https://ingamble.com

vercel env add USE_NEXT_API
# Вводите: true

vercel env add NEXT_PUBLIC_API_URL
# Вводите: https://ig-api-prod.incasinowetrust.com/api/v1
```

### 2. Для інших хостингів (Netlify, Railway, тощо):

Створіть ці змінні середовища:

```bash
USE_NEXT_API=true
NEXT_PUBLIC_API_URL=https://ig-api-prod.incasinowetrust.com/api/v1
NEXT_PUBLIC_SITE_URL=https://ingamble.com
```

### 3. Або створіть файл `.env.production`:

```bash
# Next.js API Routes
USE_NEXT_API=true

# API Base URL
NEXT_PUBLIC_API_URL=https://ig-api-prod.incasinowetrust.com/api/v1

# Site URL for SSR
NEXT_PUBLIC_SITE_URL=https://ingamble.com
```

## Важливі моменти:

### ✅ Що змінити для продакшену:

-   `NEXT_PUBLIC_SITE_URL` з `http://localhost:3000` на `https://ingamble.com`
-   Переконайтесь що використовуєте `https://` (не `http://`)

### ✅ Що залишається без змін:

-   `USE_NEXT_API=true`
-   `NEXT_PUBLIC_API_URL=https://ig-api-prod.incasinowetrust.com/api/v1`

### 🔒 Безпека:

-   Всі змінні з префіксом `NEXT_PUBLIC_` будуть доступні у браузері
-   API endpoint вже використовує HTTPS
-   Продакшн домен також використовує HTTPS

### 🧪 Перед деплоєм перевірте:

1. Домен працює: https://ingamble.com
2. SSL сертифікат встановлено
3. API endpoint доступний
4. Всі змінні середовища правильно налаштовані

## Команди для деплою:

### Vercel:

```bash
npm run build
vercel --prod
```

### Netlify:

```bash
npm run build
# Завантажте папку .next/out (якщо використовуєте static export)
```

### Власний сервер:

```bash
npm run build
npm start
```
