const BASE_URL = "http://localhost:8000/api";

export const signInEndpoints = {
    googleSignIn:BASE_URL+"/signin/interviewer/google",
    emailSignIn:BASE_URL+"/signin/interviewer/email",
}

export const interviewerEndPoints = {
    getOwnProfile:BASE_URL+"/interviewer/profile",
    getOthersProfile:BASE_URL+"/interviewer/others", 
    updateProfile:BASE_URL+"/interviewer/update",
}

export const roomEndPoints = {
    createRoom:BASE_URL+"/room/create"
}

export const candidateEndPoints = {
    getCandidate:BASE_URL+"/candidate/profile"
}