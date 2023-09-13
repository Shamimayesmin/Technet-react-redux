import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA8Os-PGu1FtfvORj904j3XqSWMGuyrV3w",
//   authDomain: "technet-555be.firebaseapp.com",
//   projectId: "technet-555be",
//   storageBucket: "technet-555be.appspot.com",
//   messagingSenderId: "589822853796",
//   appId: "1:589822853796:web:0d99adc0701695a3b41c31"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);