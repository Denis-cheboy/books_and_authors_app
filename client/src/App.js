import { Routes,Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Home from "./pages/Home/Home";
import Layout from "./component/Layout";
import Login from "./pages/Login/Login";
import AvailableAuthor from "./pages/availableAuthors/AvailableAuthor";
import AvailableBooks from "./pages/availableBooks/AvailableBooks";
import Adventure from "./pages/adventure/Adventure";
import Love from "./pages/love/Love";
import Technology from "./pages/technology/Technology";
import SciFi from "./pages/sciFi/SciFi";
import Bussiness from "./pages/business/Bussiness";
import YourBooks from "./pages/yourBooks/YourBooks";
import Profile from "./pages/profile/Profile";
function App() {
  
  
  return (
    <Routes>
      <Route path="/*" element={<Layout/>}>
         <Route index element={<Home/>}/>
         <Route path="available-authors" element={<AvailableAuthor/>}/>
         <Route path="available-books" element={<AvailableBooks/>}/>
         <Route path="adventure" element={<Adventure/>}/>
         <Route path="love" element={<Love/>}/>
         <Route path="technology" element={<Technology/>}/>
         <Route path="sci-fi" element={<SciFi/>}/>
         <Route path="business" element={<Bussiness/>}/>
         <Route path="your-books" element={<YourBooks/>}/>
         <Route path="profile/:id" element={<Profile/>}/>
      </Route>
      <Route path="register" element={<Register/>}/>
      <Route path="login" element={<Login/>}/>
    </Routes>
  );
}
export default App;

