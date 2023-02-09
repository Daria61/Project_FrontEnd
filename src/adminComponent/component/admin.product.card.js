// import React from 'react'

// export default function AdminProductcCard({data}) {
//   return (
//     <div>
//         {data?.map((a, index)=>{
//           return(
//             <div key={index} className="col-4 p-3" style={{height:"300px"}}>
//               <div className='bg-white my-2   rounded  p-1 px-3 h-100 '>
//               <div className=' d-flex gap-3 justify-content-center'>
//                 {a.thumb? <img style={{width: "100px", objectFit: "cover"}} src={a.thumb} alt="a"/> : <img style={{width: "100px", objectFit: "cover"}} src={require("../images/undraw_Outer_space_re_u9vd.png")} alt="a"/> }
//                 {a.img[0].img? <img style={{width: "100px", objectFit: "cover"}} src={a.img[0].img} alt="a"/> : <img style={{width: "100px", objectFit: "cover"}} src={require("../images/undraw_Outer_space_re_u9vd.png")} alt="a"/> }
//               </div>
//               <div className=''>
//                   <div className='d-flex gap-3 '>
//                     <p> Product Name : </p>
//                     <p >{a.productName}</p>
//                   </div>
//                 </div>
//                <div className='col-6 d-flex gap-3 align-items-center justify-content-end '>
//                   <p className='hover' >Delete</p>
//                   <p className='hover' >Edit</p>
//                  </div>
//               </div>
//             </div>
//           )
//         })}
//     </div>
//   )
// }
