module scenes {
    export class End extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _background: objects.Background;
        private _endLabel: objects.Label;
        private _winnerLabel: objects.Label;
        private _player: objects.Button;
        private _restart: objects.Button;


        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor() {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        // Initializing and Instantiating
        public Start(): void {
            // Background
            this._background = new objects.Background(config.Game.ASSETS.getResult("blackBackground"));

            //instantiate a new Text object
            this._endLabel = new objects.Label(`Game Over`, "80px", "Consolas", "#FFFF00", 620, 180, true);
            this._winnerLabel = new objects.Label(
                `Great job, you stayed alive for ${config.Game.TIME_ALIVE}`,
                "40px",
                "Consolas",
                "#FFFF00",
                620,
                280,
                true
            );
            // buttons
            this._player = new objects.Button(config.Game.PLAYER_CHARACTER, 620, 430, true);
            this._restart = new objects.Button(
                "GUI/PS4-X",
                640,
                config.Game.SCREEN_HEIGHT - 100,
                true,
                3);

            this.Main();
        }

        public Update(): void {
        }

        public Main(): void {
            this.addChild(this._background);
            this.addChild(this._endLabel);
            this.addChild(this._winnerLabel);

            this.addChild(this._player);
            this.addChild(this._restart);

            this._restart.on("click", () => {
                config.Game.SCENE = scenes.State.START;
            });
        }
    }
}
