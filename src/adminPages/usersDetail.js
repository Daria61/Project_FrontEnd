import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function UsersDetail() {
    const {id} = useParams()
    const [data, setData] =useState([])
    const [editedUser, setEditedUser] = useState([])
    const [editModal, setEditModal] = useState(false)
    const dis = editModal? "block" : "none"
    const navigate = useNavigate()

    if(!localStorage.getItem.name){
      navigate("/sign")
    }

    const getData=()=>{
      if(!localStorage.getItem("name")){
        navigate("/sign")
      }
      
      axios.get(`http://localhost:8080/api/user/${id}`)
      .then(res=> {
       setData(res.data.result[0])
       }, err=> {
           console.log(err)
       }
       )
    }

    const saveEdit = ()=>{
      console.log(editedUser);
      if(editedUser.name.length !==0 && editedUser.phone.length !== 0 && editedUser.email.length !== 0 ){
        axios.put(`http://localhost:8080/api/user`, 
        editedUser
      )
      .then(res => {
        setData(res.data.result)
        getData()
      }, err=>{
        alert("Дахин оролдоно уу"); 
        console.log(err);
      })

      getData()
      setEditModal(!editModal)
      setEditedUser([])
      } else{
        alert("Please fill all form")
      }
    }

    const EditUsers = (id)=>{
      axios.get(`http://localhost:8080/api/user/${id}`)
      .then(res => {
        setEditedUser(res.data.result[0]);
      }, err=>{
        alert("Дахин оролдоно уу"); 
        console.log(err);
      })
      setEditModal(!editModal)
    }
    
  return (
    <div className="h-100">
      <div  style={{backgroundColor: "#85C1E9"}} className="h-100 d-flex justify-content-center"> 
      <div className='rounded-4 bg-white w-50 p-5 mt-4 h-75 text-center' style={{position: "relative"}}>
      <i className="bi bi-pencil-square" style={{position: "absolute" , top: "30px", right: "50px"}} onClick={()=>EditUsers(id)}></i>
        <img style={{width: "200px", height:"200px", borderRadius: "100px", objectFit: "cover"}} src={data?.img} alt="profile" />
      <div className='text-start d-flex justify-content-center mt-4'>
      <div>
      <p style={{fontSize:"20px", fontWeight: "500"}}>User Name : {data?.name}</p> 
      <p style={{fontSize:"20px", fontWeight: "500"}}>ID : {data?.id}</p>
      <p style={{fontSize:"20px", fontWeight: "500"}}>Email : {data?.email}</p>
      <p style={{fontSize:"20px", fontWeight: "500"}}>Phone : {data?.phone}</p>
      </div>
      </div>
      </div>
      </div>
      <div className="modal justify-content-center" onClick={saveEdit} style={{display: dis}}>
               <div className="modal-body rounded" onClick={(e)=> e.stopPropagation()}>
               <div className="closeBtn text-end" onClick={saveEdit}><i class="bi bi-x-lg"></i></div>
               <h4>Edit user detail information</h4>
               <div>
                <p className='text-start m-1'>Name<span className='text-danger'>*</span></p>
                <input type="text" value={editedUser?.name} className="form-control" onChange={(e)=> setEditedUser({...editedUser, name : e.target.value})}/>
               </div>
               <div>
                <p className='text-start m-1'>Email<span className='text-danger'>*</span></p>
                <input type="text" value={editedUser?.email} className="form-control" onChange={(e)=> setEditedUser({...editedUser, email : e.target.value})}/>
               </div>
               <div>
                <p className='text-start m-1'>Phone<span className='text-danger'>*</span></p>
                <input type="text" value={editedUser?.phone} className="form-control" onChange={(e)=> setEditedUser({...editedUser, phone : e.target.value})}/>
               </div>
               <button style={{border:"0", borderRadius:"20px", padding :"8px 80px", color:"white", backgroundColor:"black ", marginTop: "20px"}} onClick={()=>saveEdit()}>Save edit</button>
            </div>
        </div>
    </div>
  )
}
