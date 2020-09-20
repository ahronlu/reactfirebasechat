import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyCbuCEg30XM3eqwSFiW1m-ta7-DgJhsd-s",
  authDomain: "koftovreactchat.firebaseapp.com",
  databaseURL: "https://koftovreactchat.firebaseio.com",
  projectId: "koftovreactchat",
  storageBucket: "koftovreactchat.appspot.com",
  messagingSenderId: "648417435592",
  appId: "1:648417435592:web:de65f003c317d24ca66afd",
};

firebase.initializeApp(config);

const db = firebase.firestore();
const rtdb = firebase.database();

export function setupPresence(user) {
  const isOfflineForRTDB = {
    state: "offline",
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOnlineForRTDB = {
    state: "online",
    lastChanged: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOfflineForFirestore = {
    state: "offline",
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const isOnlineForFirestore = {
    state: "online",
    lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const rtdbRef = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`/users/${user.uid}`);

  rtdb.ref(".info/connected").on("value", async (snapshot) => {
    if (snapshot.val() === false) {
      userDoc.update({
        status: isOfflineForFirestore,
      });
      return;
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB);
    rtdbRef.set(isOnlineForRTDB);
    userDoc.update({
      status: isOnlineForFirestore,
    });
  });
}

export { db, firebase };
