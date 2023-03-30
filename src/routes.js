import React from 'react'

const Dashboard = React.lazy(() => import('features/Dashboard'))
const Profile = React.lazy(() => import('features/Profile'))
const MediaManagement = React.lazy(() => import('features/MediaManagement'))
const ListViewer = React.lazy(() => import('features/ListViewer'))
const Editor = React.lazy(() => import('features/Editor'))
const EditorModel = React.lazy(() => import('features/EditorModel'))
const EditorPage = React.lazy(() => import('features/EditorPage'))

const routes = {}
routes.theLayout = [
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/profile', exact: true, name: 'Profile', component: Profile },
  { path: '/media', exact: true, name: 'Media', component: MediaManagement },
  { path: '/page', exact: true, name: 'ListViewer', component: ListViewer },
  { path: '/editor', exact: true, name: 'Editor', component: Editor },
  { path: '/editorPage', exact: true, name: 'Editor Page', component: EditorPage },
  { path: '/editorModel', exact: true, name: 'Editor Model', component: EditorModel },
]

export default routes
