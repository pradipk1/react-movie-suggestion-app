import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Favorites from '../Favorites/Favorites'
import Searchbar from '../Searchbar/Searchbar'

function AllRoutes() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Searchbar />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/favorites' element={<Favorites />} />
            {/* <Route path='' element={} /> */}
        </Routes>
    </>
  )
}

export default AllRoutes