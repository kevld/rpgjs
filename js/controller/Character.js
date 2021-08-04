
// wrapper for "class" Player
(function () {
    function Player(x, y) {
        // (x, y) = center of object
        // ATTENTION:
        // it represents the player position on the world(room), not the canvas position
        this.x = x;
        this.y = y;
        this._x = x;
        this._y = y;

        // move speed in pixels per second
        this.speed = 200;

        // render properties
        this.width = 32;
        this.height = 32;
        var url = "char_01.png";
        //Chargement de l'image dans l'attribut image
        this.image = new Image();
        this.image.referenceDuPerso = this;
        this.image.onload = function () {
            if (!this.complete)
                throw "404 " + url;

            // Taille du Character
            this.referenceDuPerso.width = 128 / 4;
            this.referenceDuPerso.height = 192 / 4;
        }
        this.image.src = "assets/characters/" + url;
        this.direction = 0;
        this.frame = 0;
    }

    Player.prototype.update = function (step, worldWidth, worldHeight) {
        var animation = 0;
        // parameter step is the time between frames ( in seconds )

        // check controls and move the player accordingly
        if (Game.controls.left) {//2eme ligne
            animation = 1;
            this.x -= this.speed * step;
            this.direction = 1;
        }
        if (Game.controls.right) { //3eme ligne
            animation = 1;
            this.x += this.speed * step;
            this.direction = 2;
        }
        if (Game.controls.up) { //4eme ligne
            animation = 1;
            this.y -= this.speed * step;
            this.direction = 3;
        }
        if (Game.controls.down) {//1ere ligne
            animation = 1;
            this.y += this.speed * step;
            this.direction = 0;
        }
        if (animation == 1) {
            this.frame += 1;
            if (this.frame > 3) {
                this.frame = 0;
            }
        }

        animation = 0;
        var i = Math.ceil(this.y / 32);
        var j = Math.ceil(this.x / 32) - 1;
        if (ground[i][j] == 0) {
            this.x = this._x;
            this.y = this._y;
        }
        this._x = this.x;
        this._y = this.y;
        // don't let player leaves the world's boundary
        if (this.x - this.width / 2 < 0) {
            this.x = this.width / 2;
        }
        if (this.y - this.height / 2 < 0) {
            this.y = this.height / 2;
        }
        if (this.x + this.width / 2 > worldWidth) {
            this.x = worldWidth - this.width / 2;
        }
        if (this.y + this.height / 2 > worldHeight) {
            this.y = worldHeight - this.height / 2;
        }

    }

    Player.prototype.draw = function (context, xView, yView) {

        // draw a simple rectangle shape as our player model
        context.save();
        //context.fillStyle = "black";
        // before draw we need to convert player world's position to canvas position			
        //context.fillRect((this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, this.width, this.height);





        // context = document.createElement("canvas").getContext("2d");
        //context.fillRect((this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView, this.width, this.height);
        var w = 128 / 4;
        var h = 192 / 4;

        context.drawImage(this.image,
        w * this.frame, h * this.direction,
        128 / 4, 192 / 4,
        (this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView,
        128 / 4, 192 / 4);


        context.restore();
    }

    // add "class" Player to our Game object
    Game.Player = Player;

})();