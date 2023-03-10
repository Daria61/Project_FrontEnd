import React, { useEffect, useState } from 'react'
import StartSectionImg from '../component/startSectionImg'
import Catalog from '../component/catalog'
import axios from 'axios'
export default function Design() {

    const [dis, setDis] = useState(false)
    const file = []
    const [start , setStart] = useState(false)
    const [data, setData] = useState()
    const [sendData, setSendData] = useState()

    const modalHandle=()=>{
        setDis(!dis)
    }

    useEffect(()=>{
        axios.get("http://localhost:8080/api/design")
        .then((data)=> {setData(data.data.result); console.log(data.data.result)}, err=> console.log(err))
    },[])

    const saveEdit=()=>{
        axios.put("http://localhost:8080/api/design", sendData)
        .then((res)=> setData(res.data.result), err=> console.log(err))
        
        modalHandle()
    }

    const upload = async (file)=>{
        const url = "https://api.cloudinary.com/v1_1/dtaxo6bqx/upload";
        const newArr = []
        
        for(let i = 0; i < file[0]?.length; i++){
            newArr.push(file[0][i])
        }

        const pro = await Promise.all(
            newArr.map((arr)=>{
                const formData = new FormData();
                formData.append("file", arr);
                formData.append("api_key", 164434952949656);
                formData.append("folder", "example");
                formData.append("upload_preset", "o3tqzcrx" )
                return axios.post(url, formData)
            })
        )

        const arrN = []

        pro?.map((a)=> {
            arrN.push(a?.data.secure_url)
            console.log(arrN);
        });

        setSendData({...data, home: arrN})
        setStart(false)
    }



  return (
    <div className='contain'>
       <div className=' d-flex justify-content-between'>
       <p>~Home Page Image Section</p>
       <button className='btn btn-primary' onClick={modalHandle}>Change picture</button>
       </div>
       <div className='d-flex row  m-5 p-5 border'>
        <StartSectionImg />
       </div>
       <div className='d-flex row  m-5 p-5 border'>
        {/* <Catalog/> */}
       </div>




       <div className="modal justify-content-center" onClick={modalHandle} style={{display: dis? "block": "none"}}>
            <div className="modal-body rounded" onClick={(e)=> e.stopPropagation()}>
              <div className="closeBtn text-end" onClick={modalHandle}><i class="bi bi-x-lg"></i></div>
               <h4>Change Image</h4>
              <div className='d-flex gap-2'>
              <input type="file" className='form-control'  onChange={(e)=>{file.push(e.target.files)}}  multiple/>
               <button className='btn btn-primary' onClick={()=> {upload(file); setStart(true)}} >Upload file</button>
              </div>
              <p className='text-start' >{start? "Uploading": "" } </p>
               <button style={{border:"0", borderRadius:"20px", padding :"8px 80px", color:"white", backgroundColor:"black ", marginTop: "20px"}} onClick={()=>saveEdit()}>Save edit</button>
            </div>
        </div>
    </div>
  )
}
