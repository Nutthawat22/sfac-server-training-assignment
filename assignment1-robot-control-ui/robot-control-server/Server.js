const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const robot = {
    x: 150,
    y: 150,
    velocity: { x: 0, y: 0 }
  };
  
  io.on('connection', (socket) => {
    console.log('✅ Client connected:', socket.id);
  
    socket.emit('robot-update', { x: robot.x, y: robot.y });
  
    socket.on('joystick-move', ({ vx, vy }) => {
      console.log('⬅️ Move received:', { vx, vy });
      robot.velocity = { x: vx, y: vy };
    });
  
    socket.on('joystick-stop', () => {
      console.log('🛑 Stop received');
      robot.velocity = { x: 0, y: 0 };
    });
  
    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });

  setInterval(() => {
    robot.x += robot.velocity.x;
    robot.y += robot.velocity.y;
    io.emit('robot-update', { x: robot.x, y: robot.y });
  }, 16);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Robot backend listening on http://localhost:${PORT}`);
});
