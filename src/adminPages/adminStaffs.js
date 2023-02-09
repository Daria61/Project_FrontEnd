import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function AdminStaffs() {

  const NewObj ={
    name: "",
    email: "",
    password: "",
    phone: "",
    img: ""
  }

    const [data, setData]=useState();
    const [editedAdmin, setEditedAdmin] = useState([])
    const [editModal, setEditModal] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [addAdmin, setAddAdmin] =useState(NewObj)
    const [confirm ,setConfirm] = useState("")
    const [upload, setUpload] = useState(true)
    const navigate = useNavigate()



    useEffect(()=>{
      if(!localStorage.getItem("name")){
        navigate("/sign")
      }
      
        axios.get('http://localhost:8080/api/staffs')
        .then(res=> {
            setData(res.data.result)

        }, err =>{
            console.log(err);
        });
    },[])

    const DeleteAdmin=(id)=>{
      axios.delete(`http://localhost:8080/api/staffs/${id}`)
      .then((data)=>{
        setData(data.data.result)
      },err=>{
        alert("Дахин оролдоно уу"); 
        console.log(err);
      }
      )
    }

    const EditAdmin=(id)=>{
      axios.get(`http://localhost:8080/api/staffs/${id}`)
      .then(res => {
        setEditedAdmin(res.data.result[0]);
      }, err=>{
        alert("Дахин оролдоно уу"); 
        console.log(err);
      })
      setEditModal(!editModal)
    }

    const saveEdit = ()=>{
      if(editedAdmin.email.length !== 0 &&  editedAdmin.name.length !== 0 && editedAdmin.password.length !== 0 && editedAdmin.phone.length !== 0){
      axios.put(`http://localhost:8080/api/staffs`, 
        editedAdmin
      )
      .then(res => {
        setData(res.data.result)
      }, err=>{
        alert("Дахин оролдоно уу"); 
        console.log(err);
      })
      setEditModal(!editModal)
      setEditedAdmin([])}else{
        alert("Please fill all form")
      }
    }

    const  addAdminData=()=>{
      setIsAdd(!isAdd)
    }

    const addData =()=>{
      if(confirm === addAdmin.password){
        if(addAdmin.email.length !== 0 &&  addAdmin.name.length !== 0 && addAdmin.password.length !== 0 && addAdmin.phone.length !== 0){
          axios.post("http://localhost:8080/api/staffs",
        addAdmin
        )
        .then((res)=> setData(res.data.result),
         err=>{ 
          alert("Дахин оролдоно уу")
          console.log(err)})
          setIsAdd(false)
          setAddAdmin(NewObj)
  
        }else{
          alert("Please fill all form")
        }
      }else{
        alert("Passwords do not match")
      }
      
    }

  return (
    <div className='h-100 row justify-content-around' style={{backgroundColor:"#C3E2FF" }}>
        <div className='col-8'>
          <div className='m-1 py-2 mt-3 d-flex justify-content-between'>
            <h5>Total Admin: {data?.length}</h5>
            <p className='btn' style={{border: "1px solid #0068CA", color: "#0068CA"}} onClick={addAdminData}>Add admin</p>
          </div>
        {data?.map((a, index)=>{
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
                  <p className='hover' onClick={()=>DeleteAdmin(a.id)}>Delete</p>
                  <p className='hover' onClick={()=>EditAdmin(a.id)}>Edit</p>
                 </div>
              </div>
            </div>
          )
        })}
        </div>
        <div className='col-3 m-4'>
         <div className=' bg-white rounded mt-5 p-3' style={{height: "300px"}}>
           <h6 style={{color:"#7303A3"}}>Energy Corner 🥰</h6>
           <div className='row'>
            <a href='https://bongo.cat/' > Cat with Drums Here</a>
            <a href='https://www.youtube.com/watch?v=mXnJqYwebF8' > Songs make you feel better</a>
            <a href='https://www.instagram.com/kendalljenner/?hl=en' > if wanna see someone beuatiful</a>
           </div>
         </div>
        </div>

        <div className="modal justify-content-center" onClick={saveEdit} style={{display: editModal? "block" : "none"}}>
               <div className="modal-body rounded" onClick={(e)=> e.stopPropagation()}>
               <div className="closeBtn text-end" onClick={saveEdit}><i class="bi bi-x-lg"></i></div>
               <h4>Edit user detail information</h4>
               <div>
                <p className='text-start m-1'>Name<span className='text-danger'>*</span></p>
                <input required type="text" value={editedAdmin?.name} className="form-control" onChange={(e)=> setEditedAdmin({...editedAdmin, name : e.target.value})}/>
               </div>
               <div>
                <p className='text-start m-1'>Admin Email<span className='text-danger'>*</span></p>
                <input required type="text" value={editedAdmin?.email} className="form-control" onChange={(e)=> setEditedAdmin({...editedAdmin, email : e.target.value})}/>
               </div>
               <div>
                <p className='text-start m-1'>Admin Phone<span className='text-danger'>*</span></p>
                <input required type="text" value={editedAdmin?.phone} className="form-control" onChange={(e)=> setEditedAdmin({...editedAdmin, phone : e.target.value})}/>
               </div>
               <div style={{display: isAdd? "block": "none"}}>
                <p className='text-start m-1'>Admin Password<span className='text-danger'>*</span></p>
                <input required type="text" value={editedAdmin?.phone} className="form-control" onChange={(e)=> setEditedAdmin({...editedAdmin, phone : e.target.value})}/>
               </div>
               <button style={{border:"0", borderRadius:"20px", padding :"8px 80px", color:"white", backgroundColor:"black ", marginTop: "20px"}} onClick={()=>saveEdit()}>Save edit</button>
            </div>
        </div>

        <div className="modal justify-content-center" onClick={addAdminData} style={{display: isAdd? "block": "none"}}>
               <div className="modal-body rounded" onClick={(e)=> e.stopPropagation()}>
               <div className="closeBtn text-end" onClick={addAdminData}><i class="bi bi-x-lg"></i></div>
               <h4>Add admin </h4>
               <div>
                <p className='text-start m-1'>Profile Photo</p>
                <input required type="file"  className="form-control" onChange={(e)=>
                   {
                    const url = "https://api.cloudinary.com/v1_1/dtaxo6bqx/upload"
                    setUpload(false)

                    const formData = new FormData()

                    let file = e.target.files[0]
                    formData.append("file", file)
                    formData.append("api_key", "164434952949656")
                    formData.append("folder", "example")
                    formData.append("upload_preset", "o3tqzcrx" )

                    axios
                    .post(url, formData)
                    .then((res)=>{
                      setAddAdmin({...addAdmin, img: res.data.secure_url})
                      console.log(res.data.secure_url);
                      setUpload(true)
                    })
                    .catch((err)=>console.log(err))
                   }}/>
                   <p className='text-start'>{upload? "": "Uploading" } </p>
               </div>
               <div>
                <p className='text-start m-1'>Name<span className='text-danger'>*</span></p>
                <input required type="text" value={addAdmin?.name} className="form-control" onChange={(e)=> setAddAdmin({...addAdmin, name : e.target.value})}/>
               </div>
               <div>
                <p className='text-start m-1'>Email<span className='text-danger'>*</span></p>
                <input required type="text" value={addAdmin?.email} className="form-control" onChange={(e)=> setAddAdmin({...addAdmin, email : e.target.value})}/>
               </div>
               <div>
                <p className='text-start m-1'>Phone<span className='text-danger'>*</span></p>
                <input required type="text" value={addAdmin?.phone} className="form-control" onChange={(e)=> setAddAdmin({...addAdmin, phone : e.target.value})}/>
               </div>
               <div>
                <p className='text-start m-1'>Password<span className='text-danger'>*</span></p>
                <input required type="text" value={addAdmin?.password} className="form-control" onChange={(e)=> setAddAdmin({...addAdmin, password: e.target.value})}/>
               </div>
               <div>
                <p className='text-start m-1'>Confirm Password<span className='text-danger'>*</span></p>
                <input required type="text" value={confirm} className="form-control" onChange={(e)=> setConfirm(e.target.value)}/>
                <p className='text-start' style={{color: confirm === addAdmin.password? "green": "red"}}>{confirm === addAdmin.password? "password match":"password do not match"}</p>
               </div>

               <button style={{border:"0", borderRadius:"20px", padding :"8px 80px", color:"white", backgroundColor:"black ", marginTop: "20px"}} onClick={()=>addData()}>Save edit</button>
            </div>
        </div>
    </div>
  )
}

//#C3E2FF
// "name": "daria",
// "email": "",
// "password": 9922,
// "phone": 99238974,