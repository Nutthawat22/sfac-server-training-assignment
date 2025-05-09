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

// Import robot logic
const {
  getRobotState,
  moveRobot,
  stopRobot,
  lockRobot,
  unlockRobot,
  updatePosition
} = require('./RobotController');

// Set up socket connection handling
io.on('connection', (socket) => {
  console.log('🚀 Client connected');

  // Send the initial robot state to the client
  socket.emit('robot-update', getRobotState());

  // Handle joystick move
  socket.on('joystick-move', (input) => {
    moveRobot(input);
  });

  // Handle joystick stop
  socket.on('joystick-stop', () => {
    stopRobot();
  });

  // Handle emergency stop (lock the robot)
  socket.on('emergency-stop', () => {
    lockRobot();
    io.emit('robot-update', getRobotState());
  });

  // Handle robot start (unlock the robot)
  socket.on('start-robot', () => {
    unlockRobot();
    io.emit('robot-update', getRobotState());
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected');
  });
});

// Update robot state periodically
setInterval(() => {
  updatePosition();
  io.emit('robot-update', getRobotState());
},16);

server.listen(3001, () => {
  console.log('✅ Server listening on http://localhost:3001');
});