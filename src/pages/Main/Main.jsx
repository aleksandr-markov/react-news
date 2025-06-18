import styles from './styles.module.css'
import NewsBanner from '../../components/NewsBanner/NewsBanner.jsx'
import { useEffect, useState } from 'react'
import { getCategories, getNews } from '../../api/apiNews.js'
import NewsList from '../../components/NewsList/NewsList.jsx'
import Skeleton from '../../components/Skeleton/Skeleton.jsx'
import Pagination from '../../components/Pagination/Pagination.jsx'
import Categories from '../../components/Categories/Categories.jsx'
import Search from '../../components/Search/Search.jsx'
import { useDebounce } from '../../helpers/hooks/useDebounce.js'

const Main = () => {
  const [news, setNews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [categories, setCategories] = useState([])
  const [keywords, setKeywords] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const totalPages = 10
  const pageSize = 10

  const debouncedKeywords = useDebounce(keywords, 1500)

  const fetchNews = async (currentPage) => {
    try {
      setIsLoading(true)
      const response = await getNews({
        page_number: currentPage,
        page_size: pageSize,
        category: selectedCategory === 'All' ? null : selectedCategory,
        keywords: keywords,
      })
      setNews(response.news)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await getCategories()
      setCategories(['All', ...response.categories])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchNews(currentPage)
  }, [currentPage, selectedCategory, debouncedKeywords])

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <main className={styles.main}>
      <Search keywords={keywords} setKeywords={setKeywords}/>

      <Categories categories={categories} selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}/>

      <Pagination handlePreviousPage={handlePreviousPage}
                  handleNextPage={handleNextPage}
                  handlePageClick={handlePageClick}
                  currentPage={currentPage}
                  totalPages={totalPages}
      />

      {news.length > 0 && !isLoading
        ? <NewsBanner item={news[0]}></NewsBanner>
        : <Skeleton type="banner" count={1}/>}

      {!isLoading ? <NewsList news={news}/> : <Skeleton type="list"
                                                        count={10}/>}

      <Pagination handlePreviousPage={handlePreviousPage}
                  handleNextPage={handleNextPage}
                  handlePageClick={handlePageClick}
                  currentPage={currentPage}
                  totalPages={totalPages}
      />
    </main>
  )
}

export default Main