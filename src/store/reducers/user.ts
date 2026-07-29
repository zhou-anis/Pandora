import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { LogInAPI } from "../../apis/user.ts";
import type { ISignInResponse, ISignIn } from "../../apis/user.ts";

/** 用户角色 */
export type UserRole = "user" | "creator";

export interface UserState {
  username: string | null;
  token: string | null;
  refresh_token: string | null;
  role: UserRole;
  avatar: string;
  bio: string;
  phone: string;
  email: string;
  /** 模拟数据 */
  articleCount: number;
  followerCount: number;
  likeCount: number;
  joinDate: string;
}

/** 从 localStorage 恢复状态 */
function loadState(): UserState {
  return {
    username: localStorage.getItem("username") || null,
    token: localStorage.getItem("token") || null,
    refresh_token: localStorage.getItem("refresh_token") || null,
    role: (localStorage.getItem("role") as UserRole) || "user",
    avatar: localStorage.getItem("avatar") || "https://api.dicebear.com/7.x/miniavs/svg?seed=default",
    bio: localStorage.getItem("bio") || "",
    phone: localStorage.getItem("phone") || "",
    email: localStorage.getItem("email") || "",
    articleCount: 0,
    followerCount: 0,
    likeCount: 0,
    joinDate: new Date().toISOString().slice(0, 10),
  };
}

const initialState: UserState = loadState();

const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /** 登录 / 注册成功后设置 token */
    setToken(state, action: PayloadAction<ISignInResponse & { role?: UserRole; phone?: string; email?: string }>) {
      const p = action.payload;
      state.username = p.username;
      state.token = p.token;
      state.refresh_token = p.refresh_token;
      if (p.role) state.role = p.role;
      if (p.phone) state.phone = p.phone;
      if (p.email) state.email = p.email;

      if (p.token) localStorage.setItem("token", p.token);
      if (p.username) localStorage.setItem("username", p.username);
      if (p.refresh_token) localStorage.setItem("refresh_token", p.refresh_token);
      if (p.role) localStorage.setItem("role", p.role);
      if (p.phone) localStorage.setItem("phone", p.phone);
      if (p.email) localStorage.setItem("email", p.email);
    },

    /** 退出登录 */
    logout(state) {
      state.username = null;
      state.token = null;
      state.refresh_token = null;
      state.role = "user";
      state.avatar = "https://api.dicebear.com/7.x/miniavs/svg?seed=default";
      state.bio = "";
      state.phone = "";
      state.email = "";
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("role");
      localStorage.removeItem("avatar");
      localStorage.removeItem("bio");
      localStorage.removeItem("phone");
      localStorage.removeItem("email");
    },

    /** 更新个人资料 */
    updateProfile(state, action: PayloadAction<{ username?: string; avatar?: string; bio?: string; phone?: string; email?: string }>) {
      const p = action.payload;
      if (p.username) { state.username = p.username; localStorage.setItem("username", p.username); }
      if (p.avatar) { state.avatar = p.avatar; localStorage.setItem("avatar", p.avatar); }
      if (p.bio) { state.bio = p.bio; localStorage.setItem("bio", p.bio); }
      if (p.phone) { state.phone = p.phone; localStorage.setItem("phone", p.phone); }
      if (p.email) { state.email = p.email; localStorage.setItem("email", p.email); }
    },

    /** 升级为创作者 */
    upgradeToCreator(state) {
      state.role = "creator";
      localStorage.setItem("role", "creator");
    },

    /** 模拟数据 —— 仅供开发展示 */
    setMockStats(state, action: PayloadAction<{ articleCount?: number; followerCount?: number; likeCount?: number; joinDate?: string }>) {
      const p = action.payload;
      if (p.articleCount != null) state.articleCount = p.articleCount;
      if (p.followerCount != null) state.followerCount = p.followerCount;
      if (p.likeCount != null) state.likeCount = p.likeCount;
      if (p.joinDate) state.joinDate = p.joinDate;
    },
  },
});

export const { setToken, logout, updateProfile, upgradeToCreator, setMockStats } = userInfoSlice.actions;

const userInfoReducer = userInfoSlice.reducer;

const signInRequest = createAsyncThunk(
  "user/signIn",
  async (requestParams: ISignIn, { dispatch }) => {
    const res = await LogInAPI(requestParams);
    console.log(res.data.data);
    dispatch(setToken(res.data.data));
    return res.data.data;
  }
);

export { signInRequest };
export default userInfoReducer;
