var myModule = (function () {

	var init = function () {
			_setUpListners();
		};

	var _setUpListners = function (){
			$("#link_add_site").on("click", _showModal); //открыть модальное окно по клику
			
		};

	var _showModal = function (ev) {
			console.log("Вызов модального окна");
			
			ev.preventDefault();

			$(".wrapper_by_popup").bPopup();
		};

	return {
			init: init
		}

})();

myModule.init();