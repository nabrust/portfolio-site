$(function() {
	$(".link-by-main-navigation").mouseover(function(){
		$(this).addClass("hover");
	});

	$(".link-by-main-navigation").mouseout(function(){
		$(this).removeClass("hover");
	});

	$(".link-by-main-navigation").mousedown(function() {
		$(".link-by-main-navigation").removeClass("active");
		$(this).addClass("active");
	});

	if (!Modernizr.input.placeholder){
		$('input, textarea').placeholder({ customClass: 'my-placeholder' });
	}

});