import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import bot from "../../asserts/botPhoto.jpg"
import { useApp } from '../../context/appContext'
import "./Header.css"
const Header = () => {
  const {currentUser,setCurrentUser}=useApp()

  useEffect(()=>{
    const data= JSON.parse(localStorage.getItem("user"))
    setCurrentUser(data)
  },[])

  return (
    <div className='headerWrapper'>
       <ul className="ul">
            <div className="leftLi">
                <div className="logo">
                    <img src= {bot}alt="" className="logoImg" />
                </div>
                <div className="logoText">Authors</div>
            </div>
            <div className="middleLi">
                <li className="li">
                  <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
                    Home
                  </Link>
                </li>
                <li className="li">
                  <Link to="/available-authors" style={{textDecoration:"none",color:"inherit"}}>
                      Authors
                  </Link>
                </li>
                <li className="li">
                <Link to="/available-books" style={{textDecoration:"none",color:"inherit"}}>
                      Books
                </Link>
                </li>
                {
                  !currentUser &&(
                  <li className="li">
                    <Link to="/register" style={{textDecoration:"none",color:"inherit"}}>
                        Register
                    </Link>
                  </li>
                )
                }
               {
                  !currentUser &&(
                  <li className="li">
                    <Link to="/login" style={{textDecoration:"none",color:"inherit"}}>
                        Login
                    </Link>
                  </li>
                )
                }
            </div>
            <div className="rightLi">
              <img src={currentUser?.profilePic} alt="" />
              <span>{currentUser.username}</span>
            </div>
       </ul>
    </div>
  )
}

export default Header
