import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: 'AIzaSyC4_S0giw20ykWB64IhR2gXcfsoCT8xTBY',
  authDomain: 'chat-app-12a4f.firebaseapp.com',
  databaseURL: 'https://chat-app-12a4f.firebaseio.com',
  projectId: 'chat-app-12a4f',
  storageBucket: 'chat-app-12a4f.appspot.com',
  messagingSenderId: '597244906332',
  appId: '1:597244906332:web:3e647de4ef980f02038f99'
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const rtdb = firebase.database();

export function setupPresence(user) {
  const isOfflineForRTDB = {
    state: 'offline',
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  };

  const isOnlineForRTDB = {
    state: 'online',
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  };
  const isOfflineForFirestore = {
    state: 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  };

  const isOnlineForFirestore = {
    state: 'online',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  };

  const rtdbRef = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`/users/${user.uid}`);

  rtdb.ref('.info/connected').on('value', async snapshot => {
    if (snapshot.val() === false) {
      userDoc.update({
        status: isOfflineForFirestore
      })
      return;
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB);
    rtdbRef.set(isOnlineForRTDB);
    userDoc.update({
      status: isOnlineForFirestore
    })
  });
}

export { db, firebase };
