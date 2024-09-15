'use client'

import SplashView from '@/views/splash'
import { useEffect, useState } from 'react'

export default function Home() {
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFirstLoad(false)
    }, 7100)

    // Clear timeout if the component unmounts
    return () => clearTimeout(timer)
  }, [])

  if (firstLoad) {
    return <SplashView />
  }

  return (
    <p>Hello home</p>
  )
}
