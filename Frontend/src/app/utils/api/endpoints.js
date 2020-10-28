import {backend} from '../../config'
const BASE_URL = backend.baseUrl;

export const signInEndpoints = {
    googleSignIn:BASE_URL+"/signin/interviewer/google",
    emailSignIn:BASE_URL+"/signin/interviewer/email",
}

export const interviewerEndPoints = {
    getOwnProfile:BASE_URL+"/interviewer/profile",
    getOthersProfile:BASE_URL+"/interviewer/profile/others", 
    updateProfile:BASE_URL+"/interviewer/update",
}

export const roomEndPoints = {
    createRoom:BASE_URL+"/room/create",
    checkRoom :BASE_URL+"/room/check",
    checkInterviewer: BASE_URL+"/room/check/interviewer",
    getRoom :BASE_URL+"/room/get",
    getRoomsByInterviewer:BASE_URL+"/room/get/interviewer",
    addInterviewer: BASE_URL+"/room/add/interviewer"
}

export const candidateEndPoints = {
    getCandidate:BASE_URL+"/candidate/profile",
    createCandidate:BASE_URL+"/candidate/create",
    updateCandidate:BASE_URL+"/candidate/update"
}

export const chatEndPoints = {
    getChats:BASE_URL+"/chat/chats/room",
}