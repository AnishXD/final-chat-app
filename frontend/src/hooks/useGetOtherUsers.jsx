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
                // Remove token extraction since it's not needed
                // let tokenCookie = document.cookie;
                // let token = tokenCookie.split('=')[1] || null;
                
                console.log('Fetching users without token');
                
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
                    console.error("Server responded with an error:", {
                        status: error.response.status,
                        data: error.response.data,
                        headers: error.response.headers,
                    });
                } else if (error.request) {
                    console.error("No response received:", {
                        request: error.request,
                    });
                } else {
                    console.error("Error in setting up the request:", error.message);
                }
                console.error("Error config:", error.config);
            }
        };

        fetchOtherUsers();
    }, [dispatch]);
};

export default useGetOtherUsers;
