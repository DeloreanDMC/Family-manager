import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/plans')({
  component: PlansPage,
})

function PlansPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">Планы</h1>
      <p className="text-muted-foreground">Задачи и чеклисты</p>
    </motion.div>
  )
}
