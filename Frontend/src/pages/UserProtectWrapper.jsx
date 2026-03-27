import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const UserProtectWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token')

    const navigate = useNavigate()

    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setUser(response.data)
            }
        }).catch((error) => {
            console.log(error)
            localStorage.removeItem('token')
            navigate('/login')
        }).finally(() => {
            setIsLoading(false)
        })
    }, [token, navigate])

    if (isLoading) {
        return (
            <div>Loading...</div>
        ); // or a spinner
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default UserProtectWrapper

