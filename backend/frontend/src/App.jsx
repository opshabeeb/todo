import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Todo from './pages/Todo'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from './pages/Home'
import Footer from './components/Footer';
import About from './pages/About';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { useDispatch } from 'react-redux';
import { authActions } from './redux/Store';
import MyState from './context/MyState';
const App = () => {
  const dispatch=useDispatch()
  useEffect(() => {
    const id=sessionStorage.getItem('id')
    if(id){
      dispatch(authActions.login());
    }
  }, [])
  
  return (
  <MyState>
   <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Signin/>}/>
      <Route path='/todo' element={<Todo/>}/>
    </Routes>
    <Footer/>
   </Router>
   </MyState>
  
  )
}

export default App
