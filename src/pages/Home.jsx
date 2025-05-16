import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ListCard from '../components/ListCard';
import GridCard from '../components/GridCard';
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isGridLayout, setIsGridLayout] = useState(() => {
    const savedLayout = localStorage.getItem("layout");
    return savedLayout === "grid"; // default to list layout (false)
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();

  const createProject = (e) => {
    if (title.trim() === "") {
      alert("Please enter a valid Title");
    } else {
      fetch(api_base_url + "/createProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          userId: localStorage.getItem("userId"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            setIsModalOpen(false);
            setTitle("");
            alert("Project created successfully");
            navigate(`/editor/${data.projectID}`);
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => {
          console.error("Error in fetch:", err);
          alert("Something went wrong");
        });
    }
  };

  const getproject = () => {
    fetch(api_base_url + "/getProjects", {
      mode: "cors",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setData(data.project);
        } else {
          setError(data.message);
        }
      });
  };

  useEffect(() => {
    getproject();
  }, []);

  const filteredData = data?.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Load theme mode on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setIsDarkMode(storedTheme === "dark");
  }, []);

  // Sync theme mode to body and localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      document.body.style.transition = "background-color 0.4s ease";
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      document.body.style.transition = "background-color 0.4s ease";
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Sync layout mode to localStorage
  useEffect(() => {
    localStorage.setItem("layout", isGridLayout ? "grid" : "list");
  }, [isGridLayout]);

  return (
    <>
      <Navbar
        isGridLayout={isGridLayout}
        setIsGridLayout={setIsGridLayout}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <div className="home">
        <div className="flex items-center justify-between px-[100px]">
          <h2 className="text-2xl">Hi, <span className="text-[28px] font-bold text-[#4F46E5]" style={{ fontFamily: "Segoe UI" }}>Coder 🙋 </span></h2>

          <div className="flex items-center gap-1">
            <div className="inputBox !w-[350px]">
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search here....!"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btnBlue btn-Home round-lg text-[20px] cursor-pointer !px-[10px]"
            >
              +
            </button>
          </div>
        </div>

        <div className="cards">
          {isGridLayout ? (
            <div className="grid px-[100px]">
              {filteredData &&
                filteredData.map((item, index) => (
                  <GridCard key={index} item={item} />
                ))}
            </div>
          ) : (
            <div className="list px-[100px]">
              {filteredData &&
                filteredData.map((item, index) => (
                  <ListCard key={index} item={item} />
                ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="createModelCont fixed top-0 right-0 left-0 bottom-0 w-screen h-screen bg-[rgb(0,0,0,0.1)] flex items-center justify-center">
          <div className="createModel w-[25vw] h-[25vh] shadow-lg shadow-black/50 bg-[#141414] rounded-[10px] p-5">
            <h3 className="text-2xl mb-4">Create New Project</h3>
            <div className="inputBox !bg-[#202020]">
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Project Title"
              />
            </div>

            <div className="dblbtn flex w-full items-center gap-[10px]">
              <button
                onClick={createProject}
                className="rounded-lg bg-[#00AEFF] text-white min-w-[49%] h-[40px] text-xl cursor-pointer"
              >
                Create
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg bg-[#1A1919] text-white min-w-[49%] h-[40px] text-xl cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
