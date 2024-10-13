import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Outlet, useNavigate} from "react-router-dom"
import { setUserAction } from '../../redux/client/actions/UserAction';
import { getProfileUserApi } from '../../utils/Client/api';
import Header from "../components/Header";
import Cookies from 'js-cookie';
function Default() {
  const dispatch = useDispatch()
  const navigate =useNavigate()
  const stateAuth = useSelector(state=>state.UserReducer)

  const fetch = async()=>{
    const res = await getProfileUserApi();
      if(res.code==200){
        dispatch(setUserAction(res.data));
      }
      else{
        dispatch(setUserAction({}));
        Cookies.remove('user_token');
        
      }
  }
  useEffect(()=>{
    fetch()
  },[dispatch,navigate])

  return (
    <>
      <div className='p-4 flex flex-col min-h-screen'>
        <Header />
        <Outlet/>    
      </div>
    </>
  )
}

export default Default
