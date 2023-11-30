import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Signup/Signup.css'
import myContext from '../Context/Context';

function Login() {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });
    
    const {setUserStatus} = useContext(myContext)

    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        // console.log(formData);
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let validateUser = users.filter((ele) => ele.email===formData.email && ele.password===formData.password)
        if(validateUser.length===0) {
            alert('Wrong credentials entered.');
        } else {
            alert('Logged in successfully!');
            localStorage.setItem('user', JSON.stringify({name:validateUser[0].name, isLoggedIn: true}));
            setUserStatus({
                name:validateUser[0].name,
                isLoggedIn: true
            })
            navigate('/');
        }
    }
  return (
    <div className='signupContainer'>
        <div>
            <h3 style={{textAlign:'center'}}>Login</h3>
            <form onSubmit={handleLogin}>
                <div className='formInpDiv'>
                    <label>Email</label>
                    <input type="email" placeholder='Enter Email' 
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            email:e.target.value
                        })
                    }}
                    />
                </div>
                <div className='formInpDiv'>
                    <label>Password</label>
                    <input type="password" placeholder='Enter Password' 
                    onChange={(e) => {
                        setFormData({
                            ...formData,
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
                <span>Don't have an account? <Link style={{textDecoration:'none'}} to='/signup'>Signup</Link></span>
            </div>
        </div>
    </div>
  )
}

export default Login