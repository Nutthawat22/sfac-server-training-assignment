import React from "react";
import { Joystick } from "react-joystick-component";

const JoystickControl = ({ onMove, onStop }) => {
  return (
    <div style={{ padding: "20px" }}>
      <Joystick
        size={100}
        baseColor="#ddd"
        stickColor="#444"
        move={(e) => {
          onMove(e);
        }}
        stop={onStop}
      />
    </div>
  );
};

export default JoystickControl;
