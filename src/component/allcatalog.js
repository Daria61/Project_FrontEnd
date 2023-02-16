import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Filter } from '../contexthandle/contextCreate'
export default function Allcatalog() {
    const [cate , setCate] = useState()
    const {filter, setFilter} = useContext(Filter)

    useEffect(()=>{
        axios.get("http://localhost:8080/api/category")
        .then((res)=>setCate(res.data.result))
    }, [])

  return (
    <div className='d-flex row'>
        <div className='col'>
            <p onClick={()=>setFilter()} style={{color: !filter?  "#006EDD  " : "black" }} className="catehoverF">All</p>
        </div>
        {cate?.map((a)=>{
            return(
                <div className='col'>
                    <p onClick={()=>setFilter(a.id)} style={{color: filter? filter === a.id? "#006EDD  " : "black" : "black" }} className="catehoverF">{a.category}</p>
                </div>
            )
        })}
    </div>
  )
}
