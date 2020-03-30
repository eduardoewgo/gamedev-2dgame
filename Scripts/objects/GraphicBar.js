"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var GameBarType;
    (function (GameBarType) {
        GameBarType[GameBarType["HEALTH"] = 0] = "HEALTH";
        GameBarType[GameBarType["EXPERIENCE"] = 1] = "EXPERIENCE";
    })(GameBarType = objects.GameBarType || (objects.GameBarType = {}));
    var GraphicBar = /** @class */ (function (_super) {
        __extends(GraphicBar, _super);
        // CONSTRUCTOR
        function GraphicBar(posX, posY, width, height, type, rightSide) {
            if (type === void 0) { type = GameBarType.HEALTH; }
            if (rightSide === void 0) { rightSide = false; }
            var _this = _super.call(this) || this;
            _this._posX = posX;
            _this._posY = posY;
            _this._width = width;
            _this._height = height;
            _this._type = type;
            _this._rightSide = rightSide;
            // Sets the background and foreground color based on the type, and the initial value
            if (type == GameBarType.HEALTH) {
                _this._bgColor = "#000000";
                _this._fgColor = "#007506";
                _this.Value = 100;
            }
            else {
                _this._bgColor = "#BDDDFF";
                _this._fgColor = "#021775";
                _this.Value = 0;
            }
            return _this;
        }
        Object.defineProperty(GraphicBar.prototype, "Value", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._value;
            },
            set: function (value) {
                // Do not accept values less then 0 or greater then 100
                value = value < 0 ? 0 : value > 100 ? 100 : value;
                this._value = value;
                this.verifyColor();
                // Calculate the X position and the current width of the bar
                var width = this._width * (this._value / 100);
                var posX = this._rightSide ? this._posX + (this._width - width) : this._posX;
                posX += 1;
                // Draw the background bar first, and the foreground above it
                this.graphics.beginFill(this._bgColor).drawRect(this._posX, this._posY, this._width + 2, this._height + 2);
                this.graphics.beginFill(this._fgColor).drawRect(posX, this._posY + 1, width, this._height);
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE FUNCTIONS
        GraphicBar.prototype.verifyColor = function () {
            if (this._type == GameBarType.HEALTH) {
                if (this.Value > 50) {
                    this._fgColor = "#007506";
                }
                else if (this.Value > 25) {
                    this._fgColor = "#fffc3b";
                }
                else {
                    this._fgColor = "#bd1919";
                }
            }
        };
        return GraphicBar;
    }(createjs.Shape));
    objects.GraphicBar = GraphicBar;
})(objects || (objects = {}));
//# sourceMappingURL=GraphicBar.js.map