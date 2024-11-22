import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { authActions } from '../redux/Store';

const Signin = () => {
  const[inputs,setInputs]=useState({
    email:'',
    password:''
  })
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const change=(e)=>{
    const {name,value}=e.target;
    setInputs({...inputs,[name]:value})
  }
  const signinFunction=async()=>{
      try {
        await axios.post(`${window.location.origin}/api/v1/login`,inputs).then((res)=>{
          console.log('id',res.data.user._id)
          sessionStorage.setItem('id',res.data.user._id)
          dispatch(authActions.login())
          navigate('/todo')
        })
      } catch (error) {
        console.log(error)

      }
  }
  return (
    <div className=" flex justify-center px-10">
    
      <div className="conatiner w-full md:w-2/5 bg-slate-300 px-8 py-4 my-5 rounded-sm">
      <h1 className='text-4xl font-bold text-center my-6'>Login Form</h1>
        <form onSubmit={(e)=>e.preventDefault()} action="" className=''>
            <div className="mb-4">
                <input onChange={change}
                value={inputs.email}
                 type="email" name='email' className='p-2 w-full' placeholder='Enter Your Email'/>
            </div>
            
            <div className="mb-4">
                <input onChange={change}
                value={inputs.password}
                 type="password" name='password' className='p-2 w-full' placeholder='Enter Your Password'/>
            </div>
            
            <div className="mt-5">
                <button onClick={signinFunction}
                 className='w-full py-3 rounded-md bg-slate-700 text-white font-bold text-xl'>Login</button>
            </div>
        </form>
      </div>
    
    </div>
  )
}

export default Signin
