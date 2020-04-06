module scenes {
    export class Start extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _background: objects.Background;
        private _gameTitle: objects.Label;
        private _playerLabel: objects.Label;
        private _instructionLabel: objects.Label;
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
            this._gameTitle = new objects.Label(
                "Hero Quest",
                "120px",
                "Pixel",
                "#96ceb2",
                config.Game.SCREEN_WIDTH / 2 + 30, // For some reason this isn't being centered
                100,
                true
            );
            this._playerLabel = new objects.Label(
                "Select your hero",
                "60px",
                "Pixel",
                "#ffcc5c",
                config.Game.SCREEN_WIDTH / 2,
                config.Game.SCREEN_HEIGHT / 2 - 100,
                true);
            this._instructionLabel = new objects.Label(
                "Stay alive as much as you can!",
                "30px",
                "Pixel",
                "#96ceb2",
                config.Game.SCREEN_WIDTH / 2,
                config.Game.SCREEN_HEIGHT - 200,
                true);

            // Buttons
            this._startButton = new objects.Button(
                "GUI/PS4-X",
                640,
                config.Game.SCREEN_HEIGHT - 100,
                true,
                3);

            // Player one
            this._p1MageButton = new objects.Button(
                "Player/Mage/Idle/idle",
                config.Game.SCREEN_WIDTH / 2 - 100,
                config.Game.SCREEN_HEIGHT / 2 + 50,
                false,
                1.5);
            this._p1RogueButton = new objects.Button(
                "Player/Rogue/Idle/idle",
                config.Game.SCREEN_WIDTH / 2 + 50,
                config.Game.SCREEN_HEIGHT / 2 + 50,
                false,
                1.5);

            this.Main();
        }

        public Update(): void {
        }

        public Main(): void {
            this.addChild(this._background);
            this.addChild(this._gameTitle);
            this.addChild(this._playerLabel);
            this.addChild(this._instructionLabel);
            this.addChild(this._startButton);

            this.addChild(this._p1MageButton);
            this.addChild(this._p1RogueButton);

            // Player one handlers.
            this._p1MageButton.on("click", () => {
                this._p1RogueButton.SetInactive();
                this._p1MageButton.SetActive();
                config.Game.PLAYER_CHARACTER = constants.PlayerType.MAGE_IDLE;
                config.Game.PLAYER_STATUS = objects.PlayerStatus.GetPlayerStatus(
                    enums.PlayerId.PLAYER,
                    constants.PlayerType.MAGE_IDLE
                );
                setEnemy();
                this.validateGame();
            });
            this._p1RogueButton.on("click", () => {
                this._p1RogueButton.SetActive();
                this._p1MageButton.SetInactive();
                config.Game.PLAYER_CHARACTER = constants.PlayerType.ROGUE_IDLE;
                config.Game.PLAYER_STATUS = objects.PlayerStatus.GetPlayerStatus(
                    enums.PlayerId.PLAYER,
                    constants.PlayerType.ROGUE_IDLE
                );

                setEnemy();
                this.validateGame();
            });

            const setEnemy = () => {
                config.Game.ENEMY_CHARACTER = constants.PlayerType.DEMON_IDLE;
                config.Game.ENEMY_STATUS = objects.PlayerStatus.GetPlayerStatus(
                    enums.PlayerId.ENEMY,
                    constants.PlayerType.DEMON_IDLE
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
