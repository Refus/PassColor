function hex2a(hex) {
	var str = '';
	for (var i = 0; i < hex.length; i += 2) {
		var carattereN = 33 + Math.floor(94 * (parseInt(hex.substr(i, 2), 16) / 94 - Math.floor(parseInt(hex.substr(i, 2), 16) / 94)));
		str += String.fromCharCode(carattereN);
	}
	return str;
}

function conta() {
	var prod = 0;
	$(".grid>li").each(function(index, el) {
		if (!$(this).prop('colore')) {
			$(this).prop('colore', 0)
		}
		prod = prod + Math.pow((index + 2), $(this).prop('colore'));
	});
	return prod;
}

function crea(n) {
	$(".grid>li").remove();
	for (var i = 0; i < n; i++) {
		$('.grid').append("<li></li>");
	}
	$(".grid>li").click(function() {
		if (!$(this).prop('colore')) {
			$(this).prop('colore', 0)
		}
		switch($(this).prop('colore')) {

			case totaleColori:
				$(this).prop('colore', 0)
				$(this).css("background-color", "rgba(0, 0, 0, 0.2)");
				break

			default:
				$(this).prop('colore', $(this).prop('colore') + 1)
				var rgbT = arrayC[$(this).prop('colore') - 1];
				$(this).css("background-color", rgbT);
				break
		}

		var valore = conta();
		$("#totale").text(valore);
		var ex = CryptoJS.SHA3(valore.toString(), {
			outputLength : 512
		}).toString(CryptoJS.enc.Hex)
		var asci = hex2a(ex);
		$("#cod").text(asci.substr(0, 12));
	});
	$(".grid>li").mouseup(function() {
		$('.active').removeClass('active');
		clearInterval(interval);
	});
  	$(".grid>li").mousedown(function() {
  		$( this ).addClass('active');
  		interval = setInterval(avanti,500);
  		function avanti(){
  			var active = $('.active'); 
  			active.click();
  			}
  	});
}

function creaExample(n) {
	$(".exampleLine>li").remove();
	$('.exampleLine').append("<li>0</li>");
	for (var i = 0; i < totaleColori; i++) {
		var val = i + 1
		var rgbT = "rgb(" + arrayC[i].r + "," + arrayC[i].g + "," + arrayC[i].b + ")";
		$('.exampleLine').append("<li>" + val + "</li>");
	}
	$(".exampleLine>li").each(function(index, el) {
		if (index != 0) {
			var rgbT = arrayC[index - 1];
			$(this).css("background-color", rgbT);
		}
	});
}


$(document).ready(function() {
	totaleColori = 9;
	arrayC = ["rgb(245, 218, 69)", "rgb(154, 245, 69)", "rgb(10, 225, 35)", "rgb(69, 245, 218)", "rgb(69, 154, 245)", "rgb(101, 69, 245)", "rgb(159, 49, 179)", "rgb(245, 69, 154)", "rgb(245, 101, 69)"];
	creaExample();
	crea(9);
	var valore = conta();
	$("#totale").text(valore);
	var ex = CryptoJS.SHA3(valore.toString(), {
		outputLength : 512
	}).toString(CryptoJS.enc.Hex)
	var asci = hex2a(ex);
	$("#cod").text(asci.substr(0, 12));

}); 
