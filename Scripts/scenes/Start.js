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
var scenes;
(function (scenes) {
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        // CONSTRUCTOR
        function Start() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        /**
         * Pallete
         * Orange #ffcc5c
         * Green #96ceb2
         * Red #ff6f69
         * White #ffffff
         */
        // PUBLIC METHODS
        Start.prototype.Start = function () {
            // Background
            this._background = new objects.Background(config.Game.ASSETS.getResult("blackBackground"));
            // Labels
            this._player1Label = new objects.Label("Player One", "60px", "Pixel", "#ffcc5c", 300, 200, true);
            this._gameTitle = new objects.Label("Pongshot", "120px", "Pixel", "#96ceb2", config.Game.SCREEN_WIDTH / 2, 100, true);
            // Buttons
            this._startButton = new objects.Button("btnPlay", 640, config.Game.SCREEN_HEIGHT - 100, true);
            // Player one
            this._p1MageButton = new objects.Button("mage", 300, 300, true, 1.5);
            this._p1RogueButton = new objects.Button("rogue", 300, 400, true, 1.5);
            this.Main();
        };
        Start.prototype.Update = function () {
        };
        Start.prototype.Main = function () {
            var _this = this;
            this.addChild(this._background);
            this.addChild(this._gameTitle);
            this.addChild(this._player1Label);
            this.addChild(this._startButton);
            this.addChild(this._p1MageButton);
            this.addChild(this._p1RogueButton);
            // Player one handlers.
            this._p1MageButton.on("click", function () {
                _this._p1RogueButton.SetInactive();
                _this._p1MageButton.SetActive();
                config.Game.PLAYER_CHARACTER = constants.PlayerType.MAGE;
                config.Game.PLAYER_STATUS = objects.PlayerStatus.GetPlayerStatus(enums.PlayerId.PLAYER, constants.PlayerType.MAGE);
                setEnemy();
                _this.validateGame();
            });
            this._p1RogueButton.on("click", function () {
                _this._p1RogueButton.SetActive();
                _this._p1MageButton.SetInactive();
                config.Game.PLAYER_CHARACTER = constants.PlayerType.ROGUE;
                config.Game.PLAYER_STATUS = objects.PlayerStatus.GetPlayerStatus(enums.PlayerId.PLAYER, constants.PlayerType.ROGUE);
                setEnemy();
                _this.validateGame();
            });
            var setEnemy = function () {
                config.Game.ENEMY_CHARACTER = constants.PlayerType.MAGE;
                config.Game.ENEMY_STATUS = objects.PlayerStatus.GetPlayerStatus(enums.PlayerId.ENEMY, constants.PlayerType.MAGE);
            };
            // Call this once here to "initialize" as inactive
            this.validateGame();
        };
        Start.prototype.validateGame = function () {
            if (config.Game.PLAYER_CHARACTER != null && config.Game.ENEMY_CHARACTER != null) {
                // Use active to set the alpha and handle the over.
                this._startButton.SetActive();
                // Attache handler if valid
                this._startButton.on("click", function () {
                    config.Game.SCENE = scenes.State.PLAY;
                });
            }
            else {
                // Use inactive to set the alpha and handle the over.
                this._startButton.SetInactive();
            }
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=Start.js.map