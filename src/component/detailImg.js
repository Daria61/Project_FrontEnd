import React from 'react'


export default function DetailImg({data}) {
  return (
    <div className='col-md-6'>
        <div className='mt-3 mb-3'>
        <img className='w-100' style={{height: "400px", objectFit: "cover"}} src={data?.thumb} alt="thumbImg"/>
        </div>
        <div className='d-flex row '>
            <div className='col-md-6 pe-2'>
                <img src={data?.img[0]} alt="img1" className='w-100' style={{height: "300px", objectFit: "cover"}}/>
            </div>
            <div className='col-md-6 ps-2'>
                <img src={data?.img[1]} alt="img1" className='w-100' style={{height: "300px", objectFit: "cover"}}/>
            </div>
        </div>
        {/* <div className='mt-3'>
            <img style={{height: "500px", objectFit: "cover"}} className='w-100' src={data?.img[0]} alt="lastImg"/>
        </div> */}
    </div>
  )
}


