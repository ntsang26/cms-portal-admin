import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsCollapsed } from 'redux/slice/layoutsSlice'
import _ from 'lodash'
import { Layout } from 'antd'
import TheHeader from '../components/TheHeader'
import TheSidebar from './TheSidebar'
import TheContent from './TheContent'
import { local } from 'services'
import { fetchMeta } from 'redux/slice/metaDataSlice'

function TheLayout() {
  const history = useHistory()
  const dispatch = useDispatch()
  // const [isLoading, setIsLoading] = useState(true)
  const isCollapsed = useSelector(selectIsCollapsed)

  useEffect(() => {
    getMeta()
  }, [])

  useEffect(() => {
    fetchData()
    return () => { }
  }, [history])

  const fetchData = async () => {
    try {
      let session = local.get('session')
      if (!session) {
        history.replace('/login')
        return
      }
    } catch (error) {
      console.error(error)
      history.replace('/login')
    }
  }
  const getMeta = async () => {
    try {
      dispatch(fetchMeta())
    } catch (error) {
      console.log(error)
      return
    }
  }

  return (
    <Layout className='d-flex'>
      <TheSidebar />
      <Layout
        className='site-layout'
        style={{
          marginLeft: isCollapsed ? 80 : 200,
        }}
      >
        <TheHeader />
        <TheContent />
      </Layout>
    </Layout>
  )
}

export const handleLeavePage = (event) => {
  event.preventDefault()
  return (event.returnValue = 'Are you sure you want to exit?')
}

export default TheLayout
