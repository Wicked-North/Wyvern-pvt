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



let prevBooking = ``
let currBooking = ``
// let cancBooking=``

let toggleCurrent = []
let togglePast = []
// setTimeout(() => {

// }, 1000)

function displayTickets() {

    document.getElementById('loader').style.display='none'
    document.getElementById('data').style.display='block'



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


        currBooking = `<div  onclick='displayPass(${i})'><div id='pnr'>${passArr[0].pnr}</div>
                <div id='company'>${passArr[0].flight_name}</div>
                <div id='sourceDest'>${passArr[0].start}-${passArr[0].via}-${passArr[0].end}</div>
                <div id='class'>${passArr[0].class}</div>
                <div id='price'>${passArr[0].total_price}</div>
                <button id='crossBtn' style='cursor:pointer;'onclick='cancelTicket(${passArr[0].pnr})'>x</button>
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
        //console.log(past.length)
        let pastPassArr = past[i]
        console.log(pastPassArr)

        prevBooking = `<div  onclick='displayPastPass(${i})'><div id='pnr'>${pastPassArr[0].pnr}</div>
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
    }).then((data)=>{
        window.location.reload();
    })
}