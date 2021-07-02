const body = document.body;
const arcSvg = document.getElementById("arc-svg");

function pageSize(){    
    if (window.innerWidth <= window.innerHeight){
        body.classList.add("portrait");
        body.classList.remove("landscape");
        arcSvg.setAttribute("viewBox", "10 -40 220 320");
        arcSvg.setAttribute("preserveAspectRatio", "none");
    }
    else {
        body.classList.remove("portrait");
        body.classList.add("landscape");
        arcSvg.setAttribute("viewBox", "0 -15 235.46 300");
        arcSvg.removeAttribute("preserveAspectRatio");
    }
}

window.onload = pageSize;
window.onresize = pageSize;