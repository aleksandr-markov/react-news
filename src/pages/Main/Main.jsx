import styles from './styles.module.css'
import NewsBanner from '../../components/NewsBanner/NewsBanner.jsx'
import { getCategories, getNews } from '../../api/apiNews.js'
import NewsList from '../../components/NewsList/NewsList.jsx'
import Pagination from '../../components/Pagination/Pagination.jsx'
import Categories from '../../components/Categories/Categories.jsx'
import Search from '../../components/Search/Search.jsx'
import { useDebounce } from '../../helpers/hooks/useDebounce.js'
import { PAGE_SIZE, TOTAL_PAGES } from '../../constants/constants.js'
import { useFetch } from '../../helpers/hooks/useFetch.js'
import { useFilters } from '../../helpers/hooks/useFilters.js'

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

  const { data: dataCategories } = useFetch(getCategories)

  const handleNextPage = () => {
    if (filters.page_number < TOTAL_PAGES) {
      changeFilter('page_number', filters.page_number + 1)
    }
  }

  const handlePreviousPage = () => {
    if (filters.page_number > 1) {
      changeFilter('page_number', filters.page_number - 1)
    }
  }

  const handlePageClick = (pageNumber) => {
    changeFilter('page_number', pageNumber)
  }

  return (
    <main className={styles.main}>
      <Search keywords={filters.keywords}
              setKeywords={(keywords) => changeFilter('keywords', keywords)}/>

      {dataCategories  ? <Categories categories={dataCategories.categories}
                                    selectedCategory={filters.category}
                                    setSelectedCategory={(category) => changeFilter(
                                      'category', category)}/>
        : null}

      <Pagination handlePreviousPage={handlePreviousPage}
                  handleNextPage={handleNextPage}
                  handlePageClick={handlePageClick}
                  currentPage={filters.page_number}
                  totalPages={TOTAL_PAGES}
      />
      <NewsBanner isLoading={isLoading}
                  item={data && data.news.length > 0 && data.news[0]}/>

      <NewsList isLoading={isLoading} news={data && data.news.length > 0 && data.news}/>

      <Pagination handlePreviousPage={handlePreviousPage}
                  handleNextPage={handleNextPage}
                  handlePageClick={handlePageClick}
                  currentPage={filters.page_number}
                  totalPages={TOTAL_PAGES}
      />
    </main>
  )
}

export default Main