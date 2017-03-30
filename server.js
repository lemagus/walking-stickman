var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var players = [];
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

io.on('connection', function(socket){
    
  socket.emit('players', players);
   
  socket.on('position', function(datas){
    io.emit('position', datas);
  });
  
  socket.on('create', function(datas){
    io.emit('create', datas);
    players.push(datas);
    console.log(players);
  });
  
  socket.on('collision', function(datas){
    io.emit('collision', datas);
  });
  
  socket.on('leave', function(datas){
	  var uid = datas.uniqid;
	  for(var p in players) {
		  var player = players[p];
		  if( player.indexOf(uid) > -1 ){
			  players.splice(p, 1);
			  io.emit('delete', player);
		  }
	  }
  });
  
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});
