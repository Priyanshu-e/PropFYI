import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../route/BaseUrl";

const initialState = {
  loading: false,
  error: null,
};

export const saveEnquiry = createAsyncThunk(
  "help/saveEnquiry",
  async (helpData, thunkAPI) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/website/register-contact-enquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(helpData),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const helpSlice = createSlice({
  name: "help",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveEnquiry.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(saveEnquiry.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(saveEnquiry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default helpSlice.reducer;
