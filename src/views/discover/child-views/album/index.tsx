import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'

interface IProps {
  children?: ReactNode
}

const Album: FC<IProps> = () => {
  return (
    <div>
      <div>Album</div>
    </div>
  )
}

export default memo(Album)
