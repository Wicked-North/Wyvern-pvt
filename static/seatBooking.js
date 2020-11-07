let seats = []

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
            for(let i=0; i<100; i++){
               
                if(seats[i] == 1){
                    console.log(i+1)
                   // $(`${i+1}`).attr('disabled', 'disabled').button('refresh')
                   document.getElementById(i+1).disabled = true;
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });


}


//ON FINAL CONFIRMATION
function bookSeats() {
    
    let data = {
        fnum: 'ai-443',
        seat: seats.join(''), //string
        day: 'day1'
    }
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(data)
    }

    fetch('/bookSeats', options)
}

//FOR EACH SEAT UI CLICK
function modifySeats(seatNo) {
    //console.log(document.getElementById(seatNo).checked)
    if (document.getElementById(seatNo).checked == true)
        seats[seatNo-1] = 1
    else
        seats[seatNo-1] = 0
    //seats[seatNo]=1

}