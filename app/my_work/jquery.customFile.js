(function( $ ) {

  // Поддерживаетли браузер multiple ?
  var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined', 
      isIE = /msie/i.test( navigator.userAgent );

  $.fn.customFile = function() {

    return this.each(function() {

      var $file = $(this).addClass('customfile'), // оригинальный файловый input
          $wrap = $('<div class="customfile-wrap">'),
          $input = $('<input type="text" class="customfile-filename" />'),
          // Кнопка которая не работает в IE
          $button = $('<button type="button" class="customfile-upload"></button>'),
          // Хак для IE
          $label = $('<label class="customfile-upload" for="'+ $file[0].id +'">Open</label>');

      // смещает исходный input с поля зрения
      $file.css({
        position: 'absolute',
        left: '-9999px'
      });

      $wrap.insertAfter( $file )
        .append( $file, $input, ( isIE ? $label : $button ) );

      // предотвращение фокуса
      $file.attr('tabIndex', -1);
      $button.attr('tabIndex', -1);

      $button.click(function () {
        $file.focus().click();
      });

      $file.change(function() {

        var files = [], fileArr, filename;

        // Если есть поддержка multiple
        // выбрать несколько файлов
        if ( multipleSupport ) {
          fileArr = $file[0].files;
          for ( var i = 0, len = fileArr.length; i < len; i++ ) {
            files.push( fileArr[i].name );
          }
          filename = files.join(', ');

        // Если поддержка отсутствует, то взять значение
        // и удалить путь, чтобы показать только имя файла
        } else {
          filename = $file.val().split('\\').pop();
        }

        $input.val( filename ) // установить имя файла
          .attr('title', filename) // Показать имя файла в всплывающей подсказке 
          .focus();

      });

      $input.on({
        blur: function() { $file.trigger('blur'); },
        keydown: function( e ) {
          if ( e.which === 13 ) { // Enter
            if ( !isIE ) { $file.trigger('click'); }
          } else if ( e.which === 8 || e.which === 46 ) { // Backspace и Del
            // В некоторых браузерах значение не модифицируется
            // с помощью приема, которым мы удаляем старый input и добавляем
            // чистый клон со всеми прикрепленными исходными событиями
            $file.replaceWith( $file = $file.clone( true ) );
            $file.trigger('change');
            $input.val('');
          } else if ( e.which === 9 ){ // TAB
            return;
          } else { // Другие нажатия
            return false;
          }
        }
      });

    });

  };

  // Для старых браузеров
  if ( !multipleSupport ) {
    $( document ).on('change', 'input.customfile', function() {

      var $this = $(this),
          // Создайте уникальный ID, чтобы можно было
          // прикрепить к input-у метку
          uniqId = 'customfile_'+ (new Date()).getTime(),
          $wrap = $this.parent(),

          // отфильтруем пустые импуты input
          $inputs = $wrap.siblings().find('.customfile-filename')
            .filter(function(){ return !this.value }),

          $file = $('<input type="file" id="'+ uniqId +'" name="'+ $this.attr('name') +'"/>');

      // таймаут 1мс, поэтому запускается после всех прочих событий,
      // модифицирующих запущенное событие
      setTimeout(function() {
        // Добавляем новый input
        if ( $this.val() ) {
        //Отметьте пустое поле, чтобы предотвратить
        // создание новых input-ов при изменении файлов
          if ( !$inputs.length ) {
            $wrap.after( $file );
            $file.customFile();
          }
        // Удалить и реорганизуйть input-ы
        } else {
          $inputs.parent().remove();
          // Сдвиньть input так, чтобы он всегда оставался последним в списке
          $wrap.appendTo( $wrap.parent() );
          $wrap.find('input').focus();
        }
      }, 1);

    });
  }

}( jQuery ));

$('input[type=file]').customFile();    