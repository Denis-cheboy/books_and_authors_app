import React from 'react'
import { Link } from 'react-router-dom'
import "./Sidebar.css"
const Sidebar = () => {
  return (
    <div className="sidebarWrapper">
        <div className="authors">
            <Link style={{color:"inherit",textDecoration:"none"}} to="/available-authors">
                <div className="authorTitle">Available Authors</div>
            </Link>
        </div>
        <div className="books">
            <Link style={{color:"inherit",textDecoration:"none"}} to="/available-books">
                <div className="authorTitle">Available Books</div>
            </Link>
        </div>
        <div className="category">
            <div className="categoryTitle">
                <p>Categories</p>
            </div>
                <div className="allBooks">
                    <p className="adventure">
                        <Link style={{color:"inherit",textDecoration:"none"}} to="/adventure">
                          Adventure
                       </Link>
                    </p>
                    <p className="technology">
                    <Link style={{color:"inherit",textDecoration:"none"}} to="/technology">
                          Technology
                    </Link>
                    </p>
                    <p className="love">
                    <Link style={{color:"inherit",textDecoration:"none"}} to="/love">
                         Love
                    </Link>
                    </p>
                    <p className="sci-fi">
                    <Link style={{color:"inherit",textDecoration:"none"}} to="/sci-fi">
                          Sci-Fi
                    </Link>
                    </p>
                    <p className="business">
                    <Link style={{color:"inherit",textDecoration:"none"}} to="/business">
                          Business
                    </Link>
                    </p>
                </div> 
        </div>
        <div className="reviewers">
            <span>Reviewers</span>
        </div>
        <div className="popularity">Popular Books</div>
    </div>
  )
}

export default Sidebar
