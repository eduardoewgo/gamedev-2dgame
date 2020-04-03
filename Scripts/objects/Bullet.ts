module objects {
    export class Bullet extends objects.GameObject {
        private _bulletVel: number = 1;
        private _player: enums.PlayerId;
        //private _active:boolean;

        // PUBLIC PROPERTIES
        // get active():boolean
        // {
        //     return this._active;
        // }
        // set active(value:boolean)
        // {
        //     this._active = value;
        // }
        // constuctor
        get Player(): enums.PlayerId {
            return this._player;
        }

        constructor(startPosition: Vector2, player: enums.PlayerId = enums.PlayerId.PLAYER) {
            // from https://opengameart.org/content/bullets-game-asset
            //super(config.Game.ASSETS.getResult("attack1"));
            super(config.Game.ATLAS2, "Attack/linear-fire");
            this.position = new Vector2(startPosition.x, startPosition.y, this);
            //this.x = startPosition.x;
            //this.y = startPosition.y;
            this._player = player;
            //this._active = true;
        }

        protected _checkBounds(): void {}

        public isOutOfBounds(): boolean {
            if (this._player == enums.PlayerId.ENEMY) {
                return this.x > config.Game.SCREEN_WIDTH;
            } else {
                return this.x < 0;
            }
        }

        public Start(): void {}

        public Update(): void {
            if (this._player == enums.PlayerId.ENEMY) {
                this.position.x -= this._bulletVel;
            } else {
                this.position.x += this._bulletVel;
            }
        }

        public Reset(): void {}
    }
}
