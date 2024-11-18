// TO DO 1: Provides a 3x3 transformation matrix represented as an array containing 9 values arranged in column-major sequence.
// The transformation includes scaling, followed by rotation, and ultimately translation.
// The specified rotation measurement is in degrees.
function GetTransform(positionX, positionY, rotation, scale) {
    let rad = (rotation * Math.PI) / 180; 
    let cos = Math.cos(rad); 
    let sin = Math.sin(rad); 

    return [
        scale * cos, scale * sin, 0,  // First column scaling and rotation on x
        -scale * sin, scale * cos, 0,   // Second column scaling and rotation on y
        positionX, positionY, 1           // Third column translation 
    ];
}

// TO DO 2: Provides a 3x3 transformation matrix represented as an array containing 9 values arranged in column-major sequence.
// The inputs consist of transformation matrices following the identical format.
// The resulting transformation initially applies trans1 and subsequently applies trans2.
function ApplyTransform(trans1, trans2) {
    let result = new Array(9);

    // Calculate the first column of transformation matrix
    result[0] = trans1[0] * trans2[0] + trans1[1] * trans2[3] + trans1[2] * trans2[6]; // Result for the first row, first column
    result[1] = trans1[0] * trans2[1] + trans1[1] * trans2[4] + trans1[2] * trans2[7]; // Result for the first row, second column
    result[2] = trans1[0] * trans2[2] + trans1[1] * trans2[5] + trans1[2] * trans2[8]; // Result for the first row, third column

    // Calculate the second column of transformation matrix
    result[3] = trans1[3] * trans2[0] + trans1[4] * trans2[3] + trans1[5] * trans2[6]; // Result for the second row, first column
    result[4] = trans1[3] * trans2[1] + trans1[4] * trans2[4] + trans1[5] * trans2[7]; // Result for the second row, second column
    result[5] = trans1[3] * trans2[2] + trans1[4] * trans2[5] + trans1[5] * trans2[8]; // Result for the second row, third column

    // Calculate the third column of  transformation matrix
    result[6] = trans1[6] * trans2[0] + trans1[7] * trans2[3] + trans1[8] * trans2[6]; // Result for the third row, first column
    result[7] = trans1[6] * trans2[1] + trans1[7] * trans2[4] + trans1[8] * trans2[7]; // Result for the third row, second column
    result[8] = trans1[6] * trans2[2] + trans1[7] * trans2[5] + trans1[8] * trans2[8]; // Result for the third row, third column

    return result; 
}
const DEFAULT_DRONE_STATE = {
    isHoverMode: false,
    positionX: 0,
    positionY: 0,
    rotation: 0,
    scale: 1.5,
    altitude: 0
};  
// Function to reset the drone’s position, rotation, scale, and altitude
function resetTransform() {
    Object.assign(drone, DEFAULT_DRONE_STATE); // Reset drone's state to default values
}

// Function to temporarily increase the drone's speed for 5 seconds and then reset it to the normal speed
function boostSpeed() {
    let currentSpeed = drone.altitude; // Store the current altitude (speed)
    let boost = 20; // Define the boost amount
    drone.altitude += boost; // Increase altitude by the boost amount
    setTimeout(() => {
        drone.altitude = currentSpeed; // Reset altitude to original after 5 seconds
    }, 5000);
}

// Function to increase altitude to 50 units and stop the drone from moving horizontally
function hoverMode() {
    // Toggle hover mode on or off
    drone.isHoverMode = !drone.isHoverMode; //In the html file drone a new value isHoverMode is added. 
                                            //This is a flag to track the mode of the drone.
    if (drone.isHoverMode) {
        drone.altitude = 50; // Set altitude to 50 units when entering hover mode
    }
}

// Function to make the drone follow the mouse unless it is in hover mode
function mouseMovement(event) {
    if (!drone.isHoverMode) { 
        drone.positionX = event.clientX; 
        drone.positionY = event.clientY; 
        UpdateTrans();
    }
}
