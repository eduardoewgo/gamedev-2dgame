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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        function Play() {
            var _this = _super.call(this) || this;
            _this._powerUp = [];
            _this._bullets = [];
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Play.prototype._plrShoot = function (player, status, bulletTick) {
            // Verify if the shoot button is active
            if (managers.Keyboard.IsActive(player.PlayerId, enums.PlayerKeys.SHOOT)) {
                // Verify if the player can shoot
                var curTick = createjs.Ticker.getTicks();
                if (curTick - bulletTick >= status.GetValue(enums.StatusTypes.ATK_SPEED)) {
                    player.Attack();
                    var bullet = new objects.Bullet(player.position, player.PlayerId, player.PlayerId == enums.PlayerId.ENEMY ? "Attack/energy-ball" : "Attack/linear-fire");
                    this._bullets.push(bullet);
                    this.addChild(bullet);
                    return curTick;
                }
            }
            return bulletTick;
        };
        Play.prototype._checkBullet = function (e, index) {
            // If is out of screen, remove it and return, otherwise, update it
            if (e && e.isOutOfBounds()) {
                this.removeChild(e);
                delete this._bullets[index];
                return;
            }
            else if (e) {
                e.Update();
            }
            // Check for player two bullet collisions
            var bulletHit = false;
            if (e.Player == enums.PlayerId.ENEMY) {
                if (managers.Collision.AABBCheck(this._player, e)) {
                    this._player.Hit();
                    this._gameBar.PostDamage(enums.PlayerId.PLAYER, config.Game.PLAYER_STATUS.CalculateDamage(config.Game.ENEMY_STATUS.GetValue(enums.StatusTypes.ATK_POWER)));
                    bulletHit = true;
                }
            }
            else if (e.Player == enums.PlayerId.PLAYER) {
                if (managers.Collision.AABBCheck(this._enemy, e)) {
                    this._enemy.Hit();
                    this._gameBar.PostDamage(enums.PlayerId.ENEMY, config.Game.ENEMY_STATUS.CalculateDamage(config.Game.PLAYER_STATUS.GetValue(enums.StatusTypes.ATK_POWER)));
                    bulletHit = true;
                }
            }
            bulletHit = bulletHit || this._checkPowerUpCollision(e);
            // If the bullet hit something, remove it
            if (bulletHit) {
                this.removeChild(e);
                delete this._bullets[index];
            }
        };
        Play.prototype._checkPowerUpCollision = function (e) {
            var _this = this;
            var result = false;
            // Checks if the bullet activate the power up
            this._powerUp.forEach(function (pu, index) {
                if (managers.Collision.squaredRadiusCheck(pu, e)) {
                    _this._activatePowerUp(pu, e.Player);
                    _this.removeChild(pu);
                    delete _this._powerUp[index];
                    result = true;
                }
            });
            return result;
        };
        Play.prototype._activatePowerUp = function (pu, playerId) {
            var status = playerId == enums.PlayerId.PLAYER ? config.Game.PLAYER_STATUS : config.Game.ENEMY_STATUS;
            switch (pu.PowerType) {
                case enums.PowerUpTypes.ARMOR:
                case enums.PowerUpTypes.ATTACK_POWER:
                case enums.PowerUpTypes.ATTACK_SPEED:
                    status.ActivatePowerUp(pu, createjs.Ticker.getTicks());
                    break;
                case enums.PowerUpTypes.TRAP:
                    // Change the player before sending the status
                    status =
                        playerId == enums.PlayerId.PLAYER ? config.Game.ENEMY_STATUS : config.Game.PLAYER_STATUS;
                    status.ActivatePowerUp(pu, createjs.Ticker.getTicks());
                    break;
                case enums.PowerUpTypes.POTION_HP:
                    this._gameBar.ReceiveHealing(playerId);
                    break;
                case enums.PowerUpTypes.POTION_XP:
                    this._gameBar.ReceiveExperience(playerId);
                    break;
            }
        };
        // PUBLIC METHODS
        Play.prototype.Start = function () {
            var _this = this;
            // Background
            this._background = new objects.Background(config.Game.ASSETS.getResult("forestBackground"));
            // Create the players
            this._player = new objects.Player(enums.PlayerId.PLAYER, config.Game.PLAYER_CHARACTER);
            this._enemy = new objects.Player(enums.PlayerId.ENEMY, config.Game.ENEMY_CHARACTER);
            this._powerUp = new Array();
            // Create the GamaBar
            this._gameBar = new managers.GameBar();
            config.Game.GAME_BAR = this._gameBar;
            // Initialize the keyboard
            managers.Keyboard.Start();
            this._playerTick = 0;
            this._enemyTick = 0;
            this._itemSpawnTicks = config.Game.INITIAL_ITEM_SPAWN_TICKER;
            var rain = function (qty) {
                if (qty === void 0) { qty = 30; }
                return __awaiter(_this, void 0, void 0, function () {
                    var i;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                i = 0;
                                _a.label = 1;
                            case 1:
                                if (!(i < qty)) return [3 /*break*/, 4];
                                return [4 /*yield*/, this._sleep(750 - (qty * 10))];
                            case 2:
                                _a.sent();
                                enemyPower(this._enemy, config.Game.PLAYER_STATUS, this._enemyTick);
                                _a.label = 3;
                            case 3:
                                i++;
                                return [3 /*break*/, 1];
                            case 4: return [4 /*yield*/, this._sleep(5000)];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, rain(qty + 20)];
                            case 6:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            var enemyPower = function (player, status, bulletTick) {
                var curTick = createjs.Ticker.getTicks();
                if (curTick - bulletTick >= status.GetValue(enums.StatusTypes.ATK_SPEED)) {
                    player.Attack();
                    var bullet = new objects.Bullet(player.position, player.PlayerId, player.PlayerId == enums.PlayerId.ENEMY ? "Attack/energy-ball" : "Attack/linear-fire");
                    _this._bullets.push(bullet);
                    _this.addChild(bullet);
                }
            };
            setTimeout(rain, 5000);
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            // Do not allow player 1 to move if it is trapped
            if (config.Game.PLAYER_STATUS.GetPowerStatus(enums.StatusTypes.TRAP) == enums.PowerUpStatus.INACTIVE) {
                this._player.Update();
            }
            if (config.Game.ENEMY_STATUS.GetPowerStatus(enums.StatusTypes.TRAP) == enums.PowerUpStatus.INACTIVE) {
                this._enemy.Update();
            }
            this._gameBar.Update();
            this._playerTick = this._plrShoot(this._player, config.Game.PLAYER_STATUS, this._playerTick);
            this._enemyTick = this._plrShoot(this._enemy, config.Game.ENEMY_STATUS, this._enemyTick);
            config.Game.PLAYER_STATUS.Update();
            config.Game.ENEMY_STATUS.Update();
            this._bullets.forEach(function (e, index) {
                _this._checkBullet(e, index);
                if (e.Player == enums.PlayerId.PLAYER) {
                }
            });
        };
        Play.prototype.Main = function () {
            var _this = this;
            this.addChild(this._background);
            this.addChild(this._player);
            this.addChild(this._enemy);
            this._gameBar.ScreenObjects.forEach(function (obj) { return _this.addChild(obj); });
            for (var i = 0, width = 0; width <= config.Game.SCREEN_WIDTH; i++) {
                var floor = new createjs.Sprite(config.Game.ATLAS2, "Background/tile");
                width = i * 30;
                floor.x = i * 30;
                floor.y = config.Game.SCREEN_HEIGHT - 18;
                this.addChild(floor);
            }
        };
        Play.prototype._sleep = function (ms) {
            if (ms === void 0) { ms = Math.floor(Math.random() * 750); }
            return new Promise(function (resolve) { return setTimeout(resolve, ms <= 0 ? 100 : ms); });
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map