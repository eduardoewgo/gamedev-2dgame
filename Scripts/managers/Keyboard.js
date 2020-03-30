"use strict";
var managers;
(function (managers) {
    var Keyboard = /** @class */ (function () {
        function Keyboard() {
        }
        // PRIVATE STATIC METHODS
        Keyboard.onKeyDown = function (event) {
            switch (event.keyCode) {
                case config.Settings.KeyPlayerOneUp:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.MOVE_UP] = true;
                    break;
                case config.Settings.KeyPlayerOneDown:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.MOVE_DOWN] = true;
                    break;
                case config.Settings.KeyPlayerOneCCW:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.ROTATE_CC] = true;
                    break;
                case config.Settings.KeyPlayerOneCW:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.ROTATE_CW] = true;
                    break;
                case config.Settings.KeyPlayerOneShoot:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.SHOOT] = true;
                    break;
                case config.Settings.KeyPlayerTwoUp:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.MOVE_UP] = true;
                    break;
                case config.Settings.KeyPlayerTwoDown:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.MOVE_DOWN] = true;
                    break;
                case config.Settings.KeyPlayerTwoCCW:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.ROTATE_CC] = true;
                    break;
                case config.Settings.KeyPlayerTwoCW:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.ROTATE_CW] = true;
                    break;
                case config.Settings.KeyPlayerTwoShoot:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.SHOOT] = true;
                    break;
            }
        };
        Keyboard.onKeyUp = function (event) {
            switch (event.keyCode) {
                case config.Settings.KeyPlayerOneUp:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.MOVE_UP] = false;
                    break;
                case config.Settings.KeyPlayerOneDown:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.MOVE_DOWN] = false;
                    break;
                case config.Settings.KeyPlayerOneCCW:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.ROTATE_CC] = false;
                    break;
                case config.Settings.KeyPlayerOneCW:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.ROTATE_CW] = false;
                    break;
                case config.Settings.KeyPlayerOneShoot:
                    this._keyStatus[enums.PlayerId.PLAYER_ONE][enums.PlayerKeys.SHOOT] = false;
                    break;
                case config.Settings.KeyPlayerTwoUp:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.MOVE_UP] = false;
                    break;
                case config.Settings.KeyPlayerTwoDown:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.MOVE_DOWN] = false;
                    break;
                case config.Settings.KeyPlayerTwoCCW:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.ROTATE_CC] = false;
                    break;
                case config.Settings.KeyPlayerTwoCW:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.ROTATE_CW] = false;
                    break;
                case config.Settings.KeyPlayerTwoShoot:
                    this._keyStatus[enums.PlayerId.PLAYER_TWO][enums.PlayerKeys.SHOOT] = false;
                    break;
            }
        };
        // PUBLIC STATIC METHODS
        Keyboard.Start = function () {
            this._enabled = true;
            // Add the events listeners
            document.addEventListener("keydown", this.onKeyDown.bind(this), false);
            document.addEventListener("keyup", this.onKeyUp.bind(this), false);
        };
        Keyboard.Stop = function () {
            this._enabled = false;
            // Remove the events listeners
            document.removeEventListener("keydown", this.onKeyDown.bind(this), false);
            document.removeEventListener("keyup", this.onKeyUp.bind(this), false);
        };
        Keyboard.ResetKeys = function () {
            for (var iPlr = 0; iPlr < enums.PlayerId.NUM_OF_PLAYERS; iPlr++) {
                for (var iKey = 0; iKey < enums.PlayerKeys.NUM_OF_KEYS; iKey++) {
                    this._keyStatus[iPlr][iKey] = false;
                }
            }
        };
        Keyboard.IsActive = function (plr, key) {
            return this._keyStatus[plr][key];
        };
        Keyboard.GetPlayerKeys = function (plr) {
            return [].concat(this._keyStatus[plr]);
        };
        Keyboard.IsEnabled = function () {
            return this._enabled;
        };
        Keyboard._keyStatus = [[], []];
        return Keyboard;
    }());
    managers.Keyboard = Keyboard;
})(managers || (managers = {}));
//# sourceMappingURL=Keyboard.js.map