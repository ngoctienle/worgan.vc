'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import throttle from 'lodash/throttle'
import { useRef } from 'react'

import { Cursor, CursorFollower } from './styled/cursor'

gsap.registerPlugin(useGSAP)

const CursorCore: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorFollowerRef = useRef<HTMLDivElement>(null)

  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const posX = useRef(0)
  const posY = useRef(0)

  useGSAP(() => {
    const followerAnimation = gsap.to({}, {
      duration: 0.016,
      repeat: -1,
      onRepeat: () => {
        posX.current += (mouseX.current - posX.current) / 9
        posY.current += (mouseY.current - posY.current) / 9

        gsap.set(cursorFollowerRef.current, {
          left: posX.current - 10,
          top: posY.current - 10,
        })

        gsap.set(cursorRef.current, {
          left: mouseX.current - 3,
          top: mouseY.current - 3,
        })
      },
    })

    // Throttled mouse move event listener
    const onMouseMove = throttle((e: MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
    }, 16) // Throttle to match 60fps (16ms)

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      followerAnimation.kill()
    }
  }, { scope: cursorRef })

  return (
    <>
      <Cursor ref={cursorRef} />
      <CursorFollower ref={cursorFollowerRef} />
    </>
  )
}

export default CursorCore
