
// wrapper for "class" Player
(function () {
    function Sword(x, y) {
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
        var url = "sword.png";
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
        this.i = 0;
    }

    Sword.prototype.update = function (i) {
        this.i = i;
    }

    Sword.prototype.draw = function (context, xView, yView) {
        context.save();
        context.translate(150, 150);
        context.rotate(this.i * Math.PI / 180);
        //console.log(this.i + " " + this.i * Math.PI / 180);
        var w = 32;
        var h = 32;

        context.drawImage(this.image, 0, -32);

        context.restore();
    }
    Game.Sword = Sword;
})();