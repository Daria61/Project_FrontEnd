import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function AdminUsers() {
    const [Indata, setData]=useState();
    const [editedUser, setEditedUser] = useState([])
    const [editModal, setEditModal] = useState(false)
    const navigate = useNavigate()


    const dis = editModal? "block" : "none"
    useEffect(()=>{
      if(!localStorage.getItem("name")){
        navigate("/sign")
      }
      
      axios.get('http://localhost:8080/api/user')
      .then(res=> {
          setData(res.data.result)
      }, err =>{
          console.log(err);
      });
    },[])

    const DeleteUser=(id)=>{
      axios.delete(`http://localhost:8080/api/user/${id}`)
      .then((data)=>{
        setData(data.data.result)
      },err=>{
        alert("Дахин оролдоно уу"); 
        console.log(err);
      }
      )
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

    const saveEdit = ()=>{
      if(editedUser.name.length !==0 && editedUser.phone.length !== 0 && editedUser.email.length !== 0 ){
        axios.put(`http://localhost:8080/api/user`, 
        editedUser
      )
      .then(res => {
        setData(res.data.result)
      }, err=>{
        alert("Дахин оролдоно уу"); 
        console.log(err);
      })
      setEditModal(!editModal)
      setEditedUser([])
      } else{
        alert("Please fill all form")
      }
    }

  return (  
    <div className='h-100 row justify-content-around' style={{backgroundColor: "#F6E9FB"}}>
        <div className='col-8'>
          <div className='m-1 py-2 mt-3'>
            <h5>Total Users: {Indata?.length}</h5>
          </div>
        {Indata?.map((a, index)=>{
          return(
            <div key={index}>
              <div className='bg-white my-2 d-flex row rounded align-items-center border-0 p-1 px-3 '>

              <div className='col-6 d-flex gap-3'>
              {a.img? <img style={{width: "50px", height: "50px", borderRadius: "50px", objectFit: "cover" }} src={a.img} alt="a"/> :<i className="bi bi-person-circle fs-1 ps-2" ></i> }

                <div className=''>
                  <div className='d-flex gap-3 '>
                    <p className='text-secondary' style={{fontSize: "14px"}}> Name </p>
                    <p style={{fontSize: "14px"}}>{a.name}</p>
                  </div>
                  <div className='d-flex gap-3 ps-1 '>
                    <p className='text-secondary' style={{fontSize: "14px"}}> Email </p>
                    <p style={{fontSize: "14px"}}>{a.email}</p>
                  </div>
                </div>
              </div>

               <div className='col-6 d-flex gap-3 align-items-center justify-content-end '>
                  <p className='hover' onClick={()=>DeleteUser(a.id)}>Delete</p>
                  <p className='hover' onClick={()=>EditUsers(a.id)}>Edit</p>
                <div className='d-flex hover' onClick={()=> navigate(`/users/${a.id}`)}>
                  <p>Detail</p>
                  <i className="bi bi-caret-right"></i>
                </div>
                 </div>
              </div>
            </div>
          )
        })}
        </div>
        <div className='col-3 m-4'>
         <div className=' bg-white rounded mt-5 p-3' style={{height: "300px"}}>
           <h6 style={{color:"#7303A3"}}>Top Users Corner 🥰</h6>
           <div>
            <p>some users will be here </p>
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


// {
//   "name": "battt",
//      "email": "",
//      "password": 9922,
//      "phone": 99238974,
//      "likes": [] 
// }
