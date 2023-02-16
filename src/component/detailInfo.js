import React from 'react'

export default function DetailInfo({data}) {
  return (
    <div className='col-md-6 ps-5 mt-3'>
        <h1>{data?.productName}</h1>
        <p className='pt-3'> Color : {data?.color}</p>
        <p className='pt-3'>Feature : {data?.feature}</p>
        <p className='pt-3'>Sale : {data?.salePrecent}%</p>
        <p className='pt-3 pb-3' style={{fontSize: "30px"}}>{data?.price}</p>
        <button style={{"backgroundColor": "black", "color": "white", "padding": "10px 20px" ,"border": 0}} >ADD TO BAG</button>
    </div>
  )
}
