import { ScrambleText } from '@/components/scramble-text'
import { GrainOverlay, Section } from '@/components/styled/common'

import { bottomLeftScrambleText, bottomRightScrambleText, topLeftScrambleText, topRightScrambleText, } from './constants'
import { PreLoader, PreLoaderContent, PreLoaderContentContainer, TextPosition, TextWrapper } from './styled'

const SplashView: React.FC = () => {
  return (
    <Section>
      <GrainOverlay />
      <PreLoader $direction='column' $align='center' $justify='between'>
        <PreLoaderContent $position='top'>
          <PreLoaderContentContainer $position='top'>
            <div>
              <img src="/images/top-line.svg" alt="Worgan V.C Top Line" />
            </div>
            <TextPosition $position='bl'>
              <TextWrapper>
                {topLeftScrambleText.map(text => (
                  <ScrambleText key={text.text} {...text} className='font-semibold' />
                ))}
              </TextWrapper>
            </TextPosition>
            <TextPosition $position='br'>
              <TextWrapper>
                {topRightScrambleText.map(text => (
                  <ScrambleText key={text.text} {...text} className='font-semibold' />
                ))}
              </TextWrapper>
            </TextPosition>
          </PreLoaderContentContainer>
        </PreLoaderContent>

        <PreLoaderContent $position='bottom'>
          <PreLoaderContentContainer $position='bottom'>
            <div>
              <img src="/images/bottom-line.svg" alt="Worgan V.C Bottom Line" />
            </div>
            <TextPosition $position='tl'>
              <TextWrapper>
                {bottomLeftScrambleText.map(text => (
                  <ScrambleText key={text.text} {...text} className='font-semibold' />
                ))}
              </TextWrapper>
            </TextPosition>
            <TextPosition $position='tr'>
              <TextWrapper>
                {bottomRightScrambleText.map(text => (
                  <ScrambleText key={text.text} {...text} className='font-semibold' />
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
