import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Shell } from '@/components/layout/Shell'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <Shell>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
    </Shell>
  )
}
