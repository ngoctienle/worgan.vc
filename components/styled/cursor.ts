import tw from 'tailwind-styled-components'

const Cursor = tw.div`
absolute -top-[3px] -left-[3px] bg-white size-1.5 rounded-full z-[10000]
select-none pointer-events-none scale-100 cursor-animation
`

const CursorFollower = tw.div`
absolute -top-[10px] -left-[10px] bg-white/20 size-5 rounded-full z-[10000]
select-none pointer-events-none cursor-follower-animation
`

export { Cursor, CursorFollower }
