import React, { useState } from 'react'
import Signin from './Signin/Signin'
import { Signup } from './Signup/Signup'

const Main = () => {
    const [mode,setMode]=useState("signin")
  return (
    <div style={{backgroundColor:"beige"}}>
        <div className='d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
            {
                 mode=="signin"?<Signin setMode={setMode}/>:<Signup setMode={setMode}/>
            }
        </div>
    </div>
  )
}

export default Main