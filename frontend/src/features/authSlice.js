import {createSlice , createAsyncThunk } from '@reduxjs/toolkit'

import authService from './authServices'


const user = JSON.parse(localStorage.getItem('user'))

// set initial state
const initialState = {
    user : user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading :false,
    message : '',
}


// Auth status user

export const authCheck = createAsyncThunk('auth/check', async (user, thunkAPI) => {
    try {
        return await authService.authCheck() // 
    } catch (error) {
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updatePassword = createAsyncThunk('auth/updatePassword', async (user, thunkAPI) => {
    try {
        return await authService.updatePassword(user) // 
    } catch (error) {
        const message = (error.response 
            && error.response.data 
            && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        reset:(state) =>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = false
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(authCheck.pending,(state) =>{
            state.isLoading = true
            console.log("stat pening", state);
        })
        .addCase(authCheck.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.user = action.payload
        })
        .addCase(authCheck.rejected, (state, action) => {
            console.log("stat rejected", state);
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(updatePassword.pending,(state) =>{
            state.isLoading = true
            console.log("stat pening", state);
        })
        .addCase(updatePassword.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.user = action.payload
        })
        .addCase(updatePassword.rejected, (state, action) => {
            console.log("stat rejected", state);
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
    }
})


export const  {reset } = authSlice.actions //exporting default reset function as action
export default authSlice.reducer  