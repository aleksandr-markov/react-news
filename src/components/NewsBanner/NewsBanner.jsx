import styles from './styles.module.css'
import Image from '../Image/Image'
import { formatTimeAgo } from '../../helpers/formatTimeAgo.js'

const NewsBanner = ({ item }) => {
  return (
    <div className={styles.banner}>
      <Image image={item?.image}/>

      <a className={styles.link} href={item.url} target="_blank">
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.extra}>
          {formatTimeAgo(item.published)} by {item.author}
        </p>
      </a>
    </div>
  )
}

export default NewsBanner