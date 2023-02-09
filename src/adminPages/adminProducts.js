import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
// import AdminProductcCard from '../adminComponent/component/admin.product.card';
import { useNavigate } from 'react-router-dom';
export default function AdminProducts() {

  const [data, setData]=useState();
  const navigate = useNavigate()


  useEffect(()=>{

    if(!localStorage.getItem("name")){
      navigate("/sign")
    }
    
    axios.get('http://localhost:8080/api/products')
    .then(res=> {
        setData(res.data.result)
    }, err =>{
        console.log(err);
    });
},[])

  const [modal, setModal] = useState(false)
  const [product, setProduct] = useState()
  const [brands, setBrands] = useState()
  const [cate, setCate] = useState()
  const [addCate , setAddCate] =useState([]) 
  const user = localStorage.getItem("id")
  const date = new Date()
  const day = date.getDate() + 1 < 10 ?  "0"+ date.getDate().toString() : date.getDate().toString()
  const year = date.getFullYear().toString()
  const month = date.getMonth() + 1 < 10 ?  "0"+ (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()

  const modalControl=()=>{
    setModal(!modal)
  }
  
  const editedModal=()=>{
    axios.put(`http://localhost:8080/api/products`, product)
    .then((res)=> setData(res.data.result),
    err=> console.log(err))
    modalControl()
    setProduct()
    setAddCate([])
  }
  
useEffect(()=>{
  axios.get(' http://localhost:8080/api/brands')
  .then((res)=> setBrands(res.data.result),
  err=> console.log(err))
}, [])

useEffect(()=>{
  axios.get(' http://localhost:8080/api/category')
  .then((res)=> setCate(res.data.result),
  err=> console.log(err))
}, [])

const  Deleteproduct=(id)=>{
  axios.delete(`http://localhost:8080/api/products?id=${id}`)
  .then((res)=>setData(res.data.result),
  err=> console.log(err))
}

const editProduct=(id)=>{
  axios.get(`http://localhost:8080/api/products/${id}`)
  .then((res)=> { 
    return(
      setProduct({...res.data.result[0], update: {
        "status": true,
        "date": year + month + day,
        "updateUser": user
     } })
    )
  }, 
  err=> console.log(err))

   
  modalControl()
} 

const categoryAdd=(status ,id)=>{
  if(status){
    setAddCate(addCate.push(id))
  }else{
    const b =addCate.filter((a)=> { return a.id != id})
    setAddCate(b)
  }
  console.log(addCate);
  setProduct({...product, category: addCate})
}

  return (
    <div>
      <div className='h-100 row justify-content-around p-4'  style={{backgroundColor:"#C3E2FF" }}>
          <div className='m-1 py-2 mt-3 d-flex justify-content-between'>
            <h5>Total Products: {data?.length}</h5>
            <p className='btn' style={{border: "1px solid #0068CA", color: "#0068CA"}} onClick={()=>navigate("/productsadd")}>Add Products</p>
          </div>
          <div className='d-flex row'>
        {data?.map((a, index)=>{
          return(
            <div key={index} className="col-4 p-3" style={{height:"300px"}}>
              <div className='bg-white my-2   rounded  p-1 px-3 h-100 '>
              <div className=' d-flex gap-3 justify-content-center h-50'>
                {a.thumb? <img style={{width: "100px", objectFit: "cover"}} src={a?.thumb} alt="a"/> : <img style={{width: "100px", objectFit: "cover"}} src={require("../images/finger.png")} alt="a"/> }              </div>
              <div className='p-2'>
                  <div className='d-flex gap-3 '>
                    <p style={{fontSize: "20px"}}>{a.productName}</p>
                  </div>
                </div>
               <div className=' d-flex gap-3  justify-content-center '>
                  <p className='btn btn-outline-primary' onClick={()=>Deleteproduct(a.id)} >Delete</p>
                  <p className='btn btn-outline-primary' onClick={()=> editProduct(a.id)} >Edit</p>
                  <p className='btn btn-outline-primary' >Details</p>
                 </div>
              </div>
            </div>
          )
        })}
        </div>
      </div>

      <div className="modal justify-content-center" onClick={modalControl} style={{display: modal? "block": "none"}}>
        <div className="modal-body rounded" onClick={(e)=> e.stopPropagation()}>
           <div className="closeBtn text-end" onClick={modalControl}><i class="bi bi-x-lg"></i></div>
           <div className=" " >
           <h4>Edit Products detail information</h4>
            <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Products Name<span className='text-danger'>*</span></p>
             <input type="text"  value={product?.productName} className="form-control" onChange={(e)=> setProduct({...product, productName : e.target.value})}/>
            </div>
            <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Price<span className='text-danger'>*</span></p>
             <input type="text"  value={product?.price} className="form-control" onChange={(e)=> setProduct({...product, price : e.target.value})}/>
            </div>
            <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Sale Percent<span className='text-danger'>*</span></p>
             <input type="text"  value={product?.salePrecent} className="form-control" onChange={(e)=> setProduct({...product, salePrecent: e.target.value})}/>
            </div>
             <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Material<span className='text-danger'>*</span></p>
             <input type="text"  value={product?.material} className="form-control" onChange={(e)=> setProduct({...product, material: e.target.value}) }/>
             </div>
             <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Features<span className='text-danger'>*</span></p>
             <input type="text" ig red  value={product?.feature} className="form-control" onChange={(e)=> setProduct({...product, feature : e.target.value})}/>
             </div>
            <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Color<span className='text-danger'>*</span></p>
             <input type="text"  value={product?.color} className="form-control" onChange={(e)=> setProduct({...product, color: e.target.value})}/>
            </div>
            <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Quantity<span className='text-danger'>*</span></p>
             <input type="text"  value={product?.quantity} className="form-control" onChange={(e)=> setProduct({...product, quantity: e.target.value})}/>
            </div>
            <div>
              <p className='text-start m-1' style={{fontWeight: "500"}}>Brands<span className='text-danger'>*</span></p>
              <select className='form-select' onChange={(e)=>setProduct({...product, brandId: e.target.value})}>
                <option value="0">select</option>
                {brands?.map((a, index)=> {
                    if(product?.brandId == a.id){
                    return( <option key={index}  selected  value={a.id}>{a.brandName}</option>)
                  } else {
                    return( <option key={index}   value={a.id}>{a.brandName}</option>)
                  }
                })}
              </select>
            </div>
            <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Category<span className='text-danger'>*</span></p>
             <div className='d-flex row'>
             {cate?.map((a, index)=> {
              if(product?.category?.includes(a.id)){
                return(
                  <div className='col-5 text-start'>
                    <input type="checkbox" id={index} checked onChange={(e)=>categoryAdd(e.target.checked, a.id)} />
                   <label htmlFor={index} className="ps-2"> {a.category}</label>
                  </div>
                 )
              }else{
                 return(
                  <div className='col-5 text-start'>
                    <input type="checkbox" id={index}  onChange={(e)=>categoryAdd(e.target.checked, a.id)} />
                   <label htmlFor={index} className="ps-2"> {a.category}</label>
                  </div>
                 )}
               })}
               </div>
            </div>
        </div>
           <button style={{border:"0", borderRadius:"20px", padding :"8px 80px", color:"white", backgroundColor:"black ", marginTop: "20px"}} onClick={()=>editedModal()}>Save edit</button>
        </div>
      </div>
    </div>
  )
}

//dtaxo6bqx
//164434952949656
//o3tqzcrx


