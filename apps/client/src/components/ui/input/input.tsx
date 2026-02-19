import * as React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

import { cn } from '@/lib/utils'

type InputProps = Omit<HTMLMotionProps<'input'>, 'size'> &
  React.ComponentProps<'input'>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <motion.input
        type={type}
        whileFocus={{
          boxShadow: '0 0 0 3px hsl(262 83% 58% / 0.15)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={cn(
          'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
export type { InputProps }
