import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function NewReleases() {

    const [data , setData] = useState()
    const [indexN, setIndex] = useState(0)

    useEffect(()=>{
        axios.get("http://localhost:8080/api/products")
        .then((res)=> {
            let a = res.data.result
            a?.sort((a , b)=> b?.create?.date - a?.create?.date)
            return(
                setData(a?.slice(0, 9))
            )
        },
        err=> console.log(err))
    }, [])



    const Move =(direction)=>{
        if(direction === "right"){
            const num  = indexN + 3
            setIndex(data.length < num + 2 ? 0 : num)
        } else{
            setIndex(0 == indexN ? data.length - 3 : indexN-3)
        }

    }

  return (
   <div className='mt-5 mb-5'>
    <div className='d-flex justify-content-between'>
    <h3 style={{fontWeight: 400}}>NEW RELEASES</h3>
    <div className='gap-3 d-flex'>
        <i class="fs-3 bi bi-arrow-left" onClick={()=>Move("left")}></i>
        <i class="fs-3 bi bi-arrow-right" onClick={()=>Move("right")}></i>
    </div>
    </div>
     <div className='d-flex row justify-content-between'>
        {data?.map((a, index)=>{  
            if(indexN == index || indexN + 1 == index || indexN + 2 == index ){
            return(
                <div className='col-4 p-3'  >
                    <div>
                        <img src={a.thumb} style={{objectFit: "cover", height: "350px"}} className="w-100" alt="pic"/>
                    </div>
                    <div className='d-flex justify-content-between mt-2'>
                    <p>{a.productName}</p>
                    <p>{a.price}</p>
                    </div>
                </div>
            )
        }
        })}
    </div>
   </div>
  )
}
