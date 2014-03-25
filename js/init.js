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
	$("#totale").text(prod);
	var ex = CryptoJS.SHA3(prod.toString(), {
		outputLength : 512
	}).toString(CryptoJS.enc.Hex)
	var ascii = hex2a(ex);
	$("#cod").text(ascii.substr(0, 12));
}

function crea(n) {
	$(".grid>li").remove();
	var em=Math.sqrt(n)*5+1;
	em=em+'em'
	$('.grid').css("width", em);
	for (var i = 0; i < n; i++) {
		$('.grid').append("<li>("+i+"+2)^C</li>");
	}
	$(".grid>li").on("click",function() {
	if($('.select').length){
		if(Number($('.select').text())==0){
			$(this).prop('colore', 0)
			$(this).css("background-color", "rgba(0, 0, 0, 0.2)");
		}else{
			$(this).prop('colore', Number($('.select').text()))
			var rgbT = arrayC[Number($('.select').text()) - 1];
			$(this).css("background-color", rgbT);
		}
		$(".exampleLine>li").removeClass('select');
	}else{
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
		}
		conta();
		
	});
  	function avanti(){
			var active = $('.active'); 
			active.click();
		}
	$(".grid>li").mouseup(function() {
		$('.active').removeClass('active');
		clearInterval(interval);
	});
	$(".grid>li").mousedown(function() {
		$( this ).addClass('active');
		interval = setInterval(avanti,500);
	
	});
	conta();
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
	$(".exampleLine>li").click(function() {
	$(".exampleLine>li").removeClass('select');
	$( this ).addClass('select');
	});
}
function creaType() {
	$(".typeofgrid>li").remove();
	$('.typeofgrid').append("<ul class='typeofgrid9'></ul>");
	$('.typeofgrid').append("<ul class='typeofgrid16'></ul>");
	$('.typeofgrid').append("<ul class='typeofgrid25'></ul>");
	$('.typeofgrid').append("<ul class='typeofgrid36'></ul>");
	for (var i = 0; i < 9; i++) {
		$('.typeofgrid9').append("<li></li>");
	}
	for (var i = 0; i < 16; i++) {
		$('.typeofgrid16').append("<li></li>");
	}
	for (var i = 0; i < 25; i++) {
		$('.typeofgrid25').append("<li></li>");
	}
	for (var i = 0; i < 36; i++) {
		$('.typeofgrid36').append("<li></li>");
	}
	$('.typeofgrid9').click(function() {
    localStorage.gridType = 9;
     crea(localStorage.gridType); 
	});
	$('.typeofgrid16').click(function() {
    localStorage.gridType = 16;
     crea(localStorage.gridType); 
	});
	$('.typeofgrid25').click(function() {
    localStorage.gridType = 25;
     crea(localStorage.gridType); 
	});
	$('.typeofgrid36').click(function() {
    localStorage.gridType = 36;
     crea(localStorage.gridType);
	});
}

$(document).ready(function() {
	totaleColori = 9;
	arrayC = ["rgb(245, 218, 69)", "rgb(154, 245, 69)", "rgb(10, 225, 35)", "rgb(69, 245, 218)", "rgb(69, 154, 245)", "rgb(101, 69, 245)", "rgb(159, 49, 179)", "rgb(245, 69, 154)", "rgb(245, 101, 69)"];
	creaType();
	creaExample();
	if (localStorage.gridType)
  {
  crea(localStorage.gridType); 
  }
else
  { 
  localStorage.gridType = 16;
     crea(localStorage.gridType); 
  }

	/*spiegazioni*/
		var overlay = document.querySelector( '.md-overlay' );

		[].slice.call( document.querySelectorAll( '.what' ) ).forEach( function( el, i ) {

			var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
				close = modal.querySelector( '.md-close' );

			function removeModal( hasPerspective ) {
				$(modal).removeClass('md-show' );

				if( hasPerspective ) {
					$(document.documentElement).removeClass('md-perspective' );
				}
			}

			function removeModalHandler() {
				removeModal($(el).has('md-setperspective').length);
			}

			el.addEventListener( 'click', function( ev ) {
				$(modal).addClass('md-show' );
				overlay.removeEventListener( 'click', removeModalHandler );
				overlay.addEventListener( 'click', removeModalHandler );

				if( $(el).has('md-setperspective').length ) {
					setTimeout( function() {
						$(document.documentElement).addClass('md-perspective' );
					}, 25 );
				}
			});

			close.addEventListener( 'click', function( ev ) {
				ev.stopPropagation();
				removeModalHandler();
			});

		} );
  
		var overlay = document.querySelector( '.md-overlay' );

		[].slice.call( document.querySelectorAll( '.imp' ) ).forEach( function( el, i ) {

			var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
				close = modal.querySelector( '.md-close' );

			function removeModal( hasPerspective ) {
				$(modal).removeClass('md-show' );

				if( hasPerspective ) {
					$(document.documentElement).removeClass('md-perspective' );
				}
			}

			function removeModalHandler() {
				removeModal($(el).has('md-setperspective').length);
			}

			el.addEventListener( 'click', function( ev ) {
				$(modal).addClass('md-show' );
				overlay.removeEventListener( 'click', removeModalHandler );
				overlay.addEventListener( 'click', removeModalHandler );

				if( $(el).has('md-setperspective').length ) {
					setTimeout( function() {
						$(document.documentElement).addClass('md-perspective' );
					}, 25 );
				}
			});

			close.addEventListener( 'click', function( ev ) {
				ev.stopPropagation();
				removeModalHandler();
			});

		} );  
  
}); 
