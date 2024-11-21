// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/index.js";
import reactFlowReducer from "./reactflow/reactFlowSlice.js";
import emailTemplateReducer from "./emailtemp/emailTemplate.js";
import timeReducer from "./time/time.js";
import emailFowlloupReducer1 from './emailFollow2/emailFollow2.js'
const store = configureStore({
  reducer: {
    auth: authReducer,
    reactFlow: reactFlowReducer,  
    emailList: emailTemplateReducer,  // Renamed emailList to match the earlier provided slice
    time: timeReducer,
    emailFollowup: emailFowlloupReducer1 // Ensure the reducer key matches the slice name
  },
});

export default store;
