import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'

interface IProps {
  children?: ReactNode
}

const Download: FC<IProps> = () => {
  return (
    <div>
      <div>Download</div>
    </div>
  )
}

export default memo(Download)
