import {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import './forms.css'
import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {auth} from './firebase'
import {useNavigate} from 'react-router-dom'
import {useAuthValue} from './AuthContext'
import Button from 'react-bootstrap/Button'
import { MdLogin } from "react-icons/md";
import Links from "./links";
import {UserContext} from "./context";
 
function Login(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('')
  const {setTimeActive} = useAuthValue()
  const navigate = useNavigate()

  const { currentUser, setCurrentUser } = useContext(UserContext)


  const login = e => {
    console.log("contexto inicial login:", currentUser);
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      if(!auth.currentUser.emailVerified) {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          setTimeActive(true)
          navigate('/verify-email')
          
        })
      .catch(err => alert(err.message))
    }else{
      
      const url= `https://backend-mit.herokuapp.com/account/login/${email}/${password}`;
         (async () => {
            var res   = await fetch(url);
            console.log('Respouesta del mongo es : ', res);
            var data  = await res.json(); 
            console.log(typeof(data));
            console.log('data es : ', data);
            console.log("data email: ", data.email);
            
            
            if( data.length !== 0) {
              setCurrentUser({email:data.email, password: data.password, balance: data.balance, emailVerified: auth.currentUser.emailVerified })
              console.log("contexto login es:", data);
              navigate('/')
              
            }
         })();
    }
    })
    .catch(err => setError(err.message))
  }

  return(
    <>
        <div className='center'>
        <h1 className='appTitle'>Good<span className='appName'>Bank</span></h1>
        
      <div className='auth'>
        <br/>
        <div className='icons'>
        <MdLogin/>
        </div>
        <h1>Log in</h1>  
        <br/>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={login} name='login_form'>
          <input 
            type='email' 
            value={email}
            required
            className="borderInput"
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}/>
          <br/>
          <input 
            type='password'
            value={password}
            required
            className="borderInput"
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>
          <br/>
          <center><Button className ="loginbutton" type='submit'>Log in</Button></center>
        </form>
        
        <p className="alert">
          Don't have and account? 
          <Link to='/register'>Create one here</Link>
        </p>
      </div>
    </div>
    <Links></Links>
    </>
  )
  
}

export default Login