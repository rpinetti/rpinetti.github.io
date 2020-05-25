/**
 * Busca a tradução do texto no diretório i18n
 * API: https://github.com/wikimedia/jquery.i18n
 * DOC: https://lokalise.com/blog/localizing-apps-jquery/
 */
function updateText() {
	'use strict';
	var i18n = $.i18n();
	let i18nFile = `./Assets/i18n/${$.i18n().locale}.json`;

	fetch(i18nFile).then((response) => response.json()).then((messages) => {
		$.i18n().load(messages, $.i18n().locale);
		$('html').i18n();	// to translate the element matching jquery selector based on data-i18n key
	});

}	// function updateText() 

// Enable debug
$.i18n.debug = true;

$( document ).ready( function ( $ ) {
	'use strict';
	updateText();
});