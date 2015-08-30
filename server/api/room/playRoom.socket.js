'use strict';

/**
 * PlayRoom.Socket.jS
 *
 * This controller handles player's events.
 * It takes all player events and based on the obj that is sent it will redirect it to
 * the players room.
 */

exports.register = function(socket){


  socket.on('playerUpdate', function (obj) {
    console.log("playerUpdateeeeee:", obj);
    var path = 'room-' + obj.room + ':player-' + obj.name;
    //console.log("path", path);
    socket.broadcast.emit(path, obj);
    //socket.emit('playerEvent', obj);

    //playerEvents(socket, obj);
    //socket.emit('playerEvent', obj);

  });
};



