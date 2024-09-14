import tw from 'tailwind-styled-components'

type FlexProps = {
  $direction?: 'row' | 'column'
  $justify?: 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly' | 'stretch' | 'normal'
  $align?: 'center' | 'start' | 'end' | 'baseline' | 'stretch'
  $gap?: number
  $wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
}

const directionMap: Record<NonNullable<FlexProps['$direction']>, string> = {
  row: 'flex-row',
  column: 'flex-col',
}

const justifyMap: Record<NonNullable<FlexProps['$justify']>, string> = {
  center: 'justify-center',
  start: 'justify-start',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
  stretch: 'justify-stretch',
  normal: 'justify-normal',
}

const alignMap: Record<NonNullable<FlexProps['$align']>, string> = {
  center: 'items-center',
  start: 'items-start',
  end: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
}

const Flex = tw.div<FlexProps>`
flex

${p => directionMap[p.$direction || 'row']}
${p => justifyMap[p.$justify || 'normal']}
${p => alignMap[p.$align || 'start']}
${p => p.$gap && `gap-${p.$gap}`}
${p => p.$wrap && `flex-${p.$wrap}`}
`

export { Flex, type FlexProps }
