import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router';

const Protectedroutes = ({component}) => {

  const loggedIn = useSelector((state) => state.currentUser.loggedIn);
  
 console.log(loggedIn);
 return loggedIn ? component : <Navigate to="/login" />


}

export default Protectedroutes