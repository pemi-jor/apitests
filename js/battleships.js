const toSea = 3;
const shots = 15;
var fired, hits, game, myVar, winning, t, onSea, ammunation;
var ships = [];
//pelin aloitustoimet
function startGame(){
	var i = 0;
	t = 60;
	hits = 0;
	fired = 0;
	game = false;
	ammunation = shots - fired;
	onSea = ships.length - hits;
	ships = [];
	setValues();
	//nollataan ja käynnistetään ajastin
	clearInterval(myVar);
	myVar = setInterval(function(){ myTimer() }, 1000);
	//tyjennetään peli alusta
	while (i < 25){
		var id = i.toString();
		var ele = document.getElementById(id);
		ele.className = '';
		++i;
	}
	//lisätään laivat
	while (ships.length < toSea){
		var rand = Math.floor(Math.random() * 24);
		if (!(ships.includes(rand))){
			ships.push(rand);
		}
	}
}
//ampumis toiminnat
function pew(i){
	var id = i.toString();
	var ele = document.getElementById(id);
	var table = document.getElementById("table");
	if (ele.classList.length > 0 || table.classList.contains("nope") || game === true){
		return;
	}
	else{
		if(ships.includes(i))
		{
			ele.classList.add("hit");
			++hits;
		} else {
			ele.classList.add("miss");
		}
		++fired;
		ammunation = shots - fired;
		onSea = ships.length - hits;
		document.getElementById("ships").innerHTML = "Laivoja jäljellä: " + onSea;
		document.getElementById("ammo").innerHTML = "Ammuksia jäljellä: " + ammunation;
		game = resolve();
	}
}
//pelin lopetustoimet ja pisteen laskun kutsuminen
function resolve(){
	var status = false;
	if (hits === ships.length){
		clearInterval(myVar);
		status = true;
		if (shots === fired){
			document.getElementById("ships").innerHTML = "Upotit kaikki laivat ja kulutit kaikki ammukset.";
			document.getElementById("ammo").innerHTML = "Aikaa jäi: " + t + " sekunttia.";
			handlePoints(500);
		} else {
			document.getElementById("ships").innerHTML = "Upotit kaikki laivat.";
			document.getElementById("ammo").innerHTML = "Ammuksia jäi: " + ammunation + ". Aikaa jäi: " + t + " sekunttia.";
			handlePoints();
		}
	} else {
		if (shots === fired){
			clearInterval(myVar);
			status = true;
			document.getElementById("ships").innerHTML = "Ammukset loppuivat.";
			document.getElementById("ammo").innerHTML = "Laivoja jäi: " + onSea + ". Aikaa jäi: " + t + " sekunttia.";
			handlePoints();
		}
	}
	return status;
}
//pisteidenlaskun suorittaminen
function pointCount(){
	var points, shotP, shotShip, timeP,shipP;
	shotP =  fired / shots;
	shipP = ships.length - hits;
	if (t >= 45){
		timeP = 500;
	}else if (t >= 30){
		timeP = 300;
	}else if (t >= 15){
		timeP = 250;
	}else if (t >= 5){
		timeP = 100;
	}else { timeP = 50; }
	if (shipP === 0){
		shotShip = 1000 * shotP;
	} else if (shipP === 1){
		shotShip = 700 * shotP;
	} else if (shipP === 2){
		shotShip = 400 * shotP;
	} else { shotShip = 100 * shotP; }
	points = shotShip + timeP;
	points = Math.round(points);
	return points;
}
//ajan piirtämine ja ajan tilan tarkataminen
function myTimer() {
	document.getElementById("timer").innerHTML = "Aikaa jäljellä: " + t + " sekunttia";
	stopTime();
}
function stopTime(){
	if (t === 0){
		game = true;
		clearInterval(myVar);
		document.getElementById("ships").innerHTML = "Aika loppui.";
		document.getElementById("ammo").innerHTML = "Laivoja jäi: " + onSea + ". Ammuksia jäi: " + ammunation;
		handlePoints();
		return;
	}
	if (t >= 45){
		document.getElementById("timer").style.color = "lime";
	}else if (t >= 30){
		document.getElementById("timer").style.color = "gold";
	}else if (t >= 15){
		document.getElementById("timer").style.color = "yellow";
	}else {
		document.getElementById("timer").style.color = "red";
	}--t;
}
function setValues(){
	document.getElementById("status").hidden = false;
	document.getElementById("sea").hidden = false;
	//tilanteen lisääminen
	document.getElementById("point").innerHTML = "";
	document.getElementById("ships").innerHTML = "Laivoja jäljellä: " + toSea;
	document.getElementById("ammo").innerHTML = "Ammuksia jäljellä: " + shots;
	document.getElementById("timer").innerHTML = "Aikaa jäljellä: " + t + " sekunttia";
	document.getElementById("timer").style.color = "lime";
	document.getElementById("table").className = "";
}
function handlePoints(a = 0) {
	winning = pointCount() + a;
	document.getElementById("btnStart").innerHTML = "Pelaa uudestaan";
	document.getElementById("timer").innerHTML = "";
	document.getElementById("point").innerHTML = "Pisteet: " + winning;
	document.getElementById("scored").value = winning;
}