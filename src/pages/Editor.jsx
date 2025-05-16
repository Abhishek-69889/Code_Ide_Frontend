import React, { useEffect, useState } from 'react';
import EditiorNavbar from '../components/EditorNavbar';
import Editor from '@monaco-editor/react';
import { MdLightMode } from 'react-icons/md';
import { AiOutlineExpandAlt } from "react-icons/ai";
import { api_base_url } from '../helper';
import { useParams } from 'react-router-dom';

const Editior = () => {
  const [tab, setTab] = useState("html");
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [htmlCode, setHtmlCode] = useState("<h1>Hello world</h1>");
  const [cssCode, setCssCode] = useState("body { background-color: #f4f4f4; }");
  const [jsCode, setJsCode] = useState("// some comment");

  const { projectID } = useParams();

  const changeTheme = () => setIsLightMode(prev => !prev);

  const run = () => {
    const iframe = document.getElementById("iframe");
    if (iframe) {
      iframe.srcdoc = `
        ${htmlCode}
        <style>${cssCode}</style>
        <script>${jsCode}<\/script>
      `;
    }
  };

  useEffect(() => {
    run();
  }, [htmlCode, cssCode, jsCode]);

  useEffect(() => {
    fetch(api_base_url + "/getProjectCode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projId: projectID
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.project) {
          setHtmlCode(data.project.htmlCode || "");
          setCssCode(data.project.cssCode || "");
          setJsCode(data.project.jsCode || "");
        }
      });
  }, [projectID]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        fetch(api_base_url + "/updateProject", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projId: projectID,
            htmlCode,
            cssCode,
            jsCode
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              alert("Project saved successfully");
            } else {
              alert("Something went wrong");
            }
          })
          .catch(err => {
            console.error("Error saving project:", err);
            alert("Failed to save project.");
          });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projectID, htmlCode, cssCode, jsCode]);

  return (
    <>
      <EditiorNavbar />
      <div className={`flex ${isLightMode ? 'bg-[#f4f4f4]' : 'bg-[#141414]'}`}>
        <div className={`${isExpanded ? 'w-full' : 'w-1/2'}`}>
          <div className={`flex items-center justify-between h-[50px] px-10 ${isLightMode ? 'bg-[#f4f4f4]' : 'bg-[#1A1919]'}`}>
            <div className="flex items-center gap-2">
              {["html", "css", "js"].map((lang) => (
                <div
                  key={lang}
                  onClick={() => setTab(lang)}
                  className={`
                    cursor-pointer px-4 py-1 rounded 
                    text-sm font-medium border 
                    ${tab === lang ? 'border-black' : 'border-transparent'}
                    ${isLightMode 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-[#1E1E1E] text-white hover:bg-[#2a2a2a]'}
                  `}
                >
                  {lang.toUpperCase()}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <i
                className={`text-xl cursor-pointer ${isLightMode ? 'text-black' : 'text-white'}`}
                onClick={changeTheme}
              >
                <MdLightMode />
              </i>
              <i
                className={`text-xl cursor-pointer ${isLightMode ? 'text-black' : 'text-white'}`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <AiOutlineExpandAlt />
              </i>
            </div>
          </div>

          {tab === "html" && (
            <Editor
              key="html"
              language="html"
              value={htmlCode}
              onChange={(value) => setHtmlCode(value || "")}
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
            />
          )}
          {tab === "css" && (
            <Editor
              key="css"
              language="css"
              value={cssCode}
              onChange={(value) => setCssCode(value || "")}
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
            />
          )}
          {tab === "js" && (
            <Editor
              key="js"
              language="javascript"
              value={jsCode}
              onChange={(value) => setJsCode(value || "")}
              height="82vh"
              theme={isLightMode ? "vs-light" : "vs-dark"}
            />
          )}
        </div>

        {!isExpanded && (
          <iframe
            id="iframe"
            className="w-1/2 min-h-[82vh] bg-white"
            title="output"
          />
        )}
      </div>
    </>
  );
};

export default Editior;
