module scenes {
    export class End extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _background: objects.Background;
        private _endLabel: objects.Label;
        private _winnerLabel: objects.Label;
        private _backButton: objects.Button;

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
                `Player ${config.Game.WINNER + 1} Won`,
                "80px",
                "Consolas",
                "#FFFF00",
                620,
                280,
                true
            );
            // buttons
            this._backButton = new objects.Button("btnBack", 620, 430, true);

            this.Main();
        }

        public Update(): void {}

        public Main(): void {
            this.addChild(this._background);
            this.addChild(this._endLabel);
            this.addChild(this._winnerLabel);

            this.addChild(this._backButton);

            this._backButton.on("click", () => {
                config.Game.SCENE = scenes.State.START;
            });
        }
    }
}
