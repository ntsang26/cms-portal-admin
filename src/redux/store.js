import { configureStore } from '@reduxjs/toolkit'

import metaDataReducer from './slice/metaDataSlice'
import workspaceReducer from './slice/workspaceSlice'
import layoutsReducer from './slice/layoutsSlice'
import mediaSlice from './slice/mediaSlice'

const store = configureStore({
  reducer: {
    metaData: metaDataReducer,
    workspace: workspaceReducer,
    layouts: layoutsReducer,
    mediaData: mediaSlice
  },
})

export default store
