import {signInEndpoints} from '../endpoints'

const googleSignIn= (response)=>{
    const requestOptions = {
        method:"POST",
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: response.tokenId })
    }

    return fetch(signInEndpoints.googleSignIn,requestOptions);
}

export {googleSignIn}; 