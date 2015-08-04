
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

$(document).ready(function () {
    $('input[title]').qtip({
    	position: {
    		my: "right center",
    		at: 'left center'
    		},
    	style: {
     		 classes: 'qtip-red qtip-shadow',
     		 height: "30px",
     		 width: "131px",
   			}		
    });
    
});