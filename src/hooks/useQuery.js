import { useMemo } from 'react'
const { useLocation } = require('react-router-dom')

export default () => {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}
