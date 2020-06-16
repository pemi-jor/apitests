var session = "";
const url = "http://0.0.0.0:5000/api/demo/";
//const url = "https://localhost:44316/";
//const url = "https://localhost:44348/api/demo/";

function fetchTokens() {
	var add = url + "serverstatus/";
	//var data;
	const params = { 
		headers: {
			Accept: 'application/json',
		  },
		method:"GET",
	};
	fetch(add,params)
	.then(response => {
		if (response.ok) {
		  response.json().then(json => {
			//handleResponse(json);
			console.log(json);
		  });
		}else {
			getElementById("error").text = "Server can't be reached ";
			this.console.log("Server can't be reached ");
		}
	  })
	  .catch(error => {
		  console.log('Error: ', error);
	  });
	
	
}
function tryLogin() {
	//var add = url + "users";
	var add = url + "login";
	//var userName = getElementById
	/*
	var user = {
		"userName": "Pemi",
		"password": "pemi"
	};
	*/
	var user = JSON.stringify({
		userName: document.getElementById("username").value,
		password: document.getElementById("password").value
	});
	
	
	const params = { 
		method:"POST",
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
			//Accept: 'application/json',
		  },
		  
		//method:"GET",
		//body: JSON.stringify(user),
		body: user
		//data: JSON.stringify(user),
	};
	fetch(add,params)
	.then(response => {
		if (response.ok) {
		  response.json().then(json => {
			//handleResponse(json);
			console.log(json);
		  });
		}else this.console.log("PepiHands PepiHands ");
	  })
	  .catch(error => {
		  console.log('Error: ', error);
	  });
	
	
}

function handleLoginRe

document.getElementById("btnLogin").addEventListener('click', function () {
	//this.console.log("PepiHands");
	tryLogin();
}, false);
/*
window.addEventListener('load', function () {
	//this.console.log("PepiHands");
	fetchCookies();
}, false);
*/