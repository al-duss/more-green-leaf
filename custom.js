
$(function () {

    function initMap() {

        var location = new google.maps.LatLng(45.500233, -73.645652);

        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: location,
            zoom: 11,
            panControl: false,
            scrollwheel: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);


        var contentString = '<div class="info-window">' +
                '<h3>Info Window Content</h3>' +
                '<div class="info-content">' +
                '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>' +
                '</div>' +
                '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 400
        });

        var styles = [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]}, {"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]}, {"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]}, {"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]}, {"featureType": "administrative.province", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}];

        map.set('styles', styles);

        //dessiner les cercles sur la map
        // TODOOOOO
        var data = json_data;

        /*var oReq = new XMLHttpRequest();
        oReq.onload = reqListener;
        oReq.open("get", "result.json", true);
        oReq.send();

        function reqListener(e) {
            data = JSON.parse(this.responseText);
        }*/

        //var strJSON = '{"intersection":[{"name":"Rose-de-Lima / Saint-Jacques","count":10241,"emissions":131.8704106643,"lat":"45.4812","long":"-73.583"},{"name":"Carri\u00e8res des / Lorimier","count":14584,"emissions":187.79397218319997,"lat":"45.5425","long":"-73.5881"},{"name":"B\u00e9langer / Ch\u00e2teaubriand","count":8742,"emissions":112.5682189266,"lat":"45.5386","long":"-73.6106"}]}';
        
        //var data = JSON.parse(strJSON);
        //data["intersection"][i]["name"];
        //data["intersection"][i]["count"];
        //data["intersection"][i]["lat"];
        //data["intersection"][i]["long"];
        //data["intersection"][i]["emissions"];


        var infowindow = new google.maps.InfoWindow({
            content: "loading...",
            position: location,
            maxWidth: 400
        });

        for (i = 0; i < data["intersection"].length; i++){
            
            var location = new google.maps.LatLng(data["intersection"][i]["lat"], data["intersection"][i]["long"]); 
            
            function size(radius){
                //return Math.log(radius)/Math.log(1.1)*5;
                if(radius > 100){
                    return 300;
                }
                else {
                    return radius*4;
                }
            }

            var intersectionCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.0,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: location,
                //ajouter formule pour le radius
                radius: size(Math.ceil(data["intersection"][i]["diff"])),
                name: data["intersection"][i]["name"]+ " " +Math.round(data["intersection"][i]["arbres_necessaires"])+"  trees need to be planted to compensate."
            })
        
            // console.log(data["intersection"][i]["diff"]);

            google.maps.event.addListener(
                intersectionCircle, 
                'click', 
                function(){
                    infowindow.setContent(this.name);
                    infowindow.position = this.center;
                    infowindow.open(map, intersectionCircle);
                }
            );
        }

    }

    google.maps.event.addDomListener(window, 'load', initMap);
});