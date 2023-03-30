import React, { Suspense, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  setMenuLinks,
  setActiveTab,
  setWorkspaceTabs,
  selectMenuLinks,
  selectActiveTab,
  selectWorkspaceTabs,
} from 'redux/slice/workspaceSlice'
import { selectMenus } from 'redux/slice/metaDataSlice'
import _ from 'lodash'
import queryString from 'qs'
import { Tabs, Layout } from 'antd'
import routes from 'routes'
import Loader from 'utilities/components/Loader'
import BaseWorkspace from './BaseWorkspace'

const { TabPane } = Tabs
const { Content } = Layout
const ROUTES_LAYOUT = routes.theLayout

const TheContent = () => {
  const menuLinks = useSelector(selectMenuLinks)
  const activeTab = useSelector(selectActiveTab)
  const workspaceTabs = useSelector(selectWorkspaceTabs)
  const menus = useSelector(selectMenus)
  const DATA = useSelector((state) => state.commonPage?.commonPageData) || []
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  // console.log('the layout render', location.pathname, activeTab)
  useEffect(() => {
    let linkCurrent = findLinkData(menuLinks, location.pathname, location.search)
    if (!linkCurrent) return history.push('/dashboard')

    const checkExistInWorkspaceTabs = _.map(workspaceTabs, 'url').includes(linkCurrent.url)
    if (checkExistInWorkspaceTabs) {
      dispatch(setActiveTab(linkCurrent.url))
      return
    }

    let workspaceTabsNew = [...workspaceTabs]
    workspaceTabsNew.unshift(linkCurrent)

    dispatch(setActiveTab(linkCurrent.url))
    dispatch(setWorkspaceTabs(workspaceTabsNew))
  }, [location])

  useEffect(() => {
    let menuLinks = []
    menus.forEach((menu) => {
      if (menu.url)
        menuLinks.push({
          url: menu.url,
          name: menu.name,
          path: menu.url.split('?')[0],
        })
    })

    dispatch(setMenuLinks(menuLinks))
  }, [menus])
  const handelChangeTabs = (keyTab) => {
    history.push(keyTab)
  }
  function renderNameTab({ search, path, name = 'Page' }) {
    if (path === '/page-viewer' || path === '/batch') {
      search = queryString.parse(search, {
        ignoreQueryPrefix: true,
      })
      const PAGE = DATA?.find((tio) => tio.sid === search.sid) || { name }
      return PAGE.name
    } else return name
  }

  const handleCloseTab = (targetKey) => {
    let newActiveKey = targetKey
    let lastIndex = -1
    let indexActiveTab = workspaceTabs.findIndex((item) => item.url === activeTab)

    workspaceTabs.forEach((item, i) => {
      if (item.url === targetKey) {
        if (indexActiveTab === i) {
          lastIndex = i - 1
        } else {
          indexActiveTab > i ? (lastIndex = indexActiveTab - 1) : (lastIndex = indexActiveTab)
        }
      }
    })

    const newPanes = workspaceTabs.filter((item) => item.url !== targetKey)

    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].url
      } else {
        newActiveKey = newPanes[0].url
      }
    }
    history.push(newActiveKey)
    dispatch(setActiveTab(newActiveKey))
    dispatch(setWorkspaceTabs(newPanes))
  }
  const handleChangeTabs = (targetKey, action) => {
    if (action === 'remove') {
      handleCloseTab(targetKey)
    }
  }
  return (
    <Content className='px-2em bg-white'>
      <Suspense
        fallback={
          <div className='h-100 d-flex justify-content-center align-items-center'>
            <Loader />
          </div>
        }
      >
        <Tabs
          activeKey={activeTab}
          type='editable-card'
          onChange={handelChangeTabs}
          hideAdd={true}
          onEdit={handleChangeTabs}
        >
          {workspaceTabs.map((workspaceTab) => (
            <TabPane
              key={workspaceTab.url}
              tab={renderNameTab(workspaceTab)}
              closable={workspaceTabs.length > 1 && true}
            >
              {workspaceTab.url === activeTab && (
                <BaseWorkspace
                  workspaceTab={workspaceTab}
                  component={findRouteComponent(workspaceTab)}
                />
              )}
            </TabPane>
          ))}
        </Tabs>
      </Suspense>
    </Content>
  )
}

export default React.memo(TheContent)

const findLinkData = (menuLinks, pathname, search) => {
  let linkCurrent = {
    url: `${pathname}${search}`,
    path: pathname,
    search: search,
  }

  let routeFound = ROUTES_LAYOUT.find(
    (route) => route.path.toLowerCase() === linkCurrent.path.toLowerCase()
  )
  if (!routeFound) return null

  let workspaceLinkFound = menuLinks.find(
    (workspaceLink) => workspaceLink.url === `${pathname}${search}`
  )
  if (workspaceLinkFound) {
    linkCurrent.name = workspaceLinkFound.name
  } else linkCurrent.name = routeFound.name
  return linkCurrent
}

const findRouteComponent = (workspaceTab) => {
  let routeFound = ROUTES_LAYOUT.find(
    (route) => route.path.toLowerCase() === workspaceTab.path.toLowerCase()
  )

  return routeFound.component
}
