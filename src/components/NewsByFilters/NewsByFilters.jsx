import styles from './styles.module.css'
import { PAGE_SIZE, TOTAL_PAGES } from '../../constants/constants.js'
import NewsList from '../NewsList/NewsList.jsx'
import NewsFilters from '../NewsFilters/NewsFilters.jsx'
import { useDebounce } from '../../helpers/hooks/useDebounce.js'
import { useFetch } from '../../helpers/hooks/useFetch.js'
import { getNews } from '../../api/apiNews.js'
import { useFilters } from '../../helpers/hooks/useFilters.js'
import PaginationWrapper from '../PaginationWrapper/PaginationWrapper.jsx'

const NewsByFilters = () => {
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
    <section className={styles.section}>

      <NewsFilters filters={filters} changeFilter={changeFilter}/>

      <PaginationWrapper top
                         bottom
                         handlePreviousPage={handlePreviousPage}
                         handleNextPage={handleNextPage}
                         handlePageClick={handlePageClick}
                         currentPage={filters.page_number}
                         totalPages={TOTAL_PAGES}
      >
        <NewsList isLoading={isLoading}
                  news={data?.news}/>
      </PaginationWrapper>


    </section>
  )
}

export default NewsByFilters