import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: 0,
  allPosts: 0,
}
console.log(initialState);

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
      post: (state, action) => {
        state.post = action.payload.post;
      },
      allPosts: (state, action) => {
        state.allPosts = action.payload.allPosts;
      },
    },
  });

export const { post, allPosts } = postSlice.actions;
export default postSlice.reducer;