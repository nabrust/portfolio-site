var validation = (function () {
	// Инициализация
	var init = function () {
			_setUpListners();
		};

	//Прослушка событий
	var _setUpListners = function (){
		$('form').on('keydown', '.has-error', _removeErorr);
		$('form').on('click', '.customfile-upload', customfileRemoveErorr);
		$('form').on('reset', _clearForm);
		};
	var customfileRemoveErorr = function(){
		$('.customfile-filename').removeClass('has-error').trigger('hideTooltip');
	};
	var _removeErorr = function () {
		$(this).removeClass('has-error');
		};

	var _clearForm = function (form) {
		var form = $(this);
		form.find('input, textarea').trigger('hideTooltip');
		form.find('.has-error').removeClass('has-error');
		};

	// Создает инпуты
	var _createQtip = function (element, position){
		//позиция тултипа
		if (position === "right") {
			position = {
				my: "left center",
				at: "right center"
			};
		}else{
			position = {
				my: "right center",
				at: "left center",
				adjust: {
					method: "shift none"
				}
			};
		}

		//Инициализация тултипа
		element.qtip({
				content: {
					text: function() {
						return $(this).attr('qtip-content');
					}
				},
				show: {
					event: 'show'
				},
				hide: {
					event: 'keydown hideTooltip'
				},
				position : position,
				style: {
					classes: 'qtip-myclass qtip-rounded',
					tip: {
						height: 12,
						width: 10
					}
				}
			}).trigger('show');
	};

	// Проверяет форму
	var validateForm = function (form) {


		var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
			valid = true;

		//Проход по всем элементам формы
		$.each(elements, function (index, val){
			var element = $(val),
				val = element.val(),
				pos = element.attr('position');

			if (val.length === 0) {
				element.addClass('has-error');
				_createQtip(element, pos);
				valid = false;
			}
		});

		return valid;
	};
	return {
			init: init,
			validateForm:validateForm
		};

})();
validation.init();