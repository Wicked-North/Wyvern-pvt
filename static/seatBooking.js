let seats = []
let allDetails=[]

var slideUp = '<h6>Vivek Gupta </h6>\
<h6>May 4, 2020</h6>\
<h6>Male</h6>\
<h6>vivek@abc.com</h6>\
<h6>9875631214</h6>';
let paymentDetails = false
let details
var slideDown = `<small>Your name should match how it appears on the ID that you will use at the airport</small>\
<p id="card4pd"><strong>Personal Details </strong></p>
<div class="control-group">
<div class="controls">
    <i class="fa fa-user" aria-hidden="true" id="usericon"></i>
    <input class="input-small" id="FirstName" name="FirstName" placeholder="First name" type="text" value="" />
    <input class="input-small" id="MiddleName" name="MiddleName" placeholder="Middle name" type="text" value="" />
    <input class="input-small" id="LastName" name="LastName" placeholder="Last name" type="text" value="" />
</div>
</div>
<div id="card4buttons">
<div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
    <label class="form-check-label" for="inlineRadio1"><span id="femalespace">Female</span></label>
</div>
<div class="form-check form-check-inline"> 
    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
    <label class="form-check-label" for="inlineRadio2"><span id="malespace">Male</span></label>
</div>
</div>
<div id="card4dob">
<label for="start" id="dob">Date Of Birth:
    <input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01"
        max="2018-12-31">
</label>
</div>
<div id="card4phone">
<label for="phone">Contact Details:</label>
<input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}">
</div>
<div class="form-group" id="card4email">
<label for="exampleInputEmail1">Email address</label>
<input type="email" class="form-control" id="exampleInputEmail1"
    aria-describedby="emailHelp">
<small id="emailHelp" class="form-text text-muted">We will never share your email with
    anyone
    else.</small>
</div>
<div align="right">
<button type="button" class="btn btn-primary"
    onclick="continueToPayment();"><span>Continue</span></button>
</div>
</div>`;


function continueToPayment() {
    var chk = $('#inlineRadio1').checked
    var fname = $('#FirstName').val();
    var mname = $('#MiddleName').val();
    var lname = $('#LastName').val();
    var rbtn1 = $('#inlineRadio1').val();
    var rbtn2 = $('#inlineRadio2').val();
    var dob = $('#start').val();
    var phno = $('#phone').val();
    var emailid = $('#exampleInputEmail1').val();
    console.log(fname, mname, lname, rbtn1, dob, phno, emailid, chk)

    let pobj = {
        fname,
        mname,
        lname,
        rbtn1,
        rbtn2,
        dob,
        phno,
        emailid,
        chk
    }
    console.log(pobj)
    //fetch()
    document.getElementById("paymentform").innerHTML = slideUp;
    //document.getElementById("detailsButton").style.visibility = "visible";
    //document.getElementById("detailsButton").disabled = false;
    document.getElementById("detailsButton1").style.display = "block"
    details = false;
    paymentsSlideUpDown()
    // document.forms.submit();
    // document.getElementById("")
}

function slideUpDown() {
    
    if (details) {
        document.getElementById("paymentform").innerHTML = slideUp;
        details = false;
      
    } else {
        document.getElementById("paymentform").innerHTML = slideDown;
        details = true;
    }
}


var paymentSlideUpDetails = ""
var paymentSlideDownDetails = `<p><i class="fa fa-exclamation-triangle" aria-hidden="true" id="yellowexclamation"></i>
SpiceJet charges a fee for use of some payment methods. If the fee applies, you will <span id="card5text2">see the amount after selecting yourpayment method.</span>
<p id="card5text2">
You may need to present the card that you use below when you check in at the airport, so
bring it with you on the day of departure.</p>
</p>
<!-- </li>
<li class="list-group-item"> -->
<i class="fab fa-google-pay" id="gpayicon"></i>
<!-- </li>
<li class="list-group-item"> -->
<div class="dropdown" id="card5dropbox"><i class="fa fa-credit-card-alt" aria-hidden="true"
    id="creditcard"></i>
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
</button>
<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
</div>
</div>
<div class="form-group" id="cardnumber">
<label for="cardNumber">CARD NUMBER</label>
<div class="input-group">
    <input type="tel" class="form-control" name="cardNumber"
        placeholder="Valid Card Number" autocomplete="cc-number" required autofocus />
</div>
</div>
<div id="cddetails">
<label for="expyear">Exp Year :</label>
<input type="text" id="expyear" name="expyear" placeholder="2018">
<label for="cvv" id="cv">CVV :</label>
<input type="text" id="cvv" name="cvv" placeholder="352">
</div>
<div id="namecard">
<label for="cname">Name on Card :</label>
<input type="text" id="cname" name="cardname" placeholder="John More Doe">
</div>
<div id="card5add">
<label for="adr"><i class="fa fa-address-card-o"></i> Address</label>
<input type="text" id="adr" name="address" placeholder="542 W. 15th Street">
</div>
<div id="card5city">
<label for="city"><i class="fa fa-institution"></i> City</label>
<input type="text" id="city" name="city" placeholder="New York">
</div>
<div id="card5state">
<label for="state">State</label>
<input type="text" id="state" name="state" placeholder="NY">
</div>
<small id="card5bottomtext">By continuing,you agree to the google Payments <a href="">terms
    and
    services.</a>
The Google payments <a href="">privacy Notice</a> describes how google handles payments
info.
</small>
<div align="right">
<button type="button" onclick="showSB()" class="btn btn-primary" id="savebutton"><span>Save</span></button>
</div>`;


var seatBookUp=""
var seatBookDown=`
 <ol class="cabin">
        <li class="row row--1">
            <ol class="seats" type="A">
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="1" />
                    <label for="1">A1</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="2" />
                    <label for="2">A2</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="3" />
                    <label for="3">A3</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)'   id="4" />
                    <label for="4">A4</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="5" />
                    <label for="5">A5</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="6" />
                    <label for="6">A6</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="7" />
                    <label for="7">A7</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="8" />
                    <label for="8">A8</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="9" />
                    <label for="9">A9</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="10" />
                    <label for="10">A10</label>
                </li>
            </ol>
        </li>
        <li class="row row--2">
            <ol class="seats" type="A">
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="11" />
                    <label for="11">B1</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="12" />
                    <label for="12">B2</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="13" />
                    <label for="13">B3</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)'   id="14" />
                    <label for="14">B4</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="15" />
                    <label for="15">B5</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="16" />
                    <label for="16">B6</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="17" />
                    <label for="17">B7</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="18" />
                    <label for="18">B8</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="19" />
                    <label for="19">B9</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="20" />
                    <label for="20">B10</label>
                </li>
            </ol>
        </li>
        <li class="row row--3">



            <ol class="seats" type="A">
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="21" />
                    <label for="21">C1</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="22" />
                    <label for="22">C2</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="23" />
                    <label for="23">C3</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)'   id="24" />
                    <label for="24">C4</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="25" />
                    <label for="25">C5</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="26" />
                    <label for="26">C6</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="27" />
                    <label for="27">C7</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="28" />
                    <label for="28">C8</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="29" />
                    <label for="29">C9</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="30" />
                    <label for="30">C10</label>
                </li>
            </ol>
        </li> <br><br>

        <li class="row row--1">
            <ol class="seats" type="A">
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="31" />
                    <label for="31">D1</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="32" />
                    <label for="32">D2</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="33" />
                    <label for="33">D3</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)'   id="34" />
                    <label for="34">D4</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="35" />
                    <label for="35">D5</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="36" />
                    <label for="36">D6</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="37" />
                    <label for="37">D7</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="38" />
                    <label for="38">D8</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="39" />
                    <label for="39">D9</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="40" />
                    <label for="40">D10</label>
                </li>
            </ol>
        </li>
        <li class="row row--1">
            <ol class="seats" type="A">
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="41" />
                    <label for="41">E1</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="42" />
                    <label for="42">E2</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="43" />
                    <label for="43">E3</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)'   id="44" />
                    <label for="44">E4</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="45" />
                    <label for="45">E5</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="46" />
                    <label for="46">E6</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="47" />
                    <label for="47">E7</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="48" />
                    <label for="48">E8</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="49" />
                    <label for="49">E9</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="50" />
                    <label for="50">E10</label>
                </li>
            </ol>
        </li>
        <li class="row row--1">
            <ol class="seats" type="A">
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="51" />
                    <label for="51">F1</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="52" />
                    <label for="52">F2</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="53" />
                    <label for="53">F3</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)'   id="54" />
                    <label for="54">F4</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="55" />
                    <label for="55">F5</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="56" />
                    <label for="56">F6</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="57" />
                    <label for="57">F7</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="58" />
                    <label for="58">F8</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="59" />
                    <label for="59">F9</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="60" />
                    <label for="60">F10</label>
                </li>
            </ol>
        </li>
        <br><br>

        <li class="row row--1">
            <ol class="seats" type="A">
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="61" />
                    <label for="61">G1</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="62" />
                    <label for="62">G2</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="63" />
                    <label for="63">G3</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)'   id="64" />
                    <label for="64">G4</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="65" />
                    <label for="65">G5</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="66" />
                    <label for="66">G6</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="67" />
                    <label for="67">G7</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="68" />
                    <label for="68">G8</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="69" />
                    <label for="69">G9</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="70" />
                    <label for="70">G10</label>
                </li>
            </ol>
        </li>
        <li class="row row--1">
            <ol class="seats" type="A">
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="71" />
                    <label for="71">H1</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="72" />
                    <label for="72">H2</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="73" />
                    <label for="73">H3</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)'   id="74" />
                    <label for="74">H4</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="75" />
                    <label for="75">H5</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="76" />
                    <label for="76">H6</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="77" />
                    <label for="77">H7</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="78" />
                    <label for="78">H8</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="79" />
                    <label for="79">H9</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="80" />
                    <label for="80">H10</label>
                </li>
            </ol>
        </li>
        <li class="row row--1">
            <ol class="seats" type="A">
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="81" />
                    <label for="81">I1</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="82" />
                    <label for="82">I2</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="83" />
                    <label for="83">I3</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)'   id="84" />
                    <label for="84">I4</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="85" />
                    <label for="85">I5</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="86" />
                    <label for="86">I6</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="87" />
                    <label for="87">I7</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="88" />
                    <label for="88">I8</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="89" />
                    <label for="89">I9</label>
                </li>
                <li class="seat"  >
                    <input type="checkbox" onclick='modifySeats(this.id)' id="90" />
                    <label for="90">I10</label>
                </li>
            </ol>
        </li>
    </ol>
`


function paymentsSlideUpDown() {
    document.getElementById("detailsButton2").style.display = "block"
    if (paymentDetails) {
        document.getElementById("paymentDetails").innerHTML = paymentSlideUpDetails;
        paymentDetails = false;
    } else {
        document.getElementById("paymentDetails").innerHTML = paymentSlideDownDetails;
        paymentDetails = true;
    }
}

function showSB(){

    if (1) {
        document.getElementById("seatSelection").innerHTML = seatBookDown;
        paymentDetails = false;
    } else {
        document.getElementById("seatSelection").innerHTML = seatBookUp;
        paymentDetails = true;
    }

}


let flightno='ai-443'
let getDetails = {
    fnum: 'ai-443',
    day: 'day1' //filled according to the param in fn
}

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
                   document.getElementById(i+1).disabled = true;
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });


}


// function savePas(){

//     var firstName=document.getElementById('FirstName').value
//     var middleName=document.getElementById('MiddleName').value
//     var lastName=document.getElementById('LastName').value

//     var dob=document.getElementById('start').value
//     var phone=document.getElementById('phone').value
//     var email=document.getElementById('exampleInputEmail1').value
   

//     passengers.push({
//         flight:flightno,
//         name:firstName+' '+middleName+' '+lastName,
//         dob:dob,
//         phone:phone,
//         email:email,
//         seats:seat

//     })

// }


//ON FINAL CONFIRMATION
function bookSeats() {
    
    let seatDets = {
        fnum: 'ai-443',
        seat: seats.join(''), //string
        day: 'day1'
    }
    allDetails.push({
        pass:passengers,
        seats:seatDets
    })

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(allDetails)
    }
    console.log(allDetails)

     fetch('/bookSeats', options)
}
let passengers=[]

//FOR EACH SEAT UI CLICK
function modifySeats(seatNo) {
    //console.log(document.getElementById(seatNo).checked)

    if (document.getElementById(seatNo).checked == true){

        seats[seatNo-1] = 1
        var seatName=document.getElementById(seatNo).nextElementSibling.innerHTML
        console.log(seatName)
        var name=document.getElementsByTagName('h6')[0].innerHTML
        console.log(name)
        var dob=document.getElementsByTagName('h6')[1].innerHTML
        console.log(dob)

        var gender=document.getElementsByTagName('h6')[2].innerHTML
        console.log(gender)

        var email=document.getElementsByTagName('h6')[3].innerHTML
        console.log(email)

        var phone=document.getElementsByTagName('h6')[4].innerHTML
        console.log(phone)

        passengers.push({
            paspnr:'909',
            flight:'ai-443',
            name:name,
            dob:dob,
            phone:phone,
            email:email,
            seats:seatName,
            gender:gender
    
        })
    }
        
    else{
        seats[seatNo-1] = 0
        passengers.pop()
    }
        
    //seats[seatNo]=1

}