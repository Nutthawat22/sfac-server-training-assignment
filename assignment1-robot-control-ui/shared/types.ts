export interface JoystickInput {
  vx: number;
  vy: number;
  timestamp: number;
}

export interface RobotState {
  x: number;
  y: number;
  locked: boolean;
}

export interface Robot extends RobotState {
  velocity: {
    x: number;
    y: number;
  };
}