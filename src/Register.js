import {useContext, useState} from 'react'
import './forms.css'
import {auth} from './firebase'
import {useNavigate, Link} from 'react-router-dom'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {useAuthValue} from './AuthContext'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { MdLogin } from "react-icons/md";
import Links from "./links";
import {UserContext} from "./context";


function Register() {
  let ctx = useContext(UserContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const {setTimeActive} = useAuthValue()

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const register = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)   
          .then(() => {
            const url= `https://backend-mit.herokuapp.com/account/create/${email}/${password}`;
            (async () => {
                var res   = await fetch(url);
                console.log(res);
                console.log(auth);
                console.log(typeof(res));
                var data  = await res.json();
                // console.log(data);
                ctx.email = data.email
                ctx.password = data.password
                ctx.balance = data.balance
                console.log(ctx);
            })();
            setTimeActive(true)
            navigate('/verify-email')
          }).catch((err) => alert(err.message))
        })
        .catch(err => setError(err.message))
    }
    
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <>
    <div className='center'>
    <h1 className='appTitle'>Good<span className='appName'>Bank</span></h1>
      <div className='auth'>
        <br/>
        <div className='icons'>
        <MdLogin/>
        </div>
        <h1>Register</h1>
        <br/>
        {error && <div className='auth__error'>{error}</div>}
        <Form onSubmit={register} name='registration_form'>
          <input 
            type='email' 
            value={email}
            placeholder="Enter your email"
            className="borderInput"
            required
            onChange={e => setEmail(e.target.value)}/>
          <br/>
          <input 
            type='password'
            value={password} 
            className="borderInput"
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>
          <br/>
            <input 
            type='password'
            value={confirmPassword} 
            className="borderInput"
            required
            placeholder='Confirm password'
            onChange={e => setConfirmPassword(e.target.value)}/>
          <br/>
          <center><Button className ="loginbutton" type='submit'>Register</Button></center>
          <br/>
        </Form>
        <p className="alert">
          Already have an account?  
          <Link to='/login'>log in</Link>
        </p>
      </div>
    </div>
    <Links></Links>
    </>
  )
}

export default Register

