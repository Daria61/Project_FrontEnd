import React, { useState } from 'react'
import { useContext, useEffect } from 'react'
import { Filter } from '../contexthandle/contextCreate'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default function Showproducts() {
    const {filter} = useContext(Filter)
    const [data, setData] = useState()
    const [show, setShow] = useState()

    useEffect(()=>{
        axios.get("http://localhost:8080/api/products")
        .then((res)=> {setData(res.data.result); setShow(res.data.result)}, err=> console.log(err))
    },[])

    useEffect(()=>{
        if(filter ){
        const filted =  data?.filter((a)=> a.category?.includes(filter))
        setShow(filted)
        }else{
            setShow(data)
        }
    },[filter])


  return (
    <div className='mt-5 pt-5'>
        <div className='d-flex row '>
         {show?.map((a)=>{  
             return(
                 <div className='col-4 p-3'  >
                     <div style={{position:"relative"}}>
                        <NavLink to={`/shop/${a.id}`}>
                        <img src={a.img[0]? a.img[0] : require("../images/finger.png")} style={{objectFit: "cover", height: "350px"}} className="w-100" alt="pic"/>
                        </NavLink>
                     </div>
                     <div className='d-flex justify-content-between mt-2'>
                     <p>{a.productName}</p>
                     <p>{a.price}</p>
                     </div>
                 </div>
             )
         })}
     </div>
    </div>
  )
}
