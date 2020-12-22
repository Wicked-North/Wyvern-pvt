var bgImageArray = ["64million.png", "atlantis.png", "food.png", "journeyends.png", "over100k2.png", "test1.png"]
base = "./images/payment_Illustrations/",
	secs = 4;
bgImageArray.forEach(function (img) {
	new Image().src = base + img;
	// caches images, avoiding white flash between background replacements
});

function backgroundSequence() {
	window.clearTimeout();
	var k = 0;
	for (i = 0; i < bgImageArray.length; i++) {
		setTimeout(function () {
			console.log(document.getElementById('payment-right-image'))
			document.getElementById('payment-right-image').style.background = "url(" + base + bgImageArray[k] + ") no-repeat center center fixed";
			document.documentElement.style.backgroundSize = "contain";
			if ((k + 1) === bgImageArray.length) {
				setTimeout(function () {
					backgroundSequence()
				}, (secs * 1000))
			} else {
				k++;
			}
		}, (secs * 1000) * i)
	}
}
backgroundSequence();