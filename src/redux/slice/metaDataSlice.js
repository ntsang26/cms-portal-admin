import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, local } from 'services'

const initialState = {
  configs: {},
  languages: [],
  userInfo: {},
  menus: [],
  isLoadingMenus: false,
}

export const fetchMeta = createAsyncThunk('page/getMeta', async () => {
  try {
    let metaRes = await api.getMetaData()
    const { sMenus = [], sPages = [] } = metaRes
    local.set('sMenus', JSON.stringify(sMenus))
    local.set('sPage', JSON.stringify(sPages))
    return { sMenus, sPages }
  } catch (error) {
    console.error(error)
    return []
  }
})

const metaDataSlice = createSlice({
  name: 'metaData',
  initialState,
  reducers: {
    setMetaData: (state, action) => {
      const payload = action.payload
      if (payload.configs) state.configs = payload.configs
      if (payload.languages) state.languages = payload.languages
      if (payload.userInfo) state.userInfo = payload.userInfo
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeta.pending, (state) => {
        state.isLoadingMenus = true
      })
      .addCase(fetchMeta.fulfilled, (state, action) => {
        state.menus = action.payload.sMenus
        state.isLoadingMenus = false
      })
  },
})

export const selectConfigs = (state) => state.metaData.configs
export const selectLanguages = (state) => state.metaData.languages
export const selectUserInfo = (state) => state.metaData.userInfo
export const selectMenus = (state) => state.metaData.menus
export const selectIsLoadingMenus = (state) => state.metaData.isLoadingMenus

export const { setMetaData } = metaDataSlice.actions

export default metaDataSlice.reducer
