import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect , useContext} from 'react'
import { UserLogin } from '../contexthandle/contextCreate'
export default function Profile() {

    const navigate = useNavigate()
    const {user, setUser} = useContext(UserLogin)

    useEffect(()=>{
        if(!localStorage.getItem("username")){
            navigate("/login")
        }
    },[])

  return (
    <div className='m-4' style={{height: "500px"}}>
        <div className='d-flex gap-2 align-items-baseline'>
        <i class="bi bi-person-circle fs-4"></i>
        <h5>{user?.name}</h5>
        </div>
        <p>Name : {user?.name}</p>
        <p>Email : {user?.email}</p>
        <p>Phone : {user?.phone}</p>
    </div>
  )
}
