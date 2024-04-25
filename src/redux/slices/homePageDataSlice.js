import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../route/BaseUrl";

export const fetchHomeData = createAsyncThunk("fetchHomeData", async () => {
  const requestGetOptions = {
    method: "GET",
    headers: {
      "Access-Control-Allow-Credentials": true,
    },
  };
  const res = await fetch(
    `${BASE_URL}/api/website/get-homepage-data`,
    requestGetOptions
  );
  return res.json();
});

const homeDataSlice = createSlice({
  name: "homedata",
  initialState: {
    isLoading: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomeData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHomeData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchHomeData.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default homeDataSlice.reducer;
