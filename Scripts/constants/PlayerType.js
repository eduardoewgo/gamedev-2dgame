"use strict";
var constants;
(function (constants) {
    // Why not enums?
    // Enums were giving more work than making it simpler, this is the same but now I'm using the string value instead of positions.
    constants.PlayerType = {
        MAGE_IDLE: "Player/Mage/Idle/idle",
        ROGUE_IDLE: "Player/Rogue/Idle/idle",
        WARRIOR: "warrior",
        ARCHER: "archer"
    };
    // Why not a private field inside PowerUp class?
    // The super inherited for GameObject should not access 'this', therefore I would't have direct access to this array
    // on PowerUp construction - feel free to try out something else if you want.
    constants.PowerUps = util.Util.enumStringToArray(enums.PowerUpTypes);
    // Max Level
    constants.MAX_LEVEL = 5;
    // Default powerup tick
    constants.DEFAULT_POWER_UP_TICK = -1;
})(constants || (constants = {}));
//# sourceMappingURL=PlayerType.js.map