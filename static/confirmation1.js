const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

var departureDate=sessionStorage.getItem('deptDate')
const d = new Date(departureDate);
$(".date").text(d.getDate())
$(".month").text(monthNames[d.getMonth()])
$(".year").text(d.getFullYear())    

var txt=sessionStorage.getItem('Flight-Name')
var init = txt.indexOf('(');
var fin = txt.indexOf(')');
console.log(txt.substr(init+1,fin-init-1))
$(".flight-num").text(txt.substr(init+1,fin-init-1))


var count=20

function countDown() {
    //var timer = document.getElementById("timer"); // Timer ID
    if (count > 0) {
      count--;
      //timer.innerHTML = "This page will redirect in " + count + " seconds."; // Timer Message
      $(".counter").text(count)
      setTimeout("countDown()", 1000);
    } else {
        sessionStorage.setItem("deptDate","")
        sessionStorage.setItem("via","")
        sessionStorage.setItem("totalPrice","")
        sessionStorage.setItem("departureTime","")
        sessionStorage.setItem("numPass","")
        sessionStorage.setItem("arrivalTime","")
        sessionStorage.setItem("destination","")
        sessionStorage.setItem("basePrice","")
        sessionStorage.setItem("class","")
        sessionStorage.setItem("Flight-Name","")
        sessionStorage.setItem("source","")

        
        window.location.replace("home-page.html"); //target url
    }
}

countDown();
