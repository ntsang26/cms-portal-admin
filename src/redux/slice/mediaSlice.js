const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  assets: [],
}

const mediaSlice = createSlice({
  name: 'mediaData',
  initialState,
  reducers: {
    setMedia: (state, action) => {
      state.assets = action.payload
    },
  },
})

export const { setMedia } = mediaSlice.actions

export default mediaSlice.reducer
