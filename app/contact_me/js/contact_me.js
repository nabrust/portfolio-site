var contactMe = (function () {

	// Инициализация модуля
	var init = function () {
			_setUpListners();
		};

	// Прослушка событий
	var _setUpListners = function (){
		$('#formByContactMe').on('submit', _submitForm);
	};

	var _submitForm = function(ev){
		ev.preventDefault();

		var form = $(this),
			url = 'contact_me.php',
			defObj = _ajaxForm(form, url);

	};

	var _ajaxForm = function (form, url) {

		if (!validation.validateForm(form)) return false;
		// если false то код ниже не сработает

	};

	return {
			init: init
		};

})();

contactMe.init();