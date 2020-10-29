import firebase from 'firebase'
import {firebaseConfig}from '../../config';
import {UserData} from '../localStorage'

firebase.initializeApp(firebaseConfig);
const storageRef = firebase.storage().ref();


export const uploadFile = (file,path)=>{
    const fileRef = storageRef.child(path);
    return fileRef.put(file);
}

export const downloadFile = (path)=>{
    const fileRef = storageRef.child(path);
    return fileRef.getDownloadURL();
}