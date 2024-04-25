import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../route/BaseUrl";

export const fetchFirstQuestion = createAsyncThunk(
  "sellForm/fetchFirstQuestion",
  async () => {
    const response = await fetch(`${BASE_URL}/api/website/get-sell-question`);
    const data = await response.json();
    return data;
  }
);
export const fetchSecondQuestion = createAsyncThunk(
  "sellForm/fetchSecondQuestion ",
  async () => {
    const response = await fetch(
      `${BASE_URL}/api/website/get-sell-question?option_id=1`
    );
    const data = await response.json();
    return data;
  }
);
export const fetchThirdQuestion = createAsyncThunk(
  "sellForm/fetchThirdQuestion ",
  async () => {
    const response = await fetch(
      `${BASE_URL}/api/website/get-sell-question?option_id=19`
    );
    const data = await response.json();
    return data;
  }
);
const sellFormSlice = createSlice({
  name: "sellForm",
  initialState: {
    questionData: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFirstQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFirstQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questionData = action.payload.data;
      })
      .addCase(fetchFirstQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSecondQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSecondQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questionData = action.payload.data;
      })
      .addCase(fetchSecondQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchThirdQuestion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchThirdQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questionData = action.payload.data;
      })
      .addCase(fetchThirdQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default sellFormSlice.reducer;
