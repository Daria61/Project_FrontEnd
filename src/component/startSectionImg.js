import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function StartSectionImg() {

  const [data, setData] = useState()

  useEffect(()=>{
    axios.get("http://localhost:8080/api/design")
    .then((data)=> {setData(data.data.result); console.log(data.data.result);}, err=> console.log(err))
},[])

  return (
    <div className='d-flex row '>
        <img  className='col-6' style={{objectFit: "cover"}} src={ data?.home[0]} alt="coach"/>
        <img  className='col-6' style={{objectFit: "cover"}} src={ data?.home[1]} alt="coach"/>
    </div>
  )
}
