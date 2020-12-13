let auth_github = 'd4a2dc2e2d1231544d3033478830be68e452441a';

// Enable debug
$.i18n.debug = true;

/**
 * AJAX activity indicator bound to ajax start/stop document events
 * 
 * @event ajaxStart
 */
$(document).ajaxStart(function () {
	$('#ajaxBusy').show();
}).ajaxStop(function () {
	$('#ajaxBusy').hide();
});

// Set up the AJAX indicator
$('body').append('<div id="ajaxBusy" class="ajaxBusy"><p id="ajaxBusyMsg">Please wait...</p></div>');

/**
 * 
 * @event ready
 */
$(document).ready(function ($) {
	listExperience();
	// Translate Texts
	updateText();
	// Request Github API for get Perfil
	readPerfil();
	// Request Github API for list repositories
	readRepository();
});

/**
 * Read the i18n files for website translation
 * API: https://github.com/wikimedia/jquery.i18n
 * DOC: https://lokalise.com/blog/localizing-apps-jquery/
 * 
 * @function updateText
 */
function updateText() {
	'use strict';
	var i18n = $.i18n();
	let languages = ['pt-BR', 'pt', 'en'];

	// set default language
	if ( $.i18n().locale === 'pt' || $.i18n().locale === 'pt-BR' ) {
		$.i18n().locale = 'pt-BR';
	} else {
		if (!languages.find(element => element === $.i18n().locale)) {
			$.i18n().locale = 'en';
		}
	}	// if ( $.i18n().locale === 'pt' ||

	let i18nFile = `./Assets/i18n/${$.i18n().locale}.json`;

	fetch(i18nFile).then((response) => response.json()).then((messages) => {
		$.i18n().load(messages, $.i18n().locale);
		$('html').i18n(); // to translate the element matching jquery selector based on data-i18n key
	});

} // function updateText() 

/**
 * Create Expiriences
 * 
 * @function addExperience
 * @param String _year 
 * @param String _title 
 * @param String _text 
 * @returns String divLine
 */
function addExperience(_year, _title, _text) {
	var divLine = "<div class='line'>";
	divLine += "<div class='left'>";
	divLine += "<div class='year'><p class='title'>" + _year + "</p></div>";
	divLine += "</div><div class='right'>";
	divLine += "<div class='detail'><h3>" + _title + "</h3><p data-i18n='" + _text + "'></p></div>";
	divLine += "</div></div>";

	return divLine;
} // function addExperience

/**
 *
 * @function listExperience
 */
function listExperience() {
	// Col1
	$('#xpCol1').append(addExperience('2020', 'Engineering Brazil', 'xp1-2020-1'));
	$('#xpCol1').append(addExperience('2019', 'Evox Corp', 'xp1-2019-2'));
	$('#xpCol1').append(addExperience('2019', 'Evt IT', 'xp1-2019-1'));
	$('#xpCol1').append(addExperience('2018', 'HCMX', 'xp1-2018-1'));
	$('#xpCol1').append(addExperience('2017', 'Lafarge Holcim', 'xp1-2017-2'));
	$('#xpCol1').append(addExperience('2017', 'Walmart', 'xp1-2017-1'));
	$('#xpCol1').append(addExperience('2016', 'Neoris', 'xp1-2016-1'));
	// Col2
	$('#xpCol2').append(addExperience('2015', 'Alcis', 'xp1-2015-1'));
	$('#xpCol2').append(addExperience('2014', 'Agile', 'xp1-2014-1'));
	$('#xpCol2').append(addExperience('2011', 'Decisiva Consultoria', 'xp1-2011-1'));
	$('#xpCol2').append(addExperience('2010', 'Assurance IT', 'xp1-2010-2'));
	$('#xpCol2').append(addExperience('2010', 'Plamarc', 'xp1-2010-1'));
	$('#xpCol2').append(addExperience('2008', 'Accenture Brazil', 'xp1-2008-1'));
} // function listExperience

/**
 * 
 * @ onBurgerMenu
 */
function onBurgerMenu() {
	var menu = document.getElementById("navBar");
	menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

/**
 * Request Github API for get perfil
 * 
 * @function readPerfil
 */
function readPerfil() {
	$.ajax({
		url: 'https://api.github.com/users/rpinetti',
		type: 'GET',
		dataType: 'json',
		crossDomain: true,
		authorization: this.auth_github
	}).done(function (response) {
		console.log("Github Perfil - success");
		console.log(response);
		addPhoto(response.avatar_url);
	}).fail(function (response) {
		console.log("Github Perfil - error");
		console.log(response);
	}).always(function () {
		console.log("Github Perfil - complete");
	});
} // readPerfil()

/**
 * Request Github API for list repositories
 * 
 * @function readRepository
 */
function readRepository() {
	$.ajax({
		url: 'https://api.github.com/users/rpinetti/repos',
		type: 'GET',
		dataType: 'json',
		crossDomain: true,
		authorization: this.auth_github
	}).done(function (response) {
		console.log("Github Repos - success");
		console.log(response);
	}).fail(function () {
		console.log("Github Repos - error");
	}).always(function () {
		console.log("Github Repos - complete");
	});
} // readRepository()

/**
 * 
 * @function addPhoto
 * @param {*} _url 
 */
function addPhoto(_url) {
	var img = new Image();
	var picture = document.getElementById('myphoto');

	img.src = _url != '' ? _url : 'https://avatars3.githubusercontent.com/u/12352383?v=4';
	img.className = 'avatar';
	img.id = 'avatar';

	img.onload = function () {
		picture.appendChild(img);
	}

} // addPhoto()