import httpInstance from '../utils/request.ts'
import type IResponse from "../store/reducers/general_response_type";



// 用户注册API
interface ISignUp {
    username: string;
    password: string;
    email: string;
    phone: string;
    code: string;
}

interface ISignUpResponse {
    userID: number | string;
}


export const RegisterAPI= (formData: ISignUp) => {
    return httpInstance.post<IResponse<ISignUpResponse>>('/sign', formData)
}



// 用户登陆API


export interface ISignIn {
    phone: string,
    password: string,
}

export interface ISignInResponse {
    username: string | null,
    token: string | null,
    refresh_token: string | null,
}


export const LogInAPI= (formData: ISignIn) => {
    return httpInstance.post<IResponse<ISignInResponse>>('/login', formData)
}





