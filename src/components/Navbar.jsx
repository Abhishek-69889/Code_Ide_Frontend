import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import { CiLight } from "react-icons/ci";
import { IoGrid } from "react-icons/io5";
import { api_base_url } from '../helper';
import { FaThList } from "react-icons/fa";

const Navbar = ({ setIsGridLayout, isGridLayout}) => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("userId");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    navigate("/");
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetch(api_base_url + "/getUserDetails", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: isLoggedIn })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) setData(data.user);
          else setErr(data.message);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.avatar-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsDropdownOpen(false);
    navigate("/");
  };

  const toggleLayout = () => {
    const newLayout = !isGridLayout;
    setIsGridLayout(newLayout);
    localStorage.setItem("layout", newLayout ? "grid" : "list");
  };

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414] relative">
      <div className="logo">
        <a href="/" className="text-[28px] font-bold text-[#4F46E5]" style={{ fontFamily: "Segoe UI" }}>
          Codexa<span className="text-[#10B981]">.</span>
        </a>
      </div>

      <div className="links flex items-center gap-10 text-white">
        {isLoggedIn && <Link to="/home">Home</Link>}
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/services">Services</Link>

        {!isLoggedIn && (
          <button onClick={handleGetStarted} className="get-started-btn">
            Get Started
          </button>
        )}

        {isLoggedIn && (
          <div className="avatar-dropdown relative">
            <Avatar
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              name={data?.username || data?.name || "User"}
              size="40"
              round="50%"
              style={{ cursor: "pointer" }}
            />
            <div
              className={`absolute right-0 mt-2 rounded-lg shadow-lg bg-[#1A1919] w-[200px] z-50 p-3 transition-all duration-300 ease-in-out transform ${isDropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
            >
              <div className="py-[10px] border-b border-gray-600 mb-2">
                <h3 className="text-white text-[16px]">{data?.name || "Guest"}</h3>
              </div>

              <div className="flex h-[70px] flex-col justify-center gap-3 text-white">
                <div onClick={toggleLayout} className="flex items-center gap-2 cursor-pointer">
                  {isGridLayout ? <FaThList className="text-[24px]" /> : <IoGrid className="text-[24px]" />}
                  {isGridLayout ? "List Layout" : "Grid Layout"}
                </div>
                <div onClick={handleLogout} className="flex items-center gap-2 cursor-pointer text-red-400">
                  🚪 Logout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
