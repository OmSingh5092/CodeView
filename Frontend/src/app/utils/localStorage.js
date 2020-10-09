export const UserData = function(){
    var data = {
        userExists:false,
        tokenExists:false,
        idToken:"",
        email:"",
        profile:{},
    }

    data.idToken = localStorage.getItem('token');
    data.profile = localStorage.getItem('profile');
    data.email = localStorage.getItem('email');

    if(data.profile){
        data.userExists = true;
    }
    if(data.idToken){
        data.tokenExists = true;
    }

    function setProfileData(newProfile){
        data.profile = newProfile;
        localStorage.setItem('profile',newProfile);
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

    return {setProfileData,getProfileData,setToken,getToken,setEmail,getEmail,userExists,tokenExists};

}();

export const CandidateData = function(){
    var data = {
        roomExists:false,
        candidateExists:false,
        roomId:"",
        candidateId:"",
    }

    data.roomExists = localStorage.getItem('roomExists');
    data.candidateExists = localStorage.getItem('candidateExists');

    if(data.roomExists){
        data.roomId = localStorage.getItem('roomId');
    }
    if(data.candidateExists){
        data.candidateId = localStorage.getItem('candidateId');
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
        return data.idToken;
    }

    function candidateExists(){
        return data.candidateExists
    }
    function roomExists(){
        return data.roomExists;
    }

    return {setRoomId,getRoomId, setCandidateId, getCandidateId, candidateExists, roomExists};

}();


