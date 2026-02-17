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

## Команда и организация работы

Над проектом работают **2 разработчика** (оба фронтендеры). Рекомендации по организации:

### Распределение задач

| Разработчик | Зона ответственности |
|-------------|---------------------|
| **Dev 1** | Layout, Shell, навигация, роутинг, общая архитектура |
| **Dev 2** | Страницы фич (gifts, plans), UI-компоненты, анимации |
| **Вместе** | Бекенд (Фаза 3), ревью кода друг друга |

Распределение гибкое — можно пересматривать на каждой фазе. Главное правило: **не работать над одним файлом одновременно**, чтобы избежать конфликтов.

### Как работать параллельно

1. Перед началом работы — договориться кто берёт какую задачу
2. Каждый работает в своей feature-ветке
3. Перед мержем — `git pull origin main` и разрешение конфликтов локально
4. Код-ревью: даже вдвоём полезно смотреть PR друг друга — ловит баги и выравнивает стиль

---

## Git Workflow

### Правила ветвления

- **`main`** — стабильная ветка, всегда рабочий код
- **`feature/<название>`** — для каждой задачи/фичи отдельная ветка
- Мержим в `main` после завершения задачи
- Не коммитим напрямую в `main`

### Именование веток

```
feature/init-monorepo           — инициализация проекта
feature/setup-tailwind-shadcn   — подключение стилей и UI-кита
feature/tanstack-router         — настройка роутинга
feature/shell-layout            — базовый layout и навигация
feature/page-login              — страница логина
feature/page-dashboard          — дашборд
feature/page-gifts              — модуль подарков
feature/page-plans              — модуль планов
feature/backend-init            — инициализация NestJS
feature/backend-auth            — Google OAuth на беке
feature/backend-api             — CRUD API
feature/connect-api             — подключение фронта к беку
```

### Формат коммитов

Используем [Conventional Commits](https://www.conventionalcommits.org/):

```
<тип>(<область>): <описание>

feat(gifts): add wishlist card component
fix(router): fix redirect after login
chore(deps): update tanstack query to v5
style(dashboard): add parallax effect to hero section
refactor(services): switch from mocks to real API
docs(plan): update development plan
```

Типы: `feat`, `fix`, `chore`, `style`, `refactor`, `docs`, `test`

---

## Правила для LLM (Claude)

При работе над этим проектом Claude должен соблюдать:

### Git

1. **Каждая крупная задача — в отдельной ветке** `feature/<название>`
2. Перед началом работы — создать ветку от `main`: `git checkout -b feature/<название>`
3. Коммиты — по Conventional Commits (см. выше)
4. **Не пушить без подтверждения** пользователя
5. **Не мержить в main** без подтверждения пользователя
6. После завершения задачи — предложить мерж в `main`

### Код

7. Следовать структуре монорепо (`apps/client`, `apps/server`)
8. Использовать **только** технологии из стека (TanStack Router, TanStack Query, ky, shadcn/ui, Framer Motion и т.д.)
9. Новые UI-компоненты — через shadcn/ui CLI (`npx shadcn-ui@latest add <component>`)
10. Стили — только Tailwind CSS, никакого CSS-in-JS или обычного CSS
11. Типизация — строгая, без `any`
12. На фазе фронтенда — использовать моки, не требовать работающий бек

### Процесс

13. Перед началом крупной задачи — показать план и дождаться подтверждения
14. После завершения задачи — проверить что `npm run dev` работает
15. Обновлять PLAN.md при изменении планов

---

## Стратегия разработки: Frontend-First

Фронт сначала с моками, потом подключаем бек.

### Фаза 1 — Фундамент фронтенда

| # | Задача | Ветка |
|---|--------|-------|
| 1 | Инициализация монорепо (npm workspaces) | `feature/init-monorepo` |
| 2 | Настройка Vite + React + TS + Tailwind + shadcn/ui + Framer Motion | `feature/init-monorepo` |
| 3 | TanStack Router — файловый роутинг, корневой layout | `feature/tanstack-router` |
| 4 | TanStack Query + ky — настройка, мок-адаптер | `feature/tanstack-router` |
| 5 | Базовый Shell: сайдбар (десктоп), bottom bar (мобилка), анимации | `feature/shell-layout` |
| 6 | Заглушки всех страниц | `feature/shell-layout` |

### Фаза 2 — Страницы и UI (с моками)

| # | Задача | Ветка |
|---|--------|-------|
| 7 | Страница логина (мок Google OAuth) | `feature/page-login` |
| 8 | Dashboard — виджеты, параллакс | `feature/page-dashboard` |
| 9 | Модуль «Подарки» — вишлисты, анимации карточек | `feature/page-gifts` |
| 10 | Модуль «Планы» — задачи, чеклисты, drag & drop | `feature/page-plans` |
| 11 | Профиль — аватар, настройки | `feature/page-profile` |

### Фаза 3 — Бекенд

| # | Задача | Ветка |
|---|--------|-------|
| 12 | Инициализация NestJS + Prisma + PostgreSQL | `feature/backend-init` |
| 13 | Google OAuth + Passport.js | `feature/backend-auth` |
| 14 | CRUD API: пользователи, подарки, планы | `feature/backend-api` |
| 15 | Подключение фронта к реальному API | `feature/connect-api` |

### Фаза 4 — Расширение (будущее)
- Система запросов с очками
- Планирование путешествий
- Push-уведомления / PWA

---

## Проверка (после каждой feature-ветки)

- `npm run dev` из `apps/client` — приложение запускается без ошибок
- Новая функциональность работает корректно
- Мобильная адаптация не сломана
- Нет ошибок TypeScript (`npm run typecheck` если настроен)
