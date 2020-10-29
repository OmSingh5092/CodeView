export const firebaseConfig = {
    apiKey: "AIzaSyDXXNwj9yIB_o0FpGd3txLeBBvU_MfnhZM",
    authDomain: "codeview-b41a7.firebaseapp.com",
    databaseURL: "https://codeview-b41a7.firebaseio.com",
    projectId: "codeview-b41a7",
    storageBucket: "codeview-b41a7.appspot.com",
    messagingSenderId: "41880489918",
    appId: "1:41880489918:web:79e07ec87d00fe420673ef",
    measurementId: "G-91HW2VKV8V"
  };

export const googleConfig = {
    clientId: '41880489918-ff5sebqstbkdjru2po7gmgsepqhnuio7.apps.googleusercontent.com', 
    clientSecret: "-1JWDbVE3ytYo5_qpXwPYHje",
    apiKey:'AIzaSyDOy1JRRQfHO7TD-vbFuHqxcw4PQiXaUOc',
    redirectUris:["http://localhost:3000/"],
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  };

export const backend = {
  baseUrl:"https://code-view.herokuapp.com/api",
  websocketEndPoint: "https://code-view.herokuapp.com",

  //baseUrl:"http://localhost:8000/api",
  //websocketEndPoint: "http://localhost:8000"
}