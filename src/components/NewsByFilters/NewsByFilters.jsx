import styles from './styles.module.css'
import Pagination from '../Pagination/Pagination.jsx'
import { TOTAL_PAGES } from '../../constants/constants.js'
import NewsList from '../NewsList/NewsList.jsx'
import NewsFilters from '../NewsFilters/NewsFilters.jsx'

const NewsByFilters = ({ filters, changeFilter, isLoading, news }) => {

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

      <Pagination handlePreviousPage={handlePreviousPage}
                  handleNextPage={handleNextPage}
                  handlePageClick={handlePageClick}
                  currentPage={filters.page_number}
                  totalPages={TOTAL_PAGES}
      />

      <NewsList isLoading={isLoading}
                news={news}/>

      <Pagination handlePreviousPage={handlePreviousPage}
                  handleNextPage={handleNextPage}
                  handlePageClick={handlePageClick}
                  currentPage={filters.page_number}
                  totalPages={TOTAL_PAGES}
      />


    </section>
  )
}

export default NewsByFilters