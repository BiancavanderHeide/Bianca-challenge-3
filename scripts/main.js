// // init map
// var myMap;

// function initMap() {
// 	// set options for map 
// 	var mapOptions = {
// 		center: {
// 			lat: 52.067514882683064, 
// 			lng: 4.3238686164587
// 		},
// 		zoom: 17,
// 		//mapTypeId: 'hybrid' //dit laat de google earth view zien
// 	};

// 	// create map and add to page
// 	myMap = new google.maps.Map(document.getElementById('map'), mapOptions);
// }

// function initAutocomplete() {
// 	var map = new google.maps.Map(document.getElementById('map'), {
// 		center: {lat: 52.067514882683064, lng: 4.3238686164587},
//         zoom: 15,	
//         mapTypeId: 'roadmap'
// 	});

// 	// Create the search box and link it to the UI element.
// 	var input = document.getElementById('pac-input');
// 	var searchBox = new google.maps.places.SearchBox(input);
// 	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

// 	// Bias the SearchBox results towards current map's viewport.
// 	map.addListener('bounds_changed', function() {
// 		searchBox.setBounds(map.getBounds());
// 	});

// 	var markers = [];
// 	// Listen for the event fired when the user selects a prediction and retrieve
// 	// more details for that place.
// 	searchBox.addListener('places_changed', function() {
// 		var places = searchBox.getPlaces();

// 		if (places.length == 0) {
// 			return;
// 		}

// 	// Clear out the old markers.
// 	markers.forEach(function(marker) {
// 		marker.setMap(null);
// 	});
// 	markers = [];

// 		// For each place, get the icon, name and location.
// 		var bounds = new google.maps.LatLngBounds();
// 		places.forEach(function(place) {
// 			if (!place.geometry) {
// 		    	console.log("Returned place contains no geometry");
// 		    	return;
// 		    }
// 		    var icon = {
// 		    	url: place.icon,
// 		    	size: new google.maps.Size(71, 71),
// 		    	origin: new google.maps.Point(0, 0),
// 		    	anchor: new google.maps.Point(17, 34),
// 		    	scaledSize: new google.maps.Size(25, 25)
// 		    };

// 		    // Create a marker for each place.
// 		    markers.push(new google.maps.Marker({
// 		    	map: map,
// 		    	icon: icon,
// 		    	title: place.name,
// 		    	position: place.geometry.location
// 		    }));

// 		    if (place.geometry.viewport) {
// 		      // Only geocodes have viewport.
// 		    	bounds.union(place.geometry.viewport);
// 		    } else {
// 		    	bounds.extend(place.geometry.location);
// 		    }
// 		});
// 	  map.fitBounds(bounds);
// 	});
// }



/**
 * Fetch API data
 */
// function getAPIweer() {
// 	var url = 'https://api.openweathermap.org/data/2.5/weather';
// 	var apiKey ='d928735b916d301d8d9f0ea564ba901c';
// 	var city = 'Den Haag'|| document.getElementById('pac-input').value;
// // api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// 	// construct request
// 	var request = url + '?' + 'q=' + city + '&' + 'appid=' + apiKey;
	
// 	// get weather forecast
// 	fetch(request)

// 	// parse to JSON format
// 	.then(function(response) {
// 		if(!response.ok) throw Error(response.statusText);
// 		return response.json();
// 	})
// 	.then(function(response){
// 		onAPISucces(response);
		
// 	})
// 	// render weather per day
// 	// .then(function(response) {
// 	// 	console.log(response);
// 	// 	// render weatherCondition
// 	// 	onAPISucces(response);
// 	// })
	
// 	// catch error
// 	.catch(function (error) {
// 		// onAPIError();
// 		onAPIError(error);
// 	});
// }


/**
 * Render weather listing
 */
// function onAPISucces(response) {
// 	var type = response.weather[0].description;
// 	var degC = Math.floor(response.main.temp - 273.15);
// 	var weatherBox = document.getElementById('weer');
// 	weatherBox.innerHTML=degC + '&#176;C <br>' + type;



	// var weatherList = response.list;
	// var weatherBox = document.getElementById('weer');

	// // for(var i=0; i< weatherList.length; i++){
	// // 	//console.log(weatherList[i].main.temp - 273.15);
	// // 	var weatherbox = document.getElementById('weather');

	// // 	var dateTime = new Date(weatherList[i].dt_txt);
	// 	var date = formDate(dateTime);
	// 	var time = formTime(dateTime);
	// 	var temp = Math.floor(weatherList.main.temp - 273.15);

	// 	forecastMessage =  '<div class="forecastMoment">';
	// 	forecastMessage +=   '<div class="date"> '+date+' </div>';
	// 	forecastMessage +=	 '<div class="time"> '+ time +' </div>';
	// 	forecastMessage +=	 '<div class="temp"> '+temp+'&#176;C </div>';
	// 	forecastMessage += '</div>';

	// 	weatherBox.innerHTML += forecastMessage;
	// }
// }

/**
 * Error
 */
// function onAPIError(response) {
// 	console.error('Request failed', error)
// 	var weatherBox = document.getElementById('weer');
// 	weatherBox.className = 'hidden'; 
// }

// /**
//  * Format date
//  */
// function formDate(date) {
// 	var day = date.getDate();
// 	var month = date.getMonth() + 1;
// 	return day +'/'+ month;
// }

// /**
//  * Format time
//  */
// function formTime(date) {
// 	var hours = date.getHours();
// 	if(hours<10){
// 		hours = '0'+hours;
// 	}
// 	var minutes = date.getMinutes();
// 	if(minutes < 10){
// 		minutes = '0'+ minutes;
// 	}
// 	return hours +':'+ minutes;
// }

// init data stream
// document.getElementById('getStad').onclick = function (){
	// getAPIweer();
	// getAPIhoreca();
	// getAPIweer();


// Set api token for mapbox


// api token for openWeatherMap
var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = 'D928735b916d301d8d9f0ea564ba901c';

function getAPIdata(){
	var zoekopdracht = document.getElementById('stad').value
	var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey 
		+ '&'+ 'q=' + zoekopdracht + '&' + 'lang=' + 'nl';

		// Get current weather based on cities' coordinates
		fetch(request)
		
		.then(function(response) {
			if(!response.ok) throw Error(response.statusText);
			return response.json();
		})

		.then(function(response) {
		// Then plot the weather response + icon on MapBox
			onAPISucces(response);
		})

		.catch(function (error) {
			onAPIError(error);
		});
}
function onAPISucces(response) {
	var type = response.weather[0].description; //type weer
	var pressure = response.main.pressure; //luchtdruk
	var visibility = response.visibility; //zichtbaarheid
	var wind = response.wind.speed; // windsnelheid
	var degC = Math.floor(response.main.temp - 273.15); //temperatuur

	// render weather in DOM
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = 'De temperatuur is ' + degC + '&#176;C. <br>' 
	+ 'Het soort weer is ' + type + '. <br>' 
	+ 'De luchtdruk is ' + pressure + ' hPa. <br>' 
	+ 'De zichtbaarheid is ' + visibility + ' meter. <br>' 
	+ 'De windsnelheid is '+ wind + ' meter per seconde.';
}


function onAPIError(error) {
	console.error('Fetch request failed', error);
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = 'No weather data available <br /> Did you enter a valid city?'; 
}

document.getElementById('getStad').onclick = function(){
	// init data stream
	getAPIdata();
};

mapboxgl.accessToken = 'pk.eyJ1IjoiYmlhbmNhdmRoZWlkZSIsImEiOiJjazkxOGI5dHQwMXFtM2ZvY3J2Z3Nib2ZvIn0.ymjDiXSJvO7_gFTGGAdoZA';



var x = window.matchMedia("(min-width: 768px)") //tablet > kaart met zoekbalk en temperatuur na zoeken erboven
	if (x.matches) { // If media query matches

		// Initiate map
		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/outdoors-v11',
			center: [5.508852, 52.142480],
			zoom: 7
		});

		map.addControl(
			new MapboxGeocoder({
				accessToken: mapboxgl.accessToken,
				mapboxgl: mapboxgl
			}),
			'top-left'
		);
		map.on('load', function () {
			 map.addSource('places', {
			    'type': 'geojson',
			    'data': {
			      'type': 'FeatureCollection',
			      'features': myCities
			    }
			  });

			  // Add a layer showing the places.
			  map.addLayer({
			    'id': 'places',
			    'type': 'symbol',
			    'source': 'places',
			    'layout': {
			      'icon-image': '{icon}-15',
			      'icon-allow-overlap': true
			    }
			  });
		
		var marker = new mapboxgl.Marker()
			.setLngLat(features[0].geometry.coordinates)
			.addTo(map)
		

		// Create a popup, but don't add it to the map yet.
			var popup = new mapboxgl.Popup({
			    closeButton: false,
			    closeOnClick: false
			  });

			  map.on('mouseenter', 'places', function (e) {
			    var coordinates = e.features[0].geometry.coordinates.slice();
			    var description = e.features[0].properties.description;

			    // Populate the popup and set its coordinates based on the feature found.
			    popup.setLngLat(coordinates)
			         .setHTML(description)
			         .addTo(map);
			  });

			  map.on('mouseleave', 'places', function () {
			    popup.remove();
			  });
		})
}

var x = window.matchMedia("(min-width: 1080px)") //desktop > kaart met zoekbalk en weer met popup met temperatuur '(niet) veilig om te landen'
	if (x.matches) { // If media query matches
		
		// get weather data and plot on map
		map.on('load', function () {
			 map.addSource('places', {
			    'type': 'geojson',
			    'data': {
			      'type': 'FeatureCollection',
			      'features': myCities
			    }
			  });

			  // Add a layer showing the places.
			  map.addLayer({
			    'id': 'places',
			    'type': 'symbol',
			    'source': 'places',
			    'layout': {
			      'icon-image': '{icon}-15',
			      'icon-allow-overlap': true
			    }
			  });


			/*async*/ function fetchData() {
				//const response = await fetch('cities.js');
			    //const data = await response.json();

				data.forEach(function(city) {
				// Usually you do not want to call an api multiple times, but in this case we have to
				// because the openWeatherMap API does not allow multiple lat lon coords in one request.
				var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey 
				+ '&lon=' + city.features[0].geometry.coordinates[0]/*.slice()*/ 
				+ '&lat=' + city.features[0].geometry.coordinates[1];

				// Get current weather based on cities' coordinates
				fetch(request)
					.then(function(response) {
						if(!response.ok) throw Error(response.statusText);
						return response.json();
					})
					.then(function(response) {
					// Then plot the weather response + icon on MapBox
						plotImageOnMap(response.weather[0].icon, city)
						//plotImageOnMap(response.main.temp, city)
					})
					.catch(function (error) {
						console.log('ERROR:', error);
					});
					
				});
			}
		

			
		});

		function plotImageOnMap(icon, city) {
			map.loadImage('http://openweathermap.org/img/w/' + icon + '.png',
			function (error, image) {
				if (error) throw error;
				map.addImage("weatherIcon_" + city.features[0].properties.description, image);
				map.addSource("point_" + city.features[0].properties.description, {
					type: "geojson",
					data: {
						type: "FeatureCollection",
						features: [{
							type: "Feature",
							geometry: {
								type: "Point",
								coordinates: city.features[0].geometry.coordinates
							}
						}]
					}
				});
				map.addLayer({
					id: "points_" + city.features[0].properties.description,
					type: "symbol",
					source: "point_" + city.features[0].properties.description,
					layout: {
						"icon-image": "weatherIcon_" + city.features[0].properties.description,
						"icon-size": 1.3
					}
				});
			}
			);
		}

}

var x = window.matchMedia("(min-width: 1920px)") //groot scherm > kaart met zoekbalk en weer met popup met temperatuur en live-foto (of earth) van gezochte plaats
	if (x.matches) { // If media query matches		

}




// function plotTempOnMap(temp, city) {
// 	map.loadTemp(
// 		// temp = Math.floor(weatherList.main.temp - 273.15),
// 		'http://openweathermap.org/temp/' + temp,
// 		function (error, temperature) {
// 			if (error) throw error;
// 			map.addTemp("weatherTemp_" + city.name, temperature);
// 			map.addSource("point_" + city.name, {
// 				type: "geojson",
// 				data: {
// 					type: "FeatureCollection",
// 					features: [{
// 						type: "Feature",
// 						geometry: {
// 							type: "Point",
// 							coordinates: city.coordinates
// 						}
// 					}]
// 				}
// 			});
// 			map.addLayer({
// 				id: "points_" + city.name,
// 				type: "symbol",
// 				source: "point_" + city.name,
// 				layout: {
// 					"font-size": 12
// 				}
// 			});
// 		}
// 	);
// }