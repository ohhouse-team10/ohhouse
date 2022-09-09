import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = "http://localhost:3001"

/* InitialState */
// data, isLoading, error로 상태관리
const initialState = {
    Comments: [],
  isLoading: false,
  error: null,
};

/* Thunk function */
// [GET - 데이터 전체 조회]
export const getComments = createAsyncThunk(
  "GET_ALL_Comments",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/comments`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// [GET - 특정ID를 가진 Comments 데이터만 조회]
export const getEachComment = createAsyncThunk(
  "GET_Comments",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/${payload}`
      );
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// [POST]
export const addComments = createAsyncThunk(
  "POST_Comments",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}`, payload);
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (errer) {
      return thunkAPI.rejectWithValue(errer);
    }
  }
);

// [UPDATE]
export const updataComments = createAsyncThunk(
  "UPDATAE_Comments",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/${payload.id}`,
        payload
      );
      console.log("response", response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// [DELETE]
export const deleteComments = createAsyncThunk(
  "DELETE_Comments",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:5001/posts/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* createSlice */
export const CommentsSlice = createSlice({
  // 모듈 이름
  name: "comments",
  // 초기 상태값
  initialState,
  // reducers
  reducers: {},
  //extraReducers
  extraReducers: {
    /* Pending */
    [getComments.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getEachComment.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addComments.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteComments.pending]: (state, action) => {
      state.isLoading = true;
    },
    /* Fulfilled */
    [getComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
      console.log("[comment 전체 데이터 조회]", state.comments);
    },
    [getEachComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = [action.payload];
      console.log("[comment 개별데이터 조회 ]", state.comments);
    },
    [addComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.filter((item) => item.id !== action.payload);
    },
    [updataComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.map((item) =>
        item.id === action.id
          ? { ...item, title: action.title, content: action.content }
          : item
      );
    },
    [deleteComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = state.comments.map((item) =>
        item.id === action.id
          ? { ...item, title: action.title, content: action.content }
          : item
      );
    },
    /* Rejected */
    [getComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getEachComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updataComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

/* export */
export const {} = CommentsSlice.actions;
export default CommentsSlice.reducer;