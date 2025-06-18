import styles from './styles.module.css'
import { getNews } from '../../api/apiNews.js'
import { useDebounce } from '../../helpers/hooks/useDebounce.js'
import { PAGE_SIZE } from '../../constants/constants.js'
import { useFetch } from '../../helpers/hooks/useFetch.js'
import { useFilters } from '../../helpers/hooks/useFilters.js'
import LatestNews from '../../components/LatestNews/LatestNews.jsx'
import NewsByFilters from '../../components/NewsByFilters/NewsByFilters.jsx'

const Main = () => {
  const { filters, changeFilter } = useFilters({
    page_number: 1,
    page_size: PAGE_SIZE,
    category: null,
    keywords: '',
  })

  const debouncedKeywords = useDebounce(filters.keywords, 1500)

  const { data, isLoading } = useFetch(getNews, {
    ...filters,
    keywords: debouncedKeywords,
  })

  return (
    <main className={styles.main}>
      <LatestNews isLoading={isLoading}
                  banners={data && data.news.length > 0 && data.news}/>

      <NewsByFilters news={data && data.news.length > 0 && data.news}
                     isLoading={isLoading}
                     filters={filters}
                     changeFilter={changeFilter}
      />
    </main>
  )
}

export default Main