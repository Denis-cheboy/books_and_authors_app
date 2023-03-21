import React from 'react'
import { useApp } from '../../context/appContext'
import {Link} from "react-router-dom"
import "./Rightsidebar.css"
const Rightsidebar = () => {
  return (
    <div className="rightbarWrapper">
        <div className="yourBooks">
            <Link to="/your-books" style={{textDecoration:"none",color:"inherit"}}>
              Your Books
            </Link>
        </div>
        <div className="addBook">
            <Link to="/addBook" style={{textDecoration:"none",color:"inherit"}}>
               Add Book
            </Link>
        </div>
        <div className="beReviewer">
            <span>Review</span>
        </div>
        <div className="price">
            <span>Book Prices</span>
        </div>
        <div className="collaborators">
            <span>Collaboration</span>
        </div>
        <div className="yourFriends">
            <span>Author Friends </span>
        </div>
        <div className="settings">
            <span>Settings </span>
        </div>

    </div>
  )
}

export default Rightsidebar
