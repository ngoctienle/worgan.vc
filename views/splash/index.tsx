'use client'

/* eslint-disable react/no-comment-textnodes */
import { ScrambleText } from '@/components/scramble-text'
import { GrainOverlay, Section } from '@/components/styled/common'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import DrawSVGPlugin from 'gsap-trial/DrawSVGPlugin'

import { useRef } from 'react'
import { bottomLeftScrambleText, bottomRightScrambleText, topLeftScrambleText, topRightScrambleText, } from './constants'
import { PreLoader, PreLoaderContent, PreLoaderContentContainer, ProgressBar, ProgressBarEmpty, ProgressBarFull, ProgressContent, ProgressGrid, ProgressIndicator, ProgressWrapper, TextPosition, TextWrapper } from './styled'

gsap.registerPlugin(useGSAP, DrawSVGPlugin)

const loadingColor = '#FD8A46'

const SplashView: React.FC = () => {
  const scopeRef = useRef<HTMLDivElement>(null)
  const topPathRef = useRef<SVGPathElement>(null)
  const bottomPathRef = useRef<SVGPathElement>(null)
  const progressContentRef = useRef<HTMLDivElement>(null)
  const textTopRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const textBottomRef = useRef<HTMLDivElement>(null)
  const progressBlinkRef = useRef<HTMLParagraphElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const percentageRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    gsap.set(scopeRef.current, {
      color: loadingColor,
    })

    gsap.set([topPathRef.current, bottomPathRef.current], {
      drawSVG: '50% 50%',
      stroke: 'rgba(253, 138, 70, 0)',
    })

    gsap.set(progressContentRef.current, {
      height: 0,
      width: 0,
      transformOrigin: 'center',
    })
    gsap.set([textTopRef.current, gridRef.current, textBottomRef.current], {
      opacity: 0,
    })

    tl.to([topPathRef.current, bottomPathRef.current], {
      drawSVG: '0% 100%',
      duration: 0.8,
      ease: 'power4',
      stroke: loadingColor,
    })
      .to(progressContentRef.current, {
        width: '40vw',
        duration: 0.6,
        border: `1px solid ${loadingColor}`,
        backgroundColor: '#0e0e0efc',
        ease: 'power4',
      })
      .to(progressContentRef.current, {
        height: '11vw',
        duration: 0.6,
        ease: 'power4',
      })
      .to([textTopRef.current, gridRef.current, textBottomRef.current], {
        opacity: 1,
        duration: 0.6,
      })
      .to(progressBlinkRef.current, {
        opacity: 0.4,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })

    // Progress bar fill animation
    tl.to(progressBarRef.current, {
      width: '100%',
      backgroundColor: loadingColor,
      duration: 2.5,
      delay: 0.5,
      ease: 'linear',
    })
    tl.to({}, {
      duration: 2.5,
      delay: 0.5,
      onUpdate() {
        const progress = Math.round(this.progress() * 100)
        percentageRef.current!.textContent = `${progress}%`
      },
      onComplete() {
        gsap.killTweensOf(progressBlinkRef.current)
        gsap.to(progressBlinkRef.current, { opacity: 1 })

        progressBlinkRef.current!.textContent = 'Complete'
        progressBlinkRef.current!.parentElement!.style.borderColor = '#FEEDD8'
        progressBarRef.current!.parentElement!.style.borderColor = '#FEEDD8'

        gsap.to(textBottomRef.current, { opacity: 0 })
        gsap.to(scopeRef.current, { color: '#FEEDD8' })
        gsap.to([topPathRef.current, bottomPathRef.current], {
          stroke: '#FEEDD8',
        })
        gsap.to(progressContentRef.current, {
          border: '1px solid #FEEDD8',
        })
        gsap.to(progressBarRef.current, {
          backgroundColor: '#FEEDD8',
        })

        gsap.to(scopeRef.current, {
          opacity: 0,
          duration: 0.3,
          delay: 0.8,
          ease: 'power4.out',
          onComplete() {
            scopeRef.current!.remove()
          }
        })
      },
      ease: 'linear',
    }, '-=3')
  })

  return (
    <Section ref={scopeRef}>
      <GrainOverlay />
      <PreLoader $direction='column' $align='center' $justify='between'>
        <PreLoaderContent $position='top'>
          <PreLoaderContentContainer $position='top'>
            <svg
              width="100%"
              height="20"
              viewBox="0 0 2560 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                ref={topPathRef}
                d="M0 1H923.77L938.343 18.8115H1620.85L1641.09 1H2560"
                strokeWidth="2"
              />
            </svg>

            <TextPosition $position='bl'>
              <TextWrapper>
                {topLeftScrambleText.map(text => (
                  <ScrambleText key={text.text} {...text} duration={1} className='font-semibold' />
                ))}
              </TextWrapper>
            </TextPosition>
            <TextPosition $position='br'>
              <TextWrapper>
                {topRightScrambleText.map(text => (
                  <ScrambleText key={text.text} {...text} duration={1} className='font-semibold' />
                ))}
              </TextWrapper>
            </TextPosition>
          </PreLoaderContentContainer>
        </PreLoaderContent>

        <ProgressWrapper>
          <ProgressContent ref={progressContentRef} $direction='column' $align='center' $justify='center' className='gap-3'>
            <div ref={textTopRef} className='opacity-0'>
              <p className='font-medium tracking-widest'>// SYSTEM LOADING</p>
            </div>
            <ProgressGrid ref={gridRef} $align='center' className='w-4/5 gap-5 opacity-0'>
              <ProgressIndicator className='border-orange'>
                <p ref={progressBlinkRef} className='font-medium tracking-widest'>Progress</p>
              </ProgressIndicator>
              <ProgressBar className='grow'>
                <ProgressBarEmpty className='border-orange'>
                  <ProgressBarFull ref={progressBarRef} />
                </ProgressBarEmpty>
              </ProgressBar>
              <p ref={percentageRef} className='w-10 font-medium tracking-widest'>0%</p>
            </ProgressGrid>
            <div ref={textBottomRef} className='opacity-0'>
              <ScrambleText text='< Unable to cancel />' delay={0.8} className='font-semibold' />
            </div>
          </ProgressContent>
        </ProgressWrapper>

        <PreLoaderContent $position='bottom'>
          <PreLoaderContentContainer $position='bottom'>
            <svg
              width="100%"
              height="20"
              viewBox="0 0 2560 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <path ref={bottomPathRef} d="M0 19H923.77L938.343 1.18849H1620.85L1641.09 19H2560" strokeWidth="2" />
            </svg>

            <TextPosition $position='tl'>
              <TextWrapper>
                {bottomLeftScrambleText.map(text => (
                  <ScrambleText key={text.text} {...text} duration={1} className='font-semibold' />
                ))}
              </TextWrapper>
            </TextPosition>
            <TextPosition $position='tr'>
              <TextWrapper>
                {bottomRightScrambleText.map(text => (
                  <ScrambleText key={text.text} {...text} duration={1} className='font-semibold' />
                ))}
              </TextWrapper>
            </TextPosition>
          </PreLoaderContentContainer>
        </PreLoaderContent>
      </PreLoader>
    </Section>
  )
}

export default SplashView
