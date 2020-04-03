module managers {
    // Constants
    const BARS_WIDTH: number = 450;
    const BARS_POS_X_P1: number = 10;
    const BARS_POS_X_P2: number = config.Game.SCREEN_WIDTH - BARS_WIDTH - 12;

    const HB_HEIGHT: number = 18;
    const HB_POS_Y: number = 10;

    const XPB_HEIGHT: number = 8;
    const XPB_POS_Y: number = 35;

    const STATUS_POS_Y: number = 50;

    const XP_POTION_VALUE: number = 10;
    const XP_PER_LEVEL: Array<number> = [20, 30, 40, 80];

    const HP_POTION_VALUE: number = 25;
    const HP_MAX_VALUE: number = 100;

    export class GameBar {
        // PRIVATE INSTANCE MEMBERS
        private _plrOneLife: number;
        private _plrTwoLife: number;
        private _plrOneXp: number;
        private _plrTwoXp: number;
        private _gameStart: number;

        private _plrOneLifeBar: objects.GraphicBar;
        private _plrOneHeartIcon: objects.Image;
        private _plrOneXpBar: objects.GraphicBar;
        private _plrOneLevelLabel: objects.Label;
        private _plrOneStatus: Array<objects.Image>;

        private _plrTwoLifeBar: objects.GraphicBar;
        private _plrTwoHeartIcon: objects.Image;
        private _plrTwoXpBar: objects.GraphicBar;
        private _plrTwoLevelLabel: objects.Label;
        private _plrTwoStatus: Array<objects.Image>;

        // This should match the same order as StatusType, so it is easier to get the index
        private _statusOrder = [
            enums.PowerUpTypes.ARMOR,
            enums.PowerUpTypes.ATTACK_POWER,
            enums.PowerUpTypes.ATTACK_SPEED,
            enums.PowerUpTypes.TRAP
        ];

        private _timerLabel: objects.Label;

        // PUBLIC PROPERTIES
        get ScreenObjects(): Array<createjs.DisplayObject> {
            let result: Array<createjs.DisplayObject> = [
                this._timerLabel,
                this._plrOneLifeBar,
                this._plrOneXpBar,
                this._plrOneLevelLabel,
                this._plrOneHeartIcon,
                this._plrTwoLifeBar,
                this._plrTwoXpBar,
                this._plrTwoHeartIcon,
                this._plrTwoLevelLabel
            ];
            this._plrOneStatus.forEach(i => result.push(i));
            this._plrTwoStatus.forEach(i => result.push(i));
            return result;
        }

        // CONSTRUCTOR
        constructor() {
            this._plrOneLife = 100;
            this._plrTwoLife = 100;
            this._plrOneXp = 0;
            this._plrTwoXp = 0;
            this._gameStart = new Date().getTime();

            this._plrOneLifeBar = new objects.GraphicBar(
                BARS_POS_X_P1,
                HB_POS_Y,
                BARS_WIDTH,
                HB_HEIGHT,
                objects.GameBarType.HEALTH
            );
            this._plrOneHeartIcon = new objects.Image("heart", BARS_POS_X_P1 + BARS_WIDTH + 10, HB_POS_Y);
            this._plrOneXpBar = new objects.GraphicBar(
                BARS_POS_X_P1,
                XPB_POS_Y,
                BARS_WIDTH,
                XPB_HEIGHT,
                objects.GameBarType.EXPERIENCE
            );
            this._plrOneStatus = this._createStatusBarImages(BARS_POS_X_P1, STATUS_POS_Y, 25);
            this._plrOneLevelLabel = new objects.Label(
                "LVL 1",
                "bold 16px",
                "Consolas",
                "#021775",
                BARS_POS_X_P1 + BARS_WIDTH + 10,
                XPB_POS_Y
            );

            this._plrTwoLifeBar = new objects.GraphicBar(
                BARS_POS_X_P2,
                HB_POS_Y,
                BARS_WIDTH,
                HB_HEIGHT,
                objects.GameBarType.HEALTH,
                true
            );
            this._plrTwoHeartIcon = new objects.Image("heart", BARS_POS_X_P2 - 30, HB_POS_Y);
            this._plrTwoXpBar = new objects.GraphicBar(
                BARS_POS_X_P2,
                XPB_POS_Y,
                BARS_WIDTH,
                XPB_HEIGHT,
                objects.GameBarType.EXPERIENCE,
                true
            );
            this._plrTwoLevelLabel = new objects.Label(
                "LVL 1",
                "bold 16px",
                "Consolas",
                "#021775",
                BARS_POS_X_P2 - 55,
                XPB_POS_Y
            );
            this._plrTwoStatus = this._createStatusBarImages(BARS_POS_X_P2 + BARS_WIDTH - 14, STATUS_POS_Y, -25);

            this._timerLabel = new objects.Label("000:00", "48px", "Consolas", "#000000", 640, 40, true);
        }

        // PRIVATE METHODS
        private _createStatusBarImages(posX: number, posY: number, incPosX: number): Array<objects.Image> {
            let result = new Array<objects.Image>();
            let currentPosX: number = posX;

            this._statusOrder.forEach(item => {
                let image = new objects.Image(`${item}Dis`, currentPosX, posY, false);

                image.scaleX = 0.5;
                image.scaleY = 0.5;
                result.push(image);
                currentPosX += incPosX;
            });

            return result;
        }

        private _checkStatus(type: enums.StatusTypes, powerStatus: enums.PowerUpStatus): void {
            switch (type) {
                case enums.StatusTypes.ARMOR:
            }
        }

        // PUBLIC METHODS
        public Update(): void {
            let curMilis: number = new Date().getTime();
            let secondsDiff: number = (curMilis - this._gameStart) / 1000;
            let seconds: string = ("00" + (Math.floor(secondsDiff) % 60)).substr(-2);
            let minutes: string = ("000" + Math.floor(secondsDiff / 60)).substr(-3);

            this._timerLabel.text = `${minutes}:${seconds}`;
        }

        public PostDamage(player: enums.PlayerId, damage: number): void {
            if (player == enums.PlayerId.PLAYER) {
                this._plrOneLife -= damage;
                this._plrOneLifeBar.Value = this._plrOneLife;

                if (this._plrOneLife <= 0) {
                    config.Game.SCENE = scenes.State.END;
                    config.Game.WINNER = enums.PlayerId.ENEMY;
                }
            } else {
                this._plrTwoLife -= damage;
                this._plrTwoLifeBar.Value = this._plrTwoLife;

                if (this._plrTwoLife <= 0) {
                    config.Game.SCENE = scenes.State.END;
                    config.Game.WINNER = enums.PlayerId.PLAYER;
                }
            }
        }

        public ReceiveExperience(player: enums.PlayerId): void {
            if (player == enums.PlayerId.PLAYER) {
                let posXpLvl = config.Game.PLAYER_STATUS.Level;
                if (posXpLvl < constants.MAX_LEVEL) {
                    posXpLvl--;
                    this._plrOneXp += XP_POTION_VALUE;

                    if (this._plrOneXp >= XP_PER_LEVEL[posXpLvl]) {
                        config.Game.PLAYER_STATUS.LevelUp();
                        this._plrOneLevelLabel.setText(`LVL ${config.Game.PLAYER_STATUS.Level}`);
                        if (config.Game.PLAYER_STATUS.Level < constants.MAX_LEVEL) {
                            this._plrOneXp = 0;
                        }
                    }
                    this._plrOneXpBar.Value = (100 * this._plrOneXp) / XP_PER_LEVEL[posXpLvl];
                }
            } else if (player == enums.PlayerId.ENEMY) {
                let posXpLvl = config.Game.ENEMY_STATUS.Level;
                if (posXpLvl < constants.MAX_LEVEL) {
                    posXpLvl--;
                    this._plrTwoXp += XP_POTION_VALUE;

                    if (this._plrTwoXp >= XP_PER_LEVEL[posXpLvl]) {
                        config.Game.ENEMY_STATUS.LevelUp();
                        this._plrTwoLevelLabel.setText(`LVL ${config.Game.ENEMY_STATUS.Level}`);
                        if (config.Game.ENEMY_STATUS.Level < constants.MAX_LEVEL) {
                            this._plrTwoXp = 0;
                        }
                    }
                    this._plrTwoXpBar.Value = (100 * this._plrTwoXp) / XP_PER_LEVEL[posXpLvl];
                }
            }
        }

        public ReceiveHealing(player: enums.PlayerId): void {
            if (player == enums.PlayerId.PLAYER) {
                this._plrOneLife += HP_POTION_VALUE;
                if (this._plrOneLife > HP_MAX_VALUE) {
                    this._plrOneLife = HP_MAX_VALUE;
                }
                this._plrOneLifeBar.Value = this._plrOneLife;
            } else if (player == enums.PlayerId.ENEMY) {
                this._plrTwoLife += HP_POTION_VALUE;
                if (this._plrTwoLife > HP_MAX_VALUE) {
                    this._plrTwoLife = HP_MAX_VALUE;
                }
                this._plrTwoLifeBar.Value = this._plrTwoLife;
            }
        }

        public ChangePlayerStatus(player: enums.PlayerId, type: enums.StatusTypes, status: enums.PowerUpStatus) {
            let statusBar = player == enums.PlayerId.PLAYER ? this._plrOneStatus : this._plrTwoStatus;
            let suffix = "";

            switch (status) {
                case enums.PowerUpStatus.INACTIVE:
                    suffix = "Dis";
                    break;
                case enums.PowerUpStatus.ACTIVE_HALF_TIME:
                    suffix = "Halftime";
                    break;
                case enums.PowerUpStatus.ACTIVE_QUARTER_TIME:
                    suffix = "Expiring";
                    break;
            }

            statusBar[type].gotoAndPlay(`${this._statusOrder[type]}${suffix}`);
        }
    }
}
