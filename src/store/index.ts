import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from './reducers/user.ts'

const UserInfoStore = configureStore({
    reducer: {
        user: userInfoReducer
    },
})


export type RootState = ReturnType<typeof UserInfoStore.getState>
export type RootDispatch = typeof UserInfoStore.dispatch
export default UserInfoStore;






