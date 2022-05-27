import './profile.css'
import './forms.css'
import {useAuthValue} from './AuthContext'
import { signOut } from 'firebase/auth' 
import { auth } from './firebase'
import Deposit from './deposit'
import Withdraw from './withdraw'
import Balance from './balance'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useContext } from 'react';
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import { BsFillPlugFill } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import { UserContext } from "./context"


function Account() {
  const {currentUser} = useAuthValue()
  const { setCurrentUser } = useContext(UserContext)

  return (
    <>
      <center><br/>
        <h2>Hi!<br/><strong>{currentUser?.email}</strong></h2>
        <br></br>
        <br></br>
      </center>

      <Container>
        <Row>
          <Col sm={4}>
            <div className='withdrawCard'>
              <Deposit></Deposit>
            </div>
          </Col>  
          <Col sm={4}>
            <div className='withdrawCard'>
              <Balance></Balance>
            </div>
          </Col>  
          <Col sm={4}>
            <div className='withdrawCard'>
              <Withdraw></Withdraw>
            </div>
          </Col>  
        </Row>
      </Container>

      <br></br>
      <br></br>
      <br></br>
    <div className='unplug'  onClick={() => { signOut(auth); setCurrentUser({ email: null, password: null, balance: 0, emailVerified: null }) }}>
      <BsFillPlugFill/>
      </div>
      <p className='chau'  onClick={() => { signOut(auth); setCurrentUser({ email: null, password: null, balance: 0, emailVerified: null }) }}>Sign out</p>
    </>
  )
}

export default Account

