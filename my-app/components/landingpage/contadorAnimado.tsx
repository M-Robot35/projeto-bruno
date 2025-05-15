// components/AnimatedCounter.tsx
"use client"

import { useEffect, useState } from "react"

interface AnimatedCounterProps {
  target: number
  duration?: number // milissegundos
}

export function AnimatedCounter({ target, duration = 1500 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start: number | null = null
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = timestamp - start
      const current = Math.min(Math.floor((progress / duration) * target), target)
      setCount(current)
      if (progress < duration) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [target, duration])

  return <span className="text-emerald-600 text-3xl font-bold">{count.toLocaleString()}+</span>
}
