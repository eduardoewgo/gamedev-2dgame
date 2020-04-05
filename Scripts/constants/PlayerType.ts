module constants {
    // Why not enums?
    // Enums were giving more work than making it simpler, this is the same but now I'm using the string value instead of positions.
    export const PlayerType = {
        DEMON_IDLE: "Enemy/Demon/Idle/demon-idle",
        MAGE_IDLE: "Player/Mage/Idle/idle",
        ROGUE_IDLE: "Player/Rogue/Idle/idle",
        WARRIOR: "warrior",
        ARCHER: "archer"
    };

    // Why not a private field inside PowerUp class?
    // The super inherited for GameObject should not access 'this', therefore I would't have direct access to this array
    // on PowerUp construction - feel free to try out something else if you want.
    export const PowerUps = util.Util.enumStringToArray(enums.PowerUpTypes);

    // Max Level
    export const MAX_LEVEL: number = 5;

    // Default powerup tick
    export const DEFAULT_POWER_UP_TICK = -1;
}
