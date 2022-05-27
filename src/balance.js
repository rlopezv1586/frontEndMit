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
import { FaBalanceScaleLeft } from "react-icons/fa";



function Balance() {

    const { currentUser } = useContext(UserContext)
    const { balance } = currentUser


    return (
        <Form>
            <br></br>
            <div className='piggys'>
                <FaBalanceScaleLeft />
            </div>
            <h1 className='withdraw'>Balance</h1>
            <br></br>
            {balance ? (
                <>
                    <p className='instruction'>Your balance is:</p>
                    <br></br>
                    <input
                        type='input'
                        value={balance}
                        className="borderInputW balance"
                        id="amount"
                        disabled
                    />
                    <br></br>
                    <br></br>
                </>
            ) : (
                <>
                    <br></br>

                </>
            )}


        </Form>
    )
}

export default Balance;