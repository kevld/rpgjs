function Tileset(url) {
    this.image = new Image();
    this.image.referenceDuTileset = this;
    this.image.onload = function () {
        if (!this.complete) {
            throw new Error("404 " + url);
        }
        this.referenceDuTileset.largeur = this.width / 32;
    }
    this.image.src = "assets/tiles/" + url;
}

Tileset.prototype.buildTile = function (nbr, ctx, x_canvas, y_canvas) {
    var x_tile = nbr % this.largeur;
    if (x_tile == 0) x_tile = this.largeur;
    var y_tile = Math.ceil(nbr / this.largeur);

    var xSource = (x_tile - 1) * 32;
    var ySource = (y_tile - 1) * 32;

    ctx.drawImage(this.image, xSource, ySource, 32, 32, x_canvas, y_canvas, 32, 32);
}