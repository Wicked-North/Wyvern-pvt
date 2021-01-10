openPage('Home', document.getElementById('flightTab'), '#323233');
getFlightDetails()

let flights
let fnum
let fname
let start
let via
let end
let departure
let arrival
let e_price
let b_price
let places = ['kolkata', 'bangalore', 'mumbai', 'hyderabad', 'delhi', 'jaipur', 'ahmedabad', "null"]

var placesObj = {
    kolkata: 0,
    bangalore: 1,
    mumbai: 2,
    hyderabad: 3,
    delhi: 4,
    jaipur: 5,
    ahmedabad: 6
}

function openPage(pageName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    for (let i = 0; i < 4; i++) {
        document.getElementById(`exampleRadios${i+1}`).checked = false
    }
    document.getElementById('searchQuery').value = ''

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
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorisation": "Bearer " + sessionStorage.getItem('token')
        }
    }
    let curTicketContent = ``
    fetch('/getCurrentTicketDetails', options).then((res) => res.json()).then((data) => {
        console.log(data)
        curTicketContent +=
            ` <table>
            
          <th>S. No.</th>
          <th>User ID</th>
          <th>PNR</th>
          <th>Flight Number</th>
          <th>Class</th>
          <th>Boarding</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Transaction No</th>

          
         
        `

        for (let i = 0; i < data.length; i++) {
            if (i % 2 == 0) {
                curTicketContent +=
                    `<tr class='even'>
        <td> ${i+1}</td>
         <td> ${data[i].userid}</td>
         <td> ${data[i].PNR} </td>
          <td> ${data[i].flight_num}</td>
          <td> ${data[i].class} </td>
          <td> ${data[i].boarding}</td>
          <td> ${data[i].total_price} </td>
          <td> ${data[i].status} </td>
          <td> ${data[i].txn_no} </td>

         
          </tr>
        `
            } else {
                curTicketContent +=
                    `<tr class='odd'>
        <td> ${i+1}</td>
         <td> ${data[i].userid}</td>
         <td> ${data[i].PNR} </td>
          <td> ${data[i].flight_num}</td>
          <td> ${data[i].class} </td>
          <td> ${data[i].boarding}</td>
          <td> ${data[i].total_price} </td>
          <td> ${data[i].status} </td>
          <td> ${data[i].txn_no} </td>

         
          </tr>
        `
            }
        }
        curTicketContent += `</table>`
        document.getElementById('mainContent-4').innerHTML = curTicketContent
    })
}

function getPreviousTicketDetails() {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorisation": "Bearer " + sessionStorage.getItem('token')
        }
    }
    let prevTicketContent = ``

    fetch('/getPreviousTicketDetails', options).then((res) => res.json()).then((data) => {
        console.log(data)
        prevTicketContent +=
            ` <table>
          <th>S. No.</th>
          <th>User ID</th>
          <th>PNR</th>
          <th>Flight Number</th>
          <th>Class</th>
          <th>Boarding</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Transaction No</th>
         
        `

        for (let i = 0; i < data.length; i++) {
            if (i % 2 == 0) {
                prevTicketContent +=
                    `<tr class='even'>
        <td> ${i+1}</td>
         <td> ${data[i].userid}</td>
         <td> ${data[i].PNR} </td>
          <td> ${data[i].flight_num}</td>
          <td> ${data[i].class} </td>
          <td> ${data[i].boarding}</td>
          <td> ${data[i].total_price} </td>
          <td> ${data[i].status} </td>
          <td> ${data[i].txn_no} </td>

         
          </tr>
        `
            } else {
                prevTicketContent +=
                    `<tr class='odd'>
        <td> ${i+1}</td>
         <td> ${data[i].userid}</td>
         <td> ${data[i].PNR} </td>
          <td> ${data[i].flight_num}</td>
          <td> ${data[i].class} </td>
          <td> ${data[i].boarding}</td>
          <td> ${data[i].total_price} </td>
          <td> ${data[i].status} </td>
          <td> ${data[i].txn_no} </td>

         
          </tr>
        `
            }
        }
        prevTicketContent += `</table>`
        document.getElementById('mainContent-3').innerHTML = prevTicketContent
    })
}

function getCancelledTicketDetails() {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorisation": "Bearer " + sessionStorage.getItem('token')
        }
    }
    let cancTicketContent = ``
    fetch('/getCancelledTicketDetails', options).then((res) => res.json()).then((data) => {
        console.log(data)
        cancTicketContent +=
            ` <table id='user-table'>
          <th>S. No.</th>
          <th>User ID</th>
          <th>PNR</th>
          <th>Flight Number</th>
          <th>Class</th>
          <th>Boarding</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Transaction No</th>

         
        `

        for (let i = 0; i < data.length; i++) {


            if (i % 2 == 0) {
                cancTicketContent +=
                    `<tr class='even'>
        <td> ${i+1}</td>
         <td> ${data[i].userid}</td>
         <td> ${data[i].PNR} </td>
          <td> ${data[i].flight_num}</td>
          <td> ${data[i].class} </td>
          <td> ${data[i].boarding}</td>
          <td> ${data[i].total_price} </td>
          <td> ${data[i].status} </td>
          <td> ${data[i].txn_no} </td>

         
          </tr>
        `
            } else {
                cancTicketContent +=
                    `<tr class='odd'>
        <td> ${i+1}</td>
         <td> ${data[i].userid}</td>
         <td> ${data[i].PNR} </td>
          <td> ${data[i].flight_num}</td>
          <td> ${data[i].class} </td>
          <td> ${data[i].boarding}</td>
          <td> ${data[i].total_price} </td>
          <td> ${data[i].status} </td>
          <td> ${data[i].txn_no} </td>

         
          </tr>
        `
            }

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
            "Content-Type": "application/json",
            "Authorisation": "Bearer " + sessionStorage.getItem('token')
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
            "Content-Type": "application/json",
            "Authorisation": "Bearer " + sessionStorage.getItem('token')
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
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorisation": "Bearer " + sessionStorage.getItem('token')
        }
    }
    flightContent = ``
    fetch('/getFlightDetails', options).then((res) => res.json()).then((data) => {
        //console.log(data)   

        return data

    }).then((data) => {
        flights = data.slice()
        console.log(data)
        flightContent +=
            ` <table id='flight-table'>
              <th id='F.Sno'>S. No.</th>
              <th id='number'>FLIGHT NUM</th>
              <th id='name'>FLIGHT NAME</th>
              <th id='start'>START</th>
              <th id=via''>VIA</th>
              <th id='end'>END</th>           
              <th id='departure'>DEPARTURE</th>
              <th id='arrival'>ARRIVAL</th>
              <th id='e_price'>ECONOMY PRICE</th>
              <th id='b_price'>BUSINESS PRICE</th>
              <th id='adminPanel'>&nbsp;&nbsp;&nbsp;PANEL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
          
              
            `

        for (let i = 0; i < data.length; i++) {

            if (i % 2 == 0) {

                flightContent +=
                    `<tr class='even'>
              <td id='f_snum-${i+1}'>${i+1}</td>
              <td id='fnum-${i+1}'>${data[i].flight_num}</td>
              <td id='fname-${i+1}'>${data[i].flight_name}</td>
              <td id='start-${i+1}'>${data[i].start}</td>
              <td id='via-${i+1}'>${data[i].via}</td>
              <td id='end-${i+1}'>${data[i].end}</td>             
              <td id='departure-${i+1}'>${data[i].departure} </td>
              <td id='arrival-${i+1}'>${data[i].arrival}</td>
              <td id='e_price-${i+1}'>${data[i].e_price}</td>
              <td id='b_price-${i+1}'>${data[i].b_price}</td>

              <td class='adminPanel'><i class="far fa-trash-alt" id='${data[i].flight_num}' onclick='deleteFlight(this.id)' style='cursor:pointer'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-wrench" id='${i+1}' onclick='updateFlight(this.id)' style='cursor:pointer'></i>
              <button class='buttonUpdate' id="button1-${i+1}" onclick='updateInDb(this.id)' style="display:none;padding:none;margin:0px"><i class="fa fa-check" style="font-size:16px;width:15px"></i></button>
              <button class='deleteUpdate' id="button2-${i+1}" onclick='cancelUpdate(this.id)' style="display:none;width:30.97px;height:29.31px"><i class="fa fa-close" style="font-size:16px"></i></button><td>
              </tr>
            `
            } else {
                flightContent +=
                    `<tr class='odd'>
              <td id='f_snum-${i+1}'>${i+1}</td>
              <td id='fnum-${i+1}'>${data[i].flight_num}</td>
              <td id='fname-${i+1}'>${data[i].flight_name}</td>
              <td id='start-${i+1}'>${data[i].start}</td>
              <td id='via-${i+1}'>${data[i].via}</td>
              <td id='end-${i+1}'>${data[i].end}</td>            
              <td id='departure-${i+1}'>${data[i].departure}</td>
              <td id='arrival-${i+1}'>${data[i].arrival}</td>
              <td id='e_price-${i+1}'>${data[i].e_price}</td>
              <td id='b_price-${i+1}'>${data[i].b_price}</td>
              <td class='adminPanel'><i class="far fa-trash-alt" id='${data[i].flight_num}' onclick='deleteFlight(this.id)' style='cursor:pointer'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-wrench" id='${i+1}' onclick='updateFlight(this.id)' style='cursor:pointer'></i>
              <button class='buttonUpdate' id="button1-${i+1}" onclick='updateInDb(this.id)' style="display:none;padding:none;"><i class="fa fa-check" style="font-size:16px;width:15px"></i></button>
              <button class='deleteUpdate' id="button2-${i+1}" onclick='cancelUpdate(this.id)' style="display:none;width:30.97px;height:29.31px"><i class="fa fa-close" style="font-size:16px"></i></button><td>
              </tr>
            `

            }



        }
        flightContent += `</table>`
        document.getElementById('mainContent-1').innerHTML = flightContent

    })
}

function deleteFlight(fnum) {
    console.log(fnum)
    let ask = window.confirm('Are you sure you want to delete the flight')
    if (ask == true) {

        var data = {
            fnum: fnum
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorisation": "Bearer " + sessionStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }
        //console.log(pnr)
        fetch('/deleteFlight', options).then((data) => {
            console.log('1')
            window.location.reload()
        })

    } else {
        return
    }
}

function insertFlight() {
    let fname = document.getElementById('flightName').value
    let fnum = document.getElementById('flightName').value.slice(0, 2) + '-' + document.getElementById('fnum').value
    let start = document.getElementById('start').value
    let end = document.getElementById('end').value
    let departure = document.getElementById('dep').value
    let arrival = document.getElementById('arri').value
    let e_price = document.getElementById('e_price').value
    let b_price = document.getElementById('b_price').value


    if (document.getElementById(`via`).value == null || document.getElementById(`via`).value == 'null') {
        var via = null
    } else {
        var via = document.getElementById(`via`).value
    }

    if (start == via || via == end || start == end) {
        window.alert("Please enter different values for start, via and end")
        return
    }


    var data = {
        fname,
        fnum,
        start,
        via,
        end,
        departure,
        arrival,
        e_price,
        b_price
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorisation": "Bearer " + sessionStorage.getItem('token')
        },
        body: JSON.stringify(data)
    }
    //console.log(pnr)
    fetch('/insertFlight', options).then((res) => res.json()).then((data) => {
        if (data.message == "error") {
            window.alert('An error has occured. Please fill the fields correctly.')
        } else {
            console.log('1')
            window.alert('inserted successfully')
            window.location.reload()
        }
    })




}

function getUserDetails() {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorisation": "Bearer " + sessionStorage.getItem('token')
        }
    }
    let userContent = ''
    fetch('/getUserDetails', options).then((res) => res.json()).then((data) => {
        console.log(data)
        userContent +=
            ` <table>
            <th>S. No.</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Mobile 1</th>
              <th>Mobile-2</th>
             
            `

        for (let i = 0; i < data.length; i++) {

            if (i % 2 == 0) {
                userContent +=
                    `<tr class='even'>
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
            } else {
                userContent +=
                    `<tr class='odd'>
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

        }
        userContent += `</table>`
        document.getElementById('mainContent-2').innerHTML = userContent
    })
}


function checkRadioButton() {

    if (document.getElementById('exampleRadios1').checked == false && document.getElementById('exampleRadios2').checked == false && document.getElementById('exampleRadios3').checked == false && document.getElementById('exampleRadios4').checked == false) {
        return
    }


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
                "Content-Type": "application/json",
                "Authorisation": "Bearer " + sessionStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }

        let udets = ``
        fetch('/getUserDetailsByUserid', options).then((res) => res.json()).then((data) => {
            if (data.length > 0) {
                console.log(data)
                udets +=
                    ` <table>
                  <th>S. No.</th>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>DOB</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Mobile 1</th>
                  <th>Mobile-2</th>
                 
                `

                for (let i = 0; i < data.length; i++) {


                    if (i % 2 == 0) {
                        udets +=
                            `<tr class='even'>
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
                    } else {
                        udets +=
                            `<tr class='odd'>
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

                }
                udets += `</table>`
                document.getElementById('mainContent-6').innerHTML = udets

            } else {
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
                "Content-Type": "application/json",
                "Authorisation": "Bearer " + sessionStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }

        let pasDetsByPnr = ``
        console.log(pnr)
        fetch('/getPassengerDetailsByPnr', options).then((res) => res.json()).then((data) => {
            if (data[0].length > 0) {
                console.log(data)
                pasDetsByPnr +=
                    ` <table>
                  <th>S. No.</th>
                  <th>PNR</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Seat Number 1</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>Boarding</th>
                `

                for (let i = 0; i < data[0].length; i++) {
                    pasDetsByPnr +=
                        `<tr>
                <td> ${i+1}</td>
             <td> ${data[0][i].paspnr}</td>
             <td> ${data[0][i].pname} </td>
              <td> ${data[0][i].pemail}</td>
              <td> ${data[0][i].pmobile} </td>
              <td> ${data[0][i].seat_no}</td>
              <td> ${data[0][i].gender} </td>
              <td> ${data[0][i].DOB} </td>
              <td> ${data[0][i].pas_boarding} </td>
             
              </tr>
            `
                }
                pasDetsByPnr += `</table>`
                document.getElementById('mainContent-6').innerHTML = pasDetsByPnr
            } else if (data[1].length > 0) {
                console.log(data)
                pasDetsByPnr +=
                    ` <table>
                  <th>S. No.</th>
                  <th>PNR</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Seat Number 1</th>
                  <th>Gender</th>
                  <th>DOB</th>
                  <th>Boarding</th>
                `

                for (let i = 0; i < data[1].length; i++) {
                    pasDetsByPnr +=
                        `<tr>
                <td> ${i+1}</td>
             <td> ${data[1][i].paspnr}</td>
             <td> ${data[1][i].pname} </td>
              <td> ${data[1][i].pemail}</td>
              <td> ${data[1][i].pmobile} </td>
              <td> ${data[1][i].seat_no}</td>
              <td> ${data[1][i].gender} </td>
              <td> ${data[1][i].DOB} </td>
              <td> ${data[1][i].pas_boarding} </td>
             
              </tr>
            `
                }
                pasDetsByPnr += `</table>`
                document.getElementById('mainContent-6').innerHTML = pasDetsByPnr

            } else {
                console.log("No Results Found")
                document.getElementById('mainContent-6').innerHTML = notFound
            }
            console.log(data)
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
                "Content-Type": "application/json",
                "Authorisation": "Bearer " + sessionStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }

        let tickByUid = ``
        fetch('/getTicketDetailsByUserid', options).then((res) => res.json()).then((data) => {
            if (data[0].length > 0 || data[1].length > 0 || data[2].length > 0) {
                let k = 0
                console.log(data)
                tickByUid +=
                    ` <table>
              <th>S. No.</th>
              <th>Flight Number</th>
              <th>PNR</th>
              <th>Class</th>
              <th>Boarding</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Transaction No</th>

            `

                let y = 0
                for (let i = 0; i < data.length; i++) {
                    let tempArr = data[i]
                    console.log(tempArr)


                    for (let j = 0; j < tempArr.length; j++) {

                        y++
                        if (y % 2 == 0) {
                            tickByUid +=
                                `<tr class='even'>
            <td> ${++k}</td>
            <td> ${tempArr[j].flight_num}</td>
            <td> ${tempArr[j].PNR} </td>
            <td> ${tempArr[j].class}</td>
        
            <td> ${tempArr[j].boarding}</td>
            <td> ${tempArr[j].total_price} </td>
            <td> ${tempArr[j].status} </td>
            <td> ${tempArr[j].txn_no} </td>

            </tr>
            `
                        } else {
                            tickByUid +=
                                `<tr  class='odd'>
            <td> ${++k}</td>
            <td> ${tempArr[j].flight_num}</td>
            <td> ${tempArr[j].PNR} </td>
            <td> ${tempArr[j].class}</td>
        
            <td> ${tempArr[j].boarding}</td>
            <td> ${tempArr[j].total_price} </td>
            <td> ${tempArr[j].status} </td>
            <td> ${tempArr[j].txn_no} </td>

            </tr>
            `
                        }

                    }
                }
                tickByUid += `</table>`
                document.getElementById('mainContent-6').innerHTML = tickByUid
            } else {
                console.log("No Results Found")
                document.getElementById('mainContent-6').innerHTML = notFound
            }
        })

    }

    if (document.getElementById('exampleRadios4').checked == true) {
        let pnr = document.getElementById('searchQuery').value
        var data = {
            pnr: pnr
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorisation": "Bearer " + sessionStorage.getItem('token')
            },
            body: JSON.stringify(data)
        }
        console.log(pnr)
        let tickByPnr = ``
        fetch('/getTicketDetailsByPnr', options).then((res) => res.json()).then((data) => {
            if (data.length > 0) {
                console.log(data)
                tickByPnr +=
                    `<table>
                <th>S. No.</th>
                <th>Flight Number</th>
                <th>User ID</th>
                <th>PNR</th>
                <th>Class</th>
                <th>Boarding</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Transaction No</th>

              `


                for (let i = 0; i < data.length; i++) {
                    tickByPnr +=
                        `<tr>
                <td> ${i+1}</td>
             <td id='odd'> ${data[i].flight_num}</td>
             <td> ${data[i].userid} </td>
              <td id='odd'> ${data[i].PNR}</td>
              <td> ${data[i].class} </td>
              <td id='odd'> ${data[i].boarding} </td>
              <td> ${data[i].total_price} </td>
              <td id='odd'> ${data[i].status} </td>
              <td> ${data[i].txn_no} </td>

             
              </tr>
            `
                }
                tickByPnr += `</table>`
                document.getElementById('mainContent-6').innerHTML = tickByPnr
            } else {
                console.log("No Results Found")
                document.getElementById('mainContent-6').innerHTML = notFound
            }
        })

    }


}


function searchSeats() {
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById('radioButtonContent').style.display = "block"


    var flightnum = document.getElementById('search4').value
    var date = document.getElementById('birthday').value.replace(/\//g, "-");
    console.log(date)

    var obj = {
        fnum: flightnum,
        date: date
    }

    const seatsObj = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorisation": "Bearer " + sessionStorage.getItem('token')

        },
        body: JSON.stringify(obj)
    }

    fetch('/getSeats', seatsObj)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            var seats = data[0].day.split('')
            console.log(seats)

            var seatDetails = `
<ol class="cabin">
							<li class="row row--1">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox"   id="s-1" />
										<label for="1" id='l-1'>A1</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-2" />
										<label for="2" id='l-2'>A2</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-3" />
										<label for="3" id='l-3'>A3</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-4" />
										<label for="4" id='l-4'>A4</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-5" />
										<label for="5" id='l-5'>A5</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-6" />
										<label for="6" id='l-6'>A6</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-7" />
										<label for="7" id='l-7'>A7</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-8" />
										<label for="8" id='l-8'>A8</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-9" />
										<label for="9" id='l-9'>A9</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-10" />
										<label for="10" id='l-10'>A10</label>
									</li>
								</ol>
							</li>
							<li class="row row--2">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox"   id="s-11" />
										<label for="11" id='l-11'>B1</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-12" />
										<label for="12" id='l-12'>B2</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-13" />
										<label for="13" id='l-13'>B3</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-14" />
										<label for="14" id='l-14'>B4</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-15" />
										<label for="15" id='l-15'>B5</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-16" />
										<label for="16" id='l-16'>B6</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-17" />
										<label for="17" id='l-17'>B7</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-18" />
										<label for="18" id='l-18'>B8</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-19" />
										<label for="19" id='l-19'>B9</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-20" />
										<label for="20" id='l-20'>B10</label>
									</li>
								</ol>
							</li>
							<li class="row row--3">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox"   id="s-21" />
										<label for="21" id='l-21'>C1</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-22" />
										<label for="22" id='l-22'>C2</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-23" />
										<label for="23" id='l-23'>C3</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-24" />
										<label for="24" id='l-24'>C4</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-25" />
										<label for="25" id='l-25'>C5</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-26" />
										<label for="26" id='l-26'>C6</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-27" />
										<label for="27" id='l-27'>C7</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-28" />
										<label for="28" id='l-28'>C8</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-29" />
										<label for="29" id='l-29'>C9</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-30" />
										<label for="30" id='l-30'>C10</label>
									</li>
								</ol>
							</li> <br><br>
							<li class="row row--1">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox"   id="s-31" />
										<label for="31" id='l-31'>D1</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-32" />
										<label for="32" id='l-32'>D2</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-33" />
										<label for="33" id='l-33'>D3</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-34" />
										<label for="34" id='l-34'>D4</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-35" />
										<label for="35" id='l-35'>D5</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-36" />
										<label for="36" id='l-36'>D6</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-37" />
										<label for="37" id='l-37'>D7</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-38" />
										<label for="38" id='l-38'>D8</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-39" />
										<label for="39" id='l-39'>D9</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-40" />
										<label for="40" id='l-40'>D10</label>
									</li>
								</ol>
							</li>
							<li class="row row--1">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox"   id="s-41" />
										<label for="41" id='l-41'>E1</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-42" />
										<label for="42" id='l-42'>E2</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-43" />
										<label for="43" id='l-43'>E3</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-44" />
										<label for="44" id='l-44'>E4</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-45" />
										<label for="45" id='l-45'>E5</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-46" />
										<label for="46" id='l-46'>E6</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-47" />
										<label for="47" id='l-47'>E7</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-48" />
										<label for="48" id='l-48'>E8</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-49" />
										<label for="49" id='l-49'>E9</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-50" />
										<label for="50" id='l-50'>E10</label>
									</li>
								</ol>
							</li>
							<li class="row row--1">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox"   id="s-51" />
										<label for="51" id='l-51'>F1</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-52" />
										<label for="52" id='l-52'>F2</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-53" />
										<label for="53" id='l-53'>F3</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-54" />
										<label for="54" id='l-54'>F4</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-55" />
										<label for="55" id='l-55'>F5</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-56" />
										<label for="56" id='l-56'>F6</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-57" />
										<label for="57" id='l-57'>F7</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-58" />
										<label for="58" id='l-58'>F8</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-59" />
										<label for="59" id='l-59'>F9</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-60" />
										<label for="60" id='l-60'>F10</label>
									</li>
								</ol>
							</li>
							<br><br>
							<li class="row row--1">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox"   id="s-61" />
										<label for="61" id='l-61'>G1</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-62" />
										<label for="62" id='l-62'>G2</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-63" />
										<label for="63" id='l-63'>G3</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-64" />
										<label for="64" id='l-64'>G4</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-65" />
										<label for="65" id='l-65'>G5</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-66" />
										<label for="66" id='l-66'>G6</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-67" />
										<label for="67" id='l-67'>G7</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-68" />
										<label for="68" id='l-68'>G8</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-69" />
										<label for="69" id='l-69'>G9</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-70" />
										<label for="70" id='l-70'>G10</label>
									</li>
								</ol>
							</li>
							<li class="row row--1">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox"   id="s-71" />
										<label for="71" id='l-71'>H1</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-72" />
										<label for="72" id='l-72'>H2</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-73" />
										<label for="73" id='l-73'>H3</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-74" />
										<label for="74" id='l-74'>H4</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-75" />
										<label for="75" id='l-75'>H5</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-76" />
										<label for="76" id='l-76'>H6</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-77" />
										<label for="77" id='l-77'>H7</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-78" />
										<label for="78" id='l-78'>H8</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-79" />
										<label for="79" id='l-79'>H9</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-80" />
										<label for="80" id='l-80'>H10</label>
									</li>
								</ol>
							</li>
							<li class="row row--1">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox"   id="s-81" />
										<label for="81" id='l-81'>I1</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-82" />
										<label for="82" id='l-82'>I2</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-83" />
										<label for="83" id='l-83'>I3</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-84" />
										<label for="84" id='l-84'>I4</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-85" />
										<label for="85" id='l-85'>I5</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-86" />
										<label for="86" id='l-86'>I6</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-87" />
										<label for="87" id='l-87'>I7</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-88" />
										<label for="88" id='l-88'>I8</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-89" />
										<label for="89" id='l-89'>I9</label>
									</li>
									<li class="seat">
										<input type="checkbox"   id="s-90" />
										<label for="90" id='l-90'>I10</label>
									</li>
								</ol>
							</li>
						</ol>
`
            document.getElementById('mainContent-6').innerHTML = seatDetails;


            for (let i = 0; i < 100; i++) {

                if (seats[i] == 1) {
                    console.log(document.getElementById(i + 1))
                    console.log(i + 1)
                    document.getElementById(`s-${i + 1}`).disabled = true;
                }
            }
        })
        .catch((error) => {
            document.getElementById('mainContent-6').innerHTML = 'No Results Found';
            console.error('Error:', error);
        });


}

function showInsertFlight() {
    document.getElementById('insertFlight').style.display = 'block'
    document.getElementById('insButton').style.display = 'none'
    document.getElementById('cancButton').style.display = 'inline'

}

function cancelInsertFlight() {
    document.getElementById('insertFlight').style.display = 'none'
    document.getElementById('cancButton').style.display = 'none'
    document.getElementById('insButton').style.display = 'inline'

}

function fixName(str) {
    console.log('1')
    document.getElementById('flightInitial').setAttribute('value', str.slice(0, 2))
}



function updateFlight(id, numFlight) {
    fnum = document.getElementById(`fnum-${id}`).innerHTML
    fname = document.getElementById(`fname-${id}`).innerHTML
    start = document.getElementById(`start-${id}`).innerHTML
    via = document.getElementById(`via-${id}`).innerHTML
    end = document.getElementById(`end-${id}`).innerHTML
    departure = document.getElementById(`departure-${id}`).innerHTML
    arrival = document.getElementById(`arrival-${id}`).innerHTML
    e_price = document.getElementById(`e_price-${id}`).innerHTML
    b_price = document.getElementById(`b_price-${id}`).innerHTML


    //console.log(fname)

    document.getElementById(`button1-${id}`).style.display = "inline"
    document.getElementById(`button2-${id}`).style.display = "inline"





    document.getElementById(`fnum-${id}`).innerHTML = `<input type="text"  style="width:70px" id="f_num-${id}" value=${fnum}>`

    document.getElementById(`fname-${id}`).innerHTML = `<input type="text"  style="width:70px" id="f_name-${id}" value='${fname}'>`

    document.getElementById(`start-${id}`).innerHTML = `<select name="cars" style="width:110px;height:30px" id="f_start-${id}">
    <option value="kolkata">kolkata</option>
    <option value="bangalore">bangalore</option>
    <option value="mumbai">mumbai</option>
    <option value="hyderabad">hyderabad</option>
    <option value="delhi">delhi</option>
    <option value="jaipur">jaipur</option>
    <option value="ahmedabad">ahmedabad</option>


    </select>`

    document.getElementById(`via-${id}`).innerHTML = `<select name="cars" style="width:110px;height:30px" id="f_via-${id}">
    <option value="kolkata">kolkata</option>
    <option value="bangalore">bangalore</option>
    <option value="mumbai">mumbai</option>
    <option value="hyderabad">hyderabad</option>
    <option value="delhi">delhi</option>
    <option value="jaipur">jaipur</option>
    <option value="ahmedabad">ahmedabad</option>
    <option value="null">null</option>


    </select>`




    document.getElementById(`end-${id}`).innerHTML = `<select name="cars" style="width:110px;height:30px" id="f_end-${id}">
    
    <option value="kolkata">kolkata</option>
    <option value="bangalore">bangalore</option>
    <option value="mumbai">mumbai</option>
    <option value="hyderabad">hyderabad</option>
    <option value="delhi">delhi</option>
    <option value="jaipur">jaipur</option>
    <option value="ahmedabad">ahmedabad</option>


    </select>`


    // console.log(start.length)
    // if (start == ' bangalore') {
    //     console.log('yay')
    // } else {
    //     console.log('nay')
    // }
    //console.log(typeof (startx), places, viax, endx, placesObj.ahmedabad)
    console.log(start, via, end)
    console.log(places.indexOf(start), start)
    console.log(places.indexOf(via), via)
    console.log(places.indexOf(end), end)


    document.getElementById(`f_start-${id}`).options[places.indexOf(start)].setAttribute('selected', 'selected')
    document.getElementById(`f_via-${id}`).options[places.indexOf(via)].setAttribute('selected', 'selected')
    document.getElementById(`f_end-${id}`).options[places.indexOf(end)].setAttribute('selected', 'selected')


    document.getElementById(`departure-${id}`).innerHTML = `<input type="text"   style="width:70px" id="f_departure-${id}" value=${departure}>`

    document.getElementById(`arrival-${id}`).innerHTML = `<input type="text"   style="width:70px" id="f_arrival-${id}" value=${arrival}>`

    document.getElementById(`e_price-${id}`).innerHTML = `<input type="text"   style="width:60px" id="f_e_price-${id}" value=${e_price}>`

    document.getElementById(`b_price-${id}`).innerHTML = `<input type="text"   style="width:60px" id="f_b_price-${id}" value=${b_price}>`

    if (numFlight == '1') {

        document.getElementsByClassName('fa-trash-alt')[0].style.display = "none"
        document.getElementById('a1').style.display = "none"

    } else {
        for (var i = 1; i <= flights.length; i++) {

            document.getElementById(i).style.display = "none"
        }

        for (var i = 0; i < flights.length; i++) {

            document.getElementsByClassName('fa-trash-alt')[i].style.display = "none"
        }
    }

}





function cancelUpdate(id, numFlight) {
    var a = id.split('-')[1]
    console.log(a)
    document.getElementById(`button1-${a}`).style.display = "none"
    document.getElementById(id).style.display = "none"

    if (numFlight == '1') {
        document.getElementsByClassName(`fa-wrench`)[0].style.display = "inline"
        document.getElementsByClassName('fa-trash-alt')[0].style.display = "inline"



    } else {
        for (let i = 0; i < flights.length; i++) {
            document.getElementsByClassName(`fa-wrench`)[i].style.display = "inline"
        }

        // for(let i=1; i<= 343; i++){
        //     document.getElementById(i).style.display = "block"
        // }

        for (var i = 0; i < flights.length; i++) {

            document.getElementsByClassName('fa-trash-alt')[i].style.display = "inline"
        }
    }





    document.getElementById(`fnum-${a}`).innerHTML = fnum
    document.getElementById(`fname-${a}`).innerHTML = fname
    document.getElementById(`start-${a}`).innerHTML = start
    document.getElementById(`via-${a}`).innerHTML = via
    document.getElementById(`end-${a}`).innerHTML = end
    document.getElementById(`departure-${a}`).innerHTML = departure
    document.getElementById(`arrival-${a}`).innerHTML = arrival
    document.getElementById(`e_price-${a}`).innerHTML = e_price
    document.getElementById(`b_price-${a}`).innerHTML = b_price

}




function updateInDb(a) {

    var id = a.split('-')[1]

    console.log(id)
    console.log(document.getElementById(`f_via-${id}`).value)
    var fnum = document.getElementById(`f_num-${id}`).value
    var fname = document.getElementById(`f_name-${id}`).value
    var start = document.getElementById(`f_start-${id}`).value
    var end = document.getElementById(`f_end-${id}`).value
    var departure = document.getElementById(`f_departure-${id}`).value
    var arrival = document.getElementById(`f_arrival-${id}`).value
    var e_price = document.getElementById(`f_e_price-${id}`).value
    var b_price = document.getElementById(`f_b_price-${id}`).value

    if (document.getElementById(`f_via-${id}`).value == null || document.getElementById(`f_via-${id}`).value == 'null') {
        var via = null
    } else {
        var via = document.getElementById(`f_via-${id}`).value
    }

    if (start == via || via == end || start == end) {
        window.alert("Please enter different values for start, via and end")
        return
    }


    let data = {
        fnum,
        fname,
        start,
        via,
        end,
        departure,
        arrival,
        e_price,
        b_price
    }
    console.log(data)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorisation": "Bearer " + sessionStorage.getItem('token')
        },
        body: JSON.stringify(data)
    }

    fetch('/updateFlight', options).then((res) => res.json()).then((data) => {
        if (data.message == "error") {
            window.alert('An error has occured. Please fill the fields correctly.')
        } else {
            console.log('1')
            window.alert('Updated Successfully')
            window.location.reload()
        }
    })

}

function searchByFnum() {
    let fnum = document.getElementById('searchByFnum').value
    let data = {
        fnum
    }
    console.log(data)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorisation": "Bearer " + sessionStorage.getItem('token')
        },
        body: JSON.stringify(data)
    }
    fetch('/searchFlightsByFnum', options).then((res) => res.json()).then((data) => {


        searchData =
            ` <table id='flight-table'>
            <tr class="header">
      <th id='F.Sno'>S. No.</th>
      <th id='number'>FLIGHT NUM</th>
      <th id='name'>FLIGHT NAME</th>
      <th id='start'>START</th>
      <th id='via'>VIA</th>
      <th id='end'>END</th>           
      <th id='departure'>DEPARTURE</th>
      <th id='arrival'>ARRIVAL</th>
      <th id='e_price'>ECONOMY PRICE</th>
      <th id='b_price'>BUSINESS PRICE</th>

      <th id='adminPanel'>PANEL</th>
</tr>
  
      
    `
        if (data.length == 0) {
            window.alert("No Results Found")
        } else {
            var i = 0;
            searchData +=
                `<tr class='even'>
            <td id='f_snum-a1'>1</td>
            <td id='fnum-a1'>${data[i].flight_num}</td>
            <td id='fname-a1'>${data[i].flight_name}</td>
            <td id='start-a1'>${data[i].start}</td>
            <td id='via-a1'>${data[i].via}</td>
            <td id='end-a1'>${data[i].end}</td>             
            <td id='departure-a1'>${data[i].departure} </td>
            <td id='arrival-a1'>${data[i].arrival}</td>
            <td id='e_price-a1'>${data[i].e_price}</td>
            <td id='b_price-a1'>${data[i].b_price}</td>

            <td class='adminPanel'><i class="far fa-trash-alt" id='${data[i].flight_num}' onclick='deleteFlight(this.id)' style='cursor:pointer'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-wrench" id='a1' onclick='updateFlight(this.id,1)' style='cursor:pointer'></i>
            <button class='buttonUpdate' id="button1-a1" onclick='updateInDb(this.id)' style="display:none;padding:none;margin:0px"><i class="fa fa-check" style="font-size:16px;width:15px"></i></button>
            <button class='deleteUpdate' id="button2-a1" onclick='cancelUpdate(this.id,1)' style="display:none;width:30.97px;height:29.31px"><i class="fa fa-close" style="font-size:16px"></i></button><td>
            </tr>
            </table>
          `
            document.getElementById('mainContent-1').innerHTML = searchData


        }


        console.log(data)
    })
}

// function logOut(){
//     sessionStorage.clear()
//     window.location.replace('login.html')
// }

// function logInAsGuest(){
//     sessionStorage.clear()
//     window.location.replace('home-page.html')
// }

function logOut(flag) {
    if (flag == '1') {
        sessionStorage.clear()
        window.location.replace('login.html')
    }
    if (flag == '2') {
        sessionStorage.clear()
        window.location.replace('home-page.html')
    }
}


