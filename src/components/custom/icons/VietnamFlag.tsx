import { TSizeInfo } from '@/utils/types/global'

type TVietnamFlagProps = Partial<{
  svg: Partial<TSizeInfo>
}>

export const VietnamFlag = ({ svg: { width = 24, height = 24 } = {} }: TVietnamFlagProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 30 20">
      <rect width="30" height="20" fill="#da251d" />
      <polygon points="15,4 11.47,14.85 20.71,8.15 9.29,8.15 18.53,14.85" fill="#ff0" />
    </svg>
  )
}
