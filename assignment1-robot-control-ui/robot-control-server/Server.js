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

let robot = {
  position: { x: 150, y: 150 },
  velocity: { x: 0, y: 0 },
  dotRadius: 10,
  limit: 300
};

io.on('connection', (socket) => {
    console.log('✅ Server: client connected', socket.id);
  
    socket.on('joystick-move', ({ vx, vy }) => {
      console.log('⬅️ Server got move:', { vx, vy });
      robot.velocity = { x: vx, y: vy };
    });

    socket.on('joystick-stop', () => {
        console.log('🛑 Server received joystick stop');
        robot.velocity = { x: 0, y: 0 };
      });
  
    socket.on('disconnect', () => {
      console.log('❌ Server: client disconnected', socket.id);
    });
  });

setInterval(() => {
  const { velocity, position, dotRadius, limit } = robot;
  let nx = position.x + velocity.x;
  let ny = position.y + velocity.y;

  nx = Math.max(dotRadius, Math.min(limit - dotRadius, nx));
  ny = Math.max(dotRadius, Math.min(limit - dotRadius, ny));
  robot.position = { x: nx, y: ny };

  io.emit('robot-update', robot.position);
}, 16);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Robot backend listening on http://localhost:${PORT}`);
});
