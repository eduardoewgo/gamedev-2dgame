module scenes {
    export class Play extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _background: objects.Background;
        private _player: objects.Player;
        private _enemy: objects.Player;
        private _powerUp: Array<objects.PowerUp> = [];
        private _itemSpawnTicks: number;
        private _bullets: Array<objects.Bullet> = [];
        private _gameBar: managers.GameBar;
        private _playerTick: number;
        private _enemyTick: number;

        constructor() {
            super();
            this.Start();
        }

        // PRIVATE METHODS
        private _plrShoot(player: objects.Player, status: objects.PlayerStatus, bulletTick: number): number {
            // Verify if the shoot button is active
            if (managers.Keyboard.IsActive(player.PlayerId, enums.PlayerKeys.SHOOT)) {
                // Verify if the player can shoot
                let curTick = createjs.Ticker.getTicks();
                if (curTick - bulletTick >= status.GetValue(enums.StatusTypes.ATK_SPEED)) {
                    player.Attack();
                    let bullet = new objects.Bullet(
                        player.position,
                        player.PlayerId,
                        player.PlayerId == enums.PlayerId.ENEMY ? "Attack/energy-ball" : "Attack/linear-fire"
                    );
                    this._bullets.push(bullet);
                    this.addChild(bullet);
                    return curTick;
                }
            }
            return bulletTick;
        }

        private _checkBullet(e: objects.Bullet, index: number): void {
            // If is out of screen, remove it and return, otherwise, update it
            if (e && e.isOutOfBounds()) {
                this.removeChild(e);
                delete this._bullets[index];
                return;
            } else if (e) {
                e.Update();
            }

            // Check for player two bullet collisions
            let bulletHit: boolean = false;
            if (e.Player == enums.PlayerId.ENEMY) {
                if (managers.Collision.AABBCheck(this._player, e)) {
                    this._player.Hit();
                    this._gameBar.PostDamage(
                        enums.PlayerId.PLAYER,
                        config.Game.PLAYER_STATUS.CalculateDamage(
                            config.Game.ENEMY_STATUS.GetValue(enums.StatusTypes.ATK_POWER)
                        )
                    );
                    bulletHit = true;
                }
            } else if (e.Player == enums.PlayerId.PLAYER) {
                if (managers.Collision.AABBCheck(this._enemy, e)) {
                    this._enemy.Hit();
                    this._gameBar.PostDamage(
                        enums.PlayerId.ENEMY,
                        config.Game.ENEMY_STATUS.CalculateDamage(
                            config.Game.PLAYER_STATUS.GetValue(enums.StatusTypes.ATK_POWER)
                        )
                    );
                    bulletHit = true;
                }
            }
            bulletHit = bulletHit || this._checkPowerUpCollision(e);

            // If the bullet hit something, remove it
            if (bulletHit) {
                this.removeChild(e);
                delete this._bullets[index];
            }
        }

        private _checkPowerUpCollision(e: objects.Bullet): boolean {
            let result: boolean = false;
            // Checks if the bullet activate the power up
            this._powerUp.forEach((pu, index) => {
                if (managers.Collision.squaredRadiusCheck(pu, e)) {
                    this._activatePowerUp(pu, e.Player);
                    this.removeChild(pu);
                    delete this._powerUp[index];
                    result = true;
                }
            });
            return result;
        }

        private _activatePowerUp(pu: objects.PowerUp, playerId: enums.PlayerId): void {
            let status: objects.PlayerStatus =
                playerId == enums.PlayerId.PLAYER ? config.Game.PLAYER_STATUS : config.Game.ENEMY_STATUS;

            switch (pu.PowerType) {
                case enums.PowerUpTypes.ARMOR:
                case enums.PowerUpTypes.ATTACK_POWER:
                case enums.PowerUpTypes.ATTACK_SPEED:
                    status.ActivatePowerUp(pu, createjs.Ticker.getTicks());
                    break;

                case enums.PowerUpTypes.TRAP:
                    // Change the player before sending the status
                    status =
                        playerId == enums.PlayerId.PLAYER ? config.Game.ENEMY_STATUS : config.Game.PLAYER_STATUS;
                    status.ActivatePowerUp(pu, createjs.Ticker.getTicks());
                    break;

                case enums.PowerUpTypes.POTION_HP:
                    this._gameBar.ReceiveHealing(playerId);
                    break;

                case enums.PowerUpTypes.POTION_XP:
                    this._gameBar.ReceiveExperience(playerId);
                    break;
            }
        }

        private _createPowerUp(): void {
            // Create an item every 30s to a minium of 10s (reducing 1s per item showed)
            if (createjs.Ticker.getTicks() % this._itemSpawnTicks == 0) {
                let powerUp = new objects.PowerUp();
                this._powerUp.push(powerUp);
                this.addChild(powerUp);
                if (this._itemSpawnTicks > 10 * config.Game.FPS) {
                    this._itemSpawnTicks -= config.Game.FPS;
                }
            }
        }

        // PUBLIC METHODS
        public Start(): void {
            // Background
            this._background = new objects.Background(config.Game.ASSETS.getResult("forestBackground"));
            // Create the players
            this._player = new objects.Player(enums.PlayerId.PLAYER, config.Game.PLAYER_CHARACTER);
            this._enemy = new objects.Player(enums.PlayerId.ENEMY, config.Game.ENEMY_CHARACTER);

            this._powerUp = new Array<objects.PowerUp>();

            // Create the GamaBar
            this._gameBar = new managers.GameBar();
            config.Game.GAME_BAR = this._gameBar;

            // Initialize the keyboard
            managers.Keyboard.Start();

            this._playerTick = 0;
            this._enemyTick = 0;

            this._itemSpawnTicks = config.Game.INITIAL_ITEM_SPAWN_TICKER;

            this.Main();
        }

        public Update(): void {
            // Do not allow player 1 to move if it is trapped
            if (config.Game.PLAYER_STATUS.GetPowerStatus(enums.StatusTypes.TRAP) == enums.PowerUpStatus.INACTIVE) {
                this._player.Update();
            }
            if (config.Game.ENEMY_STATUS.GetPowerStatus(enums.StatusTypes.TRAP) == enums.PowerUpStatus.INACTIVE) {
                this._enemy.Update();
            }
            this._gameBar.Update();

            this._playerTick = this._plrShoot(this._player, config.Game.PLAYER_STATUS, this._playerTick);
            this._enemyTick = this._plrShoot(this._enemy, config.Game.ENEMY_STATUS, this._enemyTick);

            config.Game.PLAYER_STATUS.Update();
            config.Game.ENEMY_STATUS.Update();

            this._bullets.forEach((e, index) => {
                this._checkBullet(e, index);

                if (e.Player == enums.PlayerId.PLAYER) {
                }
            });
        }

        public Main(): void {
            this.addChild(this._background);
            this.addChild(this._player);
            this.addChild(this._enemy);
            this._gameBar.ScreenObjects.forEach(obj => this.addChild(obj));

            for (let i = 0, width = 0; width <= config.Game.SCREEN_WIDTH; i++) {
                let floor = new createjs.Sprite(config.Game.ATLAS2, "Background/tile");
                width = i * 30;
                floor.x = i * 30;
                floor.y = config.Game.SCREEN_HEIGHT - 18;
                this.addChild(floor);
            }
        }
    }
}
