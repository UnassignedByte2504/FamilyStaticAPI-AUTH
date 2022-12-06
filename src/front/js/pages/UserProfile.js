import React from 'react'
import { Link } from 'react'
import { useContext, useEffect, useState } from 'react'
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";
import { TextField, Box, Button, dividerClasses, CircularProgress } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";



export const UserProfile = () => {
    const Navigate = useNavigate()
    const token = sessionStorage.getItem('token');
    const {actions, store} = useContext(Context)
    const [user, setUser] = useState()

    useEffect (() => {
        if (!store.user_info) {
            actions.fetchUser(token)
            console.log('loading profile info')
        } else {
            console.log('user already in store')}
        
    }, [])
    useEffect (() => {
      setUser(store.user_info)
    }, [store.user_info])


    return (
        <div className="contentWrapper">
                <div className="BasicProfileCard">
                    <div className="ProfHeader">
                        <img src='https://avatars.dicebear.com/api/initials/4geeks.svg?r=50&backgroundColors[]=cyan'/>
                        <h1>{user?.first_name} {user?.last_name}</h1>
                        <hr/>
                    </div>
                   
                    <div className="ProfContact">
                        <h3>Contact info</h3>
                        <div className='userInfoContainer'><span className='Label'>Email address:</span><span className='Value'>{user?.email}</span></div>
                        <div className='userInfoContainer'><span className='Label'>Phone Number:</span><span className='Value'>{user?.contact}</span></div>
                    </div>
                    <div className='ProfInfo'>
                        <h3>About</h3>
                        <div className='userInfoContainer'><span className='Label'>Age: </span><span className='Value'>{user?.age} years old</span></div>
                        <div className='userInfoContainer'><span className='Label'>Address 1: </span><span className='Value'>{user?.address_1}</span></div>
                        <div className='userInfoContainer'><span className='Label'>Address 2: </span><span className='Value'>{user?.address_2 ? user.address_2 :"No info to display"}</span></div>
                    </div>
                </div>
        </div>

    )

}


export default UserProfile