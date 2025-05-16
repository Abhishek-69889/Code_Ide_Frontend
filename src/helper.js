export const toggleClass = (el,classname)=>{
    let elm = document.querySelector(el);
    elm.classList.toggle(classname)
}

export const removeClass=(el,classname)=>{
    let elm= document.querySelector(el);
    elm.classList.remove(classname)
}

export const api_base_url = "https://code-ide-backend-sev1.onrender.com"; // Use this if not using environment variables
