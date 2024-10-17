import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookingApi } from '../../../utils/Client/api';
import MapAddress from '../../components/MapAddress';
import {CalendarOutlined,MoonOutlined} from "@ant-design/icons"
import {differenceInCalendarDays,format} from "date-fns"
function BookingId() {
    const {id} = useParams()
    const [data,setData] = useState(null)
    const fetch = async()=>{
        const res = await getBookingApi()
        
        if(res.code==200){
            const find = res.data.find(item=>item._id==id);
          
            
            setData(find)
        }
        else{
            toast.error(res.message)
        }
    }
    useEffect(()=>{
        fetch()
    },[id])

    return (
        <>
            {data && (
                <div className='mt-4'>
                    <h1 className='text-3xl'>{data.placeId.title}</h1>
                    <MapAddress data={data.placeId}/>
                    <div className='bg-gray-200 rounded-2xl p-6 flex items-center justify-between'>
                        <div>
                            <h2 className='text-2xl mb-4'>Your booking infomation:</h2>
                            <div className='flex gap-3'>
                                <div className='flex gap-1'>
                                    <MoonOutlined />
                                    {differenceInCalendarDays(data.checkOut, data.checkIn)} nights:
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <CalendarOutlined />{format(new Date( data.checkIn),"dd-MM-yyyy")} 
                                    </div>
                                    &rarr; 
                                    <div className="flex items-center gap-1">
                                        <CalendarOutlined/>{format(data.checkOut,"dd-MM-yyyy")}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-6 bg-[#f5385d] text-white rounded-2xl'>
                            <div className=''>Total price</div>
                            <div className='text-3xl'>${data.price}</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BookingId;