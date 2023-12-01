import React from 'react'
import './Backdrop.css';

function Backdrop(props) {

    const handleSidebarNavClose = () => {
        props.setIsSidebarNavOpen(false);
    }
  return (
    <div className='Backdrop' onClick={handleSidebarNavClose}></div>
  )
}

export default Backdrop;