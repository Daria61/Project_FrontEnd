import React, { useEffect, useState,  useContext } from 'react'
import axios from 'axios'
import {NavLink} from "react-router-dom"
import {Filter} from "../contexthandle/contextCreate"
export default function Catalog() {

  const [data, setData] = useState()
  const {filter, setFilter} = useContext(Filter)

    useEffect(()=>{
        axios.get("http://localhost:8080/api/design")
        .then((res)=>setData(res.data.result))
    }, [])

    
  return (
    <div className='mt-5 mb-5'>
        <h3 style={{fontWeight: 400}}>CATALOG</h3>
        <div className='d-flex row'>
          <div style={{position:"relative"}} className='col-md-6'>
            <img className='w-100' style={{height: "500px", objectFit: "cover"}} src={require("../images/secondwoman.jpeg")} alt="women"/>
              <NavLink to="/shop"  onClick={()=> setFilter("0af51716-d781-4832-93f6-542087bf2879")}>
              <button className='button'>Women's</button>
              </NavLink>
          </div>
          <div style={{position:"relative"}} className='col-md-6'>
            <img className='w-100' style={{height: "500px", objectFit: "cover"}} src={require("../images/third.jpeg")} alt="men"/>
            <NavLink to="/shop" onClick={()=> setFilter("b1f2eb1d-b81a-462d-ae77-2372ea3fb1ea")}>
            <button  className='button'>Men's</button>
            </NavLink>
          </div>
        </div>
    </div>
  )
}
