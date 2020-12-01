//const e = require("express");

var from="", dest="";
var flightArr=[]; 
var totalFlights; 
var dirflights;

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
        if($(evt.target).parents().hasClass("dropdown-from") && $(evt.target).text()!=$(".to input").val()){
            
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


    
//button on click

$(".btn").click(()=>{
    $(".btn").addClass("animateButton");
    setTimeout(()=>{
        $(".btn").removeClass("animateButton");

    },500)

    $(".overlay").css("transform","translateX(0%)")
    $(".overlay").css("opacity","1")
    
})


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
                    <div class="flight-name-${countViaCard}">${viaFlightsName}</div>
                    <div class="content-details">
                      <div class="places">
                        <div class="from-${countViaCard} from-overlay">${viaflights[i].start.charAt(0).toUpperCase() + viaflights[i].start.slice(1) }</div>&nbsp;-&nbsp;<div class="via-${countViaCard} via-overlay">${viaflights[i].via.charAt(0).toUpperCase() + viaflights[i].via.slice(1) }</div>&nbsp;-&nbsp;<div class="to-${countViaCard} to-overlay">${viaflights[i].end.charAt(0).toUpperCase() + viaflights[i].end.slice(1) }</div>
                      </div>
                      <div class="time">
                        <div class="from-time-${countViaCard}">${viaflights[i].departure}</div>&nbsp;-&nbsp;<div class="to-time-${countViaCard}">${viaflights[i].arrival}</div>
                      </div>
                      <div class="price-details">
                        Price: &#8377; <div class="price-${countViaCard}">${priceVia}</div>
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


function animatingCard(evt){

    var countAnimate=0;
    var className=$(evt.target).attr('class').split(" ")
    className=className.shift();
    
    classArray=["card-1","card-2","card-3","card-4","card-5","card-6","card-7","card-8"]
    classArrayNew=[]
    var j=0;
    for(let i=0;i<classArray.length;i++){

        if(classArray[i]==className){
            continue;
        }
        classArrayNew[j]=classArray[i];
        j++;
    }

    console.log("new",classArrayNew)
     for(let k=0;k<classArrayNew.length;k++){

        
        if( $("."+classArrayNew[k]).hasClass("animateCard") && k!=3){
            console.log("if"+k)
            console.log(classArrayNew[k])
            $("."+classArrayNew[k]).removeClass("animateCard");
            $("."+classArrayNew[k]).css("border-image","none")
            $("."+classArrayNew[k]).css("background","rgba(8, 8, 8, 0.3)")      
            
        }

        else if($("."+classArrayNew[k]).hasClass("animateCard") && k==3){
            console.log("else if"+k)
            $(".card-4").removeClass("animateCard");
            $(".card-4").css("border-image","none")
            $(".card-4").css("border","none")
            $(".card-4").css("background-image","linear-gradient(45deg,rgb(219, 39, 99),rgb(255, 154, 139))")
        }
        else{
           //console.log("else part 1")
             if($(evt.target).hasClass("card-4")){
                //$(evt.target).css("border-image","none")
                console.log("if inside else")
                $(evt.target).addClass("animateCard");
                $(evt.target).css("border","4px solid transparent")
                $(evt.target).css("border-image","linear-gradient(45deg,rgb(255, 239, 299),rgb(240, 247, 238))")
                $(evt.target).css("border-image-slice","1")
                continue;
            }

            //console.log("else part 1")
            //$(evt.target).css("border-image","linear-gradient(45deg,#FF9A8B,#DB2763)");
            $(evt.target).css("background","rgba(60, 60, 61,0.4)");
            $(evt.target).addClass("animateCard");
            $(evt.target).css("border-image","linear-gradient(45deg,rgb(219, 39, 99),rgb(255, 154, 139))")
            $(evt.target).css("border-image-slice","1")
        }
    }

    
    /*
    console.log("animation count",countAnimate)
    if(countAnimate>0){
        $(classArrayNew[k]).removeClass("animateCard");
        $(classArrayNew[k]).css("border-image","none");
    }
    else{
        
        
    } */
    
    
}


//sortPrice();
const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const d = new Date("1/10/1999"); //date is in mm/dd/yyyy format
console.log("month",d.getMonth())
console.log("The current month is " + monthNames[d.getMonth()]);
console.log("date"+d.getDate())



