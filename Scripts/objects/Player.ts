module objects {
    export class Player extends GameObject {
        // PRIVATE INSTANCE MEMBERS
        private _playerVel: number = 3;
        private _playerId: enums.PlayerId;
        private _playerCharacter: string;

        // PUBLIC PROPERTIES
        public get PlayerId(): enums.PlayerId {
            return this._playerId;
        }

        // CONSTRUCTOR
        constructor(playerId: enums.PlayerId, playerCharacter: string, x?: number, y?: number) {
            super(config.Game.ATLAS2, playerCharacter, 0, 0, true);
            this._playerId = playerId;
            this._playerCharacter = playerCharacter;
            this.Reset();
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            // Sides bound
            if (this.position.x <= config.Game.SCREEN_SAFE_AREA) {
                this.position = new Vector2(config.Game.SCREEN_SAFE_AREA, this.position.y);
            } else if (this.position.x >= config.Game.SCREEN_WIDTH - config.Game.SCREEN_SAFE_AREA) {
                this.position = new Vector2(config.Game.SCREEN_WIDTH - config.Game.SCREEN_SAFE_AREA, this.position.y);
            }
        }

        private _move(): void {
            let velocity = new Vector2(0, 0);
            let playerKeys = managers.Keyboard.GetPlayerKeys(this._playerId);

            // Verify the direction and set the y speed
            if (playerKeys[enums.PlayerKeys.MOVE_LEFT] && !playerKeys[enums.PlayerKeys.MOVE_RIGHT]) {
                velocity = new Vector2(-this._playerVel, 0);
            } else if (playerKeys[enums.PlayerKeys.MOVE_RIGHT] && !playerKeys[enums.PlayerKeys.MOVE_LEFT]) {
                velocity = new Vector2(this._playerVel, 0);
            }

            this.position = Vector2.add(this.position, velocity);
        }

        public Attack() {
            // Attack position for 250ms then go back
            // this.gotoAndStop(`Player/Mage/Attack/attack`);
            // setTimeout(() => this.gotoAndStop(`${this._playerCharacter}`), 250);
        }

        public Hit() {
            // Attack position for 250ms then go back.
            // this.gotoAndStop(`${this._playerCharacter}Hit`);
            // setTimeout(() => this.gotoAndStop(`${this._playerCharacter}`), 250);
        }

        // PUBLIC METHODS
        public Start(): void {
            this.type = enums.GameObjectType.PLAYER;
        }

        public Update(): void {
            this._move();
            this._checkBounds();
        }

        public Reset(): void {
            if (this._playerId == enums.PlayerId.ENEMY) {
                this.position = new Vector2(
                    config.Game.SCREEN_WIDTH - config.Game.SCREEN_SAFE_AREA,
                    config.Game.SCREEN_HEIGHT - 350
                );
            } else {
                this.position = new Vector2(
                    config.Game.SCREEN_SAFE_AREA,
                    config.Game.SCREEN_HEIGHT - 8
                );
            }
        }
    }
}
