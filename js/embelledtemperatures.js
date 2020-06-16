

var response, humid = [], temp = [], time = [];
var repeat = 0, maxHeat = 50, minHeat = -50, maxHumid;
var timeNoti = "";
var started = false, positive = true;
var temperatureChart, humidityChart;
var timerFind = setInterval(checkRepeat, 60000);
const url = "http://0.0.0.0:5000/api/demo/temp";

function checkRepeat(){
	++repeat;
	if(repeat%10 != 0) return;
	else{ 
		repeat = 0;
		findEnv();
	}
}

function findEnv() {
	//var data;
	const params = { 
		headers: {
			Accept: 'application/json',
		  },
		method:"GET",
	};
	fetch(url,params)
	.then(response => {
		if (response.ok) {
		  response.json().then(json => {
			handleResponse(json);
		  });
		}else this.console.log("PepiHands PepiHands ");
	  });
	
	
}

function handleTime(formatValue = "", i = 0, responseLen){
	
	timeValTemp = formatValue.split("T");
	var unformatedDays = timeValTemp[0].split("-");
	//console.log(unformatedDays);
	var days = unformatedDays[2] + "/" + 
		unformatedDays[1] + "/" + unformatedDays[0];
	timeHours = timeValTemp[1].split(":");
	//timeVal = timeValTemp[0] + " " + timeHours[0] + ":" + timeHours[1];
	timeValue = timeHours[0] + ":" + timeHours[1];
	if(i == responseLen - 1){
		timeNoti = "Room Temperature between: " + days + 
		" " + timeValue;
	}
	if(i == 0){
		timeNoti += " - " + days + " " + timeValue;
		document.getElementById("timeNotif").innerHTML = timeNoti;
	}
	return timeValue;
}

function handleResponse(rep){
	var highest = 0, lowest = 0;
	
	response = rep;
	temp = []; humid = []; time = [];
	positive = true;
	minHeat = 0;
	for(var i = response.length - 1; i>= 0; i--){
		if(response[i].temperatureValue < 0){
			positive = false;
		} 
		if(highest < response[i].temperatureValue){
			highest = Math.ceil((response[i].temperatureValue + 5) / 10) * 10;;
		}
		if(maxHumid < response[i].temperatureValue){
			maxHumid = Math.ceil((response[i].humidityValue + 5) / 10) * 10;;
		}
		if(response[i].temperatureValue < lowest){
			lowest = Math.floor((response[i].temperatureValue - 5) / 10) * 10;
		}
		temp.push(response[i].temperatureValue);
		humid.push(response[i].humidityValue);
		timeVal = handleTime(response[i].timeValue, i, response.length);
		time.push(timeVal);
	}
	maxHeat = highest;
	minHeat = lowest;
	//console.log(response);
	console.log(humid);
	//console.log(temp);
	//console.log(time);
	if (started){
		removeData(temperatureChart);
		removeData(humidityChart);
		addData(temperatureChart, time, temp);
		addData(humidityChart, time, humid);
	} else {
		createCharts();
		started = true;
	}
}

function createCharts(){
	var ctx = document.getElementById('tempChart');
	var ctx1 = document.getElementById('humidChart');
	
	ctx.style.backgroundColor = 'rgba(10, 87, 13,255)';
	ctx1.style.backgroundColor = 'rgba(0, 87, 13,255)';
	Chart.defaults.global.defaultFontColor = '#00d11f';
	
	temperatureChart = new Chart(ctx, {
		type: 'line',
		data: {labels: time,
			datasets: [{ 
				data: temp,
				label: "Temperature",
				borderColor: "#d45800",
				backgroundColor: "#d45800",
				lineTension: 0,
				fill: true
			  
			}]	
		},
		options: {
			title: {
			display: true,
			text: 'Temperature °C'
		  },
		  scales: {
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: true,
				  color: "#00d11f"
				},
				ticks: {
					beginAtZero: positive,
					max: maxHeat,
					min: minHeat
				}
			}]	
		  }
		}
	});
	
	humidityChart = new Chart(ctx1, {
		type: 'line',
		data: {labels: time,
			datasets: [{ 
				data: humid,
				label: "Humidity",
				borderColor: "#d45800",
				backgroundColor: "#d45800",
				lineTension: 0,
				fill: true
			  
			}]	
		},
		options: {
			title: {
				display: true,
				text: 'Humidity %',
				fontColor: "#00d11f"
			  },
			  legend: {
				labels: {
					// This more specific font property overrides the global property
					fontColor: '#00d11f'
				}
			},
		  	scales: {
				yAxes: [{
					display: true,
					gridLines: {
						drawBorder: true,
					  color: "#00d11f"
					},
					ticks: {
						
						beginAtZero: true,
						max: maxHumid,
						min: 0
					}
				}]	
			  },
		}
	});
}

function addData(chart, label, data) {
    chart.data.labels = label;
    chart.data.datasets.forEach((dataset) => {
        dataset.data = data;
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels = [];
    chart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
    chart.update();
}


window.addEventListener('load', function () {
	//this.console.log("PepiHands");
	findEnv();
}, false);