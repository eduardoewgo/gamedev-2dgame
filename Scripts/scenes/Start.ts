module scenes {
    export class Start extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _background: objects.Background;
        private _gameTitle: objects.Label;
        private _player1Label: objects.Label;
        private _startButton: objects.Button;

        // Player selection handlers
        private _p1MageButton: objects.Button;
        private _p1RogueButton: objects.Button;

        // CONSTRUCTOR
        constructor() {
            super();
            this.Start();
        }

        /**
         * Pallete
         * Orange #ffcc5c
         * Green #96ceb2
         * Red #ff6f69
         * White #ffffff
         */

        // PUBLIC METHODS
        public Start(): void {
            // Background
            this._background = new objects.Background(config.Game.ASSETS.getResult("blackBackground"));

            // Labels
            this._player1Label = new objects.Label("Player One", "60px", "Pixel", "#ffcc5c", 300, 200, true);
            this._gameTitle = new objects.Label(
                "Pongshot",
                "120px",
                "Pixel",
                "#96ceb2",
                config.Game.SCREEN_WIDTH / 2,
                100,
                true
            );

            // Buttons
            this._startButton = new objects.Button("btnPlay", 640, config.Game.SCREEN_HEIGHT - 100, true);

            // Player one
            this._p1MageButton = new objects.Button("mage", 300, 300, true, 1.5);
            this._p1RogueButton = new objects.Button("rogue", 300, 400, true, 1.5);

            this.Main();
        }

        public Update(): void {
        }

        public Main(): void {
            this.addChild(this._background);
            this.addChild(this._gameTitle);
            this.addChild(this._player1Label);
            this.addChild(this._startButton);

            this.addChild(this._p1MageButton);
            this.addChild(this._p1RogueButton);

            // Player one handlers.
            this._p1MageButton.on("click", () => {
                this._p1RogueButton.SetInactive();
                this._p1MageButton.SetActive();
                config.Game.PLAYER_CHARACTER = constants.PlayerType.MAGE;
                config.Game.PLAYER_STATUS = objects.PlayerStatus.GetPlayerStatus(
                    enums.PlayerId.PLAYER,
                    constants.PlayerType.MAGE
                );
                setEnemy();
                this.validateGame();
            });
            this._p1RogueButton.on("click", () => {
                this._p1RogueButton.SetActive();
                this._p1MageButton.SetInactive();
                config.Game.PLAYER_CHARACTER = constants.PlayerType.ROGUE;
                config.Game.PLAYER_STATUS = objects.PlayerStatus.GetPlayerStatus(
                    enums.PlayerId.PLAYER,
                    constants.PlayerType.ROGUE
                );

                setEnemy();
                this.validateGame();
            });

            const setEnemy = () => {
                config.Game.ENEMY_CHARACTER = constants.PlayerType.MAGE;
                config.Game.ENEMY_STATUS = objects.PlayerStatus.GetPlayerStatus(
                    enums.PlayerId.ENEMY,
                    constants.PlayerType.MAGE
                );
            };

            // Call this once here to "initialize" as inactive
            this.validateGame();
        }

        private validateGame(): void {
            if (config.Game.PLAYER_CHARACTER != null && config.Game.ENEMY_CHARACTER != null) {
                // Use active to set the alpha and handle the over.
                this._startButton.SetActive();

                // Attache handler if valid
                this._startButton.on("click", () => {
                    config.Game.SCENE = scenes.State.PLAY;
                });
            } else {
                // Use inactive to set the alpha and handle the over.
                this._startButton.SetInactive();
            }
        }
    }
}
