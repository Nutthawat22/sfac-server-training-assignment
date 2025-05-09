import React, { useRef, useEffect } from "react";

const Screen = ({ position }) => {
  const canvasRef = useRef(null);
  const dotRadius = 10;

  const canvasSize = { width: 600, height: 400 };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Convert normalized coordinates (0 to 1) to actual pixel values
    const robotX = position.x * canvasSize.width;
    const robotY = position.y * canvasSize.height;

    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    ctx.beginPath();
    ctx.arc(robotX, robotY, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
  }, [position]);

  return (
    <canvas
      className="robot-canvas"
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      style={{ border: "2px solid #333", backgroundColor: "#f9f9f9" }}
    />
  );
};

export default Screen;
