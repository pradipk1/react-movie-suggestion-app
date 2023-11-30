import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import myContext from '../Context/Context';

function Navbar() {

  const {userStatus, setUserStatus} = useContext(myContext);
  
  const handleLogout = () => {
    localStorage.setItem('user', JSON.stringify({name:'', isLoggedIn:false}));
    setUserStatus({
      name:'',
      isLoggedIn:false
    })
  }

  return (
    <div className='NavbarContainer'>
        <Link className='navbarLink' to='/'>Search Movie</Link>
        {
          userStatus.isLoggedIn ? <div className='NavbarProfileDiv'>
            <span>{userStatus.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </div> : 
          <Link className='navbarLink' to='/login'>Login</Link>
        }
        <Link className='navbarLink' to='/favorites'>Favorites</Link>
    </div>
  )
}

export default Navbar