import React from 'react'
import { useHistory } from 'react-router-dom'

import queryString from 'qs'

function BaseWorkspace(props) {
  const history = useHistory()
  return (
    <props.component
      url={props.workspaceTab.url}
      query={queryString.parse(props.workspaceTab.search, {
        ignoreQueryPrefix: true,
      })}
      history={history}
    />
  )
}

export default React.memo(BaseWorkspace)
