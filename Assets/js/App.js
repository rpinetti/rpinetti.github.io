let auth_github = 'a05de5bdb6aa3f142afbd1f910726f343e15da1c';

// Enable debug
$.i18n.debug = true;

/**
 * 
 */
$( document ).ready( function ( $ ) {
	listExperience();
	// 
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
 */
function updateText() {
	'use strict';
	var i18n = $.i18n();
	let languages = ['pt-BR', 'en', 'it', 'es', 'no'];

	// set default language
	if (!languages.find( element => element === $.i18n().locale )) {
		$.i18n().locale = 'en';
	}

	let i18nFile = `./Assets/i18n/${$.i18n().locale}.json`;

	fetch(i18nFile).then((response) => response.json()).then((messages) => {
		$.i18n().load(messages, $.i18n().locale);
		$('html').i18n();	// to translate the element matching jquery selector based on data-i18n key
	});

}	// function updateText() 

/**
 * Create Expiriences
 * @param String _year 
 * @param String _title 
 * @param String _text 
 * @returns String divLine
 */
function addExperience(_year, _title, _text){
	var divLine = "<div class='line'>";
	divLine += "<div class='left'>";
	divLine += "<div class='year'><p class='title'>" + _year + "</p></div>";
	divLine += "</div><div class='right'>";
	divLine += "<div class='detail'><h3>" + _title + "</h3><p data-i18n='" + _text + "'></p></div>";
	divLine += "</div></div>";

	return divLine;
}	// function addExperience

/**
 *
 */
function listExperience() {
	// Col1
	$('#xpCol1').append(addExperience('2020', 'Engineering Brazil', 'xp1-2020-1'));
	$('#xpCol1').append(addExperience('2020', 'Engineering Brazil', 'xp1-2020-1'));
	$('#xpCol1').append(addExperience('2020', 'Engineering Brazil', 'xp1-2020-1'));
	$('#xpCol1').append(addExperience('2020', 'Engineering Brazil', 'xp1-2020-1'));
	$('#xpCol1').append(addExperience('2020', 'Engineering Brazil', 'xp1-2020-1'));
	$('#xpCol1').append(addExperience('2020', 'Engineering Brazil', 'xp1-2020-1'));
	$('#xpCol1').append(addExperience('2020', 'Engineering Brazil', 'xp1-2020-1'));
	// Col2
	$('#xpCol2').append(addExperience('2020', 'Engineering Brazil', 'xp1-2020-1'));
	$('#xpCol2').append(addExperience('2020', 'Engineering Brazil', 'xp1-2020-1'));
	$('#xpCol2').append(addExperience('2020', 'Engineering Brazil', 'xp1-2020-1'));
	$('#xpCol2').append(addExperience('2020', 'Engineering Brazil', 'xp1-2020-1'));
	$('#xpCol2').append(addExperience('2020', 'Engineering Brazil', 'xp1-2020-1'));
	$('#xpCol2').append(addExperience('2020', 'Engineering Brazil', 'xp1-2020-1'));
	$('#xpCol2').append(addExperience('2020', 'Engineering Brazil', 'xp1-2020-1'));
}	// function listExperience

function onBurgerMenu() {
	var menu = document.getElementById("navBar");
	menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

/**
 * Request Github API for get perfil
 */
function readPerfil() {
	$.ajax({
		url: 'https://api.github.com/users/rpinetti',
		type: 'GET',
		dataType: 'json',
		crossDomain: true,
		authorization: this.auth_github
	}).done(function(response){
		console.log("Github Perfil - success");
		console.log(response);
		addPhoto(response.avatar_url);
	}).fail(function(response){
		console.log("Github Perfil - error");
		console.log(response);
	}).always(function(){
		console.log("Github Perfil - complete");
	});
}	// readPerfil()

/**
 * Request Github API for list repositories
 */
function readRepository() {
	$.ajax({
		url: 'https://api.github.com/users/rpinetti/repos',
		type: 'GET',
		dataType: 'json',
		crossDomain: true,
		authorization: this.auth_github
	}).done(function(response){
		console.log("Github Repos - success");
		console.log(response);
	}).fail(function(){
		console.log("Github Repos - error");
	}).always(function(){
		console.log("Github Repos - complete");
	});
}	// readRepository()

/**
 * 
 * @param {*} _url 
 */
function addPhoto(_url) {
	var img = document.createElement("img");
	img.src = `<img src="${_url}"></img>`;

	$( 'myphoto' ).appendChild(img);
}	// addPhoto()