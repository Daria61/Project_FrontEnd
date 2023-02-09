import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Catalog() {

    const [pro, setPro] = useState()
    const [cate , setCate] = useState()

    useEffect(()=>{
        axios.get("http://localhost:8080/api/products")
        .then((res)=>setPro(res.data.result))
    }, [])

    useEffect(()=>{
        axios.get("http://localhost:8080/api/category")
        .then((res)=>setCate(res.data.result.map((a)=> a.category === "Women")))
    }, [])

  return (
    <div className='mt-5 mb-5'>
        <h3 style={{fontWeight: 400}}>CATALOG</h3>
    </div>
  )
}
