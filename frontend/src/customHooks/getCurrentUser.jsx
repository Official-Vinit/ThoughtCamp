import { useEffect } from "react"
import { serverUrl } from "../App"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setUserData, setAuthReady } from "../redux/userSlice"
const getCurrentUser = ()=>{
    let dispatch = useDispatch()
   
    useEffect(()=>{
        const fetchUser = async () => {
            try {
                let result = await axios.get(serverUrl + "/api/user/currentuser" , {withCredentials:true})
                dispatch(setUserData(result.data))
                dispatch(setAuthReady(true))

            } catch (error) {
                console.log(error)
                dispatch(setUserData(null))
                dispatch(setAuthReady(true))
            }
        }
        fetchUser()
    },[dispatch])
}

export default getCurrentUser