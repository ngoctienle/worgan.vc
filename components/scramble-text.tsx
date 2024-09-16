'use client'

import { cn } from '@/libs/utils'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useScramble } from 'use-scramble'

gsap.registerPlugin(useGSAP)

type ScrambleTextProps = {
  text: string
  className?: React.HTMLProps<HTMLSpanElement>['className']
}

export const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className }) => {
  const { ref } = useScramble({
    text,
  })

  return (
    <span ref={ref} className={cn('tracking-wider', className)} />
  )
}
