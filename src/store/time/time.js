// src/features/timeSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const timeSlice = createSlice({
  name: 'time',
  initialState: {
    waitDuration: '',
    waitType: '',
  },
  reducers: {
    setTime: (state, action) => {
      state.waitDuration = action.payload.waitDuration;
      state.waitType = action.payload.waitType;
    },
  },
});

export const { setTime } = timeSlice.actions;

export default timeSlice.reducer;
