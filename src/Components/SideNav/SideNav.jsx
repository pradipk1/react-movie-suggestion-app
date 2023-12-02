import React, { useContext } from 'react'
import closeLogo from '../../Images/closeLogo.png'
import './SideNav.css';
import { Link } from 'react-router-dom';
import myContext from '../Context/Context';

function SideNav(props) {

    const {userStatus, setUserStatus} = useContext(myContext);

    const handleSideNavClose = () => {
        props.setIsSidebarNavOpen(false);
    }
    let sidebarNavClasses = 'SidebarNavContainer';

    if(props.isSidebarNavOpen){
        sidebarNavClasses = 'SidebarNavContainer open'
    }

    const handleLogout = () => {
        localStorage.setItem('user', JSON.stringify({name:'', isLoggedIn:false}));
        setUserStatus({
          name:'',
          isLoggedIn:false
        })
      }

  return (
    <nav className={sidebarNavClasses}>
        <button className='SidebarNavCloseBtn' onClick={handleSideNavClose}>
            <img src={closeLogo} alt="closeLogo" />
        </button>
        <div className='SideNavLinkContainer'>
            <Link className='SideNavLink' to='/' onClick={handleSideNavClose}>Search Movie</Link>
            {
                userStatus.isLoggedIn ? <div className='SideNavProfileDiv'>
                    <span style={{color:'green', marginBottom:'5px'}}>{userStatus.name}</span>
                    <button onClick={handleLogout}>Logout</button>
                </div> : 
                <Link className='SideNavLink' to='/login' onClick={handleSideNavClose}>Login</Link>
            }
            <Link className='SideNavLink' to='/favorites' onClick={handleSideNavClose}>Favorites</Link>
        </div>
    </nav>
  )
}

export default SideNav