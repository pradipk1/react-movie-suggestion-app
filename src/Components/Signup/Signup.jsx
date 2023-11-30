import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'

function Signup() {
    const [userData, setUserData] = useState({
        name:'',
        email:'',
        password:'',
    });

    const navigate = useNavigate();
    const handleSignup = (e) => {
        e.preventDefault();
        console.log(userData);
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if(users.length===0) {
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));
            alert("Registered successfully!");
            navigate('/login');
        } else {
            const userExist = users.filter((ele) => userData.email===ele.email);
            if(userExist.length===0) {
                users.push(userData);
                localStorage.setItem('users', JSON.stringify(users));
                alert("Registered successfully!");
                navigate('/login');
            } else {
                alert("Entered email is already registered. Please enter another email.");
            }
        }
    }
  return (
    <div className='signupContainer'>
        <div>
            <h3 style={{textAlign:'center'}}>Signup</h3>
            <form onSubmit={handleSignup}>
                <div className='formInpDiv'>
                    <label>Name</label>
                    <input type="text" placeholder='Enter Name' 
                    minLength={3}
                    required
                    onChange={(e) => {
                        setUserData({
                            ...userData,
                            name:e.target.value
                        })
                    }}
                    />
                </div>
                <div className='formInpDiv'>
                    <label>Email</label>
                    <input type="email" placeholder='Enter Email' 
                    required
                    onChange={(e) => {
                        setUserData({
                            ...userData,
                            email:e.target.value
                        })
                    }}
                    />
                </div>
                <div className='formInpDiv'>
                    <label>Password</label>
                    <input type="password" placeholder='Enter Password' 
                    required
                    // minLength={8}
                    maxLength={15}
                    onChange={(e) => {
                        setUserData({
                            ...userData,
                            password:e.target.value
                        })
                    }}
                    />
                </div>
                <div className='formSubmitDiv'>
                    <input type="submit" />
                </div>
            </form>
            <div style={{textAlign:'center'}}>
                <span>Already have an account? <Link style={{textDecoration:'none'}} to='/login'>Login</Link></span>
            </div>
        </div>
    </div>
  )
}

export default Signup