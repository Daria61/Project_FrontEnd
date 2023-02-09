import React from 'react'
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {

  const [data, setData]=useState();
  const [pro, setPro] = useState()
  const navigate = useNavigate()


  useEffect(()=>{

    if(!localStorage.getItem("name")){
      navigate("/sign")
    }
    
    axios.get('http://localhost:8080/api/user')
    .then(res => {
        setData(res.data.result)
    }, err =>{
        console.log(err);
    });
  },[])

  useEffect(()=>{
    axios.get('http://localhost:8080/api/products')
    .then(res => {
        setPro(res.data.result)
    }, err =>{
        console.log(err);
    });
  },[])

  
  return (
    <div style={{backgroundColor: "#F6E9FB"}} className="h-100">
      <div className='d-flex row justify-content-evenly'>
        <div className='col-8 row d-flex justify-content-evenly mt-3'>
          <div className='col-4'>
            <div className='m-2 rounded-4 p-4' style={{backgroundColor:"#D7FFB5 "}}>
              <div className='d-flex gap-4'>
                <div className='bg-white rounded p-2'>
                  <i className="bi bi-people fs-4"></i>
                </div>
              </div>
              <div className='d-flex gap-4 mt-2'>
              <h5>Users {data?.length}</h5>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='m-2 rounded-4 p-4' style={{backgroundColor:"#CCEFFF"}}>
            <div className='d-flex gap-4'>
                <div className='bg-white rounded p-2'>
                 <i className="bi bi-bag-heart fs-4"></i>
                </div>
              </div>
              <div className='d-flex gap-4 mt-2'>
              <h5>Products {pro?.length}</h5>
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='m-2 rounded-4 p-4' style={{backgroundColor:"#C8A0FF "}}>
            <div className='d-flex gap-4'>
                <div className='bg-white rounded p-2'>
                  <i className="bi bi-people fs-4"></i>
                </div>
              </div>
              <div className='d-flex gap-4 mt-2'>
              <h5>Users </h5>
              </div>
            </div>
          </div>
        </div>
        <div className='col-4'>
          <div className='bg-white rounded-4 h-100 w-100 mt-4 p-3'>
            <h5>Some Detail Information here</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

