import React from 'react';
import { NavLink } from 'react-router-dom';
import {UserOutlined,UnorderedListOutlined,HomeOutlined} from "@ant-design/icons"


function NavUser() {
    return (
        <>
            <nav className='flex mt-8 gap-2 sm:gap-4 w-full justify-center mb-8'>
                <NavLink  to="/user/profile" 
                    className={({ isActive }) =>
                    `text-[12px] sm:text[18px] py-2 inline-flex gap-1 transition duration-300 px-4 rounded-full ${isActive ? "rounded-full bg-[#f5385d] text-white " : 'bg-gray-200'}`
                    }>
                    <UserOutlined />
                    My profile
                    </NavLink>
                <NavLink to="/user/bookings" 
                    className={({ isActive }) =>
                    `text-[12px] sm:text[18px] py-2 px-4 inline-flex gap-1   transition duration-300 rounded-full ${isActive ? "rounded-full bg-[#f5385d] text-white " : 'bg-gray-200'}`
                    }>
                    <UnorderedListOutlined />
                    My bookings</NavLink>
                <NavLink to="/user/places" 
                className={({ isActive }) =>
                `text-[12px] sm:text[18px] py-2 px-4 inline-flex gap-1   transition duration-300 rounded-full ${isActive ? " bg-[#f5385d] text-white " : 'bg-gray-200'}`
                }>
                    <HomeOutlined />
                    My accommodations</NavLink>
            </nav>
        </>
    );
}

export default NavUser;