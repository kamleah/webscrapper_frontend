import React from 'react'
import { useEffect } from 'react'
import { Outlet , useNavigate } from 'react-router-dom'
// 

function AuthLayout({children}) {
  const navigate = useNavigate()
  const user = false
  useEffect(()=>{

    if(user!==false){
      navigate("/login")
    }
    // else{
    //   navigate("/signup")
    // }
  },[])
  return (
    <>

    {children}
    </>
  )
}

export default AuthLayout