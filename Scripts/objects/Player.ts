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
        constructor(playerId: enums.PlayerId, playerCharacter: string) {
            super(config.Game.ATLAS, playerCharacter, 0, 0, true);
            this._playerId = playerId;
            this._playerCharacter = playerCharacter;
            this.Reset();
            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            // Upper and lower bound
            if (this.position.y < config.Game.GAME_BAR_HEIGHT + this.halfHeight) {
                this.position = new Vector2(this.position.x, config.Game.GAME_BAR_HEIGHT + this.halfHeight);
            } else if (this.position.y > config.Game.SCREEN_HEIGHT - this.halfHeight) {
                this.position = new Vector2(this.position.x, config.Game.SCREEN_HEIGHT - this.halfHeight);
            }
        }

        private _move(): void {
            let velocity = new Vector2(0, 0);
            let playerKeys = managers.Keyboard.GetPlayerKeys(this._playerId);

            // Verify the direction and set the y speed
            if (playerKeys[enums.PlayerKeys.MOVE_UP] && !playerKeys[enums.PlayerKeys.MOVE_DOWN]) {
                velocity = new Vector2(0, -this._playerVel);
            } else if (playerKeys[enums.PlayerKeys.MOVE_DOWN] && !playerKeys[enums.PlayerKeys.MOVE_UP]) {
                velocity = new Vector2(0, this._playerVel);
            }

            this.position = Vector2.add(this.position, velocity);
        }

        public Attack() {
            // Attack position for 250ms then go back
            this.gotoAndStop(`${this._playerCharacter}Attack`);
            setTimeout(() => this.gotoAndStop(`${this._playerCharacter}`), 250);
        }

        public Hit() {
            // Attack position for 250ms then go back.
            this.gotoAndStop(`${this._playerCharacter}Hit`);
            setTimeout(() => this.gotoAndStop(`${this._playerCharacter}`), 250);
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
            if (this._playerId == enums.PlayerId.PLAYER_TWO) {
                // Mirror the second player by default
                this.scaleX = -1;

                this.position = new Vector2(
                    config.Game.SCREEN_WIDTH - this.halfWidth,
                    config.Game.GAME_BAR_HEIGHT + this.halfHeight
                );
            } else {
                this.position = new Vector2(this.halfWidth, config.Game.GAME_BAR_HEIGHT + this.halfHeight);
            }
        }
    }
}
