import {createSlice, createAsyncThunk, type PayloadAction} from "@reduxjs/toolkit";
import {LogInAPI} from "../../apis/user.ts";
import type {ISignInResponse} from "../../apis/user.ts";
import type {ISignIn} from "../../apis/user.ts";


const initialState: ISignInResponse = {
    username: localStorage.getItem('username') ? localStorage.getItem('username') : "",
    token: localStorage.getItem('token') ? localStorage.getItem('token') : "",
    refresh_token: localStorage.getItem('refresh_token') ? localStorage.getItem('refresh_token') : "",
}

const userInfoSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setToken: (state, payload: PayloadAction<ISignInResponse>) => {
            state.username = payload.payload.username;
            state.token = payload.payload.token;
            state.refresh_token = payload.payload.refresh_token
            if (payload.payload.token != null) {
                localStorage.setItem('token', payload.payload.token)
            }
            if (payload.payload.username != null) {
                localStorage.setItem('username', payload.payload.username)
            }
            if (payload.payload.refresh_token != null) {
                localStorage.setItem('refresh_token', payload.payload.refresh_token)
            }
        }
    }
})

const {setToken} = userInfoSlice.actions;

const userInfoReducer = userInfoSlice.reducer

const signInRequest = createAsyncThunk(
    'user',
    async (requestParams: ISignIn , { dispatch}) => {
        const res = await LogInAPI(requestParams)
        console.log(res.data.data)
        dispatch(setToken(res.data.data))
        return res.data.data
    }
)


export {signInRequest}

export default userInfoReducer;








