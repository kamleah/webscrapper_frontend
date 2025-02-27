import { baseURL } from "../constants";

export const authEndPoints = {
    login : `${baseURL}account/login/`,
    registration : `${baseURL}/account/user-registration/`,
    sendOTP : `${baseURL}/account/sent-otp/`,
    verifyOTP : `${baseURL}/account/verify-otp/`,
    resetPassword : `${baseURL}/account/reset-password/`,
};