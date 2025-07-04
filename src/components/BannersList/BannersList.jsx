import styles from './styles.module.css'
import withSkeleton from '../../helpers/hocs/withSkeleton.jsx'
import NewsBanner from '../NewsBanner/NewsBanner.jsx'

const BannersList = ({ banners }) => {
  return (
    <ul className={styles.banners}>
      {banners?.map(banner => {
        return <NewsBanner key={banner.id} item={banner}/>
      })}
    </ul>
  )
}

const BannersListWithSkeleton = withSkeleton(BannersList, 'banner', 10, 'row')

export default BannersListWithSkeleton