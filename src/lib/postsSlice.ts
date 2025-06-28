import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostType } from "../app/_interfaces/home.type";

// get all posts ------------------------------------------------------------------------------------------------------
export const getAllPosts = createAsyncThunk('postsSlice/getAllPosts', async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    method: 'GET',
    // headers: {
    //   // token: localStorage.getItem('userToken') || ''
    // }
  })
  const data = await response.json()
  return data
})
// -------------------------------------------------------------------------------------------------------------------

// get specific post ------------------------------------------------------------------------------------------------------
export const getSpecificPost = createAsyncThunk('postsSlice/getSpecificPost', async (id:string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'GET',
    // headers: {
    //   token: localStorage.getItem('userToken') || ''
    // }
  })
  const data = await response.json()
  return data
})

// -------------------------------------------------------------------------------------------------------------------

const initialState: { allPosts: PostType[], userPosts: [], isLoading: false | true, isError: string | null, specificPost: PostType | null } =
                    { allPosts: [], userPosts: [], isLoading: false, isError: null, specificPost: null }

const postsSlice = createSlice({
  name: 'postsSlice',
  initialState: initialState ,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.fulfilled, (state, _action) => {
      state.isLoading = false
      state.allPosts = _action.payload
    })
    builder.addCase(getAllPosts.pending, (state) => {
      state.isLoading = true
    })

    //  -----------------------------------------------------------------------------------------------------------
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message || 'Something went wrong'
    })
    // -----------------------------------------------------------------------------------------------------------
    builder.addCase(getSpecificPost.fulfilled, (state, _action) => {
      state.isLoading = false
      state.specificPost = _action.payload || null
    })
    builder.addCase(getSpecificPost.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getSpecificPost.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message || 'Something went wrong'
    })
    // -----------------------------------------------------------------------------------------------------------
  }
})

export const postsReducer = postsSlice.reducer
