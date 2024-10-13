import React, { useState } from 'react';
import {PlusOutlined,CloudUploadOutlined,WifiOutlined,CarOutlined,DesktopOutlined,SmileOutlined,LeftSquareOutlined,LaptopOutlined} from "@ant-design/icons"
import { Link, useParams } from 'react-router-dom';
import { Checkbox, Form, Image, Input, TimePicker} from 'antd';
import toast from "react-hot-toast"
import moment from 'moment';
import { uploadByLinkApi } from '../../../utils/Client/api';
function Place() {
    const {action} = useParams();

    const [disableButton,setDisableButton] = useState(false)

    const [photosByLink,setPhotosByLink] = useState([]);
    const [linkPhoto,setLinkPhoto] = useState('');

    const addPhotoByLink = async()=>{
        setDisableButton(true);
        if(!linkPhoto){
            toast.error("Please enter a valid image URL")
        }
        else{
            const res = await uploadByLinkApi({ imageUrl: linkPhoto})
            setLinkPhoto('');
            if(res.code==200){
                setPhotosByLink([...photosByLink,res.data.url])
                setDisableButton(false)
    console.log(disableButton)
                
            }
            else{
                toast.error(res.message)
                setDisableButton(false)
    console.log(disableButton)

            }
            
        }
    }
    console.log(disableButton)

    const handleDelete = (e)=>{
        const updatedPhotos = photosByLink.filter((item) => item !== e);
        setPhotosByLink(updatedPhotos);
    }


    const handleFinish = (e)=>{
        console.log(e)
    }
    return (
        <>  
            {action !=="new" && (
                <>
                    <div className='text-center'>
                        <Link to="/user/places/new" className='inline-flex py-2 px-6 bg-[#f5385d] rounded-full text-white gap-1'>
                            <PlusOutlined />
                            Add new place

                        </Link>
                    </div>    
                </>
            )}

            {action ==="new" && (
                <>
                    <div>
                        <Form
                            layout='vertical'
                            onFinish={handleFinish}
                            initialValues={{maxGuests: 1,checkIn: moment('14:00', 'HH:mm'),checkOut: moment('12:00', 'HH:mm')}}
                        >
                            <Form.Item
                                label={
                                    <div>
                                        <h2 className='text-xl mt-4'>Title</h2>
                                        <p className='text-sm text-gray-500'>title for your place, should be short and catchy as in advertisement</p>
                                    </div>
                                }
                                name="title"
                                rules={[
                                    {
                                      required: true,
                                      message: 'Please input a title for your place!',
                                    },
                                  ]}
                            >
                                <Input className='rounded-2xl' placeholder='For example: My love apt'/>
                            </Form.Item>

                            <Form.Item
                            rules={[
                                {
                                  required: true,
                                  message: 'Please input a address for your place!',
                                },
                              ]}
                                label={
                                    <div>
                                        <h2 className='text-xl '>Addres</h2>
                                        <p className='text-sm text-gray-500'>Address to this place</p>
                                    </div>
                                }
                                name="address"
                            >
                                <Input className='rounded-2xl' placeholder='Address'/>
                            </Form.Item>

                            <div className='mb-3'>
                                <h2 className='text-xl'>Photos</h2>
                                <p className='text-sm text-gray-500'>more = better</p>
                            </div>
                            <div className='flex gap-2 mb-4'> 
                                    <Input value={linkPhoto}  onChange={(e) => setLinkPhoto(e.target.value)}  className='rounded-2xl' type='text' placeholder='Add using a link ....jpg'/>
                                    <button onClick={addPhotoByLink} disabled={disableButton} className={`bg-gray-200 px-4 rounded-2xl ${disableButton ? 'cursor-not-allowed' : 'cursor-pointer'}`} dangerouslySetInnerHTML={{
    __html: disableButton ? "Loading..." : "Add&nbsp;photo",
  }}/>
                            </div>
{/* 
                            <Form.Item
                                label={
                                    <div>
                                        <h2 className='text-xl'>Photos</h2>
                                        <p className='text-sm text-gray-500'>more = better</p>
                                    </div>
                                }
                                name="photo_link"
                            >
                                
                                <div className='flex gap-2'> 
                                    <Input className='rounded-2xl' type='text' placeholder='Add using a link ....jpg'/>
                                    <button className=' bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
                                </div>
                            </Form.Item> */}


                            <div className='grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 mb-4'>
                                {photosByLink.length>0 && photosByLink.map(item=>(
                                     <div className='relative inline-block'>
                                        <Image
                                        src={item}
                                        className="rounded-2xl"
                                        />
                                        <span onClick={()=>{handleDelete(item)}} className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center text-white bg-red-500 rounded-full cursor-pointer hover:bg-red-700 transition duration-300">
                                            X
                                        </span>
                                     </div>
                                ))}
                                <button className='flex justify-center items-center gap-2 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
                                    <CloudUploadOutlined />
                                    Upload
                                </button>
                            </div>

                            <Form.Item
                                label={
                                    <div>
                                        <h2 className='text-xl '>Description</h2>
                                        <p className='text-sm text-gray-500'>Description of this place</p>
                                    </div>
                                }
                                name="description"
                            >
                                <Input.TextArea rows={5} className='rounded-2xl' placeholder=''/>
                            </Form.Item>

                            <Form.Item
                            
                                label={
                                    <div>
                                        <h2 className='text-xl '>Perks</h2>
                                        <p className='text-sm text-gray-500'>Select all the perks of your place</p>
                                    </div>
                                }
                                name="perks"
                            >
                                <Checkbox.Group>
                                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2'>
                                        <Checkbox className='border p-4 flex rounded-2xl gap-2 items-center'  value="wifi">
                                            <WifiOutlined className='mr-2'/>
                                            <span>Wifi</span>
                                        </Checkbox>
                                        <Checkbox className='border p-4 flex rounded-2xl gap-2 items-center' value="a">
                                            <CarOutlined className='mr-2'/>
                                            <span>Free parking spot</span>
                                        </Checkbox>
                                        <Checkbox className='border p-4 flex rounded-2xl gap-2 items-center' value="b">
                                            <DesktopOutlined className='mr-2'/>
                                            <span>TV</span>
                                        </Checkbox>
                                        <Checkbox className='border p-4 flex rounded-2xl gap-2 items-center' value="c">
                                            <LaptopOutlined className='mr-2'/>
                                            <span>Laptop</span>
                                        </Checkbox>
                                        <Checkbox className='border p-4 flex rounded-2xl gap-2 items-center' value="d">
                                            <SmileOutlined className='mr-2'/>
                                            <span>Pets</span>
                                        </Checkbox>
                                        <Checkbox className='border p-4 flex rounded-2xl gap-2 items-center' value="e">
                                            <LeftSquareOutlined className='mr-2' />
                                            <span>Private entrance</span>
                                        </Checkbox>
                                    </div>
                                </Checkbox.Group>
                            </Form.Item>

                                
                            <Form.Item
                                label={
                                    <div>
                                        <h2 className='text-xl '>Extra Info</h2>
                                        <p className='text-sm text-gray-500'>House rules,etc </p>
                                    </div>
                                }
                                name="extraInfo"
                            >
                                <Input.TextArea rows={3} className='rounded-2xl' placeholder=''/>
                            </Form.Item>

                            <div>
                                <h2 className='text-xl '>Check in&out times</h2>
                                <p className='text-sm text-gray-500'>Add check in and out times, remember to have some time window for clearing the room between guests </p>
                            </div>
                            <div className='grid sm:grid-cols-3 gap-2'>
                                <Form.Item
                                    label="Check in time"
                                    className='mb-0 pb-0'
                                    name="checkIn"
                                >
                                    
                                    <TimePicker format="HH:mm" placeholder='14:00' className='rounded-2xl w-full' />
                                </Form.Item>
                                <Form.Item
                                    label="Check out time"
                                    name="checkOut"
                                >
                                    <TimePicker format="HH:mm" placeholder='12:00' className='rounded-2xl w-full' />

                                </Form.Item>
                                <Form.Item
                                    label="Max number of guests"
                                    name="maxGuests"
                                >
                                    <Input type='number' min={1}  className='rounded-2xl' />
                                </Form.Item>

                                
                            </div>
                            <Form.Item>
                                <button htmltype="submit" className='bg-[#f5385d] p-2 rounded-2xl w-full text-center text-white'>Save</button>
                            </Form.Item>
                        </Form>
                    </div>    
                </>
            )}



        </>
    );
}

export default Place;