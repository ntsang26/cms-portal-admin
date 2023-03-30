import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sApis: [],
  sMenus: [],
  sPages: [],
}

const persistsSlice = createSlice({
  name: 'persists',
  initialState,
  reducers: {
    setMeta: (state, action) => {
      if (action.payload.sMenus) state.sMenus = action.payload.sMenus
      if (action.payload.sApis) state.sApis = action.payload.sApis
      if (action.payload.sPages) state.sPages = action.payload.sPages
    },
  },
})

export const { setMeta } = persistsSlice.actions
export default persistsSlice.reducer
