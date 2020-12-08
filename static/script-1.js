//const e = require("express");

var from="", dest="";
var flightArr=[]; 
var totalFlights; 
var dirflights;
var startPlace="Bangalore"
var endPlace="Kolkata"
var viaPlace="Jaipur"
var compFlightInfo=[
    {
        "place":"Ahmedabad",
        "airportName":"Sardar Vallabhai Patel International Airport",
        "abbName":"AMD"
    },
    {
        "place":"Bangalore",
        "airportName":"Kempegowda International Airport",
        "abbName":"BLR"
    },
    {
        "place":"Delhi",
        "airportName":"Indira Gandhi International Airport",
        "abbName":"DEL"
    },
    {
        "place":"Hyderabad",
        "airportName":"Rajiv Gandhi International Airport",
        "abbName":"HYD"
    },
    {
        "place":"Jaipur",
        "airportName":"Jaipur International Airport",
        "abbName":"JAI"
    },
    {
        "place":"Kolkata",
        "airportName":"Netaji Subhash Chandra Bose International Airport",
        "abbName":"CCU"
    },
    {
        "place":"Mumbai",
        "airportName":"Chhatrapati Shivaji Maharaj International Airport",
        "abbName":"BOM"
    }

]

//adding commas to numbers
function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

//adding and subtracting passengers
var valuePas=$(".passenger-inp").val();


$(".passenger-inp").keyup((evt)=>{
    
    valuePas=$(".passenger-inp").val();
    //console.log($(".passenger-inp").val())
    if($(".passenger-inp").val()<1 || $(".passenger-inp").val()>99){
        $(".passenger-inp").val("")
    }
})

$(".add").click(()=>{
    
    if(valuePas<99){
        valuePas++;
        $(".passenger-inp").val(valuePas);
    }
});

$(".subtract").click(()=>{
    
    
    if(valuePas>1){
        valuePas--;
        $(".passenger-inp").val(valuePas);
    }
});

//button on click

$(".home-page .btn").click(()=>{
    $(".btn").addClass("animateButton");
    setTimeout(()=>{
        $(".btn").removeClass("animateButton");

    },500)

    if((!$("#start").val()) || !($("#end").val()) || !($("#date").val()) || !($("#passenger").val()) || !($("#tier").val())){
        if((!$("#start").val())){
            console.log("invalid")
            $(".source-error").css("transform","scale(1)")
        }
        else{
            $(".source-error").css("transform","scale(0)")
        }
    }
    if((!$("#start").val()) || !($("#end").val()) || !($("#date").val()) || !($("#passenger").val()) || !($("#tier").val())){
        if(!($("#end").val())){
            $(".dest-error").css("transform","scale(1)")
        }
        else{
            $(".dest-error").css("transform","scale(0)")
        }
    }
    if((!$("#start").val()) || !($("#end").val()) || !($("#date").val()) || !($("#passenger").val()) || !($("#tier").val())){
        if(!($("#date").val())){
            $(".date-error").css("transform","scale(1)")
        }
        else{
            $(".date-error").css("transform","scale(0)")
        }
    }
    if((!$("#start").val()) || !($("#end").val()) || !($("#date").val()) || !($("#passenger").val()) || !($("#tier").val())){
        if(!($("#passenger").val())){
            $(".pass-error").css("transform","scale(1)")
        }
        else{
            $(".pass-error").css("transform","scale(0)")
        }
    }
    if((!$("#start").val()) || !($("#end").val()) || !($("#date").val()) || !($("#passenger").val()) || !($("#tier").val())){
        if(!($("#tier").val())){
            $(".class-error").css("transform","scale(1)")
        }
        else{
            $(".class-error").css("transform","scale(0)")
        }
    }

    /* if(($("#start").val())){
        console.log("invalid")
        $(".source-error").css("transform","scale(0)")
    }
    if(($("#end").val())){
        $(".dest-error").css("transform","scale(0)")
    }
    if(($("#date").val())){
        $(".date-error").css("transform","scale(0)")
    }
    if(($("#passenger").val())){
        $(".pass-error").css("transform","scale(0)")
    }
    if(($("#tier").val())){
        $(".class-error").css("transform","scale(0)")
    } */

    else{
        console.log("valid")
        //storing the values of input field to session storage to pass the values to next page(static-card)
        sessionStorage.setItem("source",$("#start").val())
        sessionStorage.setItem("destination",$("#end").val())
        sessionStorage.setItem("numPass",$("#passenger").val())
        sessionStorage.setItem("deptDate",$("#date").val())
        sessionStorage.setItem("class",$("#tier").val())

        $(".error").css("transform","scale(0)")
        $(".overlay").css("transform","translateX(0%)")
        $(".overlay").css("opacity","1")
    }
    
    
})


//form selection options

var placeSelect={
    "Ahmedabad":"place-1",
    "Bangalore":"place-2",
    "Delhi":"place-3",
    "Hyderabad":"place-4",
    "Jaipur":"place-5",
    "Kolkata":"place-6",
    "Mumbai":"place-7",
}
var fromPlaceElem="";
var toPlaceElem="";
var fromDeSelectOpts=0;
var toDeSelectOpts=0;
//dropdown for from
$(".from").click(fromSelect)

$(".from input").blur(selectOpt)

function fromSelect(){
    //var inpTo=$(".to input").val()
    fromDeSelectOpts++;
    $(".dropdown-from").css("display","block");
    //toPlaceElem=$(`.${placeSelect[inpTo]}`)
    //$(`.${placeSelect[inpTo]}`).remove()
    setTimeout(()=>{
        $(".dropdown-from").css("height","11em");
    },200);
    
}



//dropdown for to
$(".to").click(toSelect)
$(".to input").blur(selectOpt)

function toSelect(){
    var inp=$(".from input").val()
    $(".dropdown-to").css("display","block");
    console.log("input",inp)
    console.log(placeSelect[inp])
    fromPlaceElem=$(`.${placeSelect[inp]}`)
    console.log(fromPlaceElem)
    $(`.${placeSelect[inp]}`).remove()
    setTimeout(()=>{
        $(".dropdown-to").css("height","11em");
    },200); 
   
     

}



//dropdown for tier
$(".tier").click(tierSelect)
$(".tier input").blur(selectOpt)

function tierSelect(){
    
    $(".dropdown-tier").css("display","block");
    setTimeout(()=>{
        $(".dropdown-tier").css("height","11em");
    },200);
    
}



//selecting a place (binding event to a static element)
$(".dropdown-from").on('click',".place-1",selectOpt)
$(".dropdown-from").on('click',".place-2",selectOpt)
$(".dropdown-from").on('click',".place-3",selectOpt)
$(".dropdown-from").on('click',".place-4",selectOpt)
$(".dropdown-from").on('click',".place-5",selectOpt)
$(".dropdown-from").on('click',".place-6",selectOpt)
$(".dropdown-from").on('click',".place-7",selectOpt)

$(".dropdown-to").on('click',".place-1",selectOpt)
$(".dropdown-to").on('click',".place-2",selectOpt)
$(".dropdown-to").on('click',".place-3",selectOpt)
$(".dropdown-to").on('click',".place-4",selectOpt)
$(".dropdown-to").on('click',".place-5",selectOpt)
$(".dropdown-to").on('click',".place-6",selectOpt)
$(".dropdown-to").on('click',".place-7",selectOpt)

//tier selection
$(".tier-1").click(selectOpt)
$(".tier-2").click(selectOpt)
$(".tier-3").click(selectOpt)
$(".tier-4").click(selectOpt)

function selectOpt(evt){
    fromDeSelectOpts=0;
    /* console.log($(evt.target).text())
    console.log($(evt.target))
    console.log($(evt.target).parents().hasClass("dropdown")) */

    if($(evt.target).parents().hasClass("dropdown")){
        //console.log("inside")
        if($(evt.target).parents().hasClass("dropdown-from") /* && $(evt.target).text()!=$(".to input").val() */){
            
            $(".from input").val($(evt.target).text())
            if($("input").val()!=""){
                console.log("adding element")
                console.log(fromPlaceElem[0])

                $(".dropdown").append(fromPlaceElem[0])
                //$(".dropdown-from").append(fromPlaceElem[0])
                $(".from .label-name .content-name").css(
                    {
                        "color":"rgb(240, 247, 238)",
                        "font-size": "1em",
                        "transform": "translateY(-140%)"
                    }
                )
                
            }
        }
        else if($(evt.target).parents().hasClass("dropdown-to")){
            $(".to input").val($(evt.target).text())
            if($("input").val()!="")
            {
                
                $(".to .label-name .content-name").css(
                    {
                        "color":"rgb(240, 247, 238)",
                        "font-size": "1em",
                        "transform": "translateY(-140%)"
                    }
                )
                
                

            
            }
           
        }
        else if($(evt.target).parents().hasClass("dropdown-tier")){
            $(".tier input").val($(evt.target).text())
            
            if($("input").val()!=""){
                $(".tier .label-name .content-name").css(
                    {
                        "color":"rgb(240, 247, 238)",
                        "font-size": "1.2rem",
                        "transform": "translateY(-140%)"
                    }
                )
            
            }
        }
        else{
            console.log("do nothing")
        }
    }

    setTimeout(()=>{
        $(".dropdown").css("display","none");
        setTimeout(()=>{
            $(".dropdown").css("height","0");
        },200)
    },200)
    
}


    


//getting random numbers to fill values of direct flights
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }


function updateDirectCard(arr){

    totalFlights=[{"flightName":"Air India","flightNum":`(AI - ${getRndInteger(100,999)})`},
                  {"flightName":"Vistara","flightNum":`(VI - ${getRndInteger(100,999)})`},
                  {"flightName":"Spicejet", "flightNum":`(SP - ${getRndInteger(100,999)})`},
                  {"flightName":"Go Air", "flightNum":`(GO - ${getRndInteger(100,999)})`},
                  {"flightName":"Indigo","flightNum":`(IN - ${getRndInteger(100,999)})`}]
    from=$("#start").val();
    dest=$("#end").val();
    console.log("direct",arr)
    var possibleDirFlights=[];
    var countDirCard=2;
    var dirFLightsName, dirFlightsNum;
    console.log("direct flights",dirflights)
    dirflights=arr;

    /* var possibleDirFlights={
        flight_name:"",
        arrival:"",
        departure:"",
        flight_num:"",
        price:"",
        start:"",
    }; */

    
    //changing title
    $(".src-overlay").text(from)
    $(".dest-overlay").text(dest)

    //making 3 objects of direct flights
    for(let i=0;i<totalFlights.length;i++){

        if(dirflights[0].flight_name==totalFlights[i].flightName.toLowerCase()){
            continue;
        }

        possibleDirFlights.push(totalFlights[i])
    }

        dirFlightsNum=dirflights[0].flight_num.split('-')
        dirFlightsNum=dirFlightsNum[0].toUpperCase() +" - "+dirFlightsNum[1];
        dirFlightsName=dirflights[0].flight_name.split(" ");
        for(let j=0; j<dirFlightsName.length;j++){
            dirFlightsName[j] =dirFlightsName[j].charAt(0).toUpperCase() + dirFlightsName[j].slice(1)
            
        }
        
        dirFlightsName=dirFlightsName.join(" ")
        dirFlightsName=dirFlightsName + " (" + dirFlightsNum + ")"
        $(`.flight-name-1`).text(dirFlightsName)
        $(`.from-1`).text(dirflights[0].start.charAt(0).toUpperCase() + dirflights[0].start.slice(1) )
        $(`.to-1`).text(dirflights[0].end.charAt(0).toUpperCase() + dirflights[0].end.slice(1) )
        $(`.from-time-1`).text(dirflights[0].departure)
        $(`.to-time-1`).text(dirflights[0].arrival)
        var pricedir=dirflights[0].price
        pricedir=numberWithCommas(pricedir)
        $(`.price-1`).text(pricedir)

        //changing map
        showPath(dirflights[0].start,dirflights[0].end)

        //entering values into rest 2 cards
        var priceNew=Number(dirflights[0].price);

        for(let count=2;count<=3;count++){
            var randIndex=getRndInteger(0,4)
            priceNew=priceNew + 222;
            $(`.flight-name-${count}`).text(possibleDirFlights[randIndex].flightName + " "+possibleDirFlights[randIndex].flightNum)
            $(`.from-${count}`).text(dirflights[0].start.charAt(0).toUpperCase() + dirflights[0].start.slice(1) )
            $(`.to-${count}`).text(dirflights[0].end.charAt(0).toUpperCase() + dirflights[0].end.slice(1) )
            $(`.price-${count}`).text(numberWithCommas(priceNew))
        }

    //console.log("pos",possibleDirFlights)
    


}

function updateViaCard(arr){
    $(".via-flights-o").empty();
    var viaflights=arr;
    var viaFlightsName="";
    var viaFlightsNum="";
    var countViaCard=4;
    var priceVia;
    
    console.log("via",viaflights)

    for(let i=0;i<viaflights.length;i++){
        viaFlightsNum=viaflights[i].flight_num.split('-')
        viaFlightsNum=viaFlightsNum[0].toUpperCase() +" - "+viaFlightsNum[1];

        viaFlightsName=viaflights[i].flight_name.split(" ");
        for(let j=0; j<viaFlightsName.length;j++){
            viaFlightsName[j] = viaFlightsName[j].charAt(0).toUpperCase() + viaFlightsName[j].slice(1)
            
        }

        viaFlightsName=viaFlightsName.join(" ")
        viaFlightsName=viaFlightsName + " (" + viaFlightsNum + ")"

        /* $(`.flight-name-${countViaCard}`).text(viaFlightsName)
        $(`.from-${countViaCard}`).text(viaflights[i].start.charAt(0).toUpperCase() + viaflights[i].start.slice(1) )
        $(`.to-${countViaCard}`).text(viaflights[i].end.charAt(0).toUpperCase() + viaflights[i].end.slice(1) )
        $(`.via-${countViaCard}`).text(viaflights[i].via.charAt(0).toUpperCase() + viaflights[i].via.slice(1) )
        $(`.from-time-${countViaCard}`).text(viaflights[i].departure)
        $(`.to-time-${countViaCard}`).text(viaflights[i].arrival) */

        priceVia=viaflights[i].price
        priceVia=numberWithCommas(priceVia)
        $(`.price-${countViaCard}`).text(priceVia)
        var elem=` <div class="card-${countViaCard} card">
                  <div class="card-content">
                    <div class="flight-name-${countViaCard} flight-name">${viaFlightsName}</div>
                    <div class="content-details">
                      <div class="places">
                        <div class="from-${countViaCard} from-overlay">${viaflights[i].start.charAt(0).toUpperCase() + viaflights[i].start.slice(1) }</div>&nbsp;-&nbsp;<div class="via-${countViaCard} via-overlay">${viaflights[i].via.charAt(0).toUpperCase() + viaflights[i].via.slice(1) }</div>&nbsp;-&nbsp;<div class="to-${countViaCard} to-overlay">${viaflights[i].end.charAt(0).toUpperCase() + viaflights[i].end.slice(1) }</div>
                      </div>
                      <div class="time">
                        <div class="fromTime from-time-${countViaCard}">${viaflights[i].departure}</div>&nbsp;-&nbsp;<div class="toTime to-time-${countViaCard}">${viaflights[i].arrival}</div>
                      </div>
                      <div class="price-details">
                        Price: &#8377; <div class="base-price price-${countViaCard}">${priceVia}</div>
                      </div>
                    </div>
                  </div>
                </div>`
        countViaCard++;
        $(".via-flights-o").append(elem)
    }
    
}

//cards ( overlay ) animating on click
$(".direct-flights-o .card-1").click(animatingCard)
$(".direct-flights-o .card-2").click(animatingCard)
$(".direct-flights-o .card-3").click(animatingCard)

//changing map on click
$(".direct-flights-o .card-1").click(()=>{
    showPath($(".from-1").text().toLowerCase(),$(".to-1").text().toLowerCase())
})
$(".direct-flights-o .card-2").click(()=>{
    showPath($(".from-2").text().toLowerCase(),$(".to-2").text().toLowerCase())
})
$(".direct-flights-o .card-3").click(()=>{
    showPath($(".from-3").text().toLowerCase(),$(".to-3").text().toLowerCase())
})

//cards ( overlay ) animating on click
$(".via-flights-o").on('click', '.card-4', animatingCard);
$(".via-flights-o").on('click', '.card-5', animatingCard);
$(".via-flights-o").on('click', '.card-6', animatingCard);
$(".via-flights-o").on('click', '.card-7', animatingCard);
$(".via-flights-o").on('click', '.card-8', animatingCard);

/* $(".via-flights-o .card-4").click(animatingCard)
$(".via-flights-o .card-5").click(animatingCard)
$(".via-flights-o .card-6").click(animatingCard)
$(".via-flights-o .card-7").click(animatingCard)
$(".via-flights-o .card-8").click(animatingCard) */


//changing map of via flights

$(".via-flights-o").on('click', '.card-4', function(){
    showPath($(".from-4").text().toLowerCase(),$(".via-4").text().toLowerCase(),$(".to-4").text().toLowerCase())
});

$(".via-flights-o").on('click', '.card-5', function(){
    showPath($(".from-5").text().toLowerCase(),$(".via-5").text().toLowerCase(),$(".to-5").text().toLowerCase())
});

$(".via-flights-o").on('click', '.card-6', function(){
    showPath($(".from-6").text().toLowerCase(),$(".via-6").text().toLowerCase(),$(".to-6").text().toLowerCase())
});


$(".via-flights-o").on('click', '.card-7', function(){
    showPath($(".from-7").text().toLowerCase(),$(".via-7").text().toLowerCase(),$(".to-7").text().toLowerCase())
});


$(".via-flights-o").on('click', '.card-8', function(){
    showPath($(".from-8").text().toLowerCase(),$(".via-8").text().toLowerCase(),$(".to-8").text().toLowerCase())
});


//adding the gradient border to the card and white border to optimised card 
function animatingCard(evt){

    var className=$(evt.target).attr('class').split(" ")
    className=className.shift();
    
    classArray=["card-1","card-2","card-3","card-5","card-6","card-7","card-8"]
    classArrayNew=[]
    var j=0;
    //making a new array with the cards apart from the selected one and card-4
    for(let i=0;i<classArray.length;i++){

        if(classArray[i]==className){
            continue;
        }
        classArrayNew[j]=classArray[i];
        j++;
    }
 
    //console.log("new",classArrayNew)
    //console.log("card-4",$(evt.target).hasClass("card-4"))

    //checking if the clicked card is card-4 and making border white
    if($(evt.target).hasClass("card-4")){
        $(evt.target).addClass("animateCard");
        $(evt.target).css("border","4px solid transparent")
        $(evt.target).css("border-image","linear-gradient(45deg,rgb(255, 239, 299),rgb(240, 247, 238))")
        $(evt.target).css("border-image-slice","1")


        //this for loop removes gradient border from other cards 
        for(let k=0;k<classArrayNew.length;k++){
                $("."+classArrayNew[k]).removeClass("animateCard");
                $("."+classArrayNew[k]).css("border-image","none")
                $("."+classArrayNew[k]).css("background","rgba(8, 8, 8, 0.3)")
        }
    }
    else{

        for(let k=0;k<classArrayNew.length;k++){
        
            //removing the animatecard class and the white border from the card-4
            $(".card-4").removeClass("animateCard");
            $(".card-4").css("border-image","none")
            $(".card-4").css("border","none")
            $(".card-4").css("background-image","linear-gradient(45deg,rgb(219, 39, 99),rgb(255, 154, 139))")

            //checks if the other cards have a border and removes it
            if( $("."+classArrayNew[k]).hasClass("animateCard") ){
                //console.log("if"+k)
                //console.log(classArrayNew[k])
                $("."+classArrayNew[k]).removeClass("animateCard");
                $("."+classArrayNew[k]).css("border-image","none")
                $("."+classArrayNew[k]).css("background","rgba(8, 8, 8, 0.3)")    
                
            }

            //changes the border of selected card to gradient
            else{
                $(evt.target).css("background","rgba(60, 60, 61,0.4)");
                $(evt.target).addClass("animateCard");
                $(evt.target).css("border-image","linear-gradient(45deg,rgb(219, 39, 99),rgb(255, 154, 139))")
                $(evt.target).css("border-image-slice","1")
            }
        }
    }
    
}

$(".overlay .search-btn").click((event)=>{
    var countSelection=0
    var cardClass=''
    var cardArray=["card-1","card-2","card-3","card-4","card-5","card-6","card-7","card-8"]
    var cardElem
    for(let i=0;i<cardArray.length;i++){
        console.log("border-image"+$("."+cardArray[i]).css("border-image"))
        if($("."+cardArray[i]).css("border-image")!="none"){
            cardElem=$("."+cardArray[i]).clone()
            cardClass=$(cardElem).attr('class')
            cardClass=cardClass.split(' ')
            cardClass=cardClass[0]
            viaPlace=$("."+cardClass+" .via-overlay").text()
            sessionStorage.setItem("via",viaPlace)
            sessionStorage.setItem("Flight-Name",$("."+cardClass+" .flight-name").text())
            sessionStorage.setItem("departureTime",$("."+cardClass+" .fromTime").text())
            sessionStorage.setItem("arrivalTime",$("."+cardClass+" .toTime").text())
            sessionStorage.setItem("basePrice",$("."+cardClass+" .base-price").text())
            //console.log("card class"+cardClass)
            countSelection++;
        }
    }
    
    if(countSelection==0){
        for(let p=0;p<cardArray.length;p++){
            $("."+cardArray[p]).addClass("shakeCard")
            setTimeout(()=>{
                $("."+cardArray[p]).removeClass("shakeCard")
            },1000)
        }
        setTimeout(()=>{
            window.alert("Select a Flight to Proceed")
        },500)
        
        event.preventDefault()
    }
    else{
        
        
    }
    
})




//script for the static-card page
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
const weekDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

//time difference
function diff(start, end) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    // console.log(diff)
    var hours = Math.floor(diff / 1000 / 60 / 60); //diff is in MILLISECONDS converting it into hours
    // console.log(hours)
    diff -= hours * 1000 * 60 * 60; //subtracting the number of ms in hours to get the no. of minutes
    var minutes = Math.floor(diff / 1000 / 60);

    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0)
       hours = hours + 24;

    return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes;
}



//updating values of static-card



$(".static-container").ready(()=>{
    
    //getting these values on button click of homepage 
    var src=sessionStorage.getItem("source")
    var dest=sessionStorage.getItem("destination")
    var departureDate=sessionStorage.getItem("deptDate")
    var numPassenger=sessionStorage.getItem("numPass")
    var tier=sessionStorage.getItem("class")
    var connecting=sessionStorage.getItem("via")
    var flightname=sessionStorage.getItem("Flight-Name")
    var arrTime=sessionStorage.getItem("arrivalTime")
    var deptTime=sessionStorage.getItem("departureTime")
    var singPrice=sessionStorage.getItem("basePrice")
    singPrice=singPrice.split(",").join('')
    console.log("cost",singPrice)
    var totalPrice=Number(numPassenger) * Number(singPrice)
    totalPrice=numberWithCommas(totalPrice)
    sessionStorage.setItem('totalPrice', totalPrice)
    var time, hrs, mins
    var airportNameSrc,abbvNameSrc,airportNameDest,abbvNameDest='',airportNameVia, abbvNameVia

    // console.log("values",src,dest,departureDate,numPassenger,tier,connecting,flightname,arrTime,deptTime)
    
    if(!(connecting)){
        console.log("empty")
        $(".static-container .row-2-2").css("display","none")
        $(".static-container .viaDot").css("display","none")
        $(".static-container .icon-via").css("display","none")
        $(".static-container .via-dash").css("display","none")
        $(".static-container .abbvVia").css("display","none")
    }
    else{
        $(".static-container .row-2-2").css("display","flex")
        $(".static-container .viaDot").css("display","flex")
        $(".static-container .via-dash").css("display","flex")
        $(".static-container .abbvVia").css("display","flex")
    }
    $(".static-container .title-from").text(src)
    $(".static-container .title-to").text(dest)
    $(".static-container .passNum").text(numPassenger)
    $(".static-container .coachClass").text(tier)

    //getting values from overlay 
    $(".static-container .title-via").text(connecting)
    $(".static-container .flightName").text(flightname)
    $(".static-container .deptTime").text(deptTime)
    $(".static-container .arrivalTime").text(arrTime)
    time=diff(deptTime,arrTime)
    time=time.split(":")
    hrs=time[0]
    mins=time[1]
    console.log("time diff"+time)
    $(".static-container .hours").text(hrs)
    $(".static-container .minutes").text(mins)
    $(".static-container .price").text(totalPrice)

    const d = new Date(departureDate); //converting date to string format
    $(".static-container .date").text(d.getDate())
    $(".static-container .month").text(monthNames[d.getMonth()])
    $(".static-container .day").text(weekDays[d.getDay()])
     
    //getting abbrevations of places and airport names of source
    for(let r=0;r<compFlightInfo.length;r++){
        if(compFlightInfo[r]['place']==src){
            airportNameSrc=compFlightInfo[r]['airportName']
            abbvNameSrc=compFlightInfo[r]['abbName']
        }
    }


    for(let s=0;s<compFlightInfo.length;s++){
        if(compFlightInfo[s]['place']==dest){
            airportNameDest=compFlightInfo[s]['airportName']
            abbvNameDest=compFlightInfo[s]['abbName']
        }
    }

    for(let t=0;t<compFlightInfo.length;t++){
        if(compFlightInfo[t]['place']==connecting){
            airportNameVia=compFlightInfo[t]['airportName']
            abbvNameVia=compFlightInfo[t]['abbName']
        }
    }

    $(".static-container .deptAirport").text(airportNameSrc+' ('+abbvNameSrc+')')
    $(".static-container .arrivalAirport").text(airportNameDest+' ('+abbvNameDest+')')
    $(".static-container .viaAirport").text(airportNameVia+' ('+abbvNameVia+')')
    $(".abbvFrom").text(abbvNameSrc)
    $(".abbvTo").text(abbvNameDest)
    $(".abbvVia").text(abbvNameVia)

})

//button on click for the static-page
$(".btn-change-flight").click((evt)=>{
    $(".btn-change-flight").addClass("animateButton");
    setTimeout(()=>{
        $(".btn-change-flight").removeClass("animateButton");

    },500)
})

$(".btn-confirm").click((evt)=>{
    $(".btn-confirm").addClass("animateButton");
    setTimeout(()=>{
        $(".btn-confirm").removeClass("animateButton");

    },500)
})

$(".dropdown-btn").on('click',cardOpen)
$(".selected-card").on('click',cardOpen)
function cardOpen(evt){
    
    if($(".dropdown-btn i").css("margin-top")=="15px"){
        $(".dropdown-btn i").css("margin","12px 15px")
        $(".dropdown-btn i").css("transform","rotate(180deg)")
        $(".long-content").css("display","block")
        $(".short-content").css("display","none")
        $(".selected-card").css("height","12em")
        $(".short-content").css("opacity","0")
        setTimeout(()=>{
            $(".long-content").css("opacity","1")
        },365)
    }
    else{
        $(".dropdown-btn i").css("margin","15px")
        $(".dropdown-btn i").css("transform","rotate(0deg)")
        $(".short-content").css("display","flex")
        $(".long-content").css("display","none")
        $(".selected-card").css("height","5em")
        $(".long-content").css("opacity","0")
        setTimeout(()=>{
            $(".short-content").css("opacity","1")
        },365)
    }
}


function payment(){
    window.location.assign('app.html')
}

//login button

$(".login-btn").click(()=>{
    $(".login-btn").addClass("animateButton");
    setTimeout(()=>{
        $(".login-btn").removeClass("animateButton");

    },500)
})

function closeDiv(){
    $(".login-container").css("opacity","0")
    
    setTimeout(()=>{
        document.getElementById('login-container').style.display = "none";
    },500) 
    
}



