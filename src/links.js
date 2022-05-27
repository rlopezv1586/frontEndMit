import {useState} from 'react'
import { Link } from 'react-router-dom'
import './forms.css'
import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {auth} from './firebase'
import {useNavigate} from 'react-router-dom'
import {useAuthValue} from './AuthContext'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { UserContext } from "./context";
import { useContext } from 'react';
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaCat } from "react-icons/fa";


function Links () {
    return(
        
    <div className='links'>
        <a href="https://github.com/rafalopezv/Bank-application-with-MERN"><Button className='social'><FaGithub/></Button></a>
        <a href="https://www.facebook.com/rafaelopezv/"><Button className='social'><FaFacebook/></Button></a>
        <a href="https://twitter.com/rafa_lopezv"><Button className='social'><FaTwitter/></Button></a>
        <a href="https://rafalopezv.io/"><Button className='social'><FaCat/></Button></a>
        
    </div>  
    
    )
}

export default Links;