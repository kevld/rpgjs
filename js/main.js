// ground map
var ground = [
[1, 3, 1, 3, 1, 3, 3, 3, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 3, 3],
[1, 3, 1, 3, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 3],
[1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 3],
[1, 3, 1, 3, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 3, 1, 3],
[1, 3, 1, 3, 1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3, 1, 3, 3, 3],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[0, 1, 1, 3, 3, 5, 6, 7, 8, 9, 10, 11, 11, 13, 13, 15, 1, 1, 1, 1],
[0, 1, 1, 3, 3, 5, 6, 7, 8, 9, 10, 11, 11, 13, 13, 15, 1, 1, 1, 1],
[0, 1, 1, 3, 3, 5, 6, 7, 8, 9, 10, 11, 11, 13, 13, 15, 1, 1, 1, 1],
[0, 1, 1, 3, 3, 5, 6, 7, 8, 9, 10, 11, 11, 13, 13, 15, 1, 1, 1, 1],
[0, 1, 1, 3, 3, 5, 6, 7, 8, 9, 10, 11, 11, 13, 13, 15, 1, 1, 1, 1],
[0, 1, 1, 3, 3, 5, 6, 7, 8, 9, 10, 11, 11, 13, 13, 15, 1, 1, 1, 1],
[0, 1, 1, 3, 3, 5, 6, 7, 8, 9, 10, 11, 11, 13, 13, 15, 1, 1, 1, 1],
[0, 1, 1, 3, 3, 5, 6, 7, 8, 9, 10, 11, 11, 13, 13, 15, 1, 1, 1, 1],
[0, 1, 1, 3, 3, 5, 6, 7, 8, 9, 10, 11, 11, 13, 13, 15, 1, 1, 1, 1]
];

// game control state

Game.controls = {
    left: false,
    up: false,
    right: false,
    down: false,
};

// trigger action on arrow press down
window.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
        case 37: // left arrow
            Game.controls.left = true;
            break;
        case 38: // up arrow
            Game.controls.up = true;
            break;
        case 39: // right arrow
            Game.controls.right = true;
            break;
        case 40: // down arrow
            Game.controls.down = true;
            break;
    }
}, false);

// release the key
window.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
        case 37: // left arrow
            Game.controls.left = false;
            break;
        case 38: // up arrow
            Game.controls.up = false;
            break;
        case 39: // right arrow
            Game.controls.right = false;
            break;
        case 40: // down arrow
            Game.controls.down = false;
            break;
        case 80: // key P pauses the game
            Game.togglePause();
            break;
    }
}, false);


// start game
window.onload = function () {
    Game.play();
}