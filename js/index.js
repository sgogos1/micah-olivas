const body = document.body;
const arcSvg = document.getElementById("arc-svg");

function pageSize(){    
    if (innerWidth > 750 || innerHeight < innerWidth){
        arcSvg.setAttribute("viewBox", "-60 -40 235.46 300");
        arcSvg.removeAttribute("preserveAspectRatio", "none");
    }
    else {
        arcSvg.setAttribute("viewBox", "-15 -55 150 300");
        arcSvg.setAttribute("preserveAspectRatio", "none");
    }
}
window.onresize = pageSize;

const calendarBody = document.getElementById("ll-calendar-body");
const calendarHeader = document.getElementById("ll-calendar-header");

async function generateCalendar(){
    fetch('../json/events.json')
    .then(response => response.json())
    .then(obj => {
                    let calendarEvents = obj;

                    if (calendarEvents.events && calendarEvents.events.length > 0){
                        for (let i = 0; i < calendarEvents.events.length; i++){
                            const event = calendarEvents.events[i];
                            const date = event.date;
                            const displayTime = event.displayTime;
                            const startTime = event.startTime;
                            const endTime = event.endTime;
                            const location = event.location;
                            const linkToListen = event.linkToListen;

                            let classes = "ll-calendar-element ";
                            if (i === 0){
                                classes += "top-row";
                            }

                            calendarBody.innerHTML += 
                            `<tr class="${classes}" date="${date}" timeStart="${startTime}" timeEnd="${endTime}" location="${location}" linkToListen="${linkToListen}">
                                <td class="ll-date">${date}</td>
                                <td class="ll-location">${displayTime} ${location}</td>
                            </tr>`;
                        }   
                    }
                }
        );
}

async function checkForBroadcasting(){
    let textCreated = false;

    if (calendarBody.children.length > 0){
        const currentTime = new Date();

        for (let i = 0; i < calendarBody.children.length; i++){

            const calendarMonth = Number(calendarBody.children[i].getAttribute("date").slice(0, 2));
            const calendarDay = Number(calendarBody.children[i].getAttribute("date").slice(3, 5));

            const calendarStartTimeHours = Number(calendarBody.children[i].getAttribute("timeStart").slice(0, 2));
            const calendarStartTimeMins = Number(calendarBody.children[i].getAttribute("timeStart").slice(3, 5));

            const calendarEndTimeHours = Number(calendarBody.children[i].getAttribute("timeEnd").slice(0, 2));
            const calendarEndTimeMins = Number(calendarBody.children[i].getAttribute("timeEnd").slice(3, 5));

            if (calendarMonth === currentTime.getMonth()+1 && calendarDay === currentTime.getDate() && !textCreated){
                if (calendarStartTimeHours <= currentTime.getHours() && calendarEndTimeHours >= currentTime.getHours()){
                    if (calendarStartTimeHours === calendarEndTimeHours && currentTime.getMinutes() >= calendarStartTimeMins && currentTime.getMinutes() <= calendarEndTimeMins){
                        const station = calendarBody.children[i].getAttribute("location");
                        calendarHeader.innerHTML = `<div class="blinking-light"></div>Broadcasting now on <a href="${calendarBody.children[i].getAttribute("linkToListen")}">${station}</a>`;
                        textCreated = true;
                        break;
                    }
                    else {
                        if (calendarStartTimeHours !== calendarEndTimeHours){
                            const station = calendarBody.children[i].getAttribute("location");
                            calendarHeader.innerHTML = `<div class="blinking-light"></div>Broadcasting now on <a href="${calendarBody.children[i].getAttribute("linkToListen")}">${station}</a>`;
                            textCreated = true;
                            break;
                        }
                    }
                }
            }
        }
    }

    if (!textCreated){
        calendarHeader.innerHTML = "Next Broadcasts";
    }
    
}

async function loadPage(){
    pageSize();
    generateCalendar();
    await new Promise(r => setTimeout(r, 250));
    checkForBroadcasting();
}

window.onload = loadPage;