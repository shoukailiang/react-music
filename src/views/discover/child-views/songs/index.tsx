import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'

interface IProps {
  children?: ReactNode
}

const Songs: FC<IProps> = () => {
  return (
    <div>
      <div>Songs</div>
    </div>
  )
}

export default memo(Songs)
