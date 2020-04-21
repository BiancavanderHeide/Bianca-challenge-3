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
			zoom: 6.5
		});

		map.addControl(
			new MapboxGeocoder({
				accessToken: mapboxgl.accessToken,
				mapboxgl: mapboxgl
			}),
			'top-left'
		);
		map.addControl(new mapboxgl.NavigationControl());
}

var x = window.matchMedia("(min-width: 1080px)") //desktop > kaart met zoekbalk en weer met popup met temperatuur '(niet) veilig om te landen'
	if (x.matches) { // If media query matches
		
			var myCities = [ //alle hoofdsteden van Nederland
			  {
			    name: 'Den Haag',
			    coordinates: [4.288788, 52.078663],
			    description: 'Het is mooi weer'
			  },
			  {
			    name: 'Haarlem',
			    coordinates: [4.646219, 52.387386],
			    description: 'Het is mooi weer'
			  },
			  {
			    name: 'Leeuwarden',
			    coordinates: [5.80859, 53.20139],
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
			    name: 'Assen',
			    coordinates: [6.5625, 52.99667],
			    description: 'Het is mooi weer'
			  },
			  {
			    name: 'Zwolle',
			    coordinates: [6.09444, 52.5125],
			    description: 'Het is mooi weer'
			  },
			  {
			    name: 'Lelystad',
			    coordinates: [5.471422, 52.518536],
			    description: 'Het is mooi weer'
			  },
			  {
			    name: 'Arnhem',
			    coordinates: [5.91111, 51.98],
			    description: 'Het is mooi weer'
			  },
			  {
			    name: 'Utrecht',
			    coordinates: [5.104480, 52.092876],
			    description: 'Het is mooi weer'
			  },
			  {
			    name: 'Middelburg',
			    coordinates: [3.610998, 51.4987962],
			    description: 'Het is mooi weer'
			  },
			  {
			    name: '&rsquo;s-Hertogenbosch',
			    coordinates: [5.30417, 51.69917],
			    description: 'Het is mooi weer'
			  },
			];

		// get weather data and plot on map
		map.on('load', function () {
			myCities.forEach(function(city) {
				var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey 
				+ '&lon=' + city.coordinates[0] 
				+ '&lat=' + city.coordinates[1];


				// Get current weather based on cities' coordinates
				fetch(request)
					.then(function(response) {
						if(!response.ok) throw Error(response.statusText);
						return response.json();
					})
					.then(function(response) {
					// Then plot the weather response + icon on MapBox
						plotImageOnMap(response.weather[0].icon, city);
					})
					.catch(function (error) {
						console.log('ERROR:', error);
					});
					
			});
				
			//Create a popup, but don't add it to the map yet.
			var popup = new mapboxgl.Popup({
			    closeButton: false,
			    closeOnClick: false
			});
			
			map.on('mouseenter', function (e) {
				map.getCanvas().style.cursor = 'pointer';
			    var coordinates = e.myCities[0].coordinates.slice();
			    var description = e.myCities[0].description;
			    var name = e.myCities[0].name;

		    // Populate the popup and set its coordinates based on the feature found.
		    popup.setLngLat(coordinates)
		         .setHTML('<h3>' + name + '</h3>' +'<p>' + description + '</p>')
		         .addTo(map);
			});

			map.on('mouseleave', function () {
				map.getCanvas().style.cursor = '';
			    popup.remove();
			});
		});
		
		function plotImageOnMap(icon, city) { //zet de weerafbeeldingen op de coordinaten van myCities
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
};
