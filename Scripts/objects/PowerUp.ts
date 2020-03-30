module objects {
    export class PowerUp extends GameObject {
        // PRIVATE INSTANCE MEMBERS
        private _powerType: enums.PowerUpTypes;

        // PUBLIC PROPERTIES
        public get PowerType(): enums.PowerUpTypes {
            return this._powerType;
        }

        // CONSTRUCTOR
        constructor() {
            // super(
            //     config.Game.ASSETS.getResult(constants.PowerUps[0]),
            //     config.Game.SCREEN_WIDTH,
            //     config.Game.SCREEN_HEIGHT
            // );
            super(config.Game.ATLAS, constants.PowerUps[0], config.Game.SCREEN_WIDTH, config.Game.SCREEN_HEIGHT);

            // It will display in a random position between 1/3 and 2/3 of the screen, and calculate positions
            let oneThirdScreen = config.Game.SCREEN_WIDTH / 3;
            let posX = util.Mathf.RandomRange(oneThirdScreen, oneThirdScreen * 2 - this.width);
            let posY = util.Mathf.RandomRange(config.Game.GAME_BAR_HEIGHT, config.Game.SCREEN_HEIGHT - this.height);

            // Get a random power type
            let power = constants.PowerUps[util.Mathf.RandomRangeInt(0, constants.PowerUps.length - 1)];
            this._powerType = power as enums.PowerUpTypes;
            this.gotoAndStop(power);
            this.position = new objects.Vector2(posX, posY);

            this.Start();
        }

        // PUBLIC METHODS
        public Start(): void {
            this.type = enums.GameObjectType.POWER_UP;
        }

        public Update(): void {
            this._checkBounds();
        }

        public Reset(): void {}

        protected _checkBounds(): void {}
    }
}
