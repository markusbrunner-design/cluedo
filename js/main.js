/**
 * Cluedo: The Third Person - for 2 Players
 * @author	Katja Deutschmann <mail@katjadeutschmann.de> and Markus Brunner <mail@markusbrunner-design.de>
 * @version	1.1
 */

//==========
// variables
//========== 
var options = {};
var crime = {};
var editions = {
	original: {
		en: {
			title: 'Original Version - correct?',
			persons: ['Colonel Mustard','Professor Plum','Reverend Green','Mrs. Peacock','Miss Scarlett','Mrs. White'],
			weapons: ['Dagger','Candlestick','Revolver','Rope','Lead Pipe','Wrench'],
			locations: ['Hall','Lounge','Dining Room','Kitchen','Ballroom','Conservatory','Billard Room','Library','Study']
		},
		de: {
			title: 'Originale Version',
			persons: ['Oberst von Gatow','Professor Bloom','Reverend Grün','Baronin von Porz','Fräulein Gloria','Frau Weiß'],
			weapons: ['Dolch','Leuchter','Pistole','Seil','Heizungsrohr','Rohrzange'],
			locations: ['Halle','Salon','Speisezimmer','Küche','Musikzimmer','Wintergarten','Billardzimmer','Bibliothek','Arbeitszimmer']
		}
	},
	remake2008: {
		en: {
			title: 'Remake 2008 - correct?',
			persons: ['Dennis Gatow','Felix Bloom','Tom Green','Klara Potz','Gloria Roth','Diana Weiss'],
			weapons: ['Revolver','Candlestick','Rope','Knife','Baseball Bat','Ax','Barbell','Trophy','Poison'],
			locations: ['Kitchen','Terrace','Wellness Room','Dining Room','Home Cinema','Living Room','Guest House','Hall','Observatory']
		},
		de: {
			title: 'Neuauflage 2008 - korrekt?',
			persons: ['Dennis Gatow','Felix Bloom','Tom Grün','Klara Potz','Gloria Roth','Diana Weiss'],
			weapons: ['Pistole','Kerzenleuchter','Seil','Messer','Baseballschläger','Axt','Hantel','Trophäe','Gift'],
			locations: ['Küche','Terrasse','Welnessraum','Speisezimmer','Heimkino','Wohnzimmer','Gästehaus','Halle','Observatorium']
		}
	},
	harrypotter: {
		en: {
			title: 'Harry Potter Edition - correct?',
			persons: ['Draco Malfoy','Crabbe und Goyle','Lucius Malfoy','Dolores Umbridge','Peter Pettigrew','Bellatrix Lestrange'],
			weapons: ['Sleep-inducing drug','Invisible Cabinet','Portkey','Impedimenta','Petrificus Totalus','Alraune'],
			locations: ['Great Hall','Sickroom','Room of Wishes','Potions Room','Cuproom','Fortune Telling Room','Coals','Library','Defense against the dark arts Room']
		},
		de: {
			title: 'Harry Potter Edition',
			persons: ['Draco Malfoy','Crabbe und Goyle','Lucius Malfoy','Dolores Umbridge','Peter Pettigrew','Bellatrix Lestrange'],
			weapons: ['Schlafmittel','Unsichtbarkeitsschrank','Portschlüssel','Impedimenta','Petrificus Totalus','Alraune'],
			locations: ['Große Halle','Krankenflügel','Raum der Wünsche','Zaubertränke','Pokalzimmer','Wahrsagen','Eulerei','Bibliothek','Verteidigung gegen die dunklen Künste']
		}
	}
};
var langKey = 'en';
var locallang = {
	en: {
		languageLabel: 'English',
		title: 'Cluedo - The Third Person',
		introduction_legend: 'Introduction',
		introduction: 'What\'s the purpose of this application? This application enables two persons to play Cluedo by emulating the third person! So, if you\'re fed up with not playing Cluedo because of not enough players - here\'s the solution!',
		imprint: 'Imprint',
		crimeHeading: 'The actual crime was',
		presettings_legend: 'Presettings',
		actions_legend: 'Actions',
		edition_set: 'Set Edition / New Game',
		set: 'Set own cards',
		start: 'Start game',
		crime: 'Resolve crime',
		ask: 'ASK',
		reset: 'Reset Output',
		output_nocards: 'I have no cards!'
	},
	de: {
		languageLabel: 'Deutsch',
		title: 'Cluedo - Der dritte Mitspieler',
		introduction_legend: 'Einleitung',
		introduction: 'Wofür ist das? Nachdem wir nur sehr selten dazu kamen Cluedo zu spielen, da es nicht zu zweit möglich ist, hatten wir die Idee eine Hilfsapplikation zu schreiben, die die dritte Person darstellt. Wer also mehr als 2 Spieler zusammenbekommt, hat hier nichts zu suchen. Für alle Paare oder Kumpels, die gerne auch mal zu zweit Cluedo spielen wollen: hier seid ihr genau richtig!<br /><br />Wie funktioniert\'s?<br />1. Karten wie gewohnt in die drei Stapel (Personen, Gegenstände, Orte) aufteilen und jeden Stapel durchmischen. Von jedem Stapel eine Karte beiseite legen.<br />2. Die restlichen Karten durchmischen und dann für drei Personen austeilen.<br />3. Die Karten der dritten Person zu den drei beiseite gelegten packen. Für den Rest des Spiels werden diese nicht mehr benötigt. Die korrekte Lösung des Falls kennt nur diese Anwendung.<br />4. Sprache und Edition in der Anwendung festlegen.<br />5. Beide Spieler haken nacheinander ihre Karten an und bestätigen das jeweils mit "Eigene Karten setzen".<br />6. Durch "Spiel starten" wird das Spiel gestartet.<br />7. Es wird ganz normal gespielt. Die dritte Person (Anwendung) fragt man, indem man die gewünschten Parameter auswählt und auf "FRAGEN" klickt. Danach mit "Ausgabe löschen" wieder die Auswahl und Ausgabe löschen, damit der nächste Spieler fortfahren kann.<br />7. Nach einer Anklage kann man die korrekte Lösung über "Fall lösen" abfragen.',
		imprint: 'Impressum',
		crimeHeading: 'Der aktuelle Tathergang war',
		presettings_legend: 'Grundeinstellungen',
		actions_legend: 'Aktionen',
		edition_set: 'Edition festlegen / Neues Spiel',
		set: 'Eigene Karten setzen',
		start: 'Spiel starten',
		crime: 'Fall auflösen',
		ask: 'FRAGEN',
		reset: 'Ausgabe löschen',
		output_nocards: 'Davon hab ich nichts!'
	}
};

//==========
// methods
//========== 
function setOptions() {
	$ = jQuery;
	
	// persons
	var persons = $('input:checked[name="persons"]');
	$(persons).each(function(index, elem) {
		options.persons[$(elem).attr('value')] = false;
	});
	
	// weapons
	var weapons = $('input:checked[name="weapons"]');
	$(weapons).each(function(index, elem) {
		options.weapons[$(elem).attr('value')] = false;
	});
	
	// locations
	var locations = $('input:checked[name="locations"]');
	$(locations).each(function(index, elem) {
		options.locations[$(elem).attr('value')] = false;
	});
	
	clearInputBoxes();
}

function clearInputBoxes() {
	$ = jQuery;
	
	$('input[type="checkbox"],input[type="radio"]').attr('checked',false);
}

function createCrime() {
	var persons = [];		
	for (var person in options.persons) {
		if (options.persons[person]) {
			persons.push(person);
		}
	}
	
	var weapons = [];
	for (var weapon in options.weapons) {
		if (options.weapons[weapon]) {
			weapons.push(weapon);
		}
	}
	
	var locations = [];
	for (var location in options.locations) {
		if (options.locations[location]) {
			locations.push(location);
		}
	}
	
	if (persons.length === 0 || weapons.length === 0 || locations.length === 0) {
		// error
		alert('Fehler!');
	}
	else {
		crime = {
			person: persons[Math.floor(Math.random() * persons.length)],
			weapon: weapons[Math.floor(Math.random() * weapons.length)],
			location: locations[Math.floor(Math.random() * locations.length)]
		};
		options.persons[crime.person] = false;
		options.weapons[crime.weapon] = false;
		options.locations[crime.location] = false;
	}
}

function ask() {
	$ = jQuery;
	
	var person = $('input:checked:first[name="persons"]').attr('value');
	var weapon = $('input:checked:first[name="weapons"]').attr('value');
	var location = $('input:checked:first[name="locations"]').attr('value');
	var askResult = [];
	if(options.locations[location]) {
		askResult.push(location);
	}
	if(options.weapons[weapon]) {
		askResult.push(weapon);
	}
	if(options.persons[person]) {
		askResult.push(person);
	} 
	
	if(askResult.length > 0) {
		$('#output').html(askResult[Math.floor(Math.random() * askResult.length)]);
	} else {
		$('#output').html(locallang[langKey]['output_nocards']);
	}
}

function showCrime() {
	$ = jQuery;
	
	$('#output').html(locallang[langKey]['crimeHeading'] + ":\r\n" + crime.person + ",\r\n" + crime.weapon + ",\r\n" + crime.location);
}

function init() {
	$ = jQuery;
	
	// languages
	var languageOptions = '';
	$.each(locallang, function(index, elem){
		languageOptions += '<option value="'+index+'">'+elem.languageLabel+'</option>';
	});
	$('#language').html(languageOptions);
	updateLanguage();
	initEditions();
	$('#language').change(function(ev){
		updateLanguage();
		initEditions();
		$('#application,#actions').hide();
	});
	
	// reset
	$('#application,#actions').hide();
	$('#output').html('');
}

function initEditions() {
	var editionOptions = '';
	$.each(editions, function(index, elem){
		editionOptions += '<option value="'+index+'">'+elem[langKey]['title']+'</option>';
	});
	$('#edition').html(editionOptions);
	$('#edition_set').click(function(ev){
		ev.preventDefault();
		writeEdition();
		$('#set,#start,#actions').show();
		$('#ask,#crime,#reset,#output').hide();
		$('#output').html('');
	});
}

function updateLanguage() {
	$ = jQuery;
	
	langKey = ($('#language').val().length > 0) ? $('#language').val() : 'en';
	$('title').html(locallang[langKey]['title']);
	$.each(locallang[langKey], function(index, elem){
		$('#'+index).html(elem);
	});
}

function writeEdition(typeOfInput) {
	$ = jQuery;
	
	typeOfInput = (typeOfInput) ? typeOfInput : 'checkbox';
	var selectedEdition = $('#edition').val();
	var applicationContent = '';
	
	// set styling for edition
	$('body').attr('class','').addClass(selectedEdition);
	
	// build checkboxes
	// persons
	if(typeOfInput ==  'checkbox') { options.persons = {}; }
	applicationContent += '<fieldset><legend>Personen</legend>';
	$.each(editions[selectedEdition][langKey]['persons'], function(index, elem){
		applicationContent += '<input type="'+typeOfInput+'" name="persons" id="person'+index+'" value="'+elem+'" /><label for="person'+index+'">'+elem+'</label><br />';
		if(typeOfInput ==  'checkbox') { options.persons[elem] = true; }
	});
	applicationContent += '</fieldset>';
	// weapons
	if(typeOfInput ==  'checkbox') { options.weapons = {}; }
	applicationContent += '<fieldset><legend>Gegenstände</legend>';
	$.each(editions[selectedEdition][langKey]['weapons'], function(index, elem){
		applicationContent += '<input type="'+typeOfInput+'" name="weapons" id="weapon'+index+'" value="'+elem+'" /><label for="weapon'+index+'">'+elem+'</label><br />';
		if(typeOfInput ==  'checkbox') { options.weapons[elem] = true; }
	});
	applicationContent += '</fieldset>';
	// locations
	if(typeOfInput ==  'checkbox') { options.locations = {}; }
	applicationContent += '<fieldset><legend>Orte</legend>';
	$.each(editions[selectedEdition][langKey]['locations'], function(index, elem){
		applicationContent += '<input type="'+typeOfInput+'" name="locations" id="location'+index+'" value="'+elem+'" /><label for="location'+index+'">'+elem+'</label><br />';
		if(typeOfInput ==  'checkbox') { options.locations[elem] = true; }
	});
	applicationContent += '</fieldset>';
	
	$('#application').html(applicationContent).show();
}

function startGame() {
	$ = jQuery;
	
	writeEdition('radio');
	$('#set,#start,#reset').hide();
	$('#actions,#ask,#crime,#output').show();
}

function abortGame() {
	$ = jQuery;
	
	alert("Spiel abgebrochen");
	clearInputBoxes();
	init();
}

//==========
// init
//========== 
(function($){
	$(document).ready(function(){
		// initialization - edition
		init();
		// set user cards
		$('#set').click(function(ev){
			ev.preventDefault();
			setOptions();
		});
		// start of game (after setting of user cards)
		$('#start').click(function(ev){
			ev.preventDefault();
			createCrime();
			startGame();
		});
		// ask for a selection of cards
		$('#ask').click(function(ev){
			ev.preventDefault();
			ask();
			$('#ask').hide();
			$('#reset').show();
		});
		// reset selected options and output field
		$('#reset').click(function(ev){
			ev.preventDefault();
			clearInputBoxes();
			$('#output').html('');
			$('#reset').hide();
			$('#ask').show();
		});
		// show crime
		$('#crime').click(function(ev){
			ev.preventDefault();
			showCrime();
			$('#application,#reset,#ask,#crime').hide();
		});
	});
})(jQuery);