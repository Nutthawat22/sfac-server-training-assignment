const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

const robot = {
  x: 150,
  y: 150,
  velocity: { x: 0, y: 0 }
};

const dotRadius = 10;
let screen = { width: 600, height: 400 };

io.on('connection', (socket) => {
  console.log('🚀 Client connected');

  // Send initial position
  socket.emit('robot-update', { x: robot.x, y: robot.y });

  /** @param {import('../shared/types').JoystickInput} input */
  socket.on('joystick-move', (input) => {
    const { vx, vy } = input;
    robot.velocity.x = vx;
    robot.velocity.y = vy;
  });

  socket.on('joystick-stop', () => {
    robot.velocity.x = 0;
    robot.velocity.y = 0;
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected');
  });
});

// Server-side robot logic loop
setInterval(() => {
  robot.x += robot.velocity.x;
  robot.y += robot.velocity.y;

  // Clamp position inside the screen
  robot.x = Math.max(dotRadius, Math.min(screen.width - dotRadius, robot.x));
  robot.y = Math.max(dotRadius, Math.min(screen.height - dotRadius, robot.y));

  /** @type {import('../shared/types').RobotState} */
  const state = { x: robot.x, y: robot.y };
  io.emit('robot-update', state);
}, 16);

server.listen(3001, () => {
  console.log('✅ Server listening on http://localhost:3001');
});
