import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { LayoutDashboard, Gift, ListTodo, User, LogOut } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/authStore'

const navItems = [
  { to: '/', label: 'Главная', icon: LayoutDashboard },
  { to: '/gifts', label: 'Подарки', icon: Gift },
  { to: '/plans', label: 'Планы', icon: ListTodo },
  { to: '/profile', label: 'Профиль', icon: User },
] as const

export function Shell({ children }: { children: ReactNode }) {
  const routerState = useRouterState()
  const isLoginPage = routerState.location.pathname === '/login'

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <MobileHeader />
      <main className="flex-1 p-6 pt-16 pb-20 md:pt-6 md:pb-6">{children}</main>
      <BottomBar />
    </div>
  )
}

function Sidebar() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card p-4">
      <div className="mb-8 px-2">
        <h2 className="text-xl font-bold">Family Manager</h2>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <SidebarLink key={item.to} {...item} />
        ))}
      </nav>

      {user && (
        <div className="mt-auto border-t border-border pt-4">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full bg-muted" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div className="text-xs text-muted-foreground truncate">{user.email}</div>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              title="Выйти"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}

function SidebarLink({ to, label, icon: Icon }: (typeof navItems)[number]) {
  return (
    <Link
      to={to}
      className="group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground [&.active]:text-foreground"
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              layoutId="sidebar-active"
              className="absolute inset-0 rounded-lg bg-accent"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <Icon className="relative z-10 h-4 w-4" />
          <span className="relative z-10">{label}</span>
        </>
      )}
    </Link>
  )
}

function MobileHeader() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  if (!user) return null

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex md:hidden items-center justify-between border-b border-border bg-card px-4 py-2">
      <div className="flex items-center gap-2">
        <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full bg-muted" />
        <span className="text-sm font-medium">{user.name}</span>
      </div>
      <button
        onClick={handleLogout}
        className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        title="Выйти"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </header>
  )
}

function BottomBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-border bg-card">
      {navItems.map((item) => (
        <BottomBarLink key={item.to} {...item} />
      ))}
    </nav>
  )
}

function BottomBarLink({ to, label, icon: Icon }: (typeof navItems)[number]) {
  return (
    <Link
      to={to}
      className="relative flex flex-1 flex-col items-center gap-1 py-2 text-xs text-muted-foreground transition-colors [&.active]:text-primary"
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.div
              layoutId="bottombar-active"
              className="absolute top-0 left-1/4 right-1/4 h-0.5 rounded-full bg-primary"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <Icon className={cn('h-5 w-5', isActive && 'text-primary')} />
          <span>{label}</span>
        </>
      )}
    </Link>
  )
}
