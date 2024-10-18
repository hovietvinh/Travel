import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { bookingApi, getPlaceByIdAllUserApi } from '../../../utils/Client/api';
import {FileImageOutlined} from "@ant-design/icons"
import { Form, Input, Spin } from 'antd';
import {differenceInCalendarDays} from 'date-fns'
import { useSelector } from 'react-redux';
import MapAddress from '../../components/MapAddress';


function Place() {
    const stateAuth = useSelector(state=>state.UserReducer)
    const navigate = useNavigate()
    const [disable,setDisable] = useState(false);
    const {id} = useParams()
    const [form] = Form.useForm()
    const [data,setData] = useState(null);
    const [showMorePhotos , setShowMorePhotos] = useState(false);
    const [checkInState,setCheckInState] = useState()
    const [checkOutState,setCheckOutState] = useState()
    const fetch =async()=>{
        if(!id){
            return;
        }
        const res = await getPlaceByIdAllUserApi(id);
        if(res.code==200){
            setData(res.data)
        }else{
            toast.error("Found place failed!")
        }
    }
    const calculateDateDifference = (checkIn, checkOut) => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
    
        // Calculate the difference in milliseconds
        const timeDifference = checkOutDate - checkInDate;
    
        // Convert milliseconds to days
        const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
    
        return dayDifference;
    }
    const isObjectNotEmpty = (obj) => {
        return obj && Object.keys(obj).length > 0;
    };
    useEffect(()=>{
        fetch()
    },[id])
    const initialForm = ()=>{
        form.setFieldsValue({guests:1,name:stateAuth.userInfo.userName,phone:stateAuth.userInfo.phone||""})
    }
    
    useEffect(()=>{
        initialForm()
    },[data])

    const handleBooking =async (e)=>{
        setDisable(true)

        if(!isObjectNotEmpty(stateAuth.userInfo)){
            toast.error("You need login to booking!")
            setDisable(false)

        }

        if(!e.checkIn || !e.checkOut){
            toast.error("Please fill both check-in/check-out")
             setDisable(false)

            return;
        }    
        e.placeId = id;
        e.userId = stateAuth.userInfo._id
        e.pricePerNight = data.pricePerNight;
        if(e.guests >data.maxGuests){
            toast.error(`maximum allowed: ${data.maxGuests} guests!`)
        }
        if(calculateDateDifference(e.checkIn , e.checkOut)<0){
            toast.error("Invalid check-in/check-out.");
            setDisable(false)

            return;
        }
        const res = await bookingApi(e)  
        if(res.code==200){

            toast.success(res.message)
            navigate("/user/bookings")
        }
        else{
            toast.error(res.message)

        }
        setDisable(false)

        // console.log(res)  
    }

    const clickButton = ()=>{
        form.submit()
    }

    if(showMorePhotos){
        return (
            <div className='bg-white inset-0 min-h-screen bg-gray-100 absolute'>
                <div className='p-8 grid gap-4  mx-auto max-w-3xl'>
                    
                    <div>
                        <button onClick={()=>setShowMorePhotos(false)} className='shadow shadow-black right-8 top-12 py-2 px-4 bg-gray-200 rounded-2xl cursor-pointer hover:bg-gray-400 transition duration-300 flex gap-1 items-center fixed'>
                            <span className='text-xl' >X</span>Close photos
                        </button>
                    </div>
                    {data?.photos?.length>0 && data.photos.map(link=>(
                        <>
                            <div>
                                <img
                                    src={link}
                                    className="rounded-2xl object-cover aspect-square"
                                    
                                />
                            </div>
                        </>
                    ))}
                </div>
                
            </div>
        )
    }
    return (
        <>
            {!data&&(
                <>
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <Spin spinning={!data} tip="Waiting...">
                        
                        </Spin>
                    </div>
                </>
            )}
            {data && (
                <>
                    <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
                        <h1 className='text-center sm:text-start text-3xl my-3'>{data.title}</h1>
                        <MapAddress data={data}/>
                        <div className='relative'>
                            <div className='sm:grid sm:grid-cols-[2fr_1fr] gap-4 overflow-hidden'>
                                <div className='relative'>
                                    {data.photos?.[0] && (
                                        <img
                                            src={data.photos[0]}
                                            alt="no img"
                                            className='object-cover aspect-square rounded-2xl cursor-pointer'
                                            onClick={()=>setShowMorePhotos(true)}
                                        />
                                    )}
                                    <div className='sm:hidden absolute right-4 text-[13px] bottom-4 rounded-sm text-white py-2 px-4 bg-[#1C3239] tracking-wide'>1/{data.photos.length}</div>
                                </div>
                                <div className='grid '>
                                    {data.photos?.[1] && (
                                        <img
                                            src={data.photos[1]}
                                            alt="no img"
                                            className='hidden sm:inline object-cover aspect-square rounded-2xl cursor-pointer'
                                            onClick={()=>setShowMorePhotos(true)}
                                        />
                                    )}   
                                    <div className='overflow-hidden'>
                                        {data.photos?.[2] && (
                                            <img
                                                src={data.photos[2]}
                                                alt="no img"
                                                className='hidden sm:inline object-cover aspect-square relative top-2 rounded-2xl cursor-pointer'
                                                onClick={()=>setShowMorePhotos(true)}
                                            />
                                        )}  
                                    </div>
                                    
                                </div>
                            </div>
                            <button onClick={()=>setShowMorePhotos(true)} className='hidden sm:inline absolute flex gap-2 items-center bottom-1 right-1 bg-white px-4 py-2 rounded-2xl border border-black shadow shadow-md shadow-gray-500 cursor-pointer'>
                                <FileImageOutlined />
                                Show more photos
                            </button>
                        </div>
                        
                        <div className='my-8  gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>

                            <div>
                                <div className='my-4'>
                                    <h2 className='font-semibold text-2xl mb-3'>Description</h2>
                                    {data.description}
                                </div>
                                Check-in: {data.checkIn}<br/>
                                Check-out: {data.checkOut}<br/>
                                Max number of guests: {data.maxGuests}
                                <div>
                                    <div>
                                        <h2 className='font-semibold text-2xl my-4'>Extra Info</h2>
                                    </div>
                                    <div className='mt-2 mb-4 text-gray-700 text-sm leading-4'>{data.extraInfo}</div>
                                </div>
                            </div>
                            <div>
                                <div className='bg-white shadow p-4 rounded-2xl'>
                                    <div className='text-center text-xl'>
                                        Price: ${data.pricePerNight} / per night
                                    </div>
                                    <Form className='border mt-4 rounded-md' onFinish={handleBooking} layout='vertical' form={form}>
                                        <div className='grid grid-cols-1 sm:grid-cols-2 '>
                                            <div className='py-3 px-4'>
                                                <Form.Item
                                                    label="Check in:"
                                                    name="checkIn"
                                                >
                                                    <Input onChange={e=>setCheckInState(e.target.value)} type='date'/>

                                                </Form.Item>
                                            </div>
                                            <div className='py-3 px-4 border-l'>
                                                <Form.Item
                                                        label="Check out:"
                                                        name="checkOut"
                                                    >
                                                    <Input onChange={e=>setCheckOutState(e.target.value)} type='date'/>

                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className='border-t py-3 px-4'>
                                            <Form.Item
                                                label="Number of guests:"
                                                name="guests"
                                                rules={[{ required: true, message: 'Please input number of guests!' }]}
                                            >
                                            <Input type='number'/>

                                            </Form.Item>
                                        </div>
                                        <div className='border-t py-3 px-4'>
                                            <Form.Item
                                                label="Your name"
                                                name="name"
                                                rules={[{ required: true, message: 'Please input your name!' }]}

                                            >
                                            <Input placeholder='Enter your name'/>

                                            </Form.Item>
                                            <Form.Item
                                                label="Phone number"
                                                name="phone"
                                                rules={[{ required: true, message: 'Please input your phone!' }]}

                                            >
                                            <Input placeholder='Enter your phone number'/>

                                            </Form.Item>
                                        </div>

                                    </Form>
                                    <button disabled={disable}  onClick={clickButton} className={`mt-4  text-center text-white text-md w-full rounded-2xl p-2 ${disable?"cursor-not-allowed bg-pink-500":"cursor-pointer bg-[#f5385d]"}` } htmltype="submit">
                                        Booking this place 
                                        {checkInState && checkOutState && (
                                            <span className='ml-1 '>${data.pricePerNight *(differenceInCalendarDays(new Date(checkOutState) , new Date(checkInState)))}</span>
                                        ) }
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                        
                        
                        
                        
                    </div>
                
                
                </>
            )}
            
        </>
    );
}

export default Place;