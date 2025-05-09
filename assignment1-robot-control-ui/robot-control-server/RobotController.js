/** @type {import('../shared/types').Robot} */
let robot = {
  x: 0.5,
  y: 0.5,
  locked: false,
  velocity: { x: 0, y: 0 }
};

const screen = { width: 600, height: 400 };
const speed = 0.05;

/**
 * Get the current state of the robot
 * @returns {RobotState}
 */
function getRobotState() {
    return {
        x: robot.x,
        y: robot.y,
        locked: robot.locked
    };
}

/**
 * Move the robot based on joystick input
 * @param {JoystickInput} input
 */
function moveRobot(input) {
    if (robot.locked) return;

    const { vx, vy } = input;
    robot.velocity.x = vx * speed;
    robot.velocity.y = vy * speed;
}

/**
 * Stop the robot
 */
function stopRobot() {
    if (robot.locked) return;

    robot.velocity.x = 0;
    robot.velocity.y = 0;
}

/**
 * Lock the robot, stopping movement
 */
function lockRobot() {
    robot.locked = true;
    robot.velocity.x = 0;
    robot.velocity.y = 0;
}

/**
 * Unlock the robot to allow movement
 */
function unlockRobot() {
    robot.locked = false;
}

function updatePosition() {
    robot.x += robot.velocity.x;
    robot.y += robot.velocity.y;

    // Clamp position inside the screen
    robot.x = Math.max(0, Math.min(1, robot.x));
    robot.y = Math.max(0, Math.min(1, robot.y));
}

module.exports = {
    getRobotState,
    moveRobot,
    stopRobot,
    lockRobot,
    unlockRobot,
    updatePosition
};
