import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { UserLogin } from '../contexthandle/contextCreate'

export default function Wallet() {

  const [data, setData] = useState()
  const {user , setUser} = useContext(UserLogin)
  const id = localStorage.getItem("id")

  useEffect(()=>{
    axios.get("http://localhost:8080/api/products")
    .then((res)=> setData(res.data.result), err=> console.log(err))
  }, [])

  useEffect(()=>{
    axios.get("http://localhost:8080/api/user")
    .then((res)=> {setUser(res.data.result.filter((a)=> a.id == id)); console.log(res.data.result.filter((a)=> a.id == id));},
     err=> console.log(err))

  },[])



  return (
    <div className='text-center'>
      {data?.map((a)=> {
        if(user[0]?.likes.includes(a.id)){
          return(
            <div>
              <p>{a.productName}</p>
            </div>
          )
        }
      })}
      <p></p>
    </div>
  )
}
