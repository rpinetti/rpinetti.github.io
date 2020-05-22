$( document ).ready( function() {
	var i18n = $.i18n( );
	// Use default locale 'pt-br'
//	i18n.locale = 'pt-BR';
	i18n.load('./Assets/i18n/lang.json', i18n.locale);
	$( '.uls-trigger' ).uls( {
		onReady: function ( ) {
			this.i18n();
		},
		onSelect: function() {
			var languageName = $.uls.data.getAutonym( language );
			$( '.uls-trigger' ).text( languageName );
			i18n.locale = language;
			i18n.load('./Assets/i18n/lang.json', language);
			// re-i18n the elements
			this.i18n();
			$( '.container' ).i18n();
		},
		quickList: ['pt-BR', 'en', 'es', 'it']
	});	// $( '.uls-trigger' ).uls

});	// $( document ).ready