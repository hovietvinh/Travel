import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { setUserAction } from '../../../redux/client/actions/UserAction';
import { getProfileUserApi, logoutUserApi } from '../../../utils/Client/api';
import Place from '../Place/Place';
import {UserOutlined,UnorderedListOutlined,HomeOutlined} from "@ant-design/icons"

function User() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {subparams} = useParams()
    const stateAuth = useSelector(state=>state.UserReducer)
    const check = async()=>{
        const res =await getProfileUserApi()
        if(res.code==200){
            dispatch(setUserAction(res.data))
        }
        else{
            dispatch(setUserAction({}))
            navigate("/login")
        }
    }
    useEffect(()=>{
        check()
    },[])

    const handleLogout = async()=>{
        const res = await logoutUserApi();
        if(res.code==200){
            dispatch(setUserAction({}))
            toast.success(res.message)
            navigate("/")
        }else{
            toast.error(res.message)
        }
    }


    return (
        <>
            <div>
                <nav className='flex mt-8 gap-4 w-full justify-center mb-8'>
                    <NavLink  to="/user/profile" 
                        className={({ isActive }) =>
                        `py-2 inline-flex gap-1 transition duration-300 px-4 rounded-full ${isActive ? "rounded-full bg-[#f5385d] text-white " : 'bg-gray-200'}`
                      }>
                        <UserOutlined />
                        My profile
                        </NavLink>
                    <NavLink to="/user/booking" 
                        className={({ isActive }) =>
                        `py-2 px-4 inline-flex gap-1   transition duration-300 rounded-full ${isActive ? "rounded-full bg-[#f5385d] text-white " : 'bg-gray-200'}`
                      }>
                        <UnorderedListOutlined />
                        My bookings</NavLink>
                    <NavLink to="/user/places" 
                    className={({ isActive }) =>
                    `py-2 px-4 inline-flex gap-1   transition duration-300 rounded-full ${isActive ? " bg-[#f5385d] text-white " : 'bg-gray-200'}`
                  }>
                        <HomeOutlined />
                        My accommodations</NavLink>
                </nav>
                {subparams ==="profile" &&(
                    <>
                        <div className='text-center max-w-lg mx-auto'>
                            Logged in as {stateAuth.userInfo.userName} ({stateAuth.userInfo.email})
                            <button onClick={handleLogout} className=' bg-[#f5385d] max-w-sm mt-2 p-1 w-full text-white rounded-2xl'>Log out</button>
                        </div>
                    
                    </>
                )}

                {subparams ==="places" &&(
                    <>
                        <Place/>
                    
                    </>
                )}
            </div>
            
        </>
    );
}

export default User;