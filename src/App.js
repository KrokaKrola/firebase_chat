import React, { useState, useEffect } from 'react';
import { firebase, db, setupPresence } from './firebase';
import Nav from './Nav';
import Channel from './Channel';
import { Router, Redirect } from '@reach/router';

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid
        };
        setUser(user);
        db.collection('users')
          .doc(user.uid)
          .set(user, { merge: true });
        setupPresence(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
}

function Login() {
  const [authError, setAuthError] = useState(null);
  const handleSignin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (e) {
      setAuthError(e);
    }
  };

  return (
    <div className="Login">
      <h1>Chat</h1>
      <button onClick={handleSignin}>Sign in with Google</button>
      {authError && (
        <div>
          <p>Sorry, there was a problem</p>
          <p>
            <i>{authError.message}</i>
          </p>
          <p>Please try again</p>
        </div>
      )}
    </div>
  );
}

function App() {
  const user = useAuth();

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Router>
        <Channel path="channel/:channelId" user={user} />
        <Redirect noThrow from="/" to="channel/general" />
      </Router>
    </div>
  ) : (
    <Login />
  );
}

export default App;
