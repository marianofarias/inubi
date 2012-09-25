/**
 * Facebook
 */

function fbInit() {
  FB.init({
    appId      : '221677534601882',
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
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

  FB.getLoginStatus(function(response) {
    if (response.status == "connected") {
      $('#optLogin').text('Cerrar Sesión');
      quienSoy();
    } else {
      console.log('No estas conectado a Facebook');
      FBLogin();
    }
  });

  initializeGoogleMaps();

}

function quienSoy() {
  var miFB;

  FB.api('/me', function(response) {
    miFB = response;

    $('#miNombre').text(' '+response.name);

    // Verificamos si se trata de un usuario que valido su cuenta en Facebook o no
    if (miFB.verified) {
      $('#miNombreLeft').html(' '+response.name+' <i class="icon-check" title="Usuario Validado en Facebook"></i>');
    } else {
      $('#miNombreLeft').text(' '+response.name);
    }

    FB.api('/me/picture', function(response) {
      $('#fotoPerfil').attr('src', response);
      $('#fotoPerfilLeft').attr('src', response);

      miFB.picture = response;

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
          $('#misAmigos').append('<p><img src="'+response+'" class="iub-imagen-perfil-left iub-border-shadow"/><a href="#">'+val.name+'</a></p>');
        });
        //console.log(val.name);
      });
    });

  });
}

function FBLogin() {
  FB.login(function(response) {
     if (response.authResponse) {
       console.log('Entro !!!');
       quienSoy();
     } else {
       console.log('Ouch !!!');
     }
   });
}