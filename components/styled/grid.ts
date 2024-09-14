import tw from 'tailwind-styled-components'

type GridProps = {
  $columns?: string
  $gap?: number
  $rowGap?: number
  $colGap?: number
  $autoFlow?: 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense'
}

const Grid = tw.div<GridProps>`
grid

${p => p.$columns && `grid-cols-${p.$columns}`}
${p => p.$gap && `gap-${p.$gap}`}
${p => p.$rowGap && `row-gap-${p.$rowGap}`}
${p => p.$colGap && `col-gap-${p.$colGap}`}
${p => p.$autoFlow && `grid-flow-${p.$autoFlow}`}
`

export { Grid, type GridProps }
