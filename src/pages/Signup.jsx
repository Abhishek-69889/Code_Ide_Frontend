import React, { useState } from 'react'
import logo from '../images/logo.png'   
import authimage from '../images/authPageSide.png'
import { Link, useNavigate } from 'react-router-dom';
import { api_base_url } from '../helper';

const Signup = () => {
    const [username,setUsername] = useState("");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")

    const navigate = useNavigate()
    const [err,setErr]=useState("")

    const submitForm=(e)=>{
        e.preventDefault();
        fetch(api_base_url+ "/signup",{
            mode:"cors",
            method:"post",
            headers:{
                "COntent-Type":"application/json"
            },
            body:JSON.stringify({
                username:username,
                email:email,
                name:name,
                password:password
            })
        }).then((res)=>res.json()).then((data)=>{
            if(data.success == true){
                alert("Account created successfully..!")
                navigate("/login")
            }
            else{
                setErr(data.message)
            }
        })
    }



    return (
        <>
            <div className="container w-screen min-h-screen flex item-center justify-between ">
                <div className="left w-[35%]">
                    <div className="logo">
        <a href="/" className="text-[28px] font-bold text-[#4F46E5]" style={{ fontFamily: "Segoe UI" }}>
          Codexa<span className="text-[#10B981]">.</span>
        </a>
      </div>
                    <form className='signup_form' action='post' onSubmit={submitForm}>
                        <div className="inputBox inputbox">
                            <input required type="text" placeholder='Username'  onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
                        </div>
                        <div className="inputBox p-[30px]">
                            <input required type="text" placeholder='Name'  onChange={(e)=>{setName(e.target.value)}} value={name}/>
                        </div>
                        <div className="inputBox">
                            <input required type="email" placeholder='Email'  onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                        </div>
                        <div className="inputBox">
                            <input required type="password" placeholder='Password'  onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                        </div>

                        <p className='text-[gray]'>Already have an account <Link to="/login" className='text-[#00AEEF]'>Login</Link></p>

                        <p className='text-red-500 text-[14px]'>{err}</p>

                        <button  className="btnBlue w-full text-center cursor-pointer">Sign Up</button>
                    </form>
                </div>
                <div className="right w-[50%]">
                    <img src={authimage} alt="Auth Image" className='h-[70vh] w-[100%] object-cover'/>
                </div>
            </div>
        </>
    )
}

export default Signup
