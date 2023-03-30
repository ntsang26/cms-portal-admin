import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isCollapsed: false,
  darkMode: false,
  checkUpdate: false,
  toggleRender: false,
  isLoading: false,
}

const layoutsSlice = createSlice({
  name: 'layouts',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    toggleSidebarShow: (state, action) => {
      state.isCollapsed = action.payload
    },
  },
})

export const selectDarkMode = (state) => state.layouts.darkMode
export const selectIsCollapsed = (state) => state.layouts.isCollapsed
export const selectToggleRender = (state) => state.layouts.toggleRender

export const { toggleDarkMode, toggleSidebarShow } = layoutsSlice.actions

export default layoutsSlice.reducer
