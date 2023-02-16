import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import { useNavigate } from 'react-router-dom'
export default function AdminCategory() {

  const [category, setCategory] = useState();
  const [ open, setOpen] =useState(false);
  const [brands, setBrands] = useState();
  const [which, setWhich] = useState();
  const navigate = useNavigate();
  const [input , setInput]  = useState();



  useEffect(()=>{
    if(!localStorage.getItem("name")){
      navigate("/sign")
    }
    
    axios.get(' http://localhost:8080/api/category')
    .then((res)=> setCategory(res.data.result),
    err=> console.log(err))
  }, [])

  useEffect(()=>{
    axios.get(' http://localhost:8080/api/brands')
    .then((res)=> setBrands(res.data.result),
    err=> console.log(err))
  }, [])

  const modal =(name)=>{
    setWhich(name)
    setOpen(!open)
  }

  const New=(name)=>{
    if(name === "brands"){
      axios.post("http://localhost:8080/api/brands", {"brandName": input})
      .then((res)=> setBrands(res.data.result), 
      err=> console.log(err))
    }else{
      axios.post("http://localhost:8080/api/category", {"category": input})
      .then((res)=> setCategory(res.data.result), 
      err=> console.log(err))
    }
    modal()
    setInput("")
  }

  const deleteCate=(id)=>{
    category.map((a)=> {
      if(a.id == id ){
        if(a.category === "Women" || a.category === "Men"){
          alert("You can not delete the main category")
        }else{
          axios.delete(`http://localhost:8080/api/category?id=${id}`)
          .then((res)=> setCategory(res.data.result), err=> console.log(err))
        }
      }
    })
  }

  const deleteBrand=(id)=>{
    axios.delete(`http://localhost:8080/api/brands?id=${id}`)
    .then((res)=> setBrands(res.data.result))
  }
  return (
    <div>
      <div className='row d-flex justify-content-evenly'>
        <div className='col-5'>
        <h5 className='text-center mb-4'>Category</h5>
        <div className='row d-flex justify-content-start'>
          {category?.map((a, index)=>{
            return(
              <div key={index} className="col-4">
                <div className='border rounded  m-1 catehover p-3' style={{position:"relative"}} >
                  <p style={{fontSize: "20px"}}>{a.category}</p> 
                  <i class="bi bi-x " style={{position: "absolute", top :"5px", right:"5px"}} onClick={()=>deleteCate(a.id)}></i>
                </div>
              </div>
            )
          })}
          <div className="col-3">
                <div className='border rounded  m-1 addhover p-3'  onClick={()=>modal("category")} >
                  <p style={{fontSize: "20px", color: "#008AE6 "}}>Add</p>
                </div>
              </div>
          </div>
        </div>
  
        <div className='col-5'>
        <h5 className='text-center mb-4'>Brands</h5>
        <div className='row d-flex justify-content-start'>
          {brands?.map((a, index)=>{
            return(
              <div key={index} className="col-3">
                <div className='border rounded catehover m-1  p-3' style={{position:"relative"}} >
                  <p style={{fontSize: "20px"}}>{a.brandName}</p>
                  <i class="bi bi-x " style={{position: "absolute", top :"5px", right:"5px"}} onClick={()=> deleteBrand(a.id)}></i>
                </div>
              </div>
            )
          })}
           <div  className="col-3">
                <div className='border rounded addhover m-1  p-3' onClick={()=>modal("brands")}>
                  <p style={{fontSize: "20px", color: "#008AE6"}}>Add</p>
                </div>
              </div>
          </div>
        </div>
      </div>
  
      <div className="modal justify-content-center" onClick={()=>modal()} style={{display: open? "block": "none"}}>
        <div className="modal-body rounded " onClick={(e)=> e.stopPropagation()}>
          <div className="closeBtn text-end" onClick={()=>modal()}><i class="bi bi-x-lg"></i></div>
          <h4>Add {which}</h4>
          <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Name<span className='text-danger'>*</span></p>
             <input type="text" value={input} className="form-control" onChange={(e)=> setInput(e.target.value)}/>
          </div>
          <button style={{border:"0", borderRadius:"20px", padding :"8px 80px", color:"white", backgroundColor:"black ", marginTop: "20px"}} onClick={()=>New(which)}>Save</button>
        </div>
      </div>
  
    </div>
  )
}

