import { Flex } from '@/components/styled/flex'
import tw from 'tailwind-styled-components'

type TextPositionProps = {
  $position: 'tl' | 'tr' | 'bl' | 'br'
}

type PreLoaderContentProps = {
  $position: 'top' | 'bottom'
}

type PreLoaderContentContainerProps = {
  $position: 'top' | 'bottom'
}

const PreLoader = tw(Flex)`
relative h-screen w-full px-10 py-3
`

const PreLoaderContent = tw.div<PreLoaderContentProps>`
static inset-x-0 bottom-auto top-0

${p => p.$position === 'top' ? 'top-0 bottom-auto' : 'top-auto bottom-0'}
`

const PreLoaderContentContainer = tw.div<PreLoaderContentContainerProps>`
relative flex items-center justify-center

${p => p.$position === 'top' ? 'pt-8 pb-5' : 'pt-5 pb-8'}
`

const TextWrapper = tw.div`space-x-2 uppercase`

const TextPosition = tw.div<TextPositionProps>`
absolute

${(p) => {
    switch (p.$position) {
      case 'tl':
        return 'bottom-auto left-0 right-auto top-0'
      case 'tr':
        return 'bottom-auto left-auto right-0 top-0'
      case 'bl':
        return 'bottom-0 left-0 right-auto top-auto'
      case 'br':
        return 'bottom-0 left-auto right-0 top-auto'
    }
  }}
`

export { PreLoader, PreLoaderContent, PreLoaderContentContainer, TextPosition, TextWrapper }
