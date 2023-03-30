import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeTab: '',
  workspaceTabs: [],
  menuLinks: [],
}

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
    setWorkspaceTabs: (state, action) => {
      state.workspaceTabs = action.payload
    },
    setMenuLinks: (state, action) => {
      state.menuLinks = action.payload
    },
    closeWorkspaceTab: (state, action) => {
      state.workspaceTabs = state.workspaceTabs.filter(
        (workspaceTab) => workspaceTab.url !== action.payload
      )
    },
    changeWorkspaceTabName: (state, action) => {
      state.workspaceTabs.find((workspaceTab) => workspaceTab.url === action.payload.url).name =
        action.payload.data
    },
  },
})

export const selectActiveTab = (state) => state.workspace.activeTab
export const selectWorkspaceTabs = (state) => state.workspace.workspaceTabs
export const selectMenuLinks = (state) => state.workspace.menuLinks

export const {
  setWorkspace,
  setActiveTab,
  setWorkspaceTabs,
  setMenuLinks,
  closeWorkspaceTab,
  changeWorkspaceTabName,
} = workspaceSlice.actions

export default workspaceSlice.reducer
