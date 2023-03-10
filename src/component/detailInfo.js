import React from 'react'
import { UserLogin } from '../contexthandle/contextCreate'
import { useContext, useEffect } from 'react'
import axios from 'axios'

export default function DetailInfo({data}) {

  const {user, setUser} = useContext(UserLogin)
  const id = localStorage.getItem("id")


  useEffect(()=>{
    axios.get("http://localhost:8080/api/user")
    .then((res)=> {setUser(res.data.result.filter((a)=> a.id == id)); console.log(res.data.result.filter((a)=> a.id == id));},
     err=> console.log(err))
  },[])



  function  addlist  (){
   if(!localStorage.getItem("username") ){
    alert("Please log in first")
   } else{
    const arr = [...user[0].likes]
    arr.push(data.id)
    setUser({...user[0], likes : arr})
    sendData({...user[0], likes : arr})
   }
  }

  const sendData=(user)=>{
    console.log(user);
    axios.put("http://localhost:8080/api/user", user[0])
    .then((res)=> setUser(res.data.result), err=> console.log(err))
  }

  return (
    <div className='col-md-6 ps-5 mt-3'>
        <h1>{data?.productName}</h1>
        <p className='pt-3'> Color : {data?.color}</p>
        <p className='pt-3'>Feature : {data?.feature}</p>
        <p className='pt-3'>Sale : {data?.salePrecent}%</p>
        <p className='pt-3 pb-3' style={{fontSize: "30px"}}>{data?.price}</p>
        <button onClick={addlist} style={{"backgroundColor": "black", "color": "white", "padding": "10px 20px" ,"border": 0}} >ADD TO BAG</button>
    </div>
  )
}
