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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // CONSTRUCTOR
        function Player(playerId, playerCharacter) {
            var _this = _super.call(this, config.Game.ATLAS2, playerCharacter, 0, 0, true) || this;
            // PRIVATE INSTANCE MEMBERS
            _this._playerVel = 3;
            _this._playerId = playerId;
            _this._playerCharacter = playerCharacter;
            _this.Reset();
            _this.Start();
            return _this;
        }
        Object.defineProperty(Player.prototype, "PlayerId", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._playerId;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Player.prototype._checkBounds = function () {
            // Sides bound
            if (this.position.x <= config.Game.SCREEN_SAFE_AREA) {
                this.position = new objects.Vector2(config.Game.SCREEN_SAFE_AREA, this.position.y);
            }
            else if (this.position.x >= config.Game.SCREEN_WIDTH - config.Game.SCREEN_SAFE_AREA) {
                this.position = new objects.Vector2(config.Game.SCREEN_WIDTH - config.Game.SCREEN_SAFE_AREA, this.position.y);
            }
        };
        Player.prototype._move = function () {
            var velocity = new objects.Vector2(0, 0);
            var playerKeys = managers.Keyboard.GetPlayerKeys(this._playerId);
            // Verify the direction and set the y speed
            if (playerKeys[enums.PlayerKeys.MOVE_LEFT] && !playerKeys[enums.PlayerKeys.MOVE_RIGHT]) {
                velocity = new objects.Vector2(-this._playerVel, 0);
            }
            else if (playerKeys[enums.PlayerKeys.MOVE_RIGHT] && !playerKeys[enums.PlayerKeys.MOVE_LEFT]) {
                velocity = new objects.Vector2(this._playerVel, 0);
            }
            this.position = objects.Vector2.add(this.position, velocity);
        };
        Player.prototype.Attack = function () {
            // Attack position for 250ms then go back
            this.gotoAndStop("Player/Mage/Attack/attack");
            // setTimeout(() => this.gotoAndStop(`${this._playerCharacter}`), 250);
        };
        Player.prototype.Hit = function () {
            var _this = this;
            // Attack position for 250ms then go back.
            this.gotoAndStop(this._playerCharacter + "Hit");
            setTimeout(function () { return _this.gotoAndStop("" + _this._playerCharacter); }, 250);
        };
        // PUBLIC METHODS
        Player.prototype.Start = function () {
            this.type = enums.GameObjectType.PLAYER;
        };
        Player.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        Player.prototype.Reset = function () {
            if (this._playerId == enums.PlayerId.ENEMY) {
                // Mirror the second player by default
                this.scaleX = -1;
                this.position = new objects.Vector2(config.Game.SCREEN_WIDTH - config.Game.SCREEN_SAFE_AREA, config.Game.SCREEN_HEIGHT - config.Game.SCREEN_SAFE_AREA);
            }
            else {
                this.position = new objects.Vector2(config.Game.SCREEN_SAFE_AREA, config.Game.SCREEN_HEIGHT - config.Game.SCREEN_SAFE_AREA);
            }
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=Player.js.map