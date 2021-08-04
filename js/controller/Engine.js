// wrapper for "class" Rectangle
(function () {
    function Rectangle(left, top, width, height) {
        this.left = left || 0;
        this.top = top || 0;
        this.width = width || 0;
        this.height = height || 0;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    }

    Rectangle.prototype.set = function (left, top, /*optional*/width, /*optional*/height) {
        this.left = left;
        this.top = top;
        this.width = width || this.width;
        this.height = height || this.height
        this.right = (this.left + this.width);
        this.bottom = (this.top + this.height);
    }

    Rectangle.prototype.within = function (r) {
        return (r.left <= this.left &&
                r.right >= this.right &&
                r.top <= this.top &&
                r.bottom >= this.bottom);
    }

    Rectangle.prototype.overlaps = function (r) {
        return (this.left < r.right &&
                r.left < this.right &&
                this.top < r.bottom &&
                r.top < this.bottom);
    }

    // add "class" Rectangle to our Game object
    Game.Rectangle = Rectangle;
})();
// Game Script
(function () {
    // prepaire our game canvas
    var canvas = document.getElementById("window");
    var context = canvas.getContext("2d");

    // game settings:	
    var FPS = 30;
    var INTERVAL = 1000 / FPS; // milliseconds
    var STEP = INTERVAL / 1000 // seconds

    // setup an object that represents the room
    var room = {
        width: 5000,
        height: 3000,
        map: new Game.Map(5000, 3000, 4)
    };

    // generate a large image texture for the room
    room.map.generate();

    // setup player
    var slime = new Game.Slime(50, 50);
    var player = new Game.Player(100, 100);
    var sword = new Game.Sword(100, 100);

    // setup the magic camera !!!
    var camera = new Game.Camera(0, 0, canvas.width, canvas.height, room.width, room.height);
    camera.follow(player, canvas.width / 2, canvas.height / 2);

    // Game update function
    var update = function () {
        player.update(STEP, room.width, room.height);
        
        camera.update();
        
    }

    // Game draw function
    var draw = function () {
        // clear the entire canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // redraw all objects
        room.map.draw(context, camera.xView, camera.yView);
        player.draw(context, camera.xView, camera.yView);
        slime.draw(context, camera.xView, camera.yView);
        sword.draw(context, camera.xView, camera.yView);
       
    }

    // Game Loop
    var gameLoop = function () {
        update();
        draw();
    }

    // <-- configure play/pause capabilities:

    // I'll use setInterval instead of requestAnimationFrame for compatibility reason,
    // but it's easy to change that.

    var runningId = -1;

    Game.play = function () {
        if (runningId == -1) {
            runningId = setInterval(function () {
                gameLoop();
                
            }, INTERVAL);
            var i = 0;
            setInterval(function () {
                //console.log('update');
                slime.update(STEP, room.width, room.height);
                i += 10;
                sword.update(i);
                if (i == 180) {
                    i = 0;
                }
            }, 350);
            setInterval(function () {
                i += 1;
                sword.update(i);
                if (i == 180) {
                    i = 0;
                }
            }, 20);
            console.log("play");
        }
    }

    Game.togglePause = function () {
        if (runningId == -1) {
            Game.play();
        }
        else {
            clearInterval(runningId);
            runningId = -1;
            console.log("paused");
        }
    }

    // -->

})();