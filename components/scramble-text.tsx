'use client'

import { cn } from '@/libs/utils'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap-trial/ScrambleTextPlugin'
import { useRef } from 'react'

gsap.registerPlugin(useGSAP, ScrambleTextPlugin)

type ScrambleTextProps = {
  text: string
  className?: React.HTMLProps<HTMLSpanElement>['className']
  chars?: string
  timeLineDuration?: number
  delay?: number
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({ text, chars, timeLineDuration, delay, className }) => {
  const containerRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { duration: 2, ease: 'none' } })

    tl.to('#scramble', {
      duration: timeLineDuration || 3,
      scrambleText: { text, chars },
      delay
    })

    return () => tl.kill()
  }, { scope: containerRef })

  return (
    <span ref={containerRef}>
      <span id='scramble' className={cn('tracking-wider', className)}></span>
    </span>
  )
}
