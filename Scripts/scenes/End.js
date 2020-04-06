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
    var End = /** @class */ (function (_super) {
        __extends(End, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function End() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        // Initializing and Instantiating
        End.prototype.Start = function () {
            // Background
            this._background = new objects.Background(config.Game.ASSETS.getResult("blackBackground"));
            //instantiate a new Text object
            this._endLabel = new objects.Label("Game Over", "80px", "Consolas", "#FFFF00", 620, 180, true);
            this._winnerLabel = new objects.Label("Great job, you stayed alive for " + config.Game.TIME_ALIVE, "40px", "Consolas", "#FFFF00", 620, 280, true);
            // buttons
            this._player = new objects.Button(config.Game.PLAYER_CHARACTER, 620, 430, true);
            this._restart = new objects.Button("GUI/PS4-X", 640, config.Game.SCREEN_HEIGHT - 100, true, 3);
            this.Main();
        };
        End.prototype.Update = function () {
        };
        End.prototype.Main = function () {
            this.addChild(this._background);
            this.addChild(this._endLabel);
            this.addChild(this._winnerLabel);
            this.addChild(this._player);
            this.addChild(this._restart);
            this._restart.on("click", function () {
                config.Game.SCENE = scenes.State.START;
            });
        };
        return End;
    }(objects.Scene));
    scenes.End = End;
})(scenes || (scenes = {}));
//# sourceMappingURL=End.js.map