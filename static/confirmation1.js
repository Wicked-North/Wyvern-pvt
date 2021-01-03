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
