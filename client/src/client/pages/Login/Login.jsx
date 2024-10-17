import React, { useState } from 'react';
import {Form, Input} from "antd"
import { Link, Navigate } from 'react-router-dom';
import { UserLoginApi } from '../../../utils/Client/api';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../../../redux/client/actions/UserAction';
function Login() {
    const [form] = Form.useForm()
    const [redirect,setDerirect] = useState(false)
    const [disabled,setDisabled] = useState(false)
    const dispatch = useDispatch()
    
    const handleFinish = async(e)=>{
        form.resetFields()
        setDisabled(true)
        const res = await UserLoginApi(e);
        if(res.code==200){
            toast.success("Login successfully!")
            dispatch(setUserAction(res.data))
            setDerirect(true)
        }
        else{
            toast.error(res.message)
            setDisabled(false)
        }

       
    }
    if(redirect){
        return <Navigate to="/user/profile"/>
    }

    return (
       <>
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64 w-full'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <Form form={form} onFinish={handleFinish} className=' mx-auto max-w-md '>
                    <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                        <Input className='rounded-2xl' type='email' placeholder="your@email.com"/>
                    </Form.Item>
                    <Form.Item name={"password"}  rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password className='rounded-2xl' type='password' placeholder="your password"/>
                    </Form.Item>
                    <Form.Item>
                        <button disabled={disabled} htmltype="submit" className={`bg-[#f5385d] p-2 text-white rounded-2xl w-full ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>Login</button>
                    </Form.Item>
                    
                </Form>
                <div className=' text-center text-gray-500'>
                    Don't have an account yet? <Link to="/register" className='underline text-black'>Register now</Link>
                </div>
            </div>
        </div>
       </>
    );
}

export default Login;