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
    var Bullet = /** @class */ (function (_super) {
        __extends(Bullet, _super);
        function Bullet(startPosition, player, attackSprite) {
            if (player === void 0) { player = enums.PlayerId.PLAYER; }
            var _this = _super.call(this, config.Game.ATLAS2, attackSprite) || this;
            _this._bulletVel = 5;
            if (player == enums.PlayerId.ENEMY) {
                // Make it rainnnn!
                _this.position = new objects.Vector2(Math.floor(Math.random() * config.Game.SCREEN_WIDTH), config.Game.GAME_BAR_HEIGHT, _this);
                _this.rotation = 90;
            }
            else {
                _this.position = new objects.Vector2(startPosition.x, startPosition.y - 50, _this);
            }
            _this._player = player;
            return _this;
        }
        Object.defineProperty(Bullet.prototype, "Player", {
            get: function () {
                return this._player;
            },
            enumerable: true,
            configurable: true
        });
        Bullet.prototype._checkBounds = function () {
        };
        Bullet.prototype.isOutOfBounds = function () {
            if (this._player == enums.PlayerId.ENEMY) {
                return this.x > config.Game.SCREEN_WIDTH;
            }
            else {
                return this.x < 0;
            }
        };
        Bullet.prototype.Start = function () {
        };
        Bullet.prototype.Update = function () {
            if (this._player == enums.PlayerId.ENEMY) {
                this.position.y += this._bulletVel;
            }
            else {
                this.position.x += this._bulletVel;
            }
        };
        Bullet.prototype.Reset = function () {
        };
        return Bullet;
    }(objects.GameObject));
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=Bullet.js.map