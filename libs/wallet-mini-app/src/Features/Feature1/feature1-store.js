//create slice
import { createSlice } from '@reduxjs/toolkit';

const feature1Slice = createSlice({
  name: 'feature1',
  initialState: {
    feature1: 0,
  },
  reducers: {
    setFeature1: (state, action) => {
      state.feature1 = action.payload;
    },
  },
});

//export slice
export const { setFeature1 } = feature1Slice.actions;
//export reducer
export default feature1Slice.reducer;
