import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import i18next from 'i18next'
import { handleLeavePage } from '../TheLayout/TheLayout'
import { api, local, config } from 'services'
import { Menu, Dropdown, Avatar, Modal } from 'antd'
import { Icons } from 'constant/icons'
const { confirm } = Modal
function TheHeaderDropdown({ userInfo }) {
  const [imgAvatar, setImgAvatar] = useState('')

  const handleConfirmLogout = () => {
    confirm({
      title: 'Alert !',
      icon: Icons.ExclamationCircleOutlined,
      content: i18next.t('confirmLogout'),

      onOk() {
        return new Promise((resolve, reject) => {
          local.clear()
          window.removeEventListener('beforeunload', handleLeavePage)
          window.location.href = ''
          resolve()
        }).catch(() => console.log('Oops errors!'))
      },

      onCancel() {},
    })
  }

  const imgUrl = async () => {
    try {
      let body = { sid: local.get('user')?.sid }
      // let rs = await api.findUserProfile(body)
      // if (rs) setImgAvatar(rs?.user?.avatar)
    } catch (error) {
      console.log(error)
      return
    }
  }
  useEffect(() => {
    imgUrl()
  }, [])
  const menuOverlay = (
    <Menu>
      <Menu.Item icon={Icons.SettingOutlined} key='1'>
        <Link to='/profile'>Profile</Link>
      </Menu.Item>
      <Menu.Item icon={Icons.LogoutOutlined} key='2' onClick={handleConfirmLogout}>
        <div>Logout</div>
      </Menu.Item>
    </Menu>
  )
  return (
    <div
      style={{
        position: 'fixed',
        right: '10px',
        display: 'flex',
      }}
    >
      <Dropdown overlay={menuOverlay} placement='topRight'>
        <Avatar
          className='dropdown-toggle mt-2'
          size={45}
          src={imgAvatar ? imgAvatar : config.DEFAULT_AVATAR}
          id='dropdownMenuButton'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
        />
      </Dropdown>
    </div>
  )
}
export default React.memo(TheHeaderDropdown)
