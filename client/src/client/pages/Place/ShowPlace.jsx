import React, { useEffect, useState } from 'react';
import {PlusOutlined} from "@ant-design/icons"
import { Link} from 'react-router-dom';
import { getPlaceApi } from '../../../utils/Client/api';
import { Image, Spin } from 'antd';

function ShowPlace() {
    const [places,setPlaces] = useState([])
    const fetch = async()=>{
        const res = await getPlaceApi();
        if(res.code==200){
            setPlaces(res.data)    
        }
    }
    
    useEffect(()=>{
        fetch()
    },[])
  
    return (
        <>
            <div className='text-center'>
                <Link to="/user/places/new" className='inline-flex py-2 px-6 bg-[#f5385d] rounded-full text-white gap-1'>
                    <PlusOutlined />
                    Add new place

                </Link>
            </div>   

            {places.length==0 &&(
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <Spin spinning={places.length === 0} tip="Waiting...">
                    
                    </Spin>
                </div>
            )}
            <div className='mt-4 flex flex-col gap-4'>
                {places.length>0 && places.map(item=>(
                   <Link to={`/user/places/${item._id}`} className='p-4 flex gap-4 bg-gray-100 rounded-2xl' key={item._id}>
                        <div className='w-32 h-32 bg-gray-300 rounded-2xl'>
                             {item.photos.length>0 &&(
                                <img
                                    src={item.photos[0]}
                                   className="w-full h-full rounded-2xl"
                                
                                />
                             )}
                        </div>
                        <div className='flex-1'>
                            <h2 className='text-xl'>{item.title}</h2>
                            <p className='mt-2 text-sm'>{item.description}</p>
                        </div>
                   </Link>
                ))}
            </div>
        </>
    );
}

export default ShowPlace;