let seats = []
let allDetails = []
let flightno = 'ai-443'
let getDetails = {
    fnum: 'ai-443',
    day: 'day1' //filled according to the param in fn
}
let selectedPassengerIndex

//ONCLICKS
function flightSearch() { //date according to day1,day2,day3.....day6

    let getDetails = {
        fnum: 'ai-443',
        day: 'day1' //filled according to the param in fn
    }
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(getDetails)
    }

    fetch('/getSeatDets', options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            seats = data[0].day.split('')
            console.log(seats)
            for (let i = 0; i < 100; i++) {

                if (seats[i] == 1) {
                    console.log(i + 1)
                    document.getElementById(i + 1).disabled = true;
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });


}


// function savePas(){

//     var firstName=document.getElementById('FirstName').value
//     var middleName=document.getElementById('MiddleName').value
//     var lastName=document.getElementById('LastName').value

//     var dob=document.getElementById('start').value
//     var phone=document.getElementById('phone').value
//     var email=document.getElementById('exampleInputEmail1').value


//     passengers.push({
//         flight:flightno,
//         name:firstName+' '+middleName+' '+lastName,
//         dob:dob,
//         phone:phone,
//         email:email,
//         seats:seat

//     })

// }


//ON FINAL CONFIRMATION
function bookSeats() {

    let ticketInfo = {
        type: "economic",
        flight_num: 'ai-443',
        price: 5000,
        userid: "2"
    }


    let seatDets = {
        fnum: 'ai-443',
        seat: seats.join(''), //string
        day: 'day1'
    }
    allDetails.push({
        pass: passengers,
        seats: seatDets,
        ticket: ticketInfo
    })

    const pasOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(allDetails)
    }





    console.log(allDetails)

    //fetch('/bookTickets', ticketOptions)

    fetch('/bookSeats', pasOptions)
}


//FOR EACH SEAT UI CLICK
let j = 0;
let k = 0
let tempObj
let prevSeat

//=============================TEST CODE======================================================
function modifySeats(seatNo) {
    for (let i = 0; i < n; i++) {
        if (passengers[i].seatId == seatNo) {
            window.alert("seat already reserved. Try another seat.")
            document.getElementById(passengers[i].seatId).checked = true
            return
        }
    }

    if (passengers[selectedPassengerIndex].seatId != null) {
        seats[passengers[selectedPassengerIndex].seatId - 1] = 0
        document.getElementById(passengers[selectedPassengerIndex].seatId).checked = false
        // document.getElementById(seatNo).style.pointerEvents="none"
    }
    // if (document.getElementById(seatNo).checked == true) {
    var seatName = document.getElementById(seatNo).nextElementSibling.innerHTML
    passengers[selectedPassengerIndex].seats = seatName
    passengers[selectedPassengerIndex].seatId = seatNo
    seats[seatNo - 1] = 1
    document.getElementById(`s-${selectedPassengerIndex}`).innerHTML = seatName;
}
//==============================================================================================

function passengerSelect(index) {
    selectedPassengerIndex = index
}


function cancelSeats(index) {
    passengerSelect(index)
    let seatIndex = passengers[index].seatId
    document.getElementById(seatIndex).checked = false
    document.getElementById(`s-${selectedPassengerIndex}`).innerHTML = ''

    seats[seatIndex - 1] = 0
}