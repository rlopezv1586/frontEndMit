import {Navigate} from 'react-router-dom'
import {useAuthValue} from './AuthContext'
import { useContext } from 'react';
import { UserContext } from "./context";

export default function PrivateRoute({children}) {
  const { currentUser } = useContext(UserContext)
  console.log(currentUser)
  if(!currentUser?.emailVerified){
    return <Navigate to='/login' replace/>
  }

  return children
}