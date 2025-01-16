import { keys } from "./keyboardController.js";

function touchScreenController(){

    let hitButton=document.querySelector("#hitButton")
    let joystick = document.getElementById('joystick');

    hitButton.style.display = "flex"
    joystick.style.display = "flex"


    //HIT BUTTON
    hitButton.addEventListener('touchstart', (e) => {
        keys.Space.pressed = true
    })
    hitButton.addEventListener('touchend', (e) => {
        keys.Space.pressed = false
    })

    //JOYSTICK
    const joystickContainer = document.getElementById('joystickContainer');
    const joystickBase = joystickContainer.querySelector('.joystickBase');
    const joystickKnob = joystickContainer.querySelector('.joystickKnob');

    let touchStartX, touchStartY

    joystick.addEventListener('touchstart', (event) => {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;

      joystickContainer.style.display = 'block'; // Show the joystick
      // Position the joystickContainer at the touch location
      joystickContainer.style.left = (touchStartX - joystickContainer.offsetWidth / 2) + 'px';
      joystickContainer.style.top = (touchStartY - joystickContainer.offsetHeight/2) + 'px';
    });

    joystick.addEventListener('touchend', () => {
        //Center the knob inside the joystick Containter
        joystickKnob.style.left = '50%';
        joystickKnob.style.top = '50%';
        joystickKnob.style.transform = 'translate(-50%, -50%)'; 
        // Hide the joystick
        setTimeout(() => joystickContainer.style.display = 'none', 50)

        keys.ArrowLeft.pressed = false;
        keys.ArrowRight.pressed = false;
        keys.ArrowUp.pressed = false;
        keys.ArrowDown.pressed = false; 
      });

    joystick.addEventListener('touchmove', (event) => {
        event.preventDefault(); // Prevent default scrolling behavior

        const touchX = event.touches[0].clientX;
        const touchY = event.touches[0].clientY;
      
        // Calculate the offset from the container's center
        const containerCenterX = joystickContainer.offsetLeft + joystickContainer.offsetWidth / 2;
        const containerCenterY = joystickContainer.offsetTop + joystickContainer.offsetHeight / 2;
        let deltaX = touchX - containerCenterX;
        let deltaY = touchY - containerCenterY;
      
        // Limit knob movement within the base
        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (distance > joystickBase.offsetWidth / 2) {
          deltaX = (deltaX / distance) * (joystickBase.offsetWidth / 2);
          deltaY = (deltaY / distance) * (joystickBase.offsetWidth / 2);
        }
      
        // Apply the limited delta values to position the knob relative to the center
        joystickKnob.style.left = (deltaX + joystickContainer.offsetWidth/2 ) + 'px';
        joystickKnob.style.top = (deltaY + joystickContainer.offsetHeight/2)+ 'px';
      
        if (deltaX < 0) { 
            keys.ArrowLeft.pressed = true; 
            keys.ArrowRight.pressed = false;
          } else if (deltaX > 0) {
            keys.ArrowRight.pressed = true;
            keys.ArrowLeft.pressed = false;
          } else {
            keys.ArrowLeft.pressed = false;
            keys.ArrowRight.pressed = false;
          }
      
          if (deltaY < 0) {
            keys.ArrowUp.pressed = true; 
            keys.ArrowDown.pressed = false;
          } else if (deltaY > 0) {
            keys.ArrowDown.pressed = true;
            keys.ArrowUp.pressed = false;
          } else {
            keys.ArrowUp.pressed = false;
            keys.ArrowDown.pressed = false;
          }
    });


}
export default touchScreenController