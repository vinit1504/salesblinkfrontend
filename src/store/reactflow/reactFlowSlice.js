// src/store/reactflow/reactFlowSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLists: [],
};

const reactFlowSlice = createSlice({
  name: "reactFlow",
  initialState,
  reducers: {
    setSelectedLists: (state, action) => {
      state.selectedLists = action.payload; // Update state with selected lists
    },
    
  },
});

export const { setSelectedLists } = reactFlowSlice.actions;
export default reactFlowSlice.reducer;
