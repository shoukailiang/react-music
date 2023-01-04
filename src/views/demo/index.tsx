import React, { FC, memo, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}
const Home: FC<IProps> = (props) => {
  return <div>Home</div>
}
export default memo(Home)
