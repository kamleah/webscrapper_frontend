import { baseURL } from "../constants/BaseConfig";
export const authEndPoints = {
    login : `${baseURL}account/staff-login/`,
    registration : `${baseURL}/account/user-registration/`,
    sendOTP : `${baseURL}/account/sent-otp/`,
    verifyOTP : `${baseURL}/account/verify-otp/`,
    resetPassword : `${baseURL}/account/reset-password/`,
};