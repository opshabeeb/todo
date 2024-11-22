import {FaBars} from 'react-icons/fa'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../redux/Store';


export default function Navbar() {
  const isLoggedIn=useSelector((state)=>state.isLoggedIn)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const logout=()=>{
    sessionStorage.clear('id')
     dispatch(authActions.logout());

  }

  return (
    <div className="flex justify-between bg-lightPurple px-4 py-6 items-center border-b">
      {/* Logo Section */}
      <div className="text-2xl font-bold">
        Todo App
      </div>

      {/* Hamburger Menu Icon (visible on small screens) */}
      <div
        className="sm:hidden  text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FaBars />
      </div>

      {/* Navigation Links */}
      <div
        className={`absolute sm:static top-16 left-0 w-full sm:w-auto sm:flex items-center transition-all duration-300 bg-slate-200 sm:bg-transparent ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 text-center text-lg p-4 sm:p-0  font-bold cursor-pointer">
          <li onClick={()=>navigate('/')}>Home</li>
          <li onClick={()=>navigate('/about')}>About</li>
          <li onClick={()=>navigate('/todo')}>Todo</li>
          { !isLoggedIn &&
          <>
          <li onClick={()=>navigate('/signup')}>SignUp</li>
          <li onClick={()=>navigate('/login')}>Login</li>
          </> }
          {isLoggedIn&&
          <>
          <li onClick={logout}>Logout</li></>}
          
          
        </ul>
      </div>

     
    </div>
  );
}
