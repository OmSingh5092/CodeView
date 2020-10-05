export default UserData = function(){
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