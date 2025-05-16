import React from 'react'
import { MdFileDownload } from "react-icons/md";


const EditorNavbar = () => {
  return (
    <>
      <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div className="logo">
        <a href="/" className="text-[28px] font-bold text-[#4F46E5]" style={{ fontFamily: "Segoe UI" }}>
          Codexa<span className="text-[#10B981]">.</span>
        </a>
      </div>
        <div>

        </div>
        <div className='Editor_Navbar_div2 flex items-center  w-[60%] justify-between'>
             <p>File / <span className='text-[gray]'>My First Project</span></p>
             <MdFileDownload className='download text-[30px] cursor-pointer rounded-[5px]'/>
        </div>
      </div>
    </>
  )
}

export default EditorNavbar

