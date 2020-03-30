"use strict";
var config;
(function (config) {
    var Settings = /** @class */ (function () {
        function Settings() {
        }
        Settings.KeyPlayerOneUp = 87; // W
        Settings.KeyPlayerOneDown = 83; // S
        Settings.KeyPlayerOneCCW = 65; // A
        Settings.KeyPlayerOneCW = 68; // D
        Settings.KeyPlayerOneShoot = 69; // E
        Settings.KeyPlayerTwoUp = 38; // KEY UP
        Settings.KeyPlayerTwoDown = 40; // KEY DOWN
        Settings.KeyPlayerTwoCCW = 39; // KEY LEFT
        Settings.KeyPlayerTwoCW = 37; // KEY RIGHT
        Settings.KeyPlayerTwoShoot = 96; // NUMPAD 0
        return Settings;
    }());
    config.Settings = Settings;
})(config || (config = {}));
//# sourceMappingURL=Settings.js.map