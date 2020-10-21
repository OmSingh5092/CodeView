export const UserData = function(){
    var data = {
        userExists:false,
        tokenExists:false,
        idToken:"",
        email:"",
        profile:{},
    }

    data.idToken = localStorage.getItem('token');
    data.profile = JSON.parse(localStorage.getItem('profile'));
    data.email = localStorage.getItem('email');

    if(data.profile){
        data.userExists = true;
    }
    if(data.idToken){
        data.tokenExists = true;
    }

    function setProfileData(newProfile){
        data.profile = newProfile;
        localStorage.setItem('profile',JSON.stringify(newProfile));
        data.userExists = true;
    }
    function getProfileData(){
        return data.profile;
    }

    function setToken(newToken){
        data.idToken = newToken;
        localStorage.setItem('token',newToken);
        data.tokenExists = true;
    }
    function getToken(){
        return data.idToken;
    }

    function setEmail(newEmail){
        data.email = newEmail;
        localStorage.setItem('email',newEmail);
    }
    function getEmail(){
        return data.email;
    }

    function userExists(){
        return data.userExists;
    }
    function tokenExists(){
        return data.tokenExists;
    }

    function clearUser(){
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        localStorage.removeItem('email');
        data.tokenExists = false;
        data.userExists = false;
    }

    return {setProfileData,getProfileData,setToken,getToken,setEmail,getEmail,userExists,tokenExists,clearUser};

}();

export const CandidateData = function(){
    var data = {
        roomExists:false,
        candidateExists:false,
        roomId:"",
        candidateId:"",
    }
    data.roomId = localStorage.getItem('roomId');
    data.candidateId = localStorage.getItem('candidateId');

    if(data.roomId){
        data.roomExists = true
    }
    if(data.candidateId){
        data.candidateExists = true;
    }

    function setRoomId(newRoomId){
        data.roomId = newRoomId;
        localStorage.setItem('roomId',newRoomId);
        data.roomExists = true;
    }
    function getRoomId(){
        return data.roomId;
    }

    function setCandidateId(newCandidateId){
        data.candidateId = newCandidateId;
        localStorage.setItem('candidateId',newCandidateId);
        data.candidateExists = true;
    }
    function getCandidateId(){
        return data.candidateId;
    }

    function candidateExists(){
        return data.candidateExists
    }
    function roomExists(){
        return data.roomExists;
    }

    function clearCandidate(){
        localStorage.removeItem('roomId');
        localStorage.removeItem('candidateId');
        data.candidateExists = false;
        data.roomExists = false;
    }

    return {setRoomId,getRoomId, setCandidateId, getCandidateId, candidateExists, roomExists,clearCandidate};

}();


