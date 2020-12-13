

function openPage(pageName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

// Material Select Initialization
$(document).ready(function () {
    $('.mdb-select').materialSelect();
});


function getCurrentTicketDetails() {
    fetch('/getCurrentTicketDetails').then((res) => res.json()).then((data) => {
        console.log(data)
    })
}

function getPreviousTicketDetails() {
    fetch('/getPreviousTicketDetails').then((res) => res.json()).then((data) => {
        console.log(data)
    })
}

function getCancelledTicketDetails() {
    fetch('/getCancelledTicketDetails').then((res) => res.json()).then((data) => {
        console.log(data)
    })
}

function getTicketDetailsByPnr() {
    let pnr = document.getElementById('pnr').value
    var data = {
        pnr: pnr
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    console.log(pnr)
    fetch('/getTicketDetailsByPnr', options).then((res) => res.json()).then((data) => {
        if (data.length > 0)
            console.log(data)
        else
            console.log("No Results Found")
    })
}

function getTicketDetailsByUserid() {
    let uid = document.getElementById('uid').value
    var data = {
        uid: uid
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch('/getTicketDetailsByUserid', options).then((res) => res.json()).then((data) => {
        if (data.length > 0)
            console.log(data)
        else
            console.log("No Results Found")
    })
}

function getFlightDetails() {
    flightContent=``  
    fetch('/getFlightDetails').then((res) => res.json()).then((data) => {
        //console.log(data)   

        return data

    }).then((data) => {

        console.log(data)
        flightContent +=
            ` <table id='flight-table'>
              
              <td id='number'>FLIGHT NUM</td>
              <td id='name'>FLIGHT NAME</td>
              <td id='start'>START</td>
              <td id=via''>VIA</td>
              <td id='end'>END</td>
              <td id='arrival'>ARRIVAL</td>
              <td id='departure'>DEPARTURE</td>
              <td id='price'>PRICE</td>
          
              
            `

        for (let i = 0; i < data.length; i++) {
            flightContent +=
                `<tr>
              <td id='fnum-${i+1}'> ${data[i].flight_num}</td>
              <td id='fname-${i+1}'> ${data[i].flight_name} </td>
              <td id='start-${i+1}'> ${data[i].start}</td>
              <td id='via-${i+1}'> ${data[i].via} </td>
              <td id='end-${i+1}'> ${data[i].end} </td>
              <td id='arrival-${i+1}'> ${data[i].arrival}</td>
              <td id='departure-${i+1}'> ${data[i].departure} </td>
              <td id='price-${i+1}'> ${data[i].price} </td>
              </tr>
            `
        }
        flightContent += `</table>`
        document.getElementById('mainContent-1').innerHTML = flightContent

    })
}

function getUserDetails() {
    let userContent = ''
    fetch('/getUserDetails').then((res) => res.json()).then((data) => {
        console.log(data)
        userContent +=
            ` <table id='user-table'>
              <td id='sno'>User ID</td>
              <td id='arrival'>User Name</td>
              <td id='number'>DOB</td>
              <td id='name'>Email</td>
              <td id='start'>Gender</td>
              <td id=via''>Mobile 1</td>
              <td id='end'>Mobile-2</td>
             
            `

        for (let i = 0; i < data.length; i++) {
            userContent +=
                `<tr>
             <td id='user_id-${i+1}'> ${data[i].user_id}</td>
             <td id='user_name-${i+1}'> ${data[i].user_name} </td>
              <td id='DOB-${i+1}'> ${data[i].DOB}</td>
              <td id='email-${i+1}'> ${data[i].email} </td>
              <td id='gender-${i+1}'> ${data[i].gender}</td>
              <td id='mobile_1-${i+1}'> ${data[i].mobile_1} </td>
              <td id='mobile_2-${i+1}'> ${data[i].mobile_2} </td>
             
              </tr>
            `
        }
        userContent += `</table>`
        document.getElementById('mainContent-2').innerHTML = userContent
    })
}

function getUserDetailsByUserid() {

}

function getPassengerDetails() {
    fetch('/getPassengerDetails').then((res) => res.json()).then((data) => {
        console.log(data)
    })
}

function getPassengerDetailsByPnr() {
    let pnr = document.getElementById('paspnr').value
    var data = {
        pnr: pnr
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    console.log(pnr)
    fetch('/getPassengerDetailsByPnr', options).then((res) => res.json()).then((data) => {
        if (data.length > 0)
            console.log(data)
        else
            console.log("No Results Found")
    })
}


function checkRadioButton() {
    if (document.getElementById('exampleRadios1').checked == true) {
        let uid = document.getElementById('searchQuery').value
        var data = {
            uid: uid
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        fetch('/getUserDetailsByUserid', options).then((res) => res.json()).then((data) => {
            if (data.length > 0)
                console.log(data)
            else
                console.log("No Results Found")
        })
    }
    if (document.getElementById('exampleRadios2').checked == true) {
        let pnr = document.getElementById('searchQuery').value
        var data = {
            pnr: pnr
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        console.log(pnr)
        fetch('/getPassengerDetailsByPnr', options).then((res) => res.json()).then((data) => {
            if (data.length > 0)
                console.log(data)
            else
                console.log("No Results Found")
        })

    }

    if (document.getElementById('exampleRadios3').checked == true) {
        let uid = document.getElementById('searchQuery').value
        var data = {
            uid: uid
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        fetch('/getTicketDetailsByUserid', options).then((res) => res.json()).then((data) => {
            if (data.length > 0)
                console.log(data)
            else
                console.log("No Results Found")
        })

    }
}