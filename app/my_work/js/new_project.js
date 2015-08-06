var myModule = (function () {

	var init = function () {
			_setUpListners();
		};

	var _setUpListners = function (){
			$("#link_add_site").on("click", _showModal); //открыть модальное окно по клику
			$("#wrapper_by_popup").on("submit", _addProject); // прослушка кнопки "Добавить"
		};

	var _showModal = function (ev) {
			console.log("Вызов модального окна");
			
			ev.preventDefault();

			var divPopup = $ ("#new_project"),
				form = divPopup.find("#wrapper_by_popup");

			divPopup.bPopup({
				onClose: function () {
					form.find(".server-mes").text("").hide();
				}
			});
		};

	var _addProject = function (ev) {
			console.log("прослушка кнопки 'Добавить' ");

			ev.preventDefault();

			// объявление переменных
			var form = $(this),
				url = "../new_project.php",
				data = form.serialize();

			console.log(data);

			// запрос на сервер
			$.ajax ({
				url: url,
				type: "POST",
				dataType: "json",
				data: data,
			})
			.done(function(answer) {
				console.log(answer);
				if(answer.status === "ok") {
					form.find(".success-mes").text(answer.text).show();
				} else {
					form.find(".error-mes").text(answer.text).show();
				}
			})
			.fail(function(){
				console.log("error");
			})
		};

	return {
			init: init
		}

})();

myModule.init();