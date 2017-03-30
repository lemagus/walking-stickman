var socket = io();
var uniqid = Math.round( Math.random() * 999999 );
      
var players = {};

Animation.init(function(mycoon){

	Animation.onMove = function(destX, destY){
		socket.emit('position', JSON.stringify({
	      userId:uniqid,
	      x: destX,
	      y: destY
	  	}));
	};

	socket.emit('create', JSON.stringify({
      userId:uniqid,
      x: mycoon.x,
      y: mycoon.y
  	}));
	
	socket.on('create', function(datas){
		var values = JSON.parse(datas);
		if( values.userId !== uniqid ) {
			var racoon = Animation.create(values);
			players['player_' + values.userId] = racoon;
		}
	});
	
	socket.on('position', function(datas){
		var values = JSON.parse(datas);
		if( values.userId !== uniqid ) {
			var racoon = players['player_' + values.userId];
			Animation.move(racoon, values.x, values.y );
		}
	});
	
});