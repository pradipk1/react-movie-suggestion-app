import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import myContext from '../Context/Context';
import menubaricon from '../../Images/menubaricon.png'

function Navbar(props) {

  const {userStatus, setUserStatus} = useContext(myContext);
  
  const handleLogout = () => {
    localStorage.setItem('user', JSON.stringify({name:'', isLoggedIn:false}));
    setUserStatus({
      name:'',
      isLoggedIn:false
    })
  }

  const handleSidebarNavOpen = () => {
    props.setIsSidebarNavOpen(true);
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

        <button className='NavMenubarBtn' onClick={handleSidebarNavOpen}>
          <img src={menubaricon} alt="menubaricon" />
        </button>
    </div>
  )
}

export default Navbar