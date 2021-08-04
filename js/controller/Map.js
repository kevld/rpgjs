// wrapper for "class" Map
(function () {

    function Map(width, height, tilePerRow) {
        // map dimensions
        this.width = width;
        this.height = height;

        // map texture
        this.image = null;
    }

    Map.prototype.jsonMap = function(nom) {
        // Création de l'objet XmlHttpRequest
        var xhr = getXMLHttpRequest();

        // Chargement du fichier
        xhr.open("GET", 'assets/maps/' + nom + '.json', false);
        xhr.send(null);
        if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
            throw new Error("Impossible de charger la carte nommée \"" + nom + "\" (code HTTP : " + xhr.status + ").");
        var mapJsonData = xhr.responseText;

        // Analyse des données
        var mapData = JSON.parse(mapJsonData);
        this.tileset = new Tileset(mapData.tileset);
        this.terrain = mapData.terrain;

    
    }

    Map.prototype.height = function() {
    	return this.terrain.length;
    }
    Map.prototype.width = function() {
    	return this.terrain[0].length;
    }

    // generate an example of a large map
    Map.prototype.generate = function () {

        var tilesetImage = new Image();
        tilesetImage.src = 'assets/tiles/grass_02.png';
        tilesetImage.onload = function () {
            drawImage();
        };
        var tileSize = 32;       // The size of a tile (32×32)
        var rowTileCount = 22;   // The number of tiles in a row of our background
        var colTileCount = 20;   // The number of tiles in a column of our background
        var imageNumTiles = 4;  // The number of tiles per row in the tileset image
        this._ctx = document.createElement("canvas").getContext("2d");
        this._ctx.canvas.width = this.width;
        this._ctx.canvas.height = this.height;
        this.image = new Image();
        var that = this;
      

        function drawImage() {
           
            for (var r = 0; r < rowTileCount; r++) {
                for (var c = 0; c < colTileCount; c++) {
                    var tile = ground[r][c];
                    var tileRow = (tile / imageNumTiles) | 0; // Bitwise OR operation
                    var tileCol = (tile % imageNumTiles) | 0;
                    that._ctx.drawImage(tilesetImage, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (c * tileSize), (r * tileSize), tileSize, tileSize);
                }
            }
            that.image.src = that._ctx.canvas.toDataURL("image/png");
        }
    }

    Map.prototype.draw = function (context, xView, yView) {
        var sx, sy, dx, dy;
        var sWidth, sHeight, dWidth, dHeight;

        sx = xView;
        sy = yView;

        sWidth = context.canvas.width;
        sHeight = context.canvas.height;

        if (this.image.width - sx < sWidth) {
            sWidth = this.image.width - sx;
        }
        if (this.image.height - sy < sHeight) {
            sHeight = this.image.height - sy;
        }

        dx = 0;
        dy = 0;
        dWidth = sWidth;
        dHeight = sHeight;

        context.drawImage(this.image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
    Game.Map = Map;
})();