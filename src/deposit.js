import { useState } from 'react'
import { Link } from 'react-router-dom'
import './forms.css'
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from './AuthContext'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { UserContext } from "./context";
import { useContext } from 'react';
import React from "react";
import { FaPiggyBank } from "react-icons/fa";



function Deposit() {

    const [show, setShow] = useState(true);
    const [status, setStatus] = useState('');
    const [amount, setAmount] = useState('');

    //const value = React.useContext(UserContext); 
    const { currentUser, setCurrentUser } = useContext(UserContext)

    function handleCreate() {
        if (isNaN(parseFloat(amount)) || (parseInt(amount) <= 0)) {
            setStatus("Error! Verify amount");
            return
        }
        setShow(false);
        setStatus("");

        console.log("ctx es:", currentUser);
        const balance = currentUser.balance + Number(amount)
        const url = `https://backend-mit.herokuapp.com/account/deposit/${currentUser.email}/${balance}`;

        (async () => {
            var res = await fetch(url);
            console.log('Respouesta del mongo es : ', res);
            var data = await res.json();
            console.log('data es : ', data);
            if (data.length !== 0) {

                currentUser.balance = amount;
                setCurrentUser({ ...currentUser, balance: balance })
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
                <FaPiggyBank />
            </div>
            <h1 className='withdraw'>Deposit</h1>
            <br></br>
            body = {show ? (
                <>
                    <p className='instruction'>Type the amount to deposit</p>
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
                    <center><Button type="submit" className="btn btn-dark" disabled={!isValid()} onClick={handleCreate}>Click me to deposit</Button></center>
                    <br></br>
                    <br></br>
                </>
            ) : (
                <>
                    <center><h5>Success!</h5></center>
                    <button type="submit" className="btn btn-dark" onClick={clearForm}>Click me to make another deposit</button>
                </>
            )}


        </Form>

    )
}

export default Deposit;