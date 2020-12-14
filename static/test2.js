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
    let curTicketContent = ``
    fetch('/getCurrentTicketDetails').then((res) => res.json()).then((data) => {
        console.log(data)
        curTicketContent +=
            ` <table>
          <td>S. No.</td>
          <td>User ID</td>
          <td>PNR</td>
          <td>Flight Number</td>
          <td>Class</td>
          <td>Boarding</td>
          <td>Total Price</td>
          <td>Status</td>
         
        `

        for (let i = 0; i < data.length; i++) {
            curTicketContent +=
                `<tr>
        <td> ${i+1}</td>
         <td> ${data[i].userid}</td>
         <td> ${data[i].PNR} </td>
          <td> ${data[i].flight_num}</td>
          <td> ${data[i].class} </td>
          <td> ${data[i].boarding}</td>
          <td> ${data[i].total_price} </td>
          <td> ${data[i].status} </td>
         
          </tr>
        `
        }
        curTicketContent += `</table>`
        document.getElementById('mainContent-4').innerHTML = curTicketContent
    })
}

function getPreviousTicketDetails() {
    let prevTicketContent = ``
    fetch('/getPreviousTicketDetails').then((res) => res.json()).then((data) => {
        console.log(data)
        prevTicketContent +=
            ` <table>
          <td>S. No.</td>
          <td>User ID</td>
          <td>PNR</td>
          <td>Flight Number</td>
          <td>Class</td>
          <td>Boarding</td>
          <td>Total Price</td>
          <td>Status</td>
         
        `

        for (let i = 0; i < data.length; i++) {
            prevTicketContent +=
                `<tr>
        <td> ${i+1}</td>
         <td> ${data[i].userID}</td>
         <td> ${data[i].pnr} </td>
          <td> ${data[i].flight_num}</td>
          <td> ${data[i].class} </td>
          <td> ${data[i].boarding}</td>
          <td> ${data[i].total_price} </td>
          <td> ${data[i].status} </td>
         
          </tr>
        `
        }
        prevTicketContent += `</table>`
        document.getElementById('mainContent-3').innerHTML = prevTicketContent
    })
}

function getCancelledTicketDetails() {
    let cancTicketContent = ``
    fetch('/getCancelledTicketDetails').then((res) => res.json()).then((data) => {
        console.log(data)
        cancTicketContent +=
            ` <table id='user-table'>
          <td>S. No.</td>
          <td>User ID</td>
          <td>PNR</td>
          <td>Flight Number</td>
          <td>Class</td>
          <td>Boarding</td>
          <td>Total Price</td>
          <td>Status</td>
         
        `

        for (let i = 0; i < data.length; i++) {
            cancTicketContent +=
                `<tr>
        <td> ${i+1}</td>
         <td> ${data[i].userID}</td>
         <td> ${data[i].pnr} </td>
          <td> ${data[i].flight_num}</td>
          <td> ${data[i].class} </td>
          <td> ${data[i].boarding}</td>
          <td> ${data[i].total_price} </td>
          <td> ${data[i].status} </td>
         
          </tr>
        `
        }
        cancTicketContent += `</table>`
        document.getElementById('mainContent-5').innerHTML = cancTicketContent
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
    flightContent = ``
    fetch('/getFlightDetails').then((res) => res.json()).then((data) => {
        //console.log(data)   

        return data

    }).then((data) => {

        console.log(data)
        flightContent +=
            ` <table id='flight-table'>
              <td id='F.Sno'>S. No.</td>
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
              <td id='f_snum-${i+1}'> ${i+1}</td>
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
            ` <table>
            <td>S. No.</td>
              <td>User ID</td>
              <td>User Name</td>
              <td>DOB</td>
              <td>Email</td>
              <td>Gender</td>
              <td>Mobile 1</td>
              <td>Mobile-2</td>
             
            `

        for (let i = 0; i < data.length; i++) {
            userContent +=
                `<tr>
                <td id='u_snum-${i+1}'> ${i+1}</td>
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
    let notFound = `No Results Found`
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById('radioButtonContent').style.display = "block"


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

        let udets = ``
        fetch('/getUserDetailsByUserid', options).then((res) => res.json()).then((data) => {
            if (data.length > 0) {
                console.log(data)
                udets +=
                    ` <table>
                  <td>S. No.</td>
                  <td>User ID</td>
                  <td>User Name</td>
                  <td>DOB</td>
                  <td>Email</td>
                  <td>Gender</td>
                  <td>Mobile 1</td>
                  <td>Mobile-2</td>
                 
                `

                for (let i = 0; i < data.length; i++) {
                    udets +=
                        `<tr>
                <td id='u_snum-${i+1}'> ${i+1}</td>
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
                udets += `</table>`
                document.getElementById('mainContent-6').innerHTML = udets

            } else{
                console.log("No Results Found")
                document.getElementById('mainContent-6').innerHTML = notFound
            }

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

        let pasDetsByPnr = ``
        console.log(pnr)
        fetch('/getPassengerDetailsByPnr', options).then((res) => res.json()).then((data) => {
            if (data.length > 0) {
                console.log(data)
                pasDetsByPnr +=
                    ` <table>
                  <td>S. No.</td>
                  <td>PNR</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Mobile</td>
                  <td>Seat Number 1</td>
                  <td>Gender</td>
                  <td>DOB</td>
                  <td>Boarding</td>

                `

                for (let i = 0; i < data.length; i++) {
                    pasDetsByPnr +=
                        `<tr>
                <td> ${i+1}</td>
             <td> ${data[i].paspnr}</td>
             <td> ${data[i].pname} </td>
              <td> ${data[i].pemail}</td>
              <td> ${data[i].pmobile} </td>
              <td> ${data[i].seat_no}</td>
              <td> ${data[i].gender} </td>
              <td> ${data[i].DOB} </td>
              <td> ${data[i].pas_boarding} </td>
             
              </tr>
            `
                }
                pasDetsByPnr += `</table>`
                document.getElementById('mainContent-6').innerHTML = pasDetsByPnr
            } else{
                console.log("No Results Found")
                document.getElementById('mainContent-6').innerHTML = notFound
            }
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
     
        let tickByUid = ``
        fetch('/getTicketDetailsByUserid', options).then((res) => res.json()).then((data) => {
            if (data[0].length > 0 || data[1].length > 0 || data[2].length > 0) {
                let k = 1
                console.log(data)
                tickByUid +=
                    ` <table>
              <td>S. No.</td>
              <td>Flight Number</td>
              <td>PNR</td>
              <td>Class</td>
              <td>Boarding</td>
              <td>Total Price</td>
              <td>Status</td>
            `

                for (let i = 0; i < data.length; i++) {
                    let tempArr = data[i]
                    console.log(tempArr)


                    for (let j = 0; j < tempArr.length; j++) {
                        tickByUid +=
                            `<tr>
              <td> ${k++}</td>
              <td> ${tempArr[j].flight_num}</td>
              <td> ${tempArr[j].PNR} </td>
              <td> ${tempArr[j].class}</td>
           
              <td> ${tempArr[j].boarding}</td>
              <td> ${tempArr[j].total_price} </td>
              <td> ${tempArr[j].status} </td>
              </tr>
            `
                    }
                }
                tickByUid += `</table>`
                document.getElementById('mainContent-6').innerHTML = tickByUid
            } else{
                console.log("No Results Found")
                document.getElementById('mainContent-6').innerHTML = notFound
            }
        })

    }
}