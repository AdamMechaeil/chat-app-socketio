import { AuthContext } from '@/app/Context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

const Signin = ({setMode}) => {
  const router=useRouter();
  const {signin,dispatch} = useContext(AuthContext);
  const [formData,setFormData] = useState({
    email:'',
    password:''
  })

  async function handleSubmit(){
    try {
     
        const data=await signin(formData);
        console.log(data);
        if(data.status==200){
        delete data?.msg;
        dispatch({
          type:"SIGN_IN",
          payload:data?.data
        })
        router.push("/Chats")
        }else{
          alert(data.statusText)
        }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='card bg-transparent p-3 shadow'>
        <div>
            <h3>Sign In</h3>
        </div>
        <label htmlFor="email">Email</label>
        <input type="email" onChange={(e)=>{
            setFormData((prev)=>{return {...prev,email:e.target.value}})
          }} />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password"  onChange={(e)=>{
            setFormData((prev)=>{return {...prev,password:e.target.value}})
          }} />
        <br />
        <button className='btn btn-success' onClick={()=>{
            handleSubmit();
          }}>Sign In</button>
        <br />
        <button className='btn btn-primary' onClick={()=>{
            setMode("signup")
        }}>Dont have account? Create One!</button>
        <br />
        <button className='bg-transparent' style={{textDecoration:"underline",border:"0"}}>Forgot Password!</button>
    </div>
  )
}

export default Signin