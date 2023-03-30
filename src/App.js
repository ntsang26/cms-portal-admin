import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import './scss/style.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'antd/dist/antd.css'

import Loader from './utilities/components/Loader'
const Login = React.lazy(() => import('./utilities/pages/Login'))
const Page404 = React.lazy(() => import('./utilities/pages/Page404'))
const TheLayout = React.lazy(() => import('./utilities/layouts/TheLayout/index'))
const CompanySignUp = React.lazy(() => import('./utilities/pages/CompanySignUp'))
const ForgotPassword = React.lazy(() => import('./utilities/pages/ForgotPassword'))
const SettingLayout = React.lazy(() => import('./utilities/layouts/SettingLayout'))

function App() {
  return (
    <HashRouter>
      <React.Suspense fallback={<Loader />}>
        <Switch>
          <Route path='/login' exact name='Login Page' render={(props) => <Login {...props} />} />
          <Route
            path='/forgotPassword'
            exact
            name='Forgot Password Page'
            render={(props) => <ForgotPassword {...props} />}
          />
          <Route
            path='/join'
            exact
            name='Signup Page'
            render={(props) => <CompanySignUp {...props} />}
          />
          <Route
            path='/404'
            exact
            name='Not Found Page'
            render={(props) => <Page404 {...props} />}
          />
          <Route
            path='/setting'
            name='Setting Page'
            render={(props) => <SettingLayout {...props} />}
          />

          <Route path='/' name='Home Page' render={(props) => <TheLayout {...props} />} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  )
  // }
}

export default App
