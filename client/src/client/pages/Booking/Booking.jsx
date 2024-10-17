import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getBookingApi } from "../../../utils/Client/api";
import {format,differenceInCalendarDays} from "date-fns"
import {CalendarOutlined,MoonOutlined} from "@ant-design/icons"
import { CiMoneyCheck1 } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

function Booking() {
    const navigate = useNavigate()
    const [data,setData] = useState([])
    const fetch = async()=>{
        const res = await getBookingApi()
        if(res.code==200){
            setData(res.data)
        }
        else{
            toast.error(res.message)
        }
    }
    useEffect(()=>{
        fetch()
    },[])

    return (
        <>
            <div className="mt-4 flex flex-col gap-4">
                {data?.length>0 && data.map(item=>(
                    <Link to={`/user/bookings/${item._id}`} key={item._id} className="p-4 flex gap-4 bg-gray-100 rounded-2xl">
                        <div className='w-32 h-32 bg-gray-300 rounded-2xl'>
                             {item.placeId.photos.length>0 &&(
                                <img
                                    src={item.placeId.photos[0]}
                                   className="w-full h-full rounded-2xl"
                                
                                />
                             )}
                        </div>
                        <div className="pr-3 grow">
                            <h2 className="text-xl">{item.placeId.title}</h2>
                            <div className="border-t border-gray-300 mt-2 py-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <CalendarOutlined />{format(new Date(item.checkIn),"dd-MM-yyyy")} 
                                    </div>
                                    &rarr; 
                                    <div className="flex items-center gap-1">
                                        <CalendarOutlined/>{format(new Date(item.checkOut),"dd-MM-yyyy")}
                                    </div>
                                </div>
                            </div>
                            <div className="text-xl">
                                <div className="flex items-center gap-2">
                                    <MoonOutlined />
                                    {differenceInCalendarDays(new Date(item.checkOut) , new Date(item.checkIn))} nights
                                </div>
                                <div className="flex items-center gap-2">
                                    <CiMoneyCheck1 size={23}/> 
                                    Total price: ${item.price}

                                </div>
                            </div>
                           
                        </div>
                    </Link>
                ))}
            </div>

            {data?.length==0 && (
                <>
                     <Result
                        status="404"
                        title="No Booking"
                        subTitle="Go to booking now?"
                        extra={<Button onClick={()=>navigate("/")} type="primary">Search Booking</Button>}
                    />
                
                
                </>
            )}

        </>
    );
}

export default Booking;