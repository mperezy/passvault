// Import the functions you need from the SDKs you need
import firebase from 'firebase';
import 'firebase/firestore';
import { clearUserDataFromLS, setUserData2LS } from 'utils/localStorageFuncs';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const appLength: number = firebase.apps.length;

const app = appLength === 0 ? firebase.initializeApp(firebaseConfig) : firebase.app();
const database = firebase.firestore(app);

export const auth = firebase.auth();
export const passwordsCollection = database.collection('passwords');

export const signIn = (username: string, password: string) => {
  auth
    .signInWithEmailAndPassword(`${username}@example.com`, password)
    .then((userCredentials) => {
      const { user } = userCredentials;

      setUserData2LS(user?.uid, user?.email);
    })
    .catch((error) => {
      alert(error.message);
      console.log({ exception: error.message });
    });
};

export const signOut = (reduxAction: any, navigation: any) => {
  auth
    .signOut()
    .then(() => {
      clearUserDataFromLS();
      reduxAction();
      navigation.replace('Login');
    })
    .catch((error) => {
      console.log({ exception: error.message });
    });
};

export const signUp = (username: string, password: string) => {
  auth
    .createUserWithEmailAndPassword(`${username}@example.com`, password)
    .then((userCredentials) => {
      const { user } = userCredentials;
      console.log({ user });
    })
    .catch((error) => {
      alert(error.message);
      console.log({ exception: error.message });
    });
};
