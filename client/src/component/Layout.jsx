import {Outlet} from "react-router-dom"
import "./Layout.css"
import Rightsidebar from "./Rightsidebar/Rightsidebar"
import AddBook from "../pages/AddBook/AddBook"
import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"

const Layout=()=>{
    return (
        <div className="layout">
            <Header/>
            <AddBook/>
            <div className="innerLayout">
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="outlet">
                  <Outlet/>
                </div>
                <div className="rightSidebar">
                    <Rightsidebar/>
                </div>
            </div>
        </div>
    )
}

export default Layout