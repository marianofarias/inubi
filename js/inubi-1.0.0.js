$(document).ready(function() {

  // Acomodamos el ancho de lo componentes según el anch de su span3 padre
  $('#panelRightFixed').css('width', $('#panelRightFixedPadre').css('width'));
  $('#panelLeftFixed').css('width', $('#panelLeftFixedPadre').css('width'));

  // Definimos Popover y Tooltip Crear Inubis
  $('#btnAddInubi').popover({trigger: 'click', placement: 'bottom', delay: { show: 500, hide: 100 }});
  $('#btnAddInubi').attr('data-content', $('#btnInubis').html());

  // Definimos Popover Crear Sugerencias
  $('#btnSugerencia').popover({trigger: 'click', placement: 'bottom', delay: { show: 500, hide: 100 },
                               template: '<div class="popover" style="width: 253px"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'});
  var contSugerencia = $('#contentSugerencia');
  $('#btnSugerencia').attr('data-content', contSugerencia.html());
  contSugerencia.empty();

  $('#btnAddInubi').tooltip({placement: 'right'});

  // Definimos la Busqueda de Localidades
  $('#inLocalidad').change(function(event){
    positionMapaLocalidad($('#inLocalidad').val());
  });
  
  // Maneja el Scroll definido en js/inubi.scroll-x.x.x.js
  scrollInit();

  // Maneja Facebook definido en js/fb-x.x.x.js
  fbInit();

  // Maneja el Socket con Nodejs
  ioInit();
  
});

/**
 * Funciones Inubi
 */

function showAddInubi() {
  $('#panelAddInubi').fadeIn(1000);
  $('#btnAddInubi').popover('hide');
//  $('#myModal').modal();
}

function showMapa() {
  if ($('#btnShowMapa i').hasClass('icon-chevron-up')) {
    $('#map_canvas').fadeOut(1000);
    $('#btnShowMapa i').removeClass('icon-chevron-up').fadeOut();
    $('#btnShowMapa i').addClass('icon-chevron-down').fadeIn();
    $('#btnShowMapa').attr('title', 'Mostrar el Mapa');
  } else {
    $('#map_canvas').fadeIn(1000);
    $('#btnShowMapa i').removeClass('icon-chevron-down').fadeOut();
    $('#btnShowMapa i').addClass('icon-chevron-up').fadeIn();
    $('#btnShowMapa').attr('title', 'Ocultar el Mapa');
  }
}

function checkTipoInubi(chk) {
  if (!chk.checked) {
    $('button[rel="btnTipoInubi"]').removeClass('active');
  } else {
    $('button[rel="btnTipoInubi"]').addClass('active');
  }
}

function checkTipoEntidad(chk) {
  if (!chk.checked) {
    $('button[rel="btnTipoEntidad"]').removeClass('active');
  } else {
    $('button[rel="btnTipoEntidad"]').addClass('active');
  }
}

function positionMapaLocalidad(localidad) {
  socket.emit('getLocalidad', {localidad: localidad}, function(data){
    var myPosition = new google.maps.LatLng(data[0].latitud, data[0].longitud);
    
    var myOptions = {
     center: myPosition,
      zoom: 13,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Creamos el mapa
    new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    
  });
  
}

function novedadLocalidad(localidad){
  $('#inLocalidad').val(localidad);
  positionMapaLocalidad($('#inLocalidad').val() );
}

function sendSugerencia() {
  socket.emit('setSugerencia', $('#inSugerencia').val());
  $('#btnSugerencia').popover('hide');
}