import React from 'react'
import DetailImg from '../component/detailImg'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DetailInfo from '../component/detailInfo'
export default function Detail() {
    const [data, setData] = useState()
    const {id} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/products/${id}`)
        .then((res)=> {setData(res.data.result[0]) }, err=> console.log(err))
    },[])

  return (
    <div>
         <div className='contain'>
            <div className='d-flex row'>
             <DetailImg data={data} />
             <DetailInfo data={data}/>
            </div>
        </div>
        
    </div>
  )
}
