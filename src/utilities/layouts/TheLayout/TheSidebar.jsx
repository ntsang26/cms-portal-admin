import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsCollapsed, toggleSidebarShow } from 'redux/slice/layoutsSlice'
import { selectMenus, selectUserInfo, selectIsLoadingMenus } from 'redux/slice/metaDataSlice'
import { Layout, Menu } from 'antd'
import { useHistory, useLocation } from 'react-router-dom'
import i18n from 'i18next'
import { Icons } from 'constant/icons'

const { Sider } = Layout
function TheSidebar(props) {
  const history = useHistory(),
    dispatch = useDispatch(),
    location = useLocation() || {}
  const isCollapsed = useSelector(selectIsCollapsed)
  const menus = useSelector(selectMenus) || []
  const isLoadingMenus = useSelector(selectIsLoadingMenus)
  const items = () => {
    let parents = [],
      children = {}
    menus.map((mn, key) => {
      const item = {
        key: mn.to || mn.url,
        label: mn.name,
        icon: Icons[mn.icon] || Icons['SettingOutlined'],
        index: mn.index || Number.MAX_SAFE_INTEGER,
      }
      if (mn.parent) {
        children[mn.parent]?.length
          ? children[mn.parent].push(item)
          : (children[mn.parent] = [item])
      } else {
        parents.push(item)
      }
    })

    parents.map((parent) => {
      if (children[parent.key]?.length) {
        parent.children = children[parent.key].sort(
          (st, nd) => parseFloat(st.index) - parseFloat(nd.index)
        )
      }
    })
    return parents.sort((st, nd) => parseFloat(st.index) - parseFloat(nd.index))
  }
  const onClickMenus = (e) => {
    history.push(e.key)
  }
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
      collapsed={isCollapsed}
      onCollapse={(val) => dispatch(toggleSidebarShow(val))}
      collapsible
    >
      <div className='d-md-down-none h-64px d-flex-center' to='/'>
        {!isCollapsed && <h2 className='c-sidebar-brand-full'></h2>}
      </div>

      <Menu
        theme='dark'
        defaultSelectedKeys={[location.pathname + location.search]}
        mode='inline'
        items={items()}
        onClick={onClickMenus}
      />
    </Sider>
  )
}
export default React.memo(TheSidebar)
