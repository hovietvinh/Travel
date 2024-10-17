import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPlaceApi } from '../../../utils/Client/api';

function Home() {

    const [places,setPlaces] = useState([])
    const fetch =async ()=>{
        const data = await getAllPlaceApi();
        if(data.code==200){
            setPlaces(data.data)
        }
    }
    useEffect(()=>{
        fetch()
    },[])
    
    return (
        <>
            {places.length==0 &&(
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <Spin spinning={places.length === 0} tip="Waiting...">
                    
                    </Spin>
                </div>
            )}
            

            <div className='mt-8 gap-y-8 gap-x-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                {places.length>0 && places.map(item=>(

                    <>
                        <Link to={"/places/" + item._id}>
                            <div className='bg-gray-500 rounded-2xl flex'>
                                <img
                                    src={item.photos[0]}
                                    className="rounded-2xl object-cover aspect-square"
                                />
                            </div>
                            <h3 className='truncate  font-semibold'>{item.address}</h3>
                            <h2 className='truncate text-sm text-gray-500'>{item.title}</h2>
                            <div>
                                <span className='font-semibold'>${item.pricePerNight} </span>per night
                            </div>
                            

                        </Link>
                    </>
                ))}    
            </div>   
        </>
    );
}

export default Home;