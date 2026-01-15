import axios from "axios";
import { User, ProfileUpdatePayload } from "@/types";

interface SigninResponse {
  access: string;
  refresh: string;
  user: User;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

/* ---------------------- INTERCEPTORS ---------------------- */
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/* ---------------------- FOLLOW APIs ---------------------- */
export const followUser = async (followId: string | number) => {
  const formData = new FormData();
  formData.append("follow", String(followId));
  return api.post("/follow/", formData);
};

export const unfollowUser = async (unfollowId: string | number) => {
  const formData = new FormData();
  formData.append("unfollow", String(unfollowId));
  return api.post("/follow/unfollow/", formData);
};

export const getFollowers = async (countOnly = false) => {
  const url = countOnly ? "/follow/followers/?count" : "/follow/followers/";
  return api.get(url);
};

export const getFollowings = async (countOnly = false) => {
  const url = countOnly ? "/follow/followings/?count" : "/follow/followings/";
  return api.get(url);
};

export const getRecommendations = async () => {
  return api.get("/follow/recommended/");
};

/* ---------------------- LIKE APIs ---------------------- */
export const sendLike = async (userId: string | number) => {
  return api.post("/follow/like/", {
    like: String(userId),
  });
};

export const getLikes = async (
  status: "pending" | "requested" | "confirmed"
) => {
  return api.get(`/follow/like/?status=${status}`);
};

export const respondLike = async (
  likeInstance: string | number,
  action: "accept" | "reject"
) => {
  return api.post("/follow/like/respond/", {
    like_instance: String(likeInstance),
    action: action,
  });
};

/* ---------------------- AUTH APIs ---------------------- */
// export const signin = async (email: string, password: string) => {
//   const formData = new FormData();
//   formData.append("email", email);
//   formData.append("password", password);
//   return api.post<SigninResponse>("/user/signin/", formData);
// };
export const signin = async (email: string, password: string) => {
  return api.post<SigninResponse>("/user/signin/", {
    email,
    password,
  });
};

export const signout = async () => {
  return api.post("/user/signout/");
};

export const signup = async (
  email: string,
  password: string,
  password2: string,
  user_type?: User["user_type"]
) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("password2", password2);
  if (user_type) formData.append("user_type", user_type);
  return api.post("/user/signup/", formData);
};

/* ---------------------- PASSWORD RESET APIs ---------------------- */
export const forgotPassword = async (email: string) => {
  const formData = new FormData();
  formData.append("email", email);
  return api.post("/user/forgot-password/", formData);
};

export const verifyResetCode = async (email: string, code: string) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("code", code);
  return api.post("/user/verify-reset-code/", formData);
};

export const resetPassword = async (
  email: string,
  code: string,
  password: string,
  password2: string
) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("code", code);
  formData.append("password", password);
  formData.append("password2", password2);
  return api.post("/user/reset-password/", formData);
};

/* ---------------------- PROFILE APIs ---------------------- */
export const getProfile = async (userId?: string | number) => {
  const url = userId ? `/profile/?user_id=${userId}` : "/profile/";
  return api.get<User>(url);
};

export const updateProfile = async (data: ProfileUpdatePayload) => {
  const formData = new FormData();
  if (data.full_name) formData.append("full_name", data.full_name);
  if (data.gender) formData.append("gender", data.gender);
  if (data.age) formData.append("age", String(data.age));
  if (data.display_pic) formData.append("display_pic", data.display_pic);
  if (data.monthly_sub_keys)
    formData.append("monthly_sub_keys", data.monthly_sub_keys);
  if (data.state) formData.append("state", data.state);
  if (data.city) formData.append("city", data.city);
  if (data.interests)
    formData.append("interests", JSON.stringify(data.interests));
  if (data.bio) formData.append("bio", data.bio);

  return api.put<User>("/profile/update/", formData);
};

export default api;
