const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) =>{
  socket.on('join', (roomId) =>{
    socket.join(roomId);
  });

  socket.on('leave', (roomId) =>{
    socket.leave(roomId);
  });

  socket.on('audio', (roomId, audioData) =>{
    socket.to(roomId).emit('audio', audioData);
  });
});

app.get('/', (req, res)=>{
    res.sendFile('./index.html')
})

const port = 3000;
http.listen(port, () =>{
  console.log(`Server listening on port ${port}`);
});
