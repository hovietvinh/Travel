import React, { useEffect, useState } from 'react';
import {CloudUploadOutlined,WifiOutlined,StarOutlined,CarOutlined,DesktopOutlined,SmileOutlined,StarFilled,LeftSquareOutlined,LaptopOutlined} from "@ant-design/icons"
import {  useNavigate, useParams } from 'react-router-dom';
import { Checkbox, Form, Image, Input, TimePicker} from 'antd';
import toast from "react-hot-toast"
import moment from 'moment';
import { addPlaceApi, getPlaceByIdApi, updatePlaceApi, uploadByFilesApi, uploadByLinkApi } from '../../utils/Client/api';
function FormAddPlace() {
    const navigate = useNavigate()
    const {id} = useParams()

    const [disableButton,setDisableButton] = useState(false)
    const [form] = Form.useForm()
    const [photosByLink,setPhotosByLink] = useState([]);
    const [linkPhoto,setLinkPhoto] = useState('');

    const fetchId = async()=>{
        if(id){
            
            const res = await getPlaceByIdApi(id)
            if(res.code==200){
                res.data.checkIn = moment(res.data.checkIn, 'HH:mm'); 
                res.data.checkOut = moment(res.data.checkOut, 'HH:mm');
                form.setFieldsValue(res.data)
                setPhotosByLink(res.data.photos)
            }
            else{
                toast.error(res.message)
            }
        }
        else{
            const initialValues={pricePerNight:1,maxGuests: 1,checkIn: moment('14:00', 'HH:mm'),checkOut: moment('12:00', 'HH:mm')}
            form.setFieldsValue(initialValues)
        }
    }
    useEffect(()=>{
        fetchId()
        
    },[id])

    const addPhotoByLink = async()=>{
        setDisableButton(true);
        if(!linkPhoto){
            toast.error("Please enter a valid image URL")
            setDisableButton(false)
            return;
        }
        else{
            const res = await uploadByLinkApi({ imageUrl: linkPhoto})
            setLinkPhoto('');
            if(res.code==200){
                setPhotosByLink([...photosByLink,res.data.url])
                setDisableButton(false)
                
            }
            else{
                toast.error(res.message)
                setDisableButton(false)
   

            }
            
        }
    }
    const handleLabelClick = (event) => {
        // Prevent clicking the label if the button is disabled
        if (disableButton) {
            event.preventDefault(); // Prevent default action
            return; // Exit the function
        }
      
        
        // Trigger the file input click
        
    };
    

    const handleDelete = (e)=>{
        const updatedPhotos = photosByLink.filter((item) => item !== e);
        setPhotosByLink(updatedPhotos);
    }


    const handleFinish = async(e)=>{
        if(!id){
            setDisableButton(true)
            e.photos = photosByLink
           

            if (e.checkIn) {
                e.checkIn = e.checkIn.format('HH:mm'); // Convert to 'HH:mm' format string
            }
            
            if (e.checkOut) {
                e.checkOut = e.checkOut.format('HH:mm'); // Convert to 'HH:mm' format string
            }

            const res = await addPlaceApi(e);
            if(res.code==200){
                setDisableButton(false)
                toast.success("Create place successfully!")
                navigate("/user/places")
            }
            else{
                setDisableButton(false)
                // console.log(res)
                toast.error("Failed to create place!")
            }
        }
        else{
            setDisableButton(true)
            e.photos = photosByLink
            if (e.checkIn) {
                e.checkIn = e.checkIn.format('HH:mm'); // Convert to 'HH:mm' format string
            }
            
            if (e.checkOut) {
                e.checkOut = e.checkOut.format('HH:mm'); // Convert to 'HH:mm' format string
            }
            const res = await updatePlaceApi(e,id);
            if(res.code==200){
                setDisableButton(false)
                toast.success(res.message)
                navigate("/user/places")
            }
            else{
                setDisableButton(false)
                // console.log(res)
                toast.error(res.message)
            }
        }

        
        
        
    }
    const uploadPhoto =async (e)=>{
        if(e.target.files.length>0){
            setDisableButton(true)
            const files = e.target.files
            const data = new FormData();
            for(let i=0;i<files.length;i++){
                data.append("photos",files[i]);
            }
            const res = await uploadByFilesApi(data);
            if(res.code==200){
                const newImg = res.data.map(item=>item.url)
                setPhotosByLink([...photosByLink,...newImg])
                // console.log(res.data);
            }
            setDisableButton(false)
        }
    }

    const mainPhotos = (item)=>{
       
        const linkWithouSeletected = photosByLink.filter(link=>link!=item);
        setPhotosByLink([item,...linkWithouSeletected]);
    }


    return (
        <>
            <div>
                <Form
                    layout='vertical'
                    onFinish={handleFinish}
                    form={form}
                   
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
                            <button onClick={addPhotoByLink} disabled={(linkPhoto.length==0 || disableButton)} className={`bg-gray-200 px-4 rounded-2xl ${(disableButton || linkPhoto.length==0) ? 'cursor-not-allowed' : 'cursor-pointer'}`} dangerouslySetInnerHTML={{
                                __html: disableButton ? "Loading..." : "Add&nbsp;photo",
                            }}/>
                    </div>

                    
                    <div className='grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 mb-4 transition duration-300'>
                        {photosByLink.length>0 && photosByLink.map((item,index)=>(
                                <>
                                    {index===0 && (
                                        <div className='relative flex ' key={index}>
                                            <Image
                                            src={item}
                                            className="rounded-2xl w-full object-cover"
                                            />
                                            <span onClick={()=>{handleDelete(item)}} className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center text-white bg-red-500 rounded-full cursor-pointer hover:bg-red-700 transition duration-300">
                                                X
                                            </span>
                                            <StarFilled onClick={()=>{mainPhotos(item)}} className='cursor-pointer absolute bottom-1 left-1 text-white bg-black p-1  bg-opacity-50 rounded-2xl py-2 px-3 hover:bg-opacity-80 transition duration-300' />
                                        </div>
                                        
                                    )}

                                    {index!==0 && (
                                        <div className='relative flex ' key={index}>
                                        <Image
                                        src={item}
                                        className="rounded-2xl w-full object-cover"
                                        />
                                        <span onClick={()=>{handleDelete(item)}} className="absolute top-0 right-0 w-6 h-6 flex items-center justify-center text-white bg-red-500 rounded-full cursor-pointer hover:bg-red-700 transition duration-300">
                                            X
                                        </span>
                                        <StarOutlined onClick={()=>{mainPhotos(item)}} className='cursor-pointer absolute bottom-1 left-1 text-white bg-black p-1  bg-opacity-50 rounded-2xl py-2 px-3 hover:bg-opacity-80 transition duration-300' />
                                    </div>
                                 
                                    )}
                                </>
                                
                        ))}
                        
                        <label
                            onClick={handleLabelClick}
                            className={`flex justify-center items-center gap-2 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 ${disableButton ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <input
                                multiple
                                type="file"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={uploadPhoto}
                                id="file-upload"
                            />
                            <CloudUploadOutlined />
                            {disableButton?"Loading...":"Upload"}
                        </label>
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
                                <Checkbox className='border p-4 flex rounded-2xl gap-2 items-center' value="free-parking">
                                    <CarOutlined className='mr-2'/>
                                    <span>Free parking spot</span>
                                </Checkbox>
                                <Checkbox className='border p-4 flex rounded-2xl gap-2 items-center' value="tv">
                                    <DesktopOutlined className='mr-2'/>
                                    <span>TV</span>
                                </Checkbox>
                                <Checkbox className='border p-4 flex rounded-2xl gap-2 items-center' value="laptop">
                                    <LaptopOutlined className='mr-2'/>
                                    <span>Laptop</span>
                                </Checkbox>
                                <Checkbox className='border p-4 flex rounded-2xl gap-2 items-center' value="pets">
                                    <SmileOutlined className='mr-2'/>
                                    <span>Pets</span>
                                </Checkbox>
                                <Checkbox className='border p-4 flex rounded-2xl gap-2 items-center' value="private-entrance">
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
                    <div className='grid sm:grid-cols-4 gap-2'>
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
                        <Form.Item
                            label="Price per night ($)"
                            name="pricePerNight"
                        >
                            <Input type='number' min={1}  className='rounded-2xl' />
                        </Form.Item>

                        
                    </div>
                    <Form.Item>
                        <button disabled={disableButton} htmltype="submit" className={`bg-[#f5385d] p-2 rounded-2xl w-full text-center text-white ${disableButton? `cursor-not-allowed opacity-50`:`cursor-pointer`}`}>Save</button>
                    </Form.Item>
                </Form>
            </div>  
        
        </>
    );
}

export default FormAddPlace;