let past=[]
let upcoming=[]

function showPastBookings(){
    
    var data={
        userId:sessionStorage.getItem('user_id')
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch('/showBookings', options)
    .then(res => res.json())
    .then(data => {
            console.log(data)
            past=data[1]
            upcoming=data[0]

            console.log(past,upcoming)
            
    });
}

// function showUpcomingBookings(userId){

//     var options={
//         userId:userId
//     }
//     fetch('/showUpcoming', options)
//         .then(res => res.json())
//         .then(data => {
//             upcoming=data
//         });

// }