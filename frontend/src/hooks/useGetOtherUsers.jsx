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
                const tokenCookie = document.cookie.split(';').find(cookie => cookie.startsWith('token='));
                console.log(tokenCookie);
                console.log(document.cookie);
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
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                
                // Store the retrieved users in Redux
                console.log("Other users -> ", res);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code that falls out of the range of 2xx
                    console.error("Server responded with an error:", {
                        status: error.response.status,
                        data: error.response.data,
                        headers: error.response.headers,
                    });
                    console.error("Response data:", error.response.data);
                    console.error("Response status:", error.response.status);
                    console.error("Response headers:", error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("No response received:", {
                        request: error.request,
                    });
                    console.error("Request data:", error.request);
                } else {
                    // Something happened in setting up the request that triggered an error
                    console.error("Error in setting up the request:", error.message);
                }
                console.error("Error config:", error.config);
            }
        };
        
        fetchOtherUsers();
    }, [dispatch]);
};

export default useGetOtherUsers;
