import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKY5jGf9I1odVsCTAWJZBemcEpHzbSiNc",
  authDomain: "front-test-676c1.firebaseapp.com",
  projectId: "front-test-676c1",
  storageBucket: "front-test-676c1.appspot.com",
  messagingSenderId: "1057505743108",
  appId: "1:1057505743108:web:170db10ea42fd24f09c051",
  measurementId: "G-8CWC628FQH",
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
