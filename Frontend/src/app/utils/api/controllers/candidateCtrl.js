import {candidateEndPoints} from '../endpoints'
import {CandidateData} from '../../localStorage'

export const getProfile = ()=>{
    const requestOptions = {
        method:"GET",
        headers:{"candidate":CandidateData.getCandidateId(),Accept:"application/json"},
    }

    return fetch(candidateEndPoints.getCandidate, requestOptions);
}

export const getCandidateProfile = (candidateId)=>{
    const requestOptions = {
        method:"GET",
        headers:{"candidate":candidateId,Accept:"application/json"},
    }

    return fetch(candidateEndPoints.getCandidate, requestOptions);
}

export const createCandidite =(data)=>{
    const requestOptions = {
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(data)
    }

    return fetch(candidateEndPoints.createCandidate, requestOptions);
}