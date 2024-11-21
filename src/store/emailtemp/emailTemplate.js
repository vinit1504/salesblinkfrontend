import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  templateName: '', // Initial state is empty
};

const emailTemplateSlice = createSlice({
  name: 'emailTemplate',
  initialState,
  reducers: {
    setEmailTemplate: (state, action) => {
      state.templateName = action.payload; // Store the email template name
    },
  },
});

export const { setEmailTemplate } = emailTemplateSlice.actions;
export default emailTemplateSlice.reducer;
