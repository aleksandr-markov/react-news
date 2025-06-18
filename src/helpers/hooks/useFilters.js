import { useState } from 'react'
import { PAGE_SIZE } from '../../constants/constants.js'

export const useFilters = (initialFilters) => {
  const [filters, setFilters] = useState(initialFilters)

  const changeFilter = (key, value) => {
    setFilters(prev => {
      return { ...prev, [key]: value }
    })
  }

  return { filters, changeFilter }
}