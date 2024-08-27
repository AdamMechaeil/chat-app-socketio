import { AuthContext } from '@/app/Context/AuthContext'
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

export const Signup = ({setMode}) => {
  const router=useRouter();
  const {signup,dispatch} = useContext(AuthContext);
  const [formData,setFormData] = useState({
    age:'',
    name:'',
    username:'',
    email:'',
    password:'',
    confirmPassword:'',
    phone:'',
    gender:'',
  })

  async function handleSubmit(){
    try {
      if(formData?.confirmPassword!=formData?.password){
        alert("Passwords do not match");
      }else{
        const data=await signup(formData);
        delete data?.msg;
        dispatch({
          type:"SIGN_UP",
          payload:data
        })
        router.push("/Chats")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='card bg-transparent p-3 shadow'>
        <div>
            <h3>Sign Up</h3>
        </div>
        <input className='my-2' type="date" placeholder='DOB' onChange={(e)=>{
          let dateob= new Date(e.target.value);
          let date= new Date();
          setFormData((prev)=>{return {...prev,age:Math.floor((date-dateob)/(365*24*3600*1000))}})
        }} />
        <p>Age : {formData.age}</p>
        {
          formData?.age>=18?
          <>
          <input className='my-2' type="text" placeholder='Name' 
          onChange={(e)=>{
            setFormData((prev)=>{return {...prev,name:e.target.value}})
          }}
          />
          <input className='my-2' type="text" placeholder='Username'
            onChange={(e)=>{
              setFormData((prev)=>{return {...prev,username:e.target.value}})
            }}
          />
          <input className='my-2' type="email" placeholder='Email'
           onChange={(e)=>{
            setFormData((prev)=>{return {...prev,email:e.target.value}})
          }}
          />
          <input className='my-2' type="password" placeholder='Password'
           onChange={(e)=>{
            setFormData((prev)=>{return {...prev,password:e.target.value}})
          }}
          />
          <input className='my-2' type="password" placeholder='Confirm Password'
           onChange={(e)=>{
            setFormData((prev)=>{return {...prev,confirmPassword:e.target.value}})
          }}
          />
          <input className='my-2' type="text" placeholder='Phone No.' 
           onChange={(e)=>{
            setFormData((prev)=>{return {...prev,phone:e.target.value}})
          }}
          />
          <div className='my-2' 
          onChange={(e)=>{
            setFormData((prev)=>{return {...prev,gender:e.target.value}})
          }}
          >
              Gender : &nbsp;
              <label htmlFor="">M</label>
              &nbsp;
              <input type="radio" name="gender"/>
              &nbsp;
              <label htmlFor="">F</label>
              &nbsp;
              <input type="radio" name="gender"/>
          </div>
          <br />
          <button className='btn btn-success' onClick={()=>{
            handleSubmit();
          }}>Sign Up</button>
          <br />
          <button className='btn btn-primary' onClick={()=>{
              setMode("signin")
          }}>Already have an Account? Sign In!</button></>:<>
            <h3>You must be 18 <br /> or older to <br /> access this site</h3>
          </>
        }
    </div>
  )
}
