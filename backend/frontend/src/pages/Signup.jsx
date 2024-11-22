import axios from 'axios';
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  const[inputs,setInputs]=useState({
    email:"",
    username:"",
    password:""
  })
  const navigate=useNavigate()

  const Change=(e)=>{
     const {name,value}=e.target;
     setInputs({...inputs,[name]:value});
  };

  const signupFunction=async(e)=>{
    e.preventDefault()
    await axios.post(`${window.location.origin}/api/v1/register`,inputs).then((res)=>{
      if(res.data.message==='user already exists'){
        alert(res.data.message);
      }else{
        alert(res.data.message);

        setInputs({
          email:"",
          username:"",
          password:""
        });
        navigate('/login');
      }
      
      
    })
    
  }
  return (
    <div className='flex justify-center px-10'>
      <div className="conatiner w-full md:w-2/5 bg-slate-300 px-8 py-4 my-5 rounded-sm">
      <h1 className='text-4xl font-bold text-center my-6'>Signup Form</h1>
        <form action="" className=''>
            <div className="mb-4">
                <input
                onChange={Change} value={inputs.email}
                type="email" name='email' className='p-2 w-full' placeholder='Enter Your Email'/>
            </div>
            <div className="mb-4">
                <input
                onChange={Change} value={inputs.username}
                type="text" name='username' className='p-2 w-full' placeholder='Enter Username'/>
            </div>
            <div className="mb-4">
                <input
                onChange={Change} value={inputs.password}
                type="password" name='password' className='p-2 w-full' placeholder='Enter Your Password'/>
            </div>
            
            <div className="mt-5">
                <button
                onClick={signupFunction}
                className='w-full py-3 rounded-md bg-slate-700 text-white font-bold text-xl'>Signup</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
