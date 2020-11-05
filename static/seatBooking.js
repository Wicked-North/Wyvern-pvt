let seats=[]

//ONCLICKS
function flightSearch(){//date according to day1,day2,day3.....day6
    let getDetails={
    fnum:'ai-443',
    day:'day1'//filled according to the param in fn
}
const options={
    method:"POST",
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    body:JSON.stringify(getDetails)
}
 
fetch('/getSeatDets',options)
.then(res=>res.json())
.then(data=> {
    console.log(data)
    seats=data[0].day.split('')
    console.log(seats)
})
.catch((error) => {
  console.error('Error:', error);
});
}


//ON FINAL CONFIRMATION
function bookSeats(){
    seats[4]=101010101;
    let data={
        fnum:'ai-443',
        seat:seats.join(''),//string
        day:'day1'
    }
    const options={
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
          
          },
        body:JSON.stringify(data)
    }
     
    fetch('/bookSeats',options)
}

//FOR EACH SEAT UI CLICK
function addSeats(seatNo){

    seats[seatNo]=1

}


