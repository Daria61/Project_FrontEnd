import React from 'react'
import { useEffect, useContext } from 'react'
import { UserLogin } from '../contexthandle/contextCreate'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Settings() {
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserLogin)
    const id = localStorage.getItem("id")

    useEffect(()=>{
        axios.get("http://localhost:8080/api/user")
        .then((res)=> {setUser(res.data.result.filter((a)=> a.id == id)); console.log(res.data.result.filter((a)=> a.id == id));},
         err=> console.log(err))
      },[])

    useEffect(()=>{
        if(!localStorage.getItem("username")){
            navigate("/login")
        }
    },[])

  return (
    <div className='m-4' style={{height: "500px"}}>
        <div className='d-flex gap-2 align-items-baseline'>
        <i class="bi bi-person-circle fs-4"></i>
        <h5>{user[0]?.name}</h5>
        </div>
        <div className='d-flex row justify-content-end align-items-baseline mb-4'>
            <p className='col-1 text-end'>Name</p>
            <input type="text" value={user[0]?.name} className="col-6 p-1" />
        </div>
        <div className='d-flex row justify-content-end align-items-baseline mb-4'>
            <p className='col-1 text-end'>Email</p>
            <input type="text" value={user[0]?.email} className="col-6 p-1" />
        </div>
        <div className='d-flex row justify-content-end align-items-baseline mb-4'>
            <p className='col-1 text-end'>Phone</p>
            <input type="text" value={user[0]?.phone} className="col-6 p-1" />
        </div>
        <div className='d-flex row justify-content-end align-items-baseline mb-4'>
            <p className='col-2 text-end '>Password</p>
            <input type="password" placeholder='Password' value={user[0]?.password} className="col-6 p-1" />
        </div>
    </div>
  )
}
