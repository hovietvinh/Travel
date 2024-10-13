
import './App.css'
import { MdTravelExplore } from "react-icons/md";
import {NavLink, Route, Routes} from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUserCircle } from "react-icons/fa";
import Default from './client/layouts/Default';
import Login from './client/pages/Login/Login';
import Home from './client/pages/Home/Home';
import Register from './client/pages/Register/Register';
import toast, { Toaster } from 'react-hot-toast';
import User from './client/pages/User/User';
function App() {

  

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Default/>}>
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>}/> 
          <Route path="register" element={<Register/>}/>
          <Route path="user/:subparams" element={<User/>}/>
          <Route path="user/:subparams/:action" element={<User/>}/>
          
        </Route>
       
      </Routes>
    </>
  )
}

export default App
