# Robot Control UI

## Controlling the robot
When the user moves the joystick, the UI component `JoystickControl.jsx` emits a `joystick-move` event with the joystick’s velocity values. On the server, `RobotController.js` receives this input, scales it by a fixed speed factor, and updates the robot’s velocity. The robot's movement is handled via velocity updates.

## Stop controlling the robot
When the joystick is released, a `joystick-stop` event is sent. The server then sets the robot’s velocity to zero, stopping movement. The UI continues receiving `robot-update` messages, but the robot remains in place since its velocity is now zero.

## Emergency stop
If the Emergency Stop button defined in `Buttons.jsx` is pressed, the UI emits an `emergency-stop` event. The server locks the robot and stops all movement. The next position update marks the robot as `locked`, and the UI disables movement controls while enabling the Start button.

## Start button
When the Start button is clicked, the UI sends a `start-robot` event. The server unlocks the robot, allowing it to move again. The UI also re-enables joystick input.

## Real-time display screen
A timer running at 60 FPS on the server continuously calls `updatePosition()`, which updates the robot’s position based on its current velocity and emits a `robot-update` event with normalized coordinates and lock state. The UI `App.jsx` listens for this event and passes the new data to `Screen.jsx`, which renders the robot in real-time on a canvas.

## Responsive screen
The canvas scales the robot’s position and size based on the current screen size using normalized coordinates (from 0 to 1). This ensures the robot’s visual location is consistent across all clients, even with different screen resolutions.

## Related files
`App.jsx` - Connection to the server, coordinates the UI components.
`Screen.jsx` - Renders the robot, scales size and position based on screen size.
`JoystickControl.jsx` - Emits movement and stop events based on user input.
`Buttons.jsx` -  Sends relevant control events to the server.
`Socket.js` - Manage the wobsocket connection.
`Server.js` - Handles client connections, receives input events, broadcasts robot state updates.
`RobotController.js` - Manages robot state and updates their positions.