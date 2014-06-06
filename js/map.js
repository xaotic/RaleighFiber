$(function() {
	//Creates map in leaflet
	var map = map = L.map('map').setView([35.843768,-78.6450559], 11);

	//Adds open street map tile layer to map
	var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    		maxZoom:18, detectRetina: true}).addTo(map);
});