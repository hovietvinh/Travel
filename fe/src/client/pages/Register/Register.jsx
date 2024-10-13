import React, { useState } from 'react';
import {Form, Input} from "antd"
import { Link, useNavigate } from 'react-router-dom';
import { UserRegisterApi } from '../../../utils/Client/api';
import toast from 'react-hot-toast';
function Register() {
    const [form] = Form.useForm();
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate()

    const handleFinish =async (e)=>{
        form.resetFields();
        setDisabled(true)
        const response = await UserRegisterApi(e)

        if(response.code==200){
            toast.success("Register successfully!")
            navigate("/login")

        }else{
            toast.error(response.message)
            setDisabled(false)
        }

        
       
        
    }
    return (
       <>
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64 w-full'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <Form form={form} onFinish={handleFinish} className=' mx-auto max-w-md '>
                    <Form.Item name={"userName"} rules={[{ required: true, message: 'Please input your name!' }]} >
                        <Input className='rounded-2xl' type='text' placeholder="Your name"/>
                    </Form.Item>
                    <Form.Item name={"email"}  rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input className='rounded-2xl' type='email' placeholder="Your@email.com"/>
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password className='rounded-2xl'  placeholder="Your password"/>
                    </Form.Item>
                    <Form.Item>
                        <button disabled={disabled} htmltype="submit" className='bg-[#f5385d] p-2 text-white rounded-2xl w-full'>Register</button>
                    </Form.Item>
                    
                </Form>
                <div className=' text-center text-gray-500'>
                    Already a member? <Link to="/login" className='underline text-black'>Login now</Link>
                </div>
            </div>
        </div>
       </>
    );
}

export default Register;