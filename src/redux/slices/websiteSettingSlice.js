import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../route/BaseUrl";

export const websiteSetting = createAsyncThunk("websiteSetting", async () => {
  const requestGetOptions = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  };
  const res = await fetch(
    `${BASE_URL}/api/website/get-setting`,
    requestGetOptions
  );
  return await res.json();
});

const websiteSettingSlice = createSlice({
  name: "websitesetting",
  initialState: {
    isLoading: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(websiteSetting.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(websiteSetting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(websiteSetting.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default websiteSettingSlice.reducer;
