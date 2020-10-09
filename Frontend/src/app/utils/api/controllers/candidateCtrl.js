import {candidateEndPoints} from '../endpoints'
import {CandidateData} from '../../localStorage'

export const getProfile = ()=>{
    const requestOptions = {
        method:"GET",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({id:CandidateData.getCandidateId()})
    }

    return fetch(candidateEndPoints.getCandidate, requestOptions);
}