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
    fetch('/getFlightDetails').then((res) => res.json()).then((data) => {
        console.log(data)
    })
}

function getUserDetails() {
    fetch('/getUserDetails').then((res) => res.json()).then((data) => {
        console.log(data)
    })
}

function getUserDetailsByUserid() {
    let uid = document.getElementById('udets').value
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