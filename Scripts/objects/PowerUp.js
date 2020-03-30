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
    var PowerUp = /** @class */ (function (_super) {
        __extends(PowerUp, _super);
        // CONSTRUCTOR
        function PowerUp() {
            var _this = 
            // super(
            //     config.Game.ASSETS.getResult(constants.PowerUps[0]),
            //     config.Game.SCREEN_WIDTH,
            //     config.Game.SCREEN_HEIGHT
            // );
            _super.call(this, config.Game.ATLAS, constants.PowerUps[0], config.Game.SCREEN_WIDTH, config.Game.SCREEN_HEIGHT) || this;
            // It will display in a random position between 1/3 and 2/3 of the screen, and calculate positions
            var oneThirdScreen = config.Game.SCREEN_WIDTH / 3;
            var posX = util.Mathf.RandomRange(oneThirdScreen, oneThirdScreen * 2 - _this.width);
            var posY = util.Mathf.RandomRange(config.Game.GAME_BAR_HEIGHT, config.Game.SCREEN_HEIGHT - _this.height);
            // Get a random power type
            var power = constants.PowerUps[util.Mathf.RandomRangeInt(0, constants.PowerUps.length - 1)];
            _this._powerType = power;
            _this.gotoAndStop(power);
            _this.position = new objects.Vector2(posX, posY);
            _this.Start();
            return _this;
        }
        Object.defineProperty(PowerUp.prototype, "PowerType", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._powerType;
            },
            enumerable: true,
            configurable: true
        });
        // PUBLIC METHODS
        PowerUp.prototype.Start = function () {
            this.type = enums.GameObjectType.POWER_UP;
        };
        PowerUp.prototype.Update = function () {
            this._checkBounds();
        };
        PowerUp.prototype.Reset = function () { };
        PowerUp.prototype._checkBounds = function () { };
        return PowerUp;
    }(objects.GameObject));
    objects.PowerUp = PowerUp;
})(objects || (objects = {}));
//# sourceMappingURL=PowerUp.js.map