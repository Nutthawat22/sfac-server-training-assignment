import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Screen from './components/Screen';
import JoystickControl from './components/JoystickControl';
import './App.css';

const socket = io('http://localhost:3001');

function App() {
  const [position, setPosition] = useState({ x: 150, y: 150 });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Client: connected to server', socket.id);
    });

    socket.on('robot-update', (pos) => {
      setPosition(pos);
    });

    socket.on('disconnect', () => {
      console.log('❌ Client: disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('robot-update');
      socket.off('disconnect');
    };
  }, []);

  const handleMove = ({ x, y }) => {
    const mag = Math.hypot(x, y);
    if (mag === 0) return;

    const speed = mag * 2;
    const vx = (x / mag) * speed;
    const vy = -(y / mag) * speed;

    console.log('➡️ Client sending move:', { vx, vy });
    socket.emit('joystick-move', { vx, vy });
  };

  const handleStop = () => {
    console.log('⛔ Client sent stop');
    socket.emit('joystick-stop');
  };

  return (
    <div className="app-layout">
      <div className="screen-wrapper">
        <Screen position={position} />
      </div>
      <div className="joystick-wrapper">
        <JoystickControl onMove={handleMove} onStop={handleStop} />
      </div>
    </div>
  );
}

export default App;
