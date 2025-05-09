import React, { useRef, useEffect, useState } from "react";

const Screen = ({ position }) => {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 400 });

  // Resize canvas responsively with a 16:9 ratio
  useEffect(() => {
    const resize = () => {
      const width = Math.min(window.innerWidth * 0.8, 800);
      const height = (width * 9) / 16;
      setCanvasSize({ width, height });
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Dynamic dot radius as a fraction of the shorter canvas dimension
    const dotRadius = Math.min(canvasSize.width, canvasSize.height) * 0.02;

    // Convert normalized coordinates (0–1) to pixel values
    let robotX = position.x * canvasSize.width;
    let robotY = position.y * canvasSize.height;

    // Clamp position to ensure the dot stays fully within bounds
    robotX = Math.max(dotRadius, Math.min(canvasSize.width - dotRadius, robotX));
    robotY = Math.max(dotRadius, Math.min(canvasSize.height - dotRadius, robotY));

    // Draw robot
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    ctx.beginPath();
    ctx.arc(robotX, robotY, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
  }, [position, canvasSize]);

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