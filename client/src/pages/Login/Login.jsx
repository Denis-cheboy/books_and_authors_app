import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LoginAuthor } from '../../mutations/ClientMutations'
import { useLocation, useNavigate } from 'react-router-dom'
import "./Login.css"
const Login = () => {
    const [loginAuthor,{loading:isloading,error}]=useMutation(LoginAuthor)
    const location=useLocation()
    const navigate=useNavigate()
    const from=location.state?.from?.pathname || "/"
    const [loginUser,setLoginUser]=useState({
        password:"",
        email:""
    })
    const handleChange=(e)=>{
        setLoginUser(user=>({...user,[e.target.name]:e.target.value}))
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(!error){
            try{
              const res=await loginAuthor({
                variables:{
                    email:loginUser.email,
                    password:loginUser.password
                }
              })
              localStorage.setItem("user",JSON.stringify(res.data.loginAuthor))
              navigate(from,{replace:true})
            }
            catch(err){
                console.log(err)
            }

        }
    }
    return (
        <div className="loginWrapper">
            <div className="header">Login Here</div>
            {error && <span>{error.response.msg}</span>}
            <form action="#" className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input type="email" placeholder='Enter Email Address' name="email" value={loginUser.email} onChange={handleChange}/>
                <br/>
                <label htmlFor="password">Enter Password</label>
                <input type="password" name="password" placeholder='Password' value={loginUser.password} onChange={handleChange}/>
                <button>{isloading?"submitting...":"Submit"}</button>
            </form>
            <span>Dont have an account?<Link to="/register">Register</Link></span>
        </div>
    )
}

export default Login
