/**
 * Facebook
 */

/**
 * Inicia la sesion necesaria para Inubi
 */
function fbInit() {
  FB.init({
    appId: '221677534601882',
    status: true, // check login status
    cookie: true, // enable cookies to allow the server to access the session
    xfbml: true   // parse XFBML
  });

  /**
   * Evento que se dispara luego de que el usuario cambia de estado
   */
  FB.Event.subscribe('auth.authResponseChange', function(response) {
    // Verificamos si esta conectado
    if (response.status == 'connected') {

      // Obtenemos los permisos que el usuario Acepto para la App Inubi
      FB.api('/me?fields=permissions', function(response) {
        var permisos = response.permissions.data[0];

        // Verificamos si posee los permisos necesarios
        if (permisos.email && permisos.installed && permisos.publish_stream) {
          showPanelUsuario();
        } else {
          console.log('ERROR - Faltan Permisos - Salimos de Inubi');
          fbLogout();
        }

      });
    } else {
      hidePanelUsuario()
    }

  });

  /**
   * Evento que se ejecuta al iniciar la App para determinar si el usuario ya esta iniciado o tiene que ingresar
   */
  FB.getLoginStatus(function(response) {
    if (response.status == "connected") {
      quienSoy();
    } else {
      console.log('No estas conectado a Facebook');
    }
  });

  initializeGoogleMaps();

}

/**
 * Obtiene los datos del Usuario de Facebook
 */
function quienSoy() {
  var miFB;

  FB.api('/me?fields=verified,picture,last_name,first_name,email,name,gender,location,devices', function(response) {
    miFB = response;

    // Verificamos si se trata de un usuario que valido su cuenta en Facebook o no
    if (miFB.verified) {
      $('#miNombreLeft').html(' '+response.name+' <i class="icon-check" title="Usuario Validado en Facebook"></i>');
    } else {
      $('#miNombreLeft').text(' '+response.name);
    }

    // Agregamos la foto en el perfil
    $('#fotoPerfilLeft').attr('src', response.picture.data.url);

    // Avisamos al Node quien es el usuario de FB que esta usando el socket
    socket.emit('setNickName', miFB);
    
    fbMisAmigos();

  });
}

/**
 * Inicia la Sesion de Facebook
 */
function fbLogin() {
  FB.login(function(response) {
     if (response.authResponse) {
       quienSoy();
     } else {
       console.log('Ouch fallo el login con Facebook !!!');
     }
   }, {scope: 'email, user_location, publish_stream'});
}

/**
 * Cierra la Sesion de Facebook
 */
function fbLogout() {
  FB.logout(function(response){});
}

/**
 * Obtiene los Amigos de Facebook
 */
function fbMisAmigos() {
  FB.api('/me/friends?fields=picture,name', function(response) {
    // Vaciamos la lista de amigos
    $('#misAmigos').empty();

    // Agregamos el contador de amigos en el Tab
    $('#tabAmigos').html('<i class="icon-user"></i> <span class="badge">'+response.data.length+'</span>');

    // Invocar template JQuery Externo
    $.get('tmpl/itemAmigo.tpl', function(template){
      $(template).tmpl(response.data).appendTo('#misAmigos');
    });
  });
}