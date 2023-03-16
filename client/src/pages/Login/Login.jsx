import React from 'react'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LoginAuthor } from '../../mutations/ClientMutations'
const Login = () => {
    const [loginAuthor,{loading:isloading}]=useMutation(LoginAuthor)
    const [loginUser,setLoginUser]=useState({
        password:"",
        email:""
    })
    const handleChange=(e)=>{
        setLoginUser(user=>({...user,[e.target.name]:e.target.value}))
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
          const res=await loginAuthor({
            variables:{
                email:loginUser.email,
                password:loginUser.password
            }
          })
          console.log(res.data)
          localStorage.setItem("user",JSON.stringify(res.data.loginAuthor))
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div className="loginWrapper">
            <div className="header">Login Here</div>
            <form action="#" className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input type="email" placeholder='Enter Email Address' name="email" value={loginUser.email} onChange={handleChange}/>
                <br/>
                <label htmlFor="password">Enter Password</label>
                <input type="password" name="password" placeholder='Password' value={loginUser.password} onChange={handleChange}/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Login
