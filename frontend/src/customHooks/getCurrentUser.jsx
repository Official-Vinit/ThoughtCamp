import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../redux/userSlice'
import axios from "axios"

const useCurrentUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(serverUrl + "/api/user/getcurrentuser", { withCredentials: true })
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error.message);
                dispatch(setUserData(null))
            }
        }
        fetchUser()
    }, [dispatch])
}

export default useCurrentUser