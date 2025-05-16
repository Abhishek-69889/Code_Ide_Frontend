import React, { useState } from 'react'
import img from '../images/code.png'
import dlt from '../images/delete.png'
import { api_base_url } from '../helper'
import { useNavigate } from 'react-router-dom'

const ListCard = ({ item }) => {
  const [isDeleteModelShow, setIsdeleteModelShow] = useState(false)
  const navigate = useNavigate()

  const deleteProject=()=>{
    fetch(api_base_url + "/deleteProject" , {
      mode:"cors",
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        projectID: item._id,
        userID:localStorage.getItem("userId")
      })
    }).then(res=>res.json()).then(data=>{
      console.log(data); 
      if(data.success==true){
        setIsdeleteModelShow(false)
        window.location.reload()

      }else{
        alert(data.message)
        setIsdeleteModelShow(true)
      }
    })
  }
  

  return (
    <>
      <div  className="listcard flex items-center justify-between w-full bg-[#141414] rounded-lg cursor-pointer hover:bg-[#202020]">
        <div onClick={()=>{navigate(`/editor/${item._id}`)}}  className='flex items-center gap-2'>
          <img className='w-[80px] ' src={img} alt="" />
          <div>
            <h3 className='text-[20px] '>{item.title}</h3>
            <p className='text-[gray] text-[14px]'>Created in {new Date (item.date).toDateString()}</p>
          </div>
        </div>
        <div><img onClick={()=>{setIsdeleteModelShow(true)}} className='w-[30px] cursor-pointer' src={dlt} alt="" /></div>
      </div>

      {
        isDeleteModelShow ? <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.15)] flex justify-center items-center flex-col">
          <div className="main_model text-3xl w-[25vw] h-[23vh] bg-[#141414] rounded-lg ">
            <h3>Do you want to delete <br /> this project</h3>
            <div className="flex w-full  items-center gap-[10px]">
              <button onClick={deleteProject} className=' rounded-lg bg-[#00AEFF] text-white min-w-[49%] cursor-pointer'>Delete</button>
              <button onClick={()=>{setIsdeleteModelShow(false)}} className='rounded-lg bg-[#1A1919] text-white min-w-[49%] cursor-pointer'>Cancel</button>
            </div>
          </div>
        </div> : ""
      }

    </>
  )
}

export default ListCard
