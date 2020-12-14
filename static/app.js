var slideUp = ``;
let passengers = []
let paymentDetails = false
let details
let passengerForm
var slideDown = ``;
let n = sessionStorage.getItem('numPass')
let passengerSeat = ''
let seatHTML = ''
let seatDetails
let paymentForm = ''
let flag
let prevSeats = []
let prevSeatName = []

function passDetailsDisplay() {
    for (let i = 0; i < n; i++) {
        slideDown += `
        <div id=${i+1}>
    <div class="personal-details-title">Passenger ${i+1}</div>
    <div class="personal-details-sub-title">Personal Details </div>
    <div class="personal-details-disclaimer">Your name should match how it appears on the ID
        that you will use at the airport</div>
    <div class="control-group">

        <!--i class="fa fa-user" aria-hidden="true" id="usericon"></i-->
        <div class="passenger-name">
            <div class="passenger-name-1">
                <div class="formi first-name">
                    <input type="text" name="start"   autocomplete="off"
                        id="FirstName+${i+1}" >
                    <label name="from" class="label-name">
                        <span class="content-name">
                            First Name
                        </span>
                    </label>
                </div>
            </div>
            <div class="passenger-name-2">
                <div class="formi middle-name">
                    <input type="text" name="start"  autocomplete="off"
                        id="MiddleName+${i+1}" >
                    <label name="from" class="label-name">
                        <span class="content-name">
                            Middle Name
                        </span>
                    </label>
                </div> 
                <div class="formi last-name">
                    <input type="text" name="start"   autocomplete="off"
                        id="LastName+${i+1}" >
                    <label name="from" class="label-name">
                        <span class="content-name">
                            Last Name
                        </span>
                    </label>
                </div>
            </div>
        </div>

    </div>
    <div class="gender-radio-button">
        <input type="radio" name="field" id="inlineRadio2+${i+1}" value="option2" />
        <label class="male" for="inlineRadio2+${i+1}">
            <svg class="check" viewbox="0 0 40 40">
                <circle id="border" r="18px" cx="20px" cy="20px"></circle>
                <circle id="dot" r="8px" cx="20px" cy="20px"></circle>
            </svg>Male
        </label>
        <input type="radio" name="field" id="inlineRadio1+${i+1}" value="option2" />
        <label class="female" for="inlineRadio1+${i+1}">
            <svg class="check" viewbox="0 0 40 40">
                <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
                        <stop offset="0%" stop-color="rgb(219, 39, 99)"></stop>
                        <stop offset="50%" stop-color="rgb(219, 39, 99)"></stop>
                        <stop offset="100%" stop-color="rgb(255, 154, 139)"></stop>
                    </linearGradient>
                </defs>
                <circle id="border" r="18px" cx="20px" cy="20px"></circle>
                <circle id="dot" r="8px" cx="20px" cy="20px"></circle>
            </svg>Female
        </label>
        

    </div>
    <div class="formi dob">
        <input type="text" name="start"  autocomplete="off" id="start+${i+1}"
            onfocus="(this.type='date') (this.value=new Date().toISOString().substr(0, 10))"
            onblur="if(!this.value)this.type='text'">
        <label name="from" class="label-name">
            <span class="content-name">
                Date Of Birth
            </span>
        </label>
    </div>

    <div class="contacts">
        
        <div class="formi email">
            <input type="text" name="start"  autocomplete="off" 
                id="exampleInputEmail1+${i+1}">
            <label name="from" class="label-name">
                <span class="content-name">
                    E-Mail
                </span>
            </label>
        </div>
        <div class="formi contact-details">
            <input type="text" name="phone"  
                autocomplete="off" id="phone+${i+1}">
            <label name="from" class="label-name">
                <span class="content-name">
                    Contact Details
                </span>
            </label>
        </div>
    </div>
    <div class="email-disclaimer">We will never share your email with anyone else.</div>

</div>
<hr class="personal-details-line" noshade>
        `
    }

    // slideDown += `<div align="right">
    // <button class="btn btn-primary">Continue</button>
    // </div>`
    slideDown += `<button class="login-btn-invisible"><a class="login-btn">
    <svg width="277" height="62">
      <rect x="5" y="5" rx="25" fill="none" stroke="url(#gradient)" width="240" height="50"></rect>
    </svg>
    <span>Continue</span>
  </a></button>`


    document.getElementById('passform').innerHTML = slideDown
}

passDetailsDisplay()

$("#passform").submit(function (e) {
    e.preventDefault();
});


//pattern pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"




var paymentSlideUpDetails = ""

var paymentSlideDownDetails = `

<div class="payment-desc">
					Wyvern charges a fee for use of some payment methods. If the fee applies, you will see the amount
					after
					selecting your
					payment method.
					You may need to present the card that you use below when you check in at the airport, so
					bring it with you on the day of departure.
				</div>



				<div class="personal-details-card">
					<div class="formi card-number">
						<input type="text" name="start" autocomplete="off" id="cardNum" >
						<label name="from" class="label-name">
							<span class="content-name">
								Card Number:
							</span>
						</label>
					</div>
					<div class="formi card-name">
						<input type="text" name="start" autocomplete="off" id="nameOnCard" >
						<label name="from" class="label-name">
							<span class="content-name">
								Name On Card:
							</span>
						</label>
					</div>
				</div>
				<div class="imp-details">
					<div class="formi card-cvv">
						<input type="text" name="start" autocomplete="off" id="cvv" >
						<label name="from" class="label-name">
							<span class="content-name">
								CVV:
							</span>
						</label>
					</div>

					<div class="formi card-exp">
						<input type="text" name="exp" autocomplete="off" id="expYear" >
						<label name="exp" class="label-name" for="exp">
							<span class="content-name">
								Expiry Year:
							</span>
						</label>
					</div>
				</div>
				<div class="formi card-address">
					<input type="text" name="start" autocomplete="off" id="address" >
					<label name="from" class="label-name">
						<span class="content-name">
							Address:
						</span>
					</label>
				</div>
				<div class="address-details">
					<div class="formi card-city">
						<input type="text" name="start" autocomplete="off" id="city" >
						<label name="from" class="label-name">
							<span class="content-name">
								City:
							</span>
						</label>
					</div>
					<div class="formi card-state">
						<input type="text" name="start" autocomplete="off" id="state" >
						<label name="from" class="label-name">
							<span class="content-name">
								State:
							</span>
						</label>
					</div>
				</div>

				<div class="termsnservices">
					<div class="line-1">
						By continuing,you agree to the Wyvern Payments terms and services.
					</div>
					<div class="line-2">
						The Wyvern payments privacy notice describes how Wyvern handles payments info.
					</div>

				</div>

				<button class="login-btn-invisible" id="savebutton"><a class="login-btn">
						<svg width="277" height="62">
							<rect x="5" y="5" rx="25" fill="none" stroke="url(#gradient)" width="240" height="50">
							</rect>
						</svg>
						<span>Save</span>
					</a>
				</button>
`;


var seatBookUp = ""
var seatBookDown = `

<ol class="cabin">
							<li class="row row--1">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="1" />
										<label for="1" id='l-1'>A1</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="2" />
										<label for="2" id='l-2'>A2</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="3" />
										<label for="3" id='l-3'>A3</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="4" />
										<label for="4" id='l-4'>A4</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="5" />
										<label for="5" id='l-5'>A5</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="6" />
										<label for="6" id='l-6'>A6</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="7" />
										<label for="7" id='l-7'>A7</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="8" />
										<label for="8" id='l-8'>A8</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="9" />
										<label for="9" id='l-9'>A9</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="10" />
										<label for="10" id='l-10'>A10</label>
									</li>
								</ol>
							</li>
							<li class="row row--2">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="11" />
										<label for="11" id='l-11'>B1</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="12" />
										<label for="12" id='l-12'>B2</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="13" />
										<label for="13" id='l-13'>B3</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="14" />
										<label for="14" id='l-14'>B4</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="15" />
										<label for="15" id='l-15'>B5</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="16" />
										<label for="16" id='l-16'>B6</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="17" />
										<label for="17" id='l-17'>B7</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="18" />
										<label for="18" id='l-18'>B8</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="19" />
										<label for="19" id='l-19'>B9</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="20" />
										<label for="20" id='l-20'>B10</label>
									</li>
								</ol>
							</li>
							<li class="row row--3">



								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="21" />
										<label for="21" id='l-21'>C1</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="22" />
										<label for="22" id='l-22'>C2</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="23" />
										<label for="23" id='l-23'>C3</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="24" />
										<label for="24" id='l-24'>C4</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="25" />
										<label for="25" id='l-25'>C5</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="26" />
										<label for="26" id='l-26'>C6</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="27" />
										<label for="27" id='l-27'>C7</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="28" />
										<label for="28" id='l-28'>C8</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="29" />
										<label for="29" id='l-29'>C9</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="30" />
										<label for="30" id='l-30'>C10</label>
									</li>
								</ol>
							</li> <br><br>

							<li class="row row--1">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="31" />
										<label for="31" id='l-31'>D1</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="32" />
										<label for="32" id='l-32'>D2</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="33" />
										<label for="33" id='l-33'>D3</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="34" />
										<label for="34" id='l-34'>D4</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="35" />
										<label for="35" id='l-35'>D5</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="36" />
										<label for="36" id='l-36'>D6</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="37" />
										<label for="37" id='l-37'>D7</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="38" />
										<label for="38" id='l-38'>D8</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="39" />
										<label for="39" id='l-39'>D9</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="40" />
										<label for="40" id='l-40'>D10</label>
									</li>
								</ol>
							</li>
							<li class="row row--1">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="41" />
										<label for="41" id='l-41'>E1</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="42" />
										<label for="42" id='l-42'>E2</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="43" />
										<label for="43" id='l-43'>E3</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="44" />
										<label for="44" id='l-44'>E4</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="45" />
										<label for="45" id='l-45'>E5</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="46" />
										<label for="46" id='l-46'>E6</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="47" />
										<label for="47" id='l-47'>E7</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="48" />
										<label for="48" id='l-48'>E8</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="49" />
										<label for="49" id='l-49'>E9</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="50" />
										<label for="50" id='l-50'>E10</label>
									</li>
								</ol>
							</li>
							<li class="row row--1">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="51" />
										<label for="51" id='l-51'>F1</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="52" />
										<label for="52" id='l-52'>F2</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="53" />
										<label for="53" id='l-53'>F3</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="54" />
										<label for="54" id='l-54'>F4</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="55" />
										<label for="55" id='l-55'>F5</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="56" />
										<label for="56" id='l-56'>F6</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="57" />
										<label for="57" id='l-57'>F7</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="58" />
										<label for="58" id='l-58'>F8</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="59" />
										<label for="59" id='l-59'>F9</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="60" />
										<label for="60" id='l-60'>F10</label>
									</li>
								</ol>
							</li>
							<br><br>

							<li class="row row--1">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="61" />
										<label for="61" id='l-61'>G1</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="62" />
										<label for="62" id='l-62'>G2</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="63" />
										<label for="63" id='l-63'>G3</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="64" />
										<label for="64" id='l-64'>G4</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="65" />
										<label for="65" id='l-65'>G5</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="66" />
										<label for="66" id='l-66'>G6</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="67" />
										<label for="67" id='l-67'>G7</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="68" />
										<label for="68" id='l-68'>G8</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="69" />
										<label for="69" id='l-69'>G9</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="70" />
										<label for="70" id='l-70'>G10</label>
									</li>
								</ol>
							</li>
							<li class="row row--1">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="71" />
										<label for="71" id='l-71'>H1</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="72" />
										<label for="72" id='l-72'>H2</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="73" />
										<label for="73" id='l-73'>H3</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="74" />
										<label for="74" id='l-74'>H4</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="75" />
										<label for="75" id='l-75'>H5</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="76" />
										<label for="76" id='l-76'>H6</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="77" />
										<label for="77" id='l-77'>H7</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="78" />
										<label for="78" id='l-78'>H8</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="79" />
										<label for="79" id='l-79'>H9</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="80" />
										<label for="80" id='l-80'>H10</label>
									</li>
								</ol>
							</li>
							<li class="row row--1">
								<ol class="seats" type="A">
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="81" />
										<label for="81" id='l-81'>I1</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="82" />
										<label for="82" id='l-82'>I2</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="83" />
										<label for="83" id='l-83'>I3</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="84" />
										<label for="84" id='l-84'>I4</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="85" />
										<label for="85" id='l-85'>I5</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="86" />
										<label for="86" id='l-86'>I6</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="87" />
										<label for="87" id='l-87'>I7</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="88" />
										<label for="88" id='l-88'>I8</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="89" />
										<label for="89" id='l-89'>I9</label>
									</li>
									<li class="seat">
										<input type="checkbox" onclick='modifySeats(this.id)' id="90" />
										<label for="90" id='l-90'>I10</label>
									</li>
								</ol>
							</li>
						</ol>


`

let revUp = ''
let revDown =
    `
<div>FLT_NO:AI-443</div>
<div>SRC: DEL</div>
<div>DEST: CCU</div>
<div>DEPT:</div>
<div>ARR:</div>
<div>PASSENGERS:${n}</div>
<hr>
`

function continueToRev() {

    flag = 1

    document.getElementById("continueToRev").style.display = "none"

    document.getElementById("detailsButton1").style.display = "block"
    document.getElementById('detailsButton2').style.display = 'block'
    document.getElementById('detailsButton3').style.display = 'block'

    document.getElementById('finalBook').style.display = 'block'

    seatHTML = document.getElementById('seatSelection').innerHTML
    document.getElementById('seatSelection').innerHTML = ''

    document.getElementById('revBooking').innerHTML = ''

    seatDetails = true

    document.getElementById('revBooking').innerHTML += revDown

    for (var i = 0; i < n; i++) {
        document.getElementById('revBooking').innerHTML +=
            `<div id='pas-${i+1}'>
        <div>NAME: ${passengers[i].name}</div>
        <div>DOB: ${passengers[i].dob}</div>
        <div>GENDER: ${passengers[i].gender}</div>
        <div>SEAT: ${passengers[i].seats}</div>
        <div>PRICE: 4400</div>
        </div>
        <hr>
        
        `
    }
}

function seatUpDown() { //SEAT EDIT

    document.getElementById("detailsButton1").style.display = "none"
    document.getElementById('detailsButton2').style.display = 'none'
    document.getElementById('detailsButton3').style.display = 'none'

    document.getElementById('continueToRev').style.display = 'block'
    document.getElementById('revBooking').innerHTML = ''
    document.getElementById('finalBook').style.display = 'none'


    console.log(seatHTML)

    document.getElementById('seatSelection').innerHTML = seatHTML

    for (let k = 0; k < n; k++) {
        document.getElementById(passengers[k].seatId).checked = true
    }

    document.getElementById('revBooking').innerHTML = ''
    // seatDetails = false;

    // document.getElementById('seatSelection').innerHTML = ''
    // seatDetails = true;

}


paymentUp = ``

function showSB() {

    var cardno = document.getElementById('cardNum').value
    document.getElementById('cardNum').setAttribute('value', cardno)

    var expyear = document.getElementById('expYear').value
    document.getElementById('expYear').setAttribute('value', expyear)

    var cvv = document.getElementById('cvv').value
    document.getElementById('cvv').setAttribute('value', cvv)

    var cname = document.getElementById('nameOnCard').value
    document.getElementById('nameOnCard').setAttribute('value', cname)

    var adr = document.getElementById('address').value
    document.getElementById('address').setAttribute('value', adr)

    var city = document.getElementById('city').value
    document.getElementById('city').setAttribute('value', city)

    var state = document.getElementById('state').value
    document.getElementById('state').setAttribute('value', state)

    paymentUp += `<div class='payDetails' id='payUp'>
    <h7><b>CardNo: ${cardno}</b></h7>
    <h7><b>Exp:${expyear}</b></h7>
    <h7><b>CVV:${cvv}</b></h7>
    <h7><b>Name on Card:${cname}</b></h7>
    <h7><b>Address:${adr}</b></h7>
    <h7><b>City:${city}</b></h7>
    <h7><b>State${state}</b></h7>


    </div>`

    paymentForm = document.getElementById('paymentDetails').innerHTML

    document.getElementById('paymentDetails').innerHTML = paymentUp

    paymentUp = ''

    document.getElementById("detailsButton1").style.display = "block"
    document.getElementById("detailsButton2").style.display = "block"
    document.getElementById('detailsButton3').style.display = 'none'

    paymentSlideDownDetails = paymentForm;

    document.getElementById("seatSelection").innerHTML = seatBookDown;

    setTimeout(() => {
        if (passengers[k].seatId == null) {

        } else {
            for (let k = 0; k < n; k++) {
                document.getElementById(passengers[k].seatId).checked = true
            }
        }

    }, 50)



    document.getElementById("continueToRev").style.display = "block";

    //     paymentDetails = false;
    //  else {
    //document.getElementById("seatSelection").innerHTML = seatBookUp;
    // paymentDetails = true;
    // 
    passengerSelect("0")
	document.getElementById('inlineRadio+0').checked = true
			

}

//cross button animation 
$("#cross-btn").on('click', () => {
    $("#cross-btn").addClass("crossRubberBand");

    $(".crossRubberBand").css({
        "animation-name": "rubberBand",
        "animation-duration": "300ms",
        "animation-fill-mode": "both"
    })


    $("#cross-btn").removeClass("crossRubberBand")


})

function continueToPayment() {





    document.getElementById("right-seats").innerHTML = '';
    passengerSeat = ''


    //let n = document.getElementsByClassName('passDetails').length

    // let n = x.length

    for (let i = 0; i < n; i++) {
        var gender
        if (document.getElementById(`inlineRadio1+${i+1}`).checked == true) {
            document.getElementById(`inlineRadio1+${i+1}`).setAttribute('checked', true)
            console.log(document.getElementById(`inlineRadio1+${i+1}`))
            gender = 'Female'
        } else {
            document.getElementById(`inlineRadio2+${i+1}`).setAttribute('checked', true)
            // console.log(document.getElementById(`inlineRadio2+${i+1}`))
            gender = 'Male'
        }

        var chk = $('#inlineRadio1').checked
        var fname = document.getElementById(`FirstName+${i+1}`).value
        document.getElementById(`FirstName+${i+1}`).setAttribute('value', fname)
        //console.log(fname)
        var mname = document.getElementById(`MiddleName+${i+1}`).value
        document.getElementById(`MiddleName+${i+1}`).setAttribute('value', mname)
        var lname = document.getElementById(`LastName+${i+1}`).value
        document.getElementById(`LastName+${i+1}`).setAttribute('value', lname)
        // var rbtn1 = $('#inlineRadio1').val();
        // var rbtn2 = $('#inlineRadio2').val();
        var dob = document.getElementById(`start+${i+1}`).value
        document.getElementById(`start+${i+1}`).setAttribute('value', dob)

        var phno = document.getElementById(`phone+${i+1}`).value
        document.getElementById(`phone+${i+1}`).setAttribute('value', phno)

        var emailid = document.getElementById(`exampleInputEmail1+${i+1}`).value
        document.getElementById(`exampleInputEmail1+${i+1}`).setAttribute('value', emailid)
        // console.log(fname, mname, lname, rbtn1, dob, phno, emailid, chk)

        slideUp += `<div class='passDetails' id='pass-${i+1}'>
        <h6>${fname} ${mname} ${lname}</h6>
        <h6>${dob}</h6>
        <h6>${gender}</h6>
        <h6>${emailid}</h6>
        <h6>${phno}</h6>
        </div>
        
        <hr>`

        passengerSeat += `<div id='p-${i}' class='allPass' onclick="passengerSelect(${i})">
        <div class="select-radio-button">
            <input type="radio" name="field" id="inlineRadio+${i}" value="option2" />
            <label class="male" for="inlineRadio+${i}">
                <svg class="check" viewbox="0 0 40 40">
                    <circle id="border" r="18px" cx="20px" cy="20px"></circle>
                    <circle id="dot" r="8px" cx="20px" cy="20px"></circle>
                </svg>
                <div class="seat-passenger-title">Passenger-${i+1}</div>
            </label>
            <button id='cross-btn' onclick="cancelSeats(${i})"><i class="fas fa-times"></i></buton>
        </div>

        <div class="seat-passenger-content">
            <div class="pass-name-seats">
                <div class="pass-name-seats">${fname} ${mname} ${lname}</div>
            </div>
            <div class="seat-name">Seat -<div class="seat-id" id='s-${i}'>Not Selected</div>
            </div>
        </div>

    </div>`


        // let pobj = {
        //     fname,
        //     mname,
        //     lname,
        //     rbtn1,
        //     rbtn2,
        //     dob,
        //     phno,
        //     emailid,
        //     chk
        // }
        //passengerForm = ''
        passengerForm = document.getElementById('passform').innerHTML
        // console.log(passengerForm)

    }


    document.getElementById("right-seats").innerHTML = passengerSeat;
    document.getElementById("passform").innerHTML = slideUp;
    slideUp = ''
    //console.log(pobj)
    //fetch()

    //document.getElementById("detailsButton").style.visibility = "visible";
    //document.getElementById("detailsButton").disabled = false;
    document.getElementById("detailsButton1").style.display = "block"

    //document.getElementById("detailsButton3").style.display = "block"

    document.getElementById('paymentDetails').innerHTML = paymentSlideDownDetails
    // details = false;
    // paymentsSlideUpDown()
    // document.forms.submit();
    // document.getElementById("")
    var iD = 1
    for (let j = 0; j < n * 5; j += 5) {

        var name = document.getElementsByTagName('h6')[j].innerHTML
        console.log(name)
        var dob = document.getElementsByTagName('h6')[j + 1].innerHTML
        console.log(dob)

        var gender = document.getElementsByTagName('h6')[j + 2].innerHTML
        console.log(gender)

        var email = document.getElementsByTagName('h6')[j + 3].innerHTML
        console.log(email)

        var phone = document.getElementsByTagName('h6')[j + 4].innerHTML
        console.log(phone)







        passengers.push({

            name: name,
            id: iD,
            dob: dob,
            phone: phone,
            email: email,
            seats: '',
            gender: gender,
        })
        iD = iD + 1
    }

    for (let i = 0; i < n; i++) {
        passengers[i].seatId = prevSeats[i]
        passengers[i].seats = prevSeatName[i]

        if (prevSeatName[i] == null) {
            document.getElementById(`s-${i}`).innerHTML = 'Not Selected'

        } else {
            document.getElementById(`s-${i}`).innerHTML = passengers[i].seats

        }

    }


}


function slideUpDown() {

    //document.getElementById("passform").innerHTML = '' 
    document.getElementById("seatSelection").innerHTML = seatBookUp;
    document.getElementById('detailsButton3').style.display = 'none'
    document.getElementById('detailsButton2').style.display = 'none'


    document.getElementById('finalBook').style.display = 'none'

    document.getElementById('revBooking').innerHTML = ''
    document.getElementById('paymentDetails').innerHTML = ''
    document.getElementById('paymentDetails').innerHTML = ''



    document.getElementById("passform").innerHTML = passengerForm;
    // details = true;
    document.getElementById("detailsButton1").style.display = "none"
    for (let i = 0; i < n; i++) {
        prevSeats[i] = passengers[i].seatId
        prevSeatName[i] = passengers[i].seats
    }
    passengers = []

}

function paymentsSlideUpDown() {

    document.getElementById("detailsButton1").style.display = "none"
    document.getElementById('detailsButton2').style.display = 'none'
    document.getElementById('detailsButton3').style.display = 'none'
    document.getElementById('continueToRev').style.display = 'none'

    document.getElementById('revBooking').innerHTML = ''
    document.getElementById('seatSelection').innerHTML = ''

    document.getElementById('finalBook').style.display = 'none'

    document.getElementById('paymentDetails').innerHTML = paymentForm

    // document.getElementById("detailsButton2").style.display = "block"
    // document.getElementById("seatSelection").innerHTML = seatBookUp;

    // if (paymentDetails) {
    //     document.getElementById("paymentDetails").innerHTML = paymentSlideUpDetails;
    //     paymentDetails = false;
    // } else {
    //     document.getElementById("paymentDetails").innerHTML = paymentSlideDownDetails;
    //     paymentDetails = true;
    // }
}

$("#payForm").submit(function (e) {
    e.preventDefault();
});

