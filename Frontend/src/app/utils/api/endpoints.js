const BASE_URL = "http://localhost:8000/api";

export const signInEndpoints = {
    googleSignIn:BASE_URL+"/signin/interviewer/google",
    emailSignIn:BASE_URL+"/signin/interviewer/email",
}

export const profileEndPoints = {
    getOwnProfile:BASE_URL+"/profile/interviewer/own",
    getOthersProfile:BASE_URL+"/profile/interviewer/others", 
    updateProfile:BASE_URL+"/profile/interviewer/update",

}