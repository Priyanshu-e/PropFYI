import { configureStore } from "@reduxjs/toolkit";
import homePageReducer from "./slices/homePageDataSlice";
import websiteSettingReducer from "./slices/websiteSettingSlice";
import helpReducer from "./slices/helpSlice";
import sellFormReducer from "./slices/sellQuestionSlice";

export const store = configureStore({
  reducer: {
    homePage: homePageReducer,
    websiteSetting: websiteSettingReducer,
    help: helpReducer,
    sellForm: sellFormReducer,
  },
});
