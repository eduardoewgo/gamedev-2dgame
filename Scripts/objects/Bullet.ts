module objects {
    export class Bullet extends objects.GameObject {
        private _bulletVel: number = 5;
        private _player: enums.PlayerId;

        get Player(): enums.PlayerId {
            return this._player;
        }

        constructor(startPosition: Vector2, player: enums.PlayerId = enums.PlayerId.PLAYER, attackSprite: string) {
            super(config.Game.ATLAS2, attackSprite);

            if (player == enums.PlayerId.ENEMY) {
                // Make it rainnnn!
                this.position = new Vector2(
                    Math.floor(Math.random() * config.Game.SCREEN_WIDTH),
                    config.Game.GAME_BAR_HEIGHT,
                    this
                );
                this.rotation = 90;

            } else {
                this.position = new Vector2(startPosition.x, startPosition.y - 50, this);
            }

            this._player = player;
        }

        protected _checkBounds(): void {
        }

        public isOutOfBounds(): boolean {
            if (this._player == enums.PlayerId.ENEMY) {
                return this.x > config.Game.SCREEN_WIDTH;
            } else {
                return this.x < 0;
            }
        }

        public Start(): void {
        }

        public Update(): void {
            if (this._player == enums.PlayerId.ENEMY) {
                this.position.y += this._bulletVel;
            } else {
                this.position.x += this._bulletVel;
            }
        }

        public Reset(): void {
        }
    }
}
