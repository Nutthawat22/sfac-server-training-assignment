import React, { useState, useEffect } from "react";
import socket from "./socket";
import Screen from "./components/Screen";
import JoystickControl from "./components/JoystickControl";
import "./App.css";
import Buttons from "./components/Buttons";

function App() {
  const [position, setPosition] = useState({ x: 150, y: 150 });
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    socket.on("robot-update", (state) => {
      setPosition({ x: state.x, y: state.y });
      setLocked(state.locked);
    });
    return () => {
      socket.off("robot-update");
    };
  }, []);

  const handleMove = ({ x, y }) => {
    const magnitude = Math.hypot(x, y);
    if (magnitude === 0 || locked) return;

    const speed = magnitude * 0.15;
    const vx = (x / magnitude) * speed;
    const vy = -(y / magnitude) * speed;

    socket.emit("joystick-move", {
      vx,
      vy,
      timestamp: Date.now(),
    });
  };

  const handleStop = () => {
    if (locked) return;
    socket.emit("joystick-stop");
  };

  const emergencyStop = () => {
    socket.emit("emergency-stop");
  };

  const startRobot = () => {
    socket.emit("start-robot");
  };

  return (
    <div className="app-layout">
      <div className="screen-wrapper">
        <Screen position={position} />
      </div>
      <div className="joystick-wrapper">
        <Buttons
          locked={locked}
          onEmergencyStop={emergencyStop}
          onStart={startRobot}
        />
        <JoystickControl onMove={handleMove} onStop={handleStop} />
      </div>
    </div>
  );
}

export default App;
