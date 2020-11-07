var slideUp = '<h6>Vivek Gupta </h6>\
<h6>May 4, 2020</h6>\
<h6>Male</h6>\
<h6>vivek@abc.com</h6>\
<h6>9875631214</h6>';

var slideDown = '<small>Your name should match how it appears on the ID that you will use at the airport</small>\
<p id="card4pd"><strong>Personal Details </strong></p>\
<div class="control-group">\
<div class="controls">\
    <i class="fa fa-user" aria-hidden="true" id="usericon"></i>\
    <input class="input-small" id="FirstName" name="FirstName" placeholder="First name" type="text" value="" />\
    <input class="input-small" id="MiddleName" name="MiddleName" placeholder="Middle name" type="text" value="" />\
    <input class="input-small" id="LastName" name="LastName" placeholder="Last name" type="text" value="" />\
</div>\
</div>\
<div id="card4buttons">\
<div class="form-check form-check-inline">\
    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">\
    <label class="form-check-label" for="inlineRadio1"><span id="femalespace">Female</span></label>\
</div>\
<div class="form-check form-check-inline"> \
    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">\
    <label class="form-check-label" for="inlineRadio2"><span id="malespace">Male</span></label>\
</div>\
</div>\
<div id="card4dob">\
<label for="start" id="dob">Date Of Birth:\
    <input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01"\
        max="2018-12-31">\
</label>\
</div>\
<div id="card4phone">\
<label for="phone">Contact Details:</label>\
<input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}">\
</div>\
<div class="form-group" id="card4email">\
<label for="exampleInputEmail1">Email address</label>\
<input type="email" class="form-control" id="exampleInputEmail1"\
    aria-describedby="emailHelp">\
<small id="emailHelp" class="form-text text-muted">We will never share your email with\
    anyone\
    else.</small>\
</div>\
<div align="right">\
<button type="button" class="btn btn-primary"\
    onclick="continueToPayment();"><span>Continue</span></button>\
</div>\
</div>';

var details = false;

function continueToPayment() {
    var chk = $('#inlineRadio1').checked
    var fname = $('#FirstName').val();
    var mname = $('#MiddleName').val();
    var lname = $('#LastName').val();
    var rbtn1 = $('#inlineRadio1').val();
    var rbtn2 = $('#inlineRadio2').val();
    var dob = $('#start').val();
    var phno = $('#phone').val();
    var emailid= $('#exampleInputEmail1').val();
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
    document.getElementById("detailsButton").style.visibility = "visible";
    document.getElementById("detailsButton").disabled = false;
    details = true;
    // document.forms.submit();
    // document.getElementById("")
}

function slideUpDown() {
    if (details) {
        document.getElementById("paymentform").innerHTML = slideDown;
        details = false;
    }
    else {
        document.getElementById("paymentform").innerHTML = slideUp;
        details = true;
    }
}


var paymentSlideDownDetails = "<h1>Bye</h1>";
var paymentSlideUpDetails = '<p><i class="fa fa-exclamation-triangle" aria-hidden="true" id="yellowexclamation"></i>\
SpiceJet charges a fee for use of some payment methods. If the fee applies, you will <span id="card5text2">see the amount after selecting your payment method.</span>\
<p id="card5text2">\
You may need to present the card that you use below when you check in at the airport, so\
bring it with you on the day of departure.</p>\
</p>\
<!-- </li>\
<li class="list-group-item"> -->\
<i class="fab fa-google-pay" id="gpayicon"></i>\
<!-- </li>\
<li class="list-group-item"> -->\
<div class="dropdown" id="card5dropbox"><i class="fa fa-credit-card-alt" aria-hidden="true"\
    id="creditcard"></i>\
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"\
    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
    Dropdown button\
</button>\
<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">\
    <a class="dropdown-item" href="#">Action</a>\
    <a class="dropdown-item" href="#">Another action</a>\
    <a class="dropdown-item" href="#">Something else here</a>\
</div>\
</div>\
<div class="form-group" id="cardnumber">\
<label for="cardNumber">CARD NUMBER</label>\
<div class="input-group">\
    <input type="tel" class="form-control" name="cardNumber"\
        placeholder="Valid Card Number" autocomplete="cc-number" required autofocus />\
</div>\
</div>\
<div id="cddetails">\
<label for="expyear">Exp Year :</label>\
<input type="text" id="expyear" name="expyear" placeholder="2018">\
<label for="cvv" id="cv">CVV :</label>\
<input type="text" id="cvv" name="cvv" placeholder="352">\
</div>\
<div id="namecard">\
<label for="cname">Name on Card :</label>\
<input type="text" id="cname" name="cardname" placeholder="John More Doe">\
</div>\
<div id="card5add">\
<label for="adr"><i class="fa fa-address-card-o"></i> Address</label>\
<input type="text" id="adr" name="address" placeholder="542 W. 15th Street">\
</div>\
<div id="card5city">\
<label for="city"><i class="fa fa-institution"></i> City</label>\
<input type="text" id="city" name="city" placeholder="New York">\
</div>\
<div id="card5state">\
<label for="state">State</label>\
<input type="text" id="state" name="state" placeholder="NY">\
</div>\
<small id="card5bottomtext">By continuing,you agree to the google Payments <a href="">terms\
    and\
    services.</a>\
The Google payments <a href="">privacy Notice</a> describes how google handles payments\
info.\
</small>\
<div align="right">\
<button type="button" class="btn btn-primary" id="savebutton"><span>Save</span></button>\
</div>';




var paymentDetails = true;
function paymentsSlideUpDown() {
    if (paymentDetails) {
        document.getElementById("paymentDetails").innerHTML = paymentSlideDownDetails;
        paymentDetails = false;
    }
    else {
        document.getElementById("paymentDetails").innerHTML = paymentSlideUpDetails;
        paymentDetails = true;
    }
}