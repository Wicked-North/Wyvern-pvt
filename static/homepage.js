// fetch("/get_sess").then((res) => {
//     res.text().then((data) => {
//         // document.getElementsByClassName("navbar-text")[0].innerHTML = data;
//         // //console.log(data + "sessionnnnnnnnnnn");
//         // document.getElementById("Ne").innerHTML = data
//         sessionStorage.setItem('sess', data);
//     }).then((data) => {
//         if (sessionStorage.getItem("sess") != "1") {
//                    window.alert("Login to view the page")
//             window.location.assign("login.html")
//         }

//     });
// });





    fetch("/get_token").then((res) => {
        res.text().then((data) => {
            // document.getElementsByClassName("navbar-text")[0].innerHTML = data;
            //console.log(data);
            console.log('hi')
            // document.getElementById("Ne").innerHTML = data
            sessionStorage.setItem('token', data);
        })
    });


// ==================================================================================

let planeNodes = {
    "bangalore" : 0,
    "mumbai" : 1,
    "delhi" : 2,
    "kolkata" : 3
}



function createpost(){
   
    const options = {
        method: "GET",
        headers: {
          "Authorisation": "Bearer " + sessionStorage.getItem('token')
        },
        //body: JSON.stringify(cartArray)
      }; 

    fetch('/data', options).then((res)  => res.json().then((data) => {
        console.log(data)
        console.log("abhra ghosh")
        let message = data;
        console.log(data.message)
        document.getElementById('post').innerHTML = data.message;
    })).catch((err) => console.log(err))

console.log("hello")
}
