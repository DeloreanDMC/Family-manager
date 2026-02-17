# Family Manager — План разработки

## Контекст

Приложение для семейной пары (2 пользователя) для организации быта: подарки, планы, запросы с очками, путешествия. Упор на красивый UI с анимациями и параллаксом. Web-приложение с мобильной адаптацией. Деплой пока локально.

## Стек технологий

| Слой | Технология | Почему |
|------|-----------|--------|
| **Фронтенд** | React + TypeScript + Vite | Быстрый старт, HMR |
| **UI-компоненты** | shadcn/ui (Tailwind + Radix) | Копируемые компоненты, полный контроль над стилями и анимациями |
| **Анимации** | Framer Motion | Лучшая библиотека для анимаций в React |
| **Параллакс** | react-scroll-parallax | Простая интеграция параллакс-эффектов |
| **Роутинг** | TanStack Router | Type-safe роутинг, лоадеры, вложенные маршруты |
| **Стейт/Запросы** | TanStack Query + ky | Type-safe кеширование, ky — лёгкий HTTP-клиент на fetch |
| **Стейт (локальный)** | Zustand | Минимальный бойлерплейт для UI-стейта |
| **Бекенд** | NestJS + TypeScript | Модульный, структурированный |
| **БД** | PostgreSQL + Prisma ORM | Реляционная БД, type-safe ORM, удобные миграции |
| **Аутентификация** | Google OAuth 2.0 + Passport.js (NestJS) | OAuth через Google, сессии/JWT на беке |

## Структура монорепо

```
Family-manager/
├── apps/
│   ├── client/                  # React фронтенд
│   │   ├── src/
│   │   │   ├── assets/          # Иконки, изображения, шрифты
│   │   │   ├── components/
│   │   │   │   ├── ui/          # shadcn/ui компоненты (кнопки, инпуты, карточки)
│   │   │   │   ├── layout/      # Shell, навигация, сайдбар
│   │   │   │   └── shared/      # Композитные компоненты (виджеты дашборда и т.д.)
│   │   │   ├── routes/          # TanStack Router — файловый роутинг
│   │   │   │   ├── __root.tsx   # Корневой layout (Shell + навигация)
│   │   │   │   ├── index.tsx    # / → Dashboard (главная)
│   │   │   │   ├── login.tsx    # /login → Google OAuth
│   │   │   │   ├── gifts.tsx    # /gifts → Вишлисты
│   │   │   │   ├── plans.tsx    # /plans → Планы и задачи
│   │   │   │   └── profile.tsx  # /profile → Профиль
│   │   │   ├── hooks/           # Кастомные хуки
│   │   │   ├── services/        # API-функции (ky) — с моками на старте
│   │   │   ├── stores/          # Zustand (UI-стейт, тема)
│   │   │   ├── types/           # Общие типы
│   │   │   ├── mocks/           # Мок-данные и MSW хендлеры
│   │   │   ├── lib/             # Утилиты, конфиг ky-инстанса
│   │   │   └── styles/          # Глобальные стили
│   │   ├── components.json      # shadcn/ui конфиг
│   │   ├── tailwind.config.ts
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── server/                  # NestJS бекенд
│       ├── src/
│       │   ├── auth/            # Google OAuth + Passport + Guards
│       │   ├── users/           # CRUD пользователей
│       │   ├── gifts/           # CRUD подарков
│       │   ├── plans/           # CRUD планов
│       │   └── prisma/          # Prisma сервис
│       ├── prisma/
│       │   └── schema.prisma    # Схема БД
│       └── package.json
│
├── package.json                 # Корневой (npm workspaces)
└── tsconfig.base.json           # Общий TS-конфиг
```

## Структура страниц

```
/login          → Страница входа через Google
/               → Dashboard (главная) — виджеты, сводка, быстрые действия
/gifts          → Вишлисты подарков (свой + партнёра)
/plans          → Планы и задачи (общие, личные)
/profile        → Профиль, настройки
```

**Dashboard** — центральная страница после логина:
- Виджеты: ближайшие задачи, статус подарков, быстрые действия
- Навигация в сайдбаре (десктоп) / bottom tab bar (мобилка)
- Анимированные переходы между страницами через Framer Motion + TanStack Router

## Стратегия разработки: Frontend-First

Фронт сначала с моками, потом подключаем бек.

### Фаза 1 — Фундамент фронтенда
1. Инициализация монорепо (npm workspaces)
2. Настройка Vite + React + TypeScript + Tailwind
3. Подключение shadcn/ui + Framer Motion
4. TanStack Router — файловый роутинг, корневой layout
5. TanStack Query + ky — настройка, мок-адаптер
6. Базовый Shell: сайдбар (десктоп), bottom bar (мобилка), анимации переходов

### Фаза 2 — Страницы и UI (с моками)
7. Страница логина (мок Google OAuth, кнопка «Войти через Google»)
8. Dashboard — виджеты, параллакс-эффекты
9. Модуль «Подарки» — вишлисты, добавление, статусы, анимации карточек
10. Модуль «Планы» — задачи, чеклисты, drag & drop
11. Профиль — аватар, настройки

### Фаза 3 — Бекенд
12. Инициализация NestJS + Prisma + PostgreSQL
13. Google OAuth + Passport.js (стратегия google, guards, JWT-сессии)
14. CRUD API: пользователи, подарки, планы
15. Подключение фронта к реальному API (замена моков на ky-запросы)

### Фаза 4 — Расширение (будущее)
- Система запросов с очками
- Планирование путешествий
- Push-уведомления / PWA

## Первый шаг: Фаза 1

1. Настроить монорепо с npm workspaces в `Family-manager/`
2. Создать `apps/client` — Vite + React + TS
3. Подключить Tailwind CSS + shadcn/ui + Framer Motion
4. Настроить TanStack Router (файловый роутинг) + TanStack Query + ky
5. Создать Shell layout: сайдбар, навигация, анимированные переходы
6. Заглушки всех страниц (dashboard, gifts, plans, profile, login)

## Проверка

- `npm run dev` из `apps/client` — приложение запускается
- Навигация между страницами работает с анимациями
- Мобильная адаптация: сайдбар → bottom bar
- TanStack Query devtools показывает мок-запросы
