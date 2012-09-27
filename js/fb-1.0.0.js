/**
 * Facebook
 */

function fbInit() {
  FB.init({
    appId      : '221677534601882',
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true // parse XFBML
  });

  FB.Event.subscribe('auth.login',
    function(response) {
      console.log('Entroooo !!!');
      quienSoy();
    }
  );

  FB.Event.subscribe('auth.logout',
    function(response) {
      console.log('Salio !!!');
    }
  );

  FB.Event.subscribe('auth.authResponseChange', function(response) {
    console.log('FB cambio el estado de su session: ' + response.status);
    
    if (response.status == 'connected') {

      // Actualizamos los compenentes visuales
      $('#panelUsuario').slideDown(800);
      $('#btnLogin').html('<span class="iub-f-facebook">f</span>Salir');
      $('#btnLogin').attr('name', 'salir');
      $('#btnLogin').tooltip('hide')
          .attr('data-original-title', 'Cerrar Sesion')
          .tooltip('fixTitle');

      FB.api('/me/permissions', function(response) {
        var permisos = response.data[0];

        // Verificamos si posee los permisos necesarios
        if (permisos.email && permisos.installed && permisos.publish_stream) {
          console.log('OK - Permisos');
        } else {
          console.log('ERROR - Permisos - Salimos de Inubi');
          FB.logout(function(response) {});
        }

      });
    } else {
      // Actualizamos los compenentes visuales
      $('#panelUsuario').slideUp();
      $('#btnLogin').html('<span class="iub-f-facebook">f</span>Ingresar');
      $('#btnLogin').attr('name', 'ingresar');
      $('#btnLogin').tooltip('hide')
          .attr('data-original-title', 'Iniciar Session con tu usuarios de Facebook')
          .tooltip('fixTitle');
    }

  });

  FB.getLoginStatus(function(response) {
    if (response.status == "connected") {
      quienSoy();
    } else {
      console.log('No estas conectado a Facebook');
//      fbLogin();
    }
  });

  initializeGoogleMaps();

}

function quienSoy() {
  var miFB;

  FB.api('/me', function(response) {
    miFB = response;

    // Verificamos si se trata de un usuario que valido su cuenta en Facebook o no
    if (miFB.verified) {
      $('#miNombreLeft').html(' '+response.name+' <i class="icon-check" title="Usuario Validado en Facebook"></i>');
    } else {
      $('#miNombreLeft').text(' '+response.name);
    }

    FB.api('/me/picture', function(response) {
      $('#fotoPerfilLeft').attr('src', response.data.url);
      
      miFB.picture = response.data.url;

      // Avisamos al Node quien es el usuario de FB que esta usando el socket
      socket.emit('setNickName', miFB);
    });

    FB.api('/me/friends', function(response) {
      //console.log(response.data);
      $('#misAmigos').empty();
  //      $('#tabAmigos').text('Amigos ('+response.data.length+')');
      $('#tabAmigos').html('<i class="icon-user"></i> <span class="badge">'+response.data.length+'</span>');
      $.each(response.data, function(i, val) {
        FB.api('/'+val.id+'/picture', function(response) {
          //console.log(response);
          $('#misAmigos').append('<p><img src="'+response.data.url+'" class="iub-imagen-perfil-left iub-border-shadow"/><a href="#">'+val.name+'</a></p>');
        });
        //console.log(val.name);
      });
    });

  });
}

function fbLogin() {
  FB.login(function(response) {
     if (response.authResponse) {
       console.log('Entro !!!');
       quienSoy();
     } else {
       console.log('Ouch !!!');
     }
   }, {scope: 'email, user_location, publish_stream'});
}

function fbLogout() {
  FB.logout(function(response){});
}