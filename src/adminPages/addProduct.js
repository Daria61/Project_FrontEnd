import { useState, useEffect } from "react"
import React  from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
export default function AddProduct() {
      const navigate = useNavigate()

      if(!localStorage.getItem("name")){
        navigate("/sign")
      }

        const user = localStorage.getItem("id")
        const date = new Date()
        const day = date.getDate() + 1 < 10 ?  "0"+ date.getDate().toString() : date.getDate().toString()
        const year = date.getFullYear().toString()
        const month = date.getMonth() + 1 < 10 ?  "0"+ (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString()

    const NewObj ={
        "productName": "",
        "category": [],
        "price": "",
        "salePrecent": "",
        "quantity": "",
        "brandId": 0,
        "material": "",
        "color": "",
        "feature": "",
        "create": {
          "date": year + month + day,
          "createdAdminId": user
        },
        "update": {
          "status": false,
          "date": {
            "Year": "0",
            "Month": "0",
            "Day": "0"
          },
          "updateUser": ""
        },
        "img": [],
        "thumb": "https://cdn-images.farfetch-contents.com/18/89/74/30/18897430_41176576_1000.jpg"
    }

    const [cate, setCate] = useState()
    const [brands, setBrands] = useState()
    const [addCate , setAddCate] =useState([]) 
    const [addPro, setAddAdmin] =useState(NewObj)
    const [upload, setUpload] = useState(true)
    const [start , setStart] = useState(false)
    const  FirstArr = []


    useEffect(()=>{
        axios.get(' http://localhost:8080/api/category')
        .then((res)=> setCate(res.data.result),
        err=> console.log(err))
      }, [])
      
      useEffect(()=>{
        axios.get(' http://localhost:8080/api/brands')
        .then((res)=> setBrands(res.data.result),
        err=> console.log(err))
      }, [])

    const categoryAdd=(status ,id)=>{
        if(status){
          setAddCate(addCate.push(id))
        }else{
          const b =addCate.filter((a)=> a.id != id)
          setAddCate(b)
        }
        setAddAdmin({...addPro, category: addCate})
        setAddCate([])
    }

      const addData =()=>{
        if(addPro.productName.length != 0 && addPro.category.length != 0 && addPro.price.length != 0 && addPro.quantity.length != 0 &&  addPro.brandId.length != 0 && addPro.material.length != 0 && addPro.color.length != 0){
            axios.post(' http://localhost:8080/api/products'
            , addPro)
            .then((res)=> setAddAdmin(res.data.result),
            err=> console.log(err))
            navigate("/products")
        }else{
            alert("Please fill all form")
        }

      }

      const sendThumb =(file)=>{
        const url = "https://api.cloudinary.com/v1_1/dtaxo6bqx/upload"
        setUpload(false)   
        const formData = new FormData()
        
        formData.append("file", file)
        formData.append("api_key", "164434952949656")
        formData.append("folder", "example")
        formData.append("upload_preset", "o3tqzcrx" )   
        axios
        .post(url, formData )
        .then((res)=> {
          setAddAdmin({...addPro, thumb : res.data.secure_url,})
          setUpload(true)
        })
        .catch((err)=> console.log(err))
      }

      const sendImgs = async (files)=>{
            const url = "https://api.cloudinary.com/v1_1/dtaxo6bqx/upload";
            const newArr = []

            for(let i = 0; i < files[0]?.length; i++){
                newArr.push(files[0][i])
            }

            const promise = await Promise.all(
                newArr.map((Arr)=>{
                    const formData = new FormData();
                    formData.append("file", Arr);
                    formData.append("api_key", 164434952949656);
                    formData.append("folder", "example");
                    formData.append("upload_preset", "o3tqzcrx" )
                    return axios.post(url, formData)
                })
            );
            const arrN = []

            promise?.map((a)=> {
                arrN.push(a?.data.secure_url)
            });

           setAddAdmin({...addPro, img: arrN})
        setStart(false)
      }
      
  return (
    <div className="d-flex row justify-content-evenly">
        <div className=" col-md-5" >
            <h4>Add Products </h4>
            <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Products Name<span className='text-danger'>*</span></p>
             <input type="text" placeholder="Bag" value={addPro?.productName} className="form-control" onChange={(e)=> setAddAdmin({...addPro, productName : e.target.value})}/>
            </div>
            <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Price<span className='text-danger'>*</span></p>
             <input type="text" placeholder="$122" value={addPro?.price} className="form-control" onChange={(e)=> setAddAdmin({...addPro, price : e.target.value})}/>
            </div>
            <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Sale Percent<span className='text-danger'>*</span></p>
             <input type="text" placeholder="30%" value={addPro?.salePrecent} className="form-control" onChange={(e)=> setAddAdmin({...addPro, salePrecent: e.target.value})}/>
            </div>
             <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Material<span className='text-danger'>*</span></p>
             <input type="text" placeholder="Leather" value={addPro?.material} className="form-control" onChange={(e)=> setAddAdmin({...addPro, material: e.target.value}) }/>
             </div>
             <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Features<span className='text-danger'>*</span></p>
             <input type="text" placeholder="Big red logo" value={addPro?.feature} className="form-control" onChange={(e)=> setAddAdmin({...addPro, feature : e.target.value})}/>
             </div>
            <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Color<span className='text-danger'>*</span></p>
             <input type="text" placeholder="Red" value={addPro?.color} className="form-control" onChange={(e)=> setAddAdmin({...addPro, color: e.target.value})}/>
            </div>
            <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Quantity<span className='text-danger'>*</span></p>
             <input type="text" placeholder="20" value={addPro?.quantity} className="form-control" onChange={(e)=> setAddAdmin({...addPro, quantity: e.target.value})}/>
            </div>
            
        </div>
        <div className="col-md-6 mt-4">


            
        <div>
         <p className='text-start m-1' style={{fontWeight: "500"}}>Brands<span className='text-danger'>*</span></p>
         <select className='form-select' onChange={(e)=>setAddAdmin({...addPro, brandId: e.target.value})}>
           <option value="0">select</option>
           {brands?.map((a, index)=> {
             return(
               <option key={index} value={a.id}>{a.brandName}</option>
             )
           })}
         </select>
        </div>
            <div>
             <p className='text-start m-1' style={{fontWeight: "500"}}>Category<span className='text-danger'>*</span></p>
             <div className='d-flex row'>
             {cate?.map((a, index)=> {
                 return(
                  <div className='col-5 text-start'>
                    <input type="checkbox" id={index}  onChange={(e)=>categoryAdd(e.target.checked, a.id)} />
                   <label htmlFor={index} className="ps-2"> {a.category}</label>
                  </div>
                 )
               })}
               </div>
            </div>
            <div>
             <p className='text-start m-1'style={{fontWeight: "500"}} >Thumb Img<span className='text-danger'>*</span></p>
             <input type="file" className="form-control" onChange={(e)=> {
                let file = e.target.files[0]
                sendThumb(file)
             }}/>
             <p className='text-start' >{upload? "": "Uploading" } </p>
            </div>
            <div>
            <p className='text-start m-1'style={{fontWeight: "500"}} >Img<span className='text-danger'>*</span></p>
            <input type="file" className="form-control"  onChange={(e)=>{
                FirstArr.push(e.target.files)
            }} multiple />
            <div className="d-flex gap-2">
            <button className="btn btn-primary mt-2" onClick={()=> {sendImgs(FirstArr); setStart(true)} }> Upload file</button>
            <p className='text-start' >{start? "Uploading": "" } </p>
            </div>
            </div>
            <button style={{border:"0", borderRadius:"20px", padding :"8px 80px", color:"white", backgroundColor:"black ", marginTop: "20px"}} onClick={()=>addData()}>Save edit</button>
        </div>
    </div>
  )
}
