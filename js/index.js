const body = document.body;

function pageSize(){    
    if (window.innerWidth <= window.innerHeight){
        body.classList.add("portrait");
        body.classList.remove("landscape");
    }
    else {
        body.classList.remove("portrait");
        body.classList.add("landscape");
    }
}

window.onload = pageSize;
window.onresize = pageSize;