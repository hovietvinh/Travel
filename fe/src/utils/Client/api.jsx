import Login from "../../client/pages/Login/Login";
import axios from "../axios.customize";
const UserRegisterApi = async (data)=>{
    try {
        // console.log(1);
        const URL_LOGIN =`/api/users/register`
        // console.log(URL_LOGIN);
        const response = await axios.post(URL_LOGIN,data)
        return response
    } catch (error) {
        return {
            code:400,
            message: "Error in axios"
        }
    }
} 

const UserLoginApi = async (data)=>{
    try {
        // console.log(1);
        const URL_LOGIN =`/api/users/login`
        // console.log(URL_LOGIN);
        const response = await axios.post(URL_LOGIN,data)
        console.log(response)
        return response
    } catch (error) {
        return {
            code:400,
            message: "Error in axios"
        }
    }
} 

const getProfileUserApi = async ()=>{
    try {
        // console.log(1);
        const URL_LOGIN =`/api/users/profile`
        // console.log(URL_LOGIN);
        const response = await axios.get(URL_LOGIN)
        // console.log(response)
        return response
    } catch (error) {
        return {
            code:400,
            message: "Error in axios"
        }
    }
}


const logoutUserApi = async ()=>{
    try {
        // console.log(1);
        const URL_LOGIN =`/api/users/logout`
        // console.log(URL_LOGIN);
        const response = await axios.post(URL_LOGIN)
        
        console.log(response)
        return response
    } catch (error) {
        return {
            code:400,
            message: "Error in axios"
        }
    }
}

const uploadByLinkApi = async(data)=>{
    try {
        // console.log(1);
        const URL_LOGIN =`/api/users/upload-by-link`
        // console.log(URL_LOGIN);
        const response = await axios.post(URL_LOGIN,data)
        
        console.log(response)
        return response
    } catch (error) {
        return {
            code:400,
            message: "Error in axios"
        }
    }
}

export {
    UserRegisterApi,
    UserLoginApi,
    getProfileUserApi,
    logoutUserApi,
    uploadByLinkApi
}