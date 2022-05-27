import {useState} from 'react'
import { Link } from 'react-router-dom'
import './forms.css'
import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {auth} from './firebase'
import {useNavigate} from 'react-router-dom'
import {useAuthValue} from './AuthContext'
import { UserContext } from "./context";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import {useContext} from 'react';
import React from "react";
import { GiPiggyBank } from "react-icons/gi";


function Withdraw () {

  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');
  const [amount, setAmount] = useState('');
   
  //const value = React.useContext(UserContext); 
  const { currentUser, setCurrentUser } = useContext(UserContext)
  
  function handleCreate() {
      if (((isNaN(parseFloat(amount)) || (parseInt(amount) <= 0))) && (currentUser.balance - Number(amount) < 0)){
          setStatus("Error! Verify amount");
          return
      }
      setShow(false);
      setStatus("");
      
      const balance=  currentUser.balance - Number(amount)
      const url= `http://127.0.0.1:3000/account/deposit/${currentUser.email}/${balance}`;

      (async () => {
        var res   = await fetch(url);
        console.log('Respouesta del mongo es : ', res);
        var data  = await res.json(); 
        console.log('data es : ', data);
       if( data.length !== 0)
       {

        currentUser.balance = amount;
        setCurrentUser({...currentUser, balance: balance})
        setAmount(amount);
        
        alert("Your deposit has been made succesfully");
        

       }   

     })();
  }

  function clearForm() {
      setShow(true);
      setAmount('');
  }

  function isValid() {
      return (amount != '')
  }


    return (
      <Form>
      <br></br>
      <div className='piggys'>
          <GiPiggyBank />
      </div>
      <h1 className='withdraw'>Withdraw</h1>
      <br></br>
      {show ? (
          <>
              <p className='instruction'>Type the amount to withdraw</p>
              <br></br>
              <input
                  type='input'
                  placeholder="100"
                  value={amount}
                  onChange={e => setAmount(e.currentTarget.value)}
                  className="borderInputW"
                  id="amount"
                  required

              />
              <center><Button type="submit" className="btn btn-dark" disabled={!isValid()} onClick={handleCreate}>Click me to withdraw</Button></center>
              <br></br>
              <br></br>
          </>
      ) : (
          <>
              <center><h5>Success!</h5></center>
              <button type="submit" className="btn btn-dark" onClick={clearForm}>Click me to make another withdraw</button>
          </>
      )}


  </Form>

      )
}

export default Withdraw;