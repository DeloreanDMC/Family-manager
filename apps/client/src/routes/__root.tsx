import { createRootRoute, Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useEffect } from 'react'
import { Shell } from '@/components/layout/Shell'
import { useAuthStore } from '@/stores/authStore'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const isLoginPage = pathname === '/login'

  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      navigate({ to: '/login' })
    }
    if (isAuthenticated && isLoginPage) {
      navigate({ to: '/' })
    }
  }, [isAuthenticated, isLoginPage, navigate])

  return (
    <Shell>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
    </Shell>
  )
}
