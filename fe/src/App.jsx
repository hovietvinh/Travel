
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
import Place from './client/pages/Home/Place';
function App() {

  

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Default/>}>
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>}/> 
          <Route path="register" element={<Register/>}/>
          <Route path="user/profile" element={<User/>}/>
          <Route path="user/places" element={<User/>}/>
          <Route path="user/bookings" element={<User/>}/>
          <Route path="user/places/new" element={<User/>}/>
          <Route path="user/places/:id" element={<User/>}/>
          <Route path="places/:id" element={<Place/>}/>
          <Route path="user/bookings/:id" element={<User/>}/>
          
        </Route>
       
      </Routes>
    </>
  )
}

export default App
