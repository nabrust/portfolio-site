var myModule = (function () {

	//Инициализирует наш модуль
	var init = function () {
			_setUpListners();
		};

	// Прослушивает события
	var _setUpListners = function (){
			$("#link_add_site").on("click", _showModal); //открыть модальное окно по клику
			$("#wrapper_by_popup").on("submit", _addProject); // прослушка кнопки "Добавить"
		};

	// Работает с модальным окном
	var _showModal = function (ev) {
			
			ev.preventDefault();

			var divPopup = $ ("#new_project"),
				form = divPopup.find("#wrapper_by_popup");

			divPopup.bPopup({
				speed: 100,
				onClose: function () {
					form.find(".server-mes").text("").hide();
					form.find('input, textarea').trigger('hideTooltip');

				}
			});
		};

	// Добавляет проект
	var _addProject = function (ev) {

			ev.preventDefault();

			// объявление переменных
			var form = $(this),
				url = "../new_project.php",
				defObj = _ajaxForm(form, url);
			
			if (defObj) {

			// запрос на сервер
			defObj.done(function(answer) {

				var successBox = form.find(".success-mes"),
					errorBox = form.find(".error-mes");

				if(answer.status === "ok") {
					errorBox.hide();
					successBox.text(answer.text).show();
				} else {
					successBox.hide();
					errorBox.text(answer.text).show();
				}
			})
		}
	}

	// Универсальная функция:
	// 1. собирает данные из формы
	// 2. проверяет форму
	// 3. делает запрос на сервер и возвращает ответ с сервера

	var _ajaxForm = function (form, url) {

		if (!validation.validateForm(form)) return false;
		
		data = form.serialize();

		var result = $.ajax ({
				url: url,
				type: "POST",
				dataType: "json",
				data: data,
			}).fail( function(answer){
				form.find('.error-mes').text('На сервере произошла ошибка')
			})

		return result;

	};

	return {
			init: init
		};

})();

myModule.init();