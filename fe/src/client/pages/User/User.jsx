import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setUserAction } from '../../../redux/client/actions/UserAction';
import { getProfileUserApi, logoutUserApi } from '../../../utils/Client/api';
import Place from '../Place/Place';
import NavUser from '../../components/NavUser';
import BookingHome from '../Booking';

function User() {
    const dispatch = useDispatch()
    const location = useLocation()
    const subparams = location.pathname.split("/")[2]
    const navigate = useNavigate()

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
                
                <NavUser/>

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

                {subparams ==="bookings" &&(
                    <>
                        <BookingHome/>
                    
                    </>
                )}
            </div>
            
        </>
    );
}

export default User;