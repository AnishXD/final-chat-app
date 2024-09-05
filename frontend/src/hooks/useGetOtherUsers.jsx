import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from '..';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                
                const tokenCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('token='));
                let token = null;
                if (tokenCookie) {
                    token = tokenCookie.split('=')[1];
                } else {
                    throw new Error('Token not found');
                }
                console.log('All Cookies:', document.cookie);
                console.log('Token Cookie:', tokenCookie);
                console.log('Extracted Token:', token);
                axios.defaults.withCredentials = true;
                
                const res = await axios.get(`${BASE_URL}/api/v1/user`, {
                  withCredentials: true,
                     headers: {
                  "Content-Type": "application/json",
                }// Ensure cookies are sent with this request
                         });
                // store
                console.log("other users -> ",res);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    }, [])

}

export default useGetOtherUsers
