"use strict";
var objects;
(function (objects) {
    var Grid = /** @class */ (function () {
        // Constructor
        function Grid(spriteSheet, cols, rows, tile_size) {
            if (cols === void 0) { cols = 0; }
            if (rows === void 0) { rows = 0; }
            if (tile_size === void 0) { tile_size = 32; }
            this._data = new Array();
            this.rows = rows;
            this.cols = cols;
            this._isDataLoaded = false;
            this._spriteSheet = spriteSheet;
            this._tile_size = tile_size;
            this._tiles = new Array();
        }
        Object.defineProperty(Grid.prototype, "data", {
            // Public properties
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "cols", {
            get: function () {
                return this._cols;
            },
            set: function (v) {
                this._cols = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "rows", {
            get: function () {
                return this._rows;
            },
            set: function (v) {
                this._rows = v;
            },
            enumerable: true,
            configurable: true
        });
        Grid.prototype.stringToGrid = function (csv) {
            var _this = this;
            var lines = csv.toString().split("\n");
            //console.info("lines: " + lines.length);
            lines.forEach(function (line) {
                var array = line.split("\t");
                //console.info("items this line: " + array.length);
                array.forEach(function (item) {
                    _this._data.push(item);
                });
            });
            if (this._data.length > 0) {
                this._isDataLoaded = true;
            }
        };
        Grid.prototype.buildTiles = function () {
            for (var index = 0; index < this._data.length; index++) {
                if (this._data[index] != "-1" && this._data[index] != "-1\r") {
                    var data = this._data[index];
                    if (data.slice(-1) == "\r") {
                        data = data.slice(0, -1);
                    }
                    var sprite = new createjs.Sprite(this._spriteSheet, data);
                    this._tiles[index] = sprite;
                }
                else {
                    this._tiles[index] = undefined;
                }
            }
        };
        Grid.prototype.drawTiles = function (scene) {
            for (var row = 0; row < this.rows; row++) {
                for (var col = 0; col < this.cols; col++) {
                    if (this._tiles[col + row * this.cols] != undefined) {
                        var tile = this._tiles[col + row * this.cols];
                        tile.x = this._tile_size * col;
                        tile.y = this._tile_size * row;
                        scene.addChild(tile);
                    }
                }
            }
        };
        Grid.prototype.toString = function () {
            var outputString = "";
            if (this._isDataLoaded) {
                for (var row = 0; row < this.rows; row++) {
                    for (var col = 0; col < this.cols; col++) {
                        if (this._data[col + row * this.cols] != undefined) {
                            outputString += this._data[col + row * this.cols];
                        }
                    }
                    outputString += "\n";
                }
            }
            else {
                console.error("No Data to display");
            }
            return outputString;
        };
        return Grid;
    }());
    objects.Grid = Grid;
})(objects || (objects = {}));
//# sourceMappingURL=Grid.js.map