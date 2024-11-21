
// redux/emailSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emailTemplate: '',
  sendEmailAs: '',
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmailTemplate: (state, action) => {
      state.emailTemplate = action.payload;
    },
    setSendEmailAs: (state, action) => {
      state.sendEmailAs = action.payload;
    },
  },
});

export const { setEmailTemplate, setSendEmailAs } = emailSlice.actions;
export default emailSlice.reducer;
