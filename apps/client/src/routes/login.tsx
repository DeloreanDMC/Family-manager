import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Loader2 } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { MOCK_USERS, mockGoogleLogin } from '@/mocks/auth'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const handleLogin = async (userId: string) => {
    setIsLoading(true)
    setSelectedUser(userId)
    try {
      const user = await mockGoogleLogin(userId)
      login(user)
      navigate({ to: '/' })
    } finally {
      setIsLoading(false)
      setSelectedUser(null)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary/5 via-background to-primary/10">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-sm mx-4"
      >
        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
          >
            <Heart className="h-8 w-8 text-primary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-bold">Family Manager</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Выберите аккаунт для входа
            </p>
          </motion.div>

          <div className="space-y-3">
            <AnimatePresence>
              {MOCK_USERS.map((user, index) => (
                <motion.button
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLogin(user.id)}
                  disabled={isLoading}
                  className={cn(
                    'flex w-full items-center gap-4 rounded-xl border border-border p-4 text-left transition-colors hover:bg-accent disabled:opacity-60',
                    selectedUser === user.id && 'border-primary bg-primary/5',
                  )}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-10 w-10 rounded-full bg-muted"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                  {isLoading && selectedUser === user.id && (
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  )}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 flex items-center gap-2 justify-center"
          >
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">Google OAuth (мок)</span>
            <div className="h-px flex-1 bg-border" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
