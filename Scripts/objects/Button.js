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
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        // constructor
        function Button(buttonName, x, y, isCentered, scale, mirror) {
            if (buttonName === void 0) { buttonName = "button"; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            if (scale === void 0) { scale = 1; }
            if (mirror === void 0) { mirror = false; }
            var _this = _super.call(this, config.Game.ATLAS, buttonName, x, y, isCentered) || this;
            _this._selected = null;
            _this.on("mouseover", _this.MouseOver);
            _this.on("mouseout", _this.MouseOut);
            _this.scaleX = mirror ? scale * -1 : scale;
            _this.scaleY = scale;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Button.prototype._checkBounds = function () { };
        // PUBLIC METHODS
        Button.prototype.MouseOver = function () {
            if (this._selected == null)
                this.alpha = 0.7;
        };
        Button.prototype.MouseOut = function () {
            if (this._selected == null)
                this.alpha = 1.0;
        };
        Button.prototype.SetActive = function () {
            this._selected = true;
            this.alpha = 1;
        };
        Button.prototype.SetInactive = function () {
            this._selected = false;
            this.alpha = 0.5;
        };
        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        Button.prototype.Start = function () {
            this.type = enums.GameObjectType.BUTTON;
        };
        Button.prototype.Update = function () { };
        Button.prototype.Reset = function () { };
        return Button;
    }(objects.GameObject));
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=Button.js.map