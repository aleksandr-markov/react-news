import Skeleton from '../../components/Skeleton/Skeleton.jsx'

export default function withSkeleton (Component, type, count) {
  return function withSkeleton (props) {
    const { isLoading, ...restProps } = props

    if (isLoading) {
      return <Skeleton type={type} count={count}/>
    }

    return <Component {...restProps} />
  }
}
