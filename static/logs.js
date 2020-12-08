let current = []
let past = []

getCurrentTicketsPassengers()

function getCurrentTicketsPassengers() {

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
        .then(data => {
            //console.log(data)
            // past=data[1]
            // upcoming=data[0]
            current = [...data]
            console.log(current)

        });
}

getPastTicketsPassengers()

function getPastTicketsPassengers() {

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

    fetch('/getPastTicketsPassengers', options)
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            // past=data[1]
            // upcoming=data[0]
            past = [...data]
            console.log(past)

        }).then(data => {
            displayTickets()
        });
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

    for (var i = 0; i < current.length; i++) {
        let passArr = current[i]

        currBooking = `<div  onclick='displayPass(${i})'><div id='pnr'>${passArr[i].pnr}</div>
                <div id='company'>${passArr[i].flight_name}</div>
                <div id='sourceDest'>${passArr[i].start}-${passArr[i].via}-${passArr[i].end}</div>
                <div id='class'>${passArr[i].class}</div>
                <div id='price'>${passArr[i].total_price}</div>
                <div id='status'> STATUS: CONFIRMED</div>
                <div id='pasDet-${i}' style='display:none'></div>
                <hr><hr></div>
                
                `

        document.getElementById('currentBookings').innerHTML += currBooking;

        let passDets = ``
        for (var k = 0; k < passArr.length; k++) {

            passDets = `<div id='name'>${passArr[k].pname}</div>
            <div id='seat'>${passArr[k].seat_no}</div>
            <div id='gender'>${passArr[k].gender}</div>
            <div id='dob'>${passArr[k].dob}</div><hr>
            `
            document.getElementById(`pasDet-${i}`).innerHTML += passDets;


        }
    }

    ////////////////////////////////////////////

    for (var i = 0; i < past.length; i++) {
        let pastPassArr = past[i]

        prevBooking = `<div  onclick='displayPastPass(${i})'><div id='pnr'>${pastPassArr[i].pnr}</div>
                <div id='company'>${pastPassArr[i].flight_name}</div>
                <div id='sourceDest'>${pastPassArr[i].start}-${pastPassArr[i].via}-${pastPassArr[i].end}</div>
                <div id='class'>${pastPassArr[i].class}</div>
                <div id='price'>${pastPassArr[i].total_price}</div>
                <div id='status'> STATUS: COMPLETED</div>
                <div id='pastPasDet-${i}' style='display:none'></div>
                <hr><hr></div>
                
                `

        document.getElementById('prevBookings').innerHTML += prevBooking;

        let pastPassDets = ``
        for (var k = 0; k < pastPassArr.length; k++) {

            pastPassDets = `<div id='name'>${pastPassArr[k].pname}</div>
            <div id='seat'>${pastPassArr[k].seat_no}</div>
            <div id='gender'>${pastPassArr[k].gender}</div>
            <div id='dob'>${pastPassArr[k].dob}</div><hr>
            `
            document.getElementById(`pastPasDet-${i}`).innerHTML += pastPassDets;


        }
    }



    // document.getElementById('prevBookings').innerHTML = prevBooking;
    // document.getElementById('cancelledBookings').innerHTML=cancBooking;



}

function displayPass(i) {
    if (toggleCurrent[i]) {
        document.getElementById(`pasDet-${i}`).style.display = 'block'
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