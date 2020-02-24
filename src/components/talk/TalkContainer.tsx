import React, { useEffect } from 'react';
import Talk from './Talk';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/modules';
import { alreadyLogin } from 'src/modules/login';
import * as firebase from 'firebase/app';
import 'firebase/database';

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_FIREBASE_SENDER_ID,
  REACT_APP_FIREBASE_MEASUREMENT_ID
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: `${REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${REACT_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID
};

export default function TalkContainer() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { data } = user;

  useEffect(() => {
    // User information is already stored on the localStorage
    // Dispatch the data to reducer module.
    const localStorageUser = window.localStorage.getItem('lUser');
    if (localStorageUser) {
      dispatch(alreadyLogin(JSON.parse(localStorageUser)));
      firebase.initializeApp(firebaseConfig);
    } else {
      window.location.href = '/';
    }
  }, [dispatch]);

  if (data) {
    return <Talk user={data} />;
  }
  return null;
}
