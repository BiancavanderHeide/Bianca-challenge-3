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
		map.addControl(new mapboxgl.NavigationControl()); 
		map.on('load', function () {
			// map.addSource('places', {
			// 	'type': 'geojson',
			// 	'data': {
			//     'type': 'FeatureCollection',
			//     'features': myCities
			//     }
			// });
			// //var features = myCities;

			//  // Add a layer showing the places.
			//   map.addLayer({
			//     'id': 'places',
			//     'type': 'symbol',
			//     'source': 'places',
			//     'layout': {
			//       'icon-image': '{icon}-15',
			//       'icon-allow-overlap': true
			//     }
			//   });

		// Create a popup, but don't add it to the map yet.
			// var popup = new mapboxgl.Popup({
			//     closeButton: false,
			//     closeOnClick: false
			// }).set Popup(new mapbox);
			//var myMark = document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')
			
			// map.on('mouseenter', 'places', function (e) {
			//     var coordinates = e.features[0].geometry.coordinates.slice();
			//     var description = e.features[0].properties.description;

			//     // Populate the popup and set its coordinates based on the feature found.
			//     popup.setLngLat(coordinates)
			//          .setHTML(description)
			//          .addTo(map);
			// });

			// map.on('mouseleave', 'places', function () {
			//     popup.remove();
			// });
		});
}

var x = window.matchMedia("(min-width: 1080px)") //desktop > kaart met zoekbalk en weer met popup met temperatuur '(niet) veilig om te landen'
	if (x.matches) { // If media query matches
		
			var myCities = [
			  {
			    name: 'Amsterdam',
			    coordinates: [4.895168, 52.370216],
			    description: 'Het is mooi weer'
			  },
			  {
			    name: 'Rotterdam',
			    coordinates: [4.47917, 51.9225],
			    description: 'Het is mooi weer'
			  },
			  {
			    name: 'Nijmegen',
			    coordinates: [5.85278, 51.8425],
			    description: 'Het is mooi weer'
			  },
			  {
			    name: 'Maastricht',
			    coordinates: [5.68889, 50.84833],
			    description: 'Het is mooi weer'
			  },
			  {
			    name: 'Groningen',
			    coordinates: [6.56667, 53.21917],
			    description: 'Het is mooi weer'
			  },
			  {
			    name: 'Enschede',
			    coordinates: [6.89583, 52.21833],
			    description: 'Het is mooi weer'
			  },
			];

		// get weather data and plot on map
		map.on('load', function () {
			
			 // myCities.forEach(function(marker){
				// var el = document.createElement('div');
				// el.className = 'marker';

				// new mapboxgl.Marker(el)
				// 		.setLngLat(marker.geometry.coordinates) 
				// 		.setPopup(new mapboxgl.Popup({offset: 25})
				// 				.setHTML('<h3>' + myCities[0].properties.name + '</h3>' +'<p>' + myCities[0].properties.description + '</p>'))
				// 		.addTo(map);
				// });

			/*async*/ //function fetchData() {
				//const response = await fetch('cities.js');
			    //const data = await response.json();

				myCities.forEach(function(city) {
				// Usually you do not want to call an api multiple times, but in this case we have to
				// because the openWeatherMap API does not allow multiple lat lon coords in one request.
				var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey 
				+ '&lon=' + city.coordinates[0]/*.slice()*/ 
				+ '&lat=' + city.coordinates[1];

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
				// Create a popup, but don't add it to the map yet.
				var popup = new mapboxgl.Popup({
				    closeButton: false,
				    closeOnClick: false
				});
				
				map.on('mouseenter', 'places', function (e) {
				    var coordinates = e.myCities[0].coordinates.slice();
				    var description = e.myCities[0].description;
				    var name = e.myCities[0].name;

			    // Populate the popup and set its coordinates based on the feature found.
			    popup.setLngLat(coordinates)
			         .setHTML('<h3>' + name + '</h3>' +'<p>' + description + '</p>')
			         .addTo(map);
				});

				map.on('mouseleave', 'places', function () {
				    popup.remove();
				});
		});
		

		function plotImageOnMap(icon, city) {
			map.loadImage('http://openweathermap.org/img/w/' + icon + '.png',
			function (error, image) {
				if (error) throw error;
				map.addImage("weatherIcon_" + city.name, image);
				map.addSource("point_" + city.name, {
					type: "geojson",
					data: {
						type: "FeatureCollection",
						features: [{
							type: "Feature",
							geometry: {
								type: "Point",
								coordinates: city.coordinates
							}
						}]
					}
				});
				map.addLayer({
					id: "points_" + city.name,
					type: "symbol",
					source: "point_" + city.name,
					layout: {
						"icon-image": "weatherIcon_" + city.name,
						"icon-size": 1.3
					}
				});
			}
			);
		
		};
		
		//.setPopup(new mapboxgl.Popup({offset: 25})
				//.setHTML('<h3>' + myCities[0].properties.name + '</h3>' +'<p>' + myCities[0].properties.description + '</p>'))
		
};

var x = window.matchMedia("(min-width: 1920px)") //groot scherm > kaart met zoekbalk en weer met popup met temperatuur en live-foto (of earth) van gezochte plaats
	if (x.matches) { // If media query matches		

}
