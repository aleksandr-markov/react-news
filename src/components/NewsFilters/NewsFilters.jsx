import styles from './styles.module.css'
import Categories from '../Categories/Categories.jsx'
import Search from '../Search/Search.jsx'
import { useFetch } from '../../helpers/hooks/useFetch.js'
import { getCategories } from '../../api/apiNews.js'

const NewsFilters = ({ filters, changeFilter }) => {
  const { data: dataCategories } = useFetch(getCategories)

  return (
    <div className={styles.filters}>
      {dataCategories ? <Categories categories={dataCategories.categories}
                                    selectedCategory={filters.category}
                                    setSelectedCategory={(category) => changeFilter(
                                      'category', category)}/>
        : null}


      <Search keywords={filters.keywords}
              setKeywords={(keywords) => changeFilter('keywords', keywords)}/>
    </div>
  )
}

export default NewsFilters