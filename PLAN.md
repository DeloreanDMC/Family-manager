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

Над проектом работают **2 разработчика** (оба фронтендеры):

- **KM** — Konstantin
- **ZD** — второй разработчик

### Как работать параллельно

1. Перед началом работы — договориться кто берёт какую задачу
2. Каждый работает в своей feature-ветке
3. Перед мержем — `git pull origin main` и разрешение конфликтов локально
4. Код-ревью: даже вдвоём полезно смотреть PR друг друга — ловит баги и выравнивает стиль
5. **Не работать над одним файлом одновременно** — чтобы избежать конфликтов

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

## Экономия токенов (лимиты Claude)

### Файлы контекста
- **CLAUDE.md** — читается автоматически при каждой сессии, не объяснять проект заново
- **LLM.txt** — сжатый справочник; вместо объяснений говорить "смотри LLM.txt"

### Команды в чате
| Команда | Когда использовать |
|---------|-------------------|
| `/compact` | Контекст разросся (длинный диалог) — сжимает историю на ~70% |
| `/clear` | Сменилась тема задачи — полная очистка контекста |
| Новая сессия | Независимая задача — начать с чистого листа |

### Правила общения с Claude
- Указывать файл явно: `"в Shell.tsx строка 42"` вместо `"посмотри layout"`
- Конкретные запросы вместо широких: `"добавь кнопку"` vs `"разберись с UI"`
- Не просить объяснять то что уже в CLAUDE.md / LLM.txt

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

---

### Фаза 0 — Совместный старт (KM + ZD вместе)

> Эти задачи формируют фундамент проекта, от которого зависит вся дальнейшая работа.
> Делаем **вместе** (или один делает, второй ревьюит), чтобы оба понимали структуру.

| # | Задача | Ветка |
|---|--------|-------|
| 0.1 | Инициализация монорепо (npm workspaces, tsconfig, .gitignore, .editorconfig) | `feature/init-monorepo` |
| 0.2 | Настройка Vite + React + TS + Tailwind + shadcn/ui + Framer Motion | `feature/init-monorepo` |
| 0.3 | TanStack Router — файловый роутинг, `__root.tsx` layout | `feature/init-monorepo` |
| 0.4 | TanStack Query + ky — конфиг инстанса, QueryProvider | `feature/init-monorepo` |
| 0.5 | Базовый Shell: сайдбар (десктоп), bottom bar (мобилка) | `feature/init-monorepo` |
| 0.6 | Заглушки всех страниц (login, dashboard, gifts, plans, profile) | `feature/init-monorepo` |
| 0.7 | Согласовать дизайн-систему: цвета, шрифты, тема shadcn/ui | `feature/init-monorepo` |
| 0.8 | Настроить ESLint + Prettier (единый code style) | `feature/init-monorepo` |

**Результат Фазы 0:** рабочий каркас приложения, все страницы-заглушки доступны, навигация работает, единый code style. После мержа в `main` — можно расходиться по фичам.

---

### Фаза 1 — Параллельная разработка страниц (с моками)

После Фазы 0 каждый берёт свои задачи:

#### План KM

| # | Задача | Ветка | Зависимости |
|---|--------|-------|-------------|
| K1 | Страница логина — UI, кнопка Google, мок-авторизация, редирект | `feature/page-login` | — |
| K2 | Dashboard — layout виджетов, сетка, анимации появления | `feature/page-dashboard` | K1 (нужен мок-юзер) |
| K3 | Dashboard — параллакс-секция, hero-блок | `feature/page-dashboard` | K2 |
| K4 | Профиль — аватар, инфо, настройки темы | `feature/page-profile` | K1 |
| K5 | Auth guard — редирект неавторизованных на /login | `feature/auth-guard` | K1 |

#### План ZD

| # | Задача | Ветка | Зависимости |
|---|--------|-------|-------------|
| Z1 | UI-кит — базовые shadcn/ui компоненты + анимации (Button, Card, Input, Dialog, Badge) | `feature/ui-components` | — |
| Z2 | Модуль «Подарки» — список вишлистов, карточки подарков, добавление/удаление | `feature/page-gifts` | Z1 |
| Z3 | Модуль «Подарки» — анимации карточек, статусы (хочу/куплено/подарено) | `feature/page-gifts` | Z2 |
| Z4 | Модуль «Планы» — список задач, чеклисты, создание/удаление | `feature/page-plans` | Z1 |
| Z5 | Модуль «Планы» — drag & drop сортировка, анимации | `feature/page-plans` | Z4 |

#### Точки синхронизации

После K2 + Z1 — **ревью друг друга**, убедиться что стили и подход к анимациям совпадают.
После K5 + Z3 — **интеграция**: dashboard-виджеты подтягивают данные из моков подарков/планов.

---

### Фаза 2 — Бекенд (KM + ZD вместе)

| # | Задача | Ветка | Кто |
|---|--------|-------|-----|
| B1 | Инициализация NestJS + Prisma + PostgreSQL, схема БД | `feature/backend-init` | KM + ZD |
| B2 | Google OAuth + Passport.js, JWT, guards | `feature/backend-auth` | KM |
| B3 | CRUD API: пользователи | `feature/backend-api` | KM |
| B4 | CRUD API: подарки | `feature/backend-api` | ZD |
| B5 | CRUD API: планы | `feature/backend-api` | ZD |
| B6 | Подключение фронта к реальному API (замена моков) | `feature/connect-api` | KM + ZD |

---

### Фаза 3 — Расширение (будущее)
- Система запросов с очками
- Планирование путешествий
- Push-уведомления / PWA

---

## Проверка (после каждой feature-ветки)

- `npm run dev` из `apps/client` — приложение запускается без ошибок
- Новая функциональность работает корректно
- Мобильная адаптация не сломана
- Нет ошибок TypeScript (`npm run typecheck`)
- ESLint/Prettier не ругается (`npm run lint`)
