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
  duration?: number
  timeLineDuration?: number
  delay?: number
  mainColor?: React.CSSProperties['color']
  timeline?: gsap.core.Timeline // Accept timeline prop
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({ text, chars, timeline, timeLineDuration, delay, duration, className, mainColor }) => {
  const containerRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const tl = timeline || gsap.timeline({ defaults: { duration, ease: 'power2' } }) // Use passed timeline or create a new one

    tl.to('#scramble', {
      color: mainColor,
      opacity: 0
    }).to(
      '#scramble',
      {
        duration: timeLineDuration || 3,
        scrambleText: { text, chars },
        opacity: 1,
        delay,
      },
      delay
    )

    return () => tl.kill()
  }, { scope: containerRef })

  return (
    <span ref={containerRef} className='min-h-6'>
      <span id='scramble' className={cn('tracking-wider', className)}></span>
    </span>
  )
}
