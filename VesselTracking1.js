var heatmap, map, elevation;
function initialize() {

	// Create an array of styles.
	var styles = [{
			"featureType" : "water",
			"elementType" : "geometry.fill.stroke"

		}, {
			"featureType" : "water",
			"elementType" : "labels.text.fill",
			"stylers" : [{
					"color" : "#000000"
				}
			]
		}, {
			"featureType" : "water",
			"elementType" : "labels.text.stroke",
			"stylers" : [{
					"color" : "#FFFFFF"
				}
			]
		}, {
			"featureType" : "administrative",
			"elementType" : "all",
			"stylers" : [{
					"color" : "#000000"
				}, {
					"visibility" : "off"
				}
			]
		}, {
			"featureType" : "landscape",
			"elementType" : "all",
			"stylers" : [{
					"color" : "#5f6d7b"
				}
			]
		}, {
			"featureType" : "landscape",
			"elementType" : "labels.text.fill",
			"stylers" : [{
					"color" : "#000000"
				}
			]
		}, {
			"featureType" : "landscape",
			"elementType" : "labels.text.stroke",
			"stylers" : [{
					"color" : "#FFFFFF"
				}
			]
		}, {
			"featureType" : "poi",
			"elementType" : "all",
			"stylers" : [{
					"visibility" : "off"
				}, {
					"color" : "#027781"
				}
			]
		}, {
			"featureType" : "road",
			"elementType" : "all",
			"stylers" : [{
					"visibility" : "off"
				}, {
					"color" : "#ffffff"
				}
			]
		}
	];

	// Create a new StyledMapType object, passing it the array of styles,
	// as well as the name to be displayed on the map type control.
	//var styledMap = new google.maps.StyledMapType(styles, {
	//		name : "Styled Map"
	//	});

	// Create a map object, and include the MapTypeId to add
	// to the map type control.
	var mapOptions = {
		center : {
			lat : -21,
			lng : 134
		},
		zoom : 4,
		disableDefaultUI : true,
		zoomControl : true,
		scrollwheel : false,
		mapTypeId: 'terrain',
		//mapTypeControlOptions : {
		//	mapTypeIds : [google.maps.MapTypeId.ROADMAP, 'map_style']
		//}
		mapTypeId : google.maps.MapTypeId.TERRAIN,
		styles: styles
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	//Associate the styled map with the MapTypeId and set it to display.
	//map.mapTypes.set('map_style', styledMap);
	//map.setMapTypeId('map_style');

	var arrayData = data;
	elevation = new google.maps.ElevationService();

	//heatmap
	var pointArray = new google.maps.MVCArray(arrayData);

	heatmap = new google.maps.visualization.HeatmapLayer({
			data : pointArray,
			maxIntensity : 40,
			radius: 3
		});

	heatmap.setMap(map);
}

function toggleHeatmap() {
	heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
	var gradient = [
		'rgba(0, 255, 255, 0)',
		'rgba(0, 255, 255, 1)',
		'rgba(0, 191, 255, 1)',
		'rgba(0, 127, 255, 1)',
		'rgba(0, 63, 255, 1)',
		'rgba(0, 0, 255, 1)',
		'rgba(0, 0, 223, 1)',
		'rgba(0, 0, 191, 1)',
		'rgba(0, 0, 159, 1)',
		'rgba(0, 0, 127, 1)',
		'rgba(63, 0, 91, 1)',
		'rgba(127, 0, 63, 1)',
		'rgba(191, 0, 31, 1)',
		'rgba(255, 0, 0, 1)'
	]
	heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
	heatmap.set('radius', heatmap.get('radius') ? null : 3);
}

function changeOpacity() {
	heatmap.set('opacity', heatmap.get('opacity') ? null : 0.3);
}

google.maps.event.addDomListener(window, 'load', initialize);
