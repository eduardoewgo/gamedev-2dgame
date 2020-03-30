module scenes {
    export class Start extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _background: objects.Background;
        private _gameTitle: objects.Label;
        private _player1Label: objects.Label;
        private _player2Label: objects.Label;
        private _startButton: objects.Button;

        // Player selection handlers
        private _p1MageButton: objects.Button;
        private _p1RogueButton: objects.Button;
        private _p2MageButton: objects.Button;
        private _p2RogueButton: objects.Button;

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
            this._player2Label = new objects.Label(
                "Player Two",
                "60px",
                "Pixel",
                "#ffcc5c",
                config.Game.SCREEN_WIDTH - 300,
                200,
                true
            );
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

            // Player two
            this._p2MageButton = new objects.Button("mage", config.Game.SCREEN_WIDTH - 300, 300, true, 1.5, true);
            this._p2RogueButton = new objects.Button("rogue", config.Game.SCREEN_WIDTH - 300, 400, true, 1.5, true);

            this.Main();
        }

        public Update(): void {}

        public Main(): void {
            this.addChild(this._background);
            this.addChild(this._gameTitle);
            this.addChild(this._player1Label);
            this.addChild(this._player2Label);
            this.addChild(this._startButton);

            this.addChild(this._p1MageButton);
            this.addChild(this._p1RogueButton);
            this.addChild(this._p2MageButton);
            this.addChild(this._p2RogueButton);

            // Player one handlers.
            this._p1MageButton.on("click", () => {
                this._p1RogueButton.SetInactive();
                this._p1MageButton.SetActive();
                config.Game.PLAYER1_CHARACTER = constants.PlayerType.MAGE;
                config.Game.PLAYER1_STATUS = objects.PlayerStatus.GetPlayerStatus(
                    enums.PlayerId.PLAYER_ONE,
                    constants.PlayerType.MAGE
                );
                this.validateGame();
            });
            this._p1RogueButton.on("click", () => {
                this._p1RogueButton.SetActive();
                this._p1MageButton.SetInactive();
                config.Game.PLAYER1_CHARACTER = constants.PlayerType.ROGUE;
                config.Game.PLAYER1_STATUS = objects.PlayerStatus.GetPlayerStatus(
                    enums.PlayerId.PLAYER_ONE,
                    constants.PlayerType.ROGUE
                );
                this.validateGame();
            });

            // Player two handlers.
            this._p2MageButton.on("click", () => {
                this._p2RogueButton.SetInactive();
                this._p2MageButton.SetActive();
                config.Game.PLAYER2_CHARACTER = constants.PlayerType.MAGE;
                config.Game.PLAYER2_STATUS = objects.PlayerStatus.GetPlayerStatus(
                    enums.PlayerId.PLAYER_TWO,
                    constants.PlayerType.MAGE
                );
                this.validateGame();
            });
            this._p2RogueButton.on("click", () => {
                this._p2RogueButton.SetActive();
                this._p2MageButton.SetInactive();
                config.Game.PLAYER2_CHARACTER = constants.PlayerType.ROGUE;
                config.Game.PLAYER2_STATUS = objects.PlayerStatus.GetPlayerStatus(
                    enums.PlayerId.PLAYER_TWO,
                    constants.PlayerType.ROGUE
                );
                this.validateGame();
            });

            // Call this once here to "initialize" as inactive
            this.validateGame();
        }

        private validateGame(): void {
            if (config.Game.PLAYER1_CHARACTER != null && config.Game.PLAYER2_CHARACTER != null) {
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
