/**
 * Socket.io - Nodejs
 */

var socket;

function ioInit() {
  socket = io.connect('http://localhost:2323');

  // Evento de conexion con el servidor
  socket.on('connect', function() {
    var inicio;
    var fin;
    var dif;

    console.log('Conectado al Node ...');

    inicio = Date.now();
    socket.emit('getLocalidades', null, function(data){
      fin = Date.now();
      dif = (fin - inicio) / 1000;

      // Definimos el campo para filtrar localidades como TypeHead
      $('#inLocalidad').typeahead({source: data, items: 10});

      console.log('Cantidad de Localidades: '+data.length+' ('+dif+' seg.)');
    });
  });

  // Evento de Error al intentar hacer algo contra el servidor
  socket.on('error', function() {
    console.log('Ouch !!! Node no responde ...');
  });

  // Corresponde a un mensaje Global enviado por el servidor 
  socket.on('aviso', function (data) {
//    console.log(data.data);
    $('#panelNovedades').append('<hr style="margin: 5px;">'+data.data);
    $('#panelNovedades').scrollTop($('#panelNovedades').height());
  });
}

