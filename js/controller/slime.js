// wrapper for "class" Player
(function () {
    function Slime(x, y) {
        // (x, y) = center of object
        // ATTENTION:
        // it represents the player position on the world(room), not the canvas position
        this.x = x;
        this.y = y;
        this._x = x;
        this._y = y;

        // move speed in pixels per second
        this.speed = 50;

        // render properties
        this.width = 32;
        this.height = 32;
        var url = "slime_02.png";
        //Chargement de l'image dans l'attribut image
        this.image = new Image();
        this.image.referenceDuPerso = this;
        this.image.onload = function () {
            if (!this.complete)
                throw "404 " + url;

            // Taille du Character
            this.referenceDuPerso.width = 128 / 4;
            this.referenceDuPerso.height = 128 / 4;
        }
        this.image.src = "assets/characters/" + url;
        this.direction = 0;
        this.frame = 0;
    }

    Slime.prototype.update = function (step, worldWidth, worldHeight) {
        this.frame += 1;
        if (this.frame > 3) {
            this.frame = 0;
        }

        var i = Math.ceil(this.y / 32);
        var j = Math.ceil(this.x / 32) - 1;
        if (ground[i][j] == 0) {
            this.x = this._x;
            this.y = this._y;
        }
        
        ground[i][j] = 0;
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

    Slime.prototype.draw = function (context, xView, yView) {

        // draw a simple rectangle shape as our player model
        context.save();

        var w = 128 / 4;
        var h = 128 / 4;

        context.drawImage(this.image,
        w * this.frame, h * this.direction,
        128 / 4, 128 / 4,
        (this.x - this.width / 2) - xView, (this.y - this.height / 2) - yView,
        128 / 4, 128 / 4);


        context.restore();
    }

    // add "class" Player to our Game object
    Game.Slime = Slime;

})();