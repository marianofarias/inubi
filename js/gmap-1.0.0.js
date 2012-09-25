/**
 * GOOGLE Maps
 */

function initializeGoogleMaps() {
  // One-shot position request.
  if (navigator.geolocation) {
    // alert('Localizacion obtenida por el Browser.');
    navigator.geolocation.getCurrentPosition(showMap);
  } else {
    showMessageAutoHide('#msgError', navigator.appName+' - '+' No soporta geolocalización, lo ubicamos en <strong>Cañuelas</strong>.');
    showMap();
  }
}

function showMap(position) {
  var myPosition;

  if (position == null) {
    // Nos posicionamos en Cañuelas
    myPosition = new google.maps.LatLng(-35.0508995056, -58.754901886);
  } else {
    myPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
  }

  var myOptions = {
    center: myPosition,
    zoom: 15,
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  // Creamos el mapa
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

  var image = 'img/pin.png';

  // Creamos el marcador
  var marker = new google.maps.Marker({
      position: myPosition,
      draggable: true,
      icon: image,
      title:"Aca Estoy !!!"
  });

  marker.setMap(map);

  // Creamos una InfoWindows para el clic del marker
  var infowindow = new google.maps.InfoWindow({
      content: 'Aca estoy !!! ...'
  });        

  // Agregamos el evento al Mapa y Marker para que cuando haga click muestre el infoWindows
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });        

}