import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsCollapsed, toggleDarkMode, toggleSidebarShow } from 'redux/slice/layoutsSlice'
import { selectUserInfo } from 'redux/slice/metaDataSlice'
import { Layout, Menu } from 'antd'
import TheHeaderDropdown from './TheHeaderDropdown'
import './ant_header.scss'

const { Header, Sider } = Layout
const { SubMenu } = Menu

const TheHeader = (props) => {
  const userInfo = useSelector(selectUserInfo)
  const dispatch = useDispatch()
  const isCollapsed = useSelector(selectIsCollapsed)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(isCollapsed) ? false : 'responsive'
    dispatch(toggleSidebarShow(val))
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(isCollapsed) ? true : 'responsive'
    dispatch(toggleSidebarShow(val))
  }
  const checkIsAdmin = (user = {}) => {
    if (user.isAdmin || user.isOwner) {
      return true
    }
    return false
  }

  return (
    <Header
      style={{
        position: 'fixed',
        width: '100%',
        boxShadow:
          '0 2px 2px 0 rgba(var(--elevation-base-color),.14),0 3px 1px -2px rgba(var(--elevation-base-color),.12),0 1px 5px 0 rgba(var(--elevation-base-color),.2)',
      }}
      className='site-layout-background layout-header'
    >
      {/* <div onClick={toggleSidebar}>{Icons.MenuFoldOutlined}</div> */}

      {/* {props?.layout !== 'THE_LAYOUT' && (
        <Link to='/#/dashboard'>
          <h2 className='text-black ml-4'>JITS_AI_PORTAl</h2>
        </Link>
      )} */}
      <TheHeaderDropdown userInfo={userInfo} />
    </Header>
  )
}

export default React.memo(TheHeader)
