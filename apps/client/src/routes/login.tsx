import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-[80vh] items-center justify-center"
    >
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold">Family Manager</h1>
        <p className="text-muted-foreground">Войдите, чтобы продолжить</p>
        <button className="rounded-lg bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90 transition-colors">
          Войти через Google
        </button>
      </div>
    </motion.div>
  )
}
