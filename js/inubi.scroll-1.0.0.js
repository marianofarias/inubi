/**
 * Funciones de manejo de Scroll del Sitio
 */

function scrollInit() {

  /**
   * Modo de Prueba
   */
  var arrResult = [
    {Nombre: 'Pedro', Apellido: 'Prueba', Edad: 15},
    {Nombre: 'Alberto', Apellido: 'Molinarolli', Edad: 15},
    {Nombre: 'German', Apellido: 'Peraferrer', Edad: 15},
    {Nombre: 'Mariano', Apellido: 'Farias', Edad: 15},
    {Nombre: 'Veronica', Apellido: 'Lera', Edad: 15},
    {Nombre: 'Matias', Apellido: 'Garavaglia', Edad: 15},
    {Nombre: 'Guadalupe', Apellido: 'Rivera', Edad: 15},
    {Nombre: 'Gustavo', Apellido: 'Nesa', Edad: 15}
  ];

  // Invocar template JQuery Externo
  $.get('tmpl/ItemResultSearch.tpl', function(template){
    $(template).tmpl(arrResult).appendTo('#contentResultados');
  });

  // fix sub nav on scroll
  var $win = $(window)
    , $nav = $('.subnav')
    , navTop = $('.subnav').length && $('.subnav').offset().top - 40
    , isFixed = 0

  processScroll();

  // hack sad times - holdover until rewrite for 2.1
  $nav.on('click', function () {
    if (!isFixed) setTimeout(function () {  $win.scrollTop($win.scrollTop() - 47) }, 10)
  })

  $win.on('scroll', processScroll);

  function processScroll() {
    var i, scrollTop = $win.scrollTop();
    var altoPanelUsuario = 0;

    $('#btnAddInubi').popover('hide');

    // Controlamos si queda o no fija la publicidad
    if (scrollTop > $('#panelNovedades').height()) {
      $('#panelRightFixed').css('top', '100px');
      $('#panelRightFixed').css('position', 'fixed');
    } else {
      $('#panelRightFixed').css('top', '');
      $('#panelRightFixed').css('position', 'static');
    }

    // Verificamos si el panel de usuario esta visible o no para cambiar la referencia del scroll
    if ($('#panelUsuario').css('display') == 'none') {
      altoPanelUsuario = navTop;
    } else {
      altoPanelUsuario = $('#panelUsuario').height();
    }

    // Controlamos si queda o no fija la Oferta
    if (scrollTop > altoPanelUsuario) {
      $('#panelLeftFixed').css('top', '100px');
      $('#panelLeftFixed').css('position', 'fixed');
    } else {
      $('#panelLeftFixed').css('top', '');
      $('#panelLeftFixed').css('position', 'static');
    }

    if (scrollTop >= navTop && !isFixed) {
      isFixed = 1;
      $nav.addClass('subnav-fixed');
      $('#miLocalidad').css('float', 'left');
      $('#otraCosa').css('float', 'left');
      $('#filtros').css('height', '38px');

    } else if (scrollTop <= navTop && isFixed) {
      isFixed = 0;
      $nav.removeClass('subnav-fixed');
      $('#miLocalidad').css('float', 'left');
      $('#otraCosa').css('float', 'right');
      $('#filtros').css('height', '38px');

    // Determina si se tiene que buscar mas resultados
    } else if (scrollTop == $(document).height() - $win.height()) {
  //      $('#contentResultados').append('<div style="border-bottom: 1px solid #ccc; min-height: 60px; padding: 5px;"><div style="float: left"><img class="inubiBorderShadow" src="img/user.png" /></div><div style="padding-left: 10px; float: left"><p>Algun texto</p><p>Algun texto</p></div></div>');
      // Invocar template JQuery Externo
      $.get('tmpl/ItemResultSearch.tpl', function(template){
        $(template).tmpl(arrResult).appendTo('#contentResultados');
      });
    }
  }

  // Cuando se cambia de tamaño la pantalla ordenasmos algunos componentes
  $win.on('resize', function(){
    $('#panelRightFixed').css('width', $('#panelRightFixedPadre').css('width'));
    $('#panelLeftFixed').css('width', $('#panelLeftFixedPadre').css('width'));
  });
}


