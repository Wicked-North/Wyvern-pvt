let current = []
let past = []

getTicketsPassengers()

function getTicketsPassengers() {

    var data = {
        userId: sessionStorage.getItem('user_id')
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch('/getCurrentTicketsPassengers', options)
        .then(res => res.json())
        .then((data) => {
            //console.log(data)
            // past=data[1]
            // upcoming=data[0]
            current = [...data]
            console.log(current)

        })
        .then((data) => {
            fetch('/getPastTicketsPassengers', options)
                .then(res => res.json())
                .then(data => {
                    //console.log(data)
                    // past=data[1]
                    // upcoming=data[0]
                    past = [...data]
                    console.log(past)

                })
                .then(data => {
                    displayTickets()
                });
        })
}

// getPastTicketsPassengers()

// function getPastTicketsPassengers() {

//     var data = {
//         userId: sessionStorage.getItem('user_id')
//     }

//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//     };

//     fetch('/getPastTicketsPassengers', options)
//         .then(res => res.json())
//         .then(data => {
//             //console.log(data)
//             // past=data[1]
//             // upcoming=data[0]
//             past = [...data]
//             console.log(past)

//         }).then(data => {
//             displayTickets()
//         });
// }

//animating button on click (binding event to static element again >.<) 

$(document).on('click', '.login-btn', animateBtn)
function animateBtn(){
    $(".login-btn").addClass("animateButton");
    setTimeout(() => {
        $(".login-btn").removeClass("animateButton");

    }, 500)
}


let prevBooking = ``
let currBooking = ``
// let cancBooking=``

let toggleCurrent = []
let togglePast = []
// setTimeout(() => {

// }, 1000)

function displayTickets() {
    for (let i = 0; i < current.length; i++) {
        toggleCurrent[i] = 1
    }

    for (let i = 0; i < past.length; i++) {
        togglePast[i] = 1
    }

    for (let i = 0; i < current.length; i++) {
        let passArr = current[i]
        //console.log(passArr[i])
        console.log(current.length)

        console.log(passArr[0])
        //<div class="company-title">Flight Name : </div>
        currBooking = `
        <div class="content-present-booking content-present-booking-${i}" onclick='displayPass(${i})'>
    <div class="right-div">
        <div class="present-booking-sub-title">
            <div class="pnr-title">PNR-</div>
            <div id='pnr'>${passArr[0].pnr}</div>
        </div>
        <div class="flight-name-title">
            <div class='flight-name'>${passArr[0].flight_name}</div>
            <div class="flight-num">(${passArr[0].flight_num})</div>
        </div>
        <div id='srcviadest'>
            <div class="place">${passArr[0].start}</div> <i class="fas fa-arrow-right icon-via" aria-hidden="true"></i>
            <div class="place">${passArr[0].via} </div> <i class="fas fa-arrow-right icon-via" aria-hidden="true"></i>
            <div class="place">${passArr[0].end}</div>
        </div>
        <div id='class'>${passArr[0].class}</div>
        <div class="time-div">
            <div class="depart-div">
                <div class="depart-title"> Departure Time - </div>
                <div>${passArr[0].departure}</div>
            </div>
            <i class="fas fa-circle"></i>
            <div class="arrival-div">
                <div class="arrival-title"> Arrival Time - </div>
                <div>${passArr[0].arrival}</div>
            </div>

        </div>
        <div class="price-div">
            <div class="price-title"> Total Price : </div>
            <div id='price'>${passArr[0].total_price}</div>
        </div>

        <div id='status'> STATUS: CONFIRMED</div>
    </div>
    <div class="left-div">
        <button class="pass-dets-btn-invisible">
            <a class="pass-dets-btn">
                <svg width="277" height="62">
                    <rect x="5" y="5" rx="2" fill="none" stroke="url(#gradient)" width="235" height="47"></rect>
                </svg>
                <span>Passenger Details</span>
            </a>
        </button>
        <button class="login-btn-invisible">
            <a class="login-btn">
                <svg width="277" height="62">
                    <rect x="5" y="5" rx="2" fill="none" stroke="url(#gradient)" width="235" height="47"></rect>
                </svg>
                <span>Cancel Booking</span>
            </a>
        </button>
        <button id='crossBtn' style='cursor:pointer; display:none;' onclick='cancelTicket(${passArr[0].pnr})'>x</button>
    </div>
    

</div>
<div id='pasDet-${i}' class="pass-details" style='display:none'></div>
                
                `

        document.getElementById('currentBookings').innerHTML += currBooking;

        let passDets = ``
        for (var k = 0; k < passArr.length; k++) {

            passDets = `
            
            <div class="pass-division pass-div-${k}">
            <div class="name-div">
            <div class="name-title">Name -</div>
            <div id='name'>${passArr[k].pname}</div>
        </div>
        <i class="fas fa-circle"></i>
        <div class="seatno-div">
            <div class="seatno-title">Seat Number -</div>
            <div id='seat'>${passArr[k].seat_no}</div>
        </div>
        <i class="fas fa-circle"></i>
        <div class="gender-div">
            <div class="gender-title">Gender -</div>
            <div id='gender'>${passArr[k].gender}</div>
        </div>
        <i class="fas fa-circle"></i>
        <div class="dob-div">
            <div class="dob-title">Date Of Birth -</div>
            <div id='dob'>${passArr[k].dob}</div>
        </div>
        </div>
            `
            document.getElementById(`pasDet-${i}`).innerHTML += passDets;


        }
    }

    ////////////////////////////////////////////

    for (var i = 0; i < past.length; i++) {
        //console.log(past.length)
        let pastPassArr = past[i]
        console.log(pastPassArr)

        prevBooking = `<div  onclick='displayPastPass(${i})'>
                <div id='pnr'>${pastPassArr[0].pnr}</div>
                <div id='company'>${pastPassArr[0].flight_name}</div>
                <div id='sourceDest'>${pastPassArr[0].start}-${pastPassArr[0].via}-${pastPassArr[0].end}</div>
                <div id='class'>${pastPassArr[0].class}</div>
                <div id='price'>${pastPassArr[0].total_price}</div>
                <div id='status'>${pastPassArr[0].status}</div>
                <div id='pastPasDet-${i}' style='display:none'></div>
                </div>                
                `

        document.getElementById('prevBookings').innerHTML += prevBooking;

        let pastPassDets = ``
        for (var k = 0; k < pastPassArr.length; k++) {

            pastPassDets = `<div id='name'>${pastPassArr[k].pname}</div>
            <div id='seat'>${pastPassArr[k].seat_no}</div>
            <div id='gender'>${pastPassArr[k].gender}</div>
            <div id='dob'>${pastPassArr[k].dob}</div>
            `
            document.getElementById(`pastPasDet-${i}`).innerHTML += pastPassDets;


        }
    }



    // document.getElementById('prevBookings').innerHTML = prevBooking;
    // document.getElementById('cancelledBookings').innerHTML=cancBooking;



}

function displayPass(i) {
    if (toggleCurrent[i]) {
        document.getElementById(`pasDet-${i}`).style.display = 'flex'
        toggleCurrent[i] = false
    } else {
        document.getElementById(`pasDet-${i}`).style.display = 'none'
        toggleCurrent[i] = true
    }

}

function displayPastPass(i) {
    if (togglePast[i]) {
        document.getElementById(`pastPasDet-${i}`).style.display = 'block'
        togglePast[i] = false
    } else {
        document.getElementById(`pastPasDet-${i}`).style.display = 'none'
        togglePast[i] = true
    }

}

function cancelTicket(pnr) {

    var data = {
        pnr: pnr
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch('/cancelTickets', options).then(res => res.json()).then((data) => {
        if (data.message == 'cancelled') {
            window.alert('Cancelled Successfully')
        }
        return
    }).then((data) => {
        window.location.reload();
    })
}

