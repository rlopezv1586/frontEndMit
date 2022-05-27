import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Account from './Accont'
import Register from './Register'
import VerifyEmail from './VerifyEmail';
import Login from './Login'
import { useState, useEffect } from 'react'
import { AuthProvider } from './AuthContext'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import PrivateRoute from './PrivateRoute'
import { Navigate } from 'react-router-dom'
import { UserContext } from "./context"


function App() {

  const [currentUser, setCurrentUser] = useState({ email: null, password: null, balance: 0, emailVerified: null })
  const [timeActive, setTimeActive] = useState(false)



  const getUserData = async (user) => {

    const url = `http://127.0.0.1:3000/account/get/${user.email}`;
    (async () => {
      var res = await fetch(url);
      console.log('Respouesta del get es : ', res);
      var data = await res.json();
      setCurrentUser({ email: user.email, balance: data.balance, emailVerified: user.emailVerified })
      return data.balance;
    })();

  }


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      if ((typeof user !== 'undefined') && (user != null)) {
        if (typeof user.balance == 'undefined') {
          const balance = getUserData(user)
        } else {
          setCurrentUser({ email: user.email, balance: user.balance, emailVerified: user.emailVerified })
        }
      }
    })
  }, [])

  return (
    <Router>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
          <Routes>
            <Route exact path='/' element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            } />
            <Route path="/login" element={
              !currentUser?.emailVerified
                ? <Login />
                : <Navigate to='/' replace />
            } />
            <Route path="/register" element={
              !currentUser?.emailVerified
                ? <Register />
                : <Navigate to='/' replace />
            } />
            <Route path='/verify-email' element={<VerifyEmail />} />
          </Routes>
        </AuthProvider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
