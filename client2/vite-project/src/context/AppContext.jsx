import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";


export const AppContext = createContext()

export const AppContextProvider = (props) =>{

    const backendURL = import.meta.env.BACKEND_URL

    const [isLoggedin,setIsLoggedin] = useState(false)
    const [userData,setUserData] = useState('')

    const backend = 'http://localhost:4848'
   

    const getAuthState = async() =>{
        try {
            const {data} = await axios.get(backend + '/api/auth/isauthenticated')

            if(data.success){
                setIsLoggedin(true)
                getUserData()
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const getUserData = async() =>{
        try {
            const {data} = await axios.get(backend + '/api/user/data')
            console.log(data)

            data.success? setUserData(data.getUserData) : toast.error(data.message)
            console.log("userdata is"+userData)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = async() =>{
        try {
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(backend + '/api/auth/logout')
            data.success && setIsLoggedin(false)
            data.success && setUserData('')
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getAuthState();
    },[])

    const value = {
        backendURL,
        isLoggedin,setIsLoggedin,
        userData,setUserData,
        getUserData,
        logout
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}