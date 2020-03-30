module scenes {
    enum LogoState {
        APPEARING,
        WAITING,
        FADING,
        COMPLETE,
        NUM_OF_STATES
    }

    export class CompanyLogo extends objects.Scene {
        // PRIVATE INSTANCE MEMBERS
        private _presentLabel: objects.Label;
        private _background: objects.Background;
        private _companyLogo: objects.Background;
        private _state: LogoState;
        private _waitCounter: number;

        // CONSTRUCTOR
        constructor() {
            super();
            this.Start();
        }

        // PUBLIC METHODS
        public Start(): void {
            this._background = new objects.Background(config.Game.ASSETS.getResult("blackBackground"));

            // Create company logo based on game screen w,h.
            this._companyLogo = new objects.Background(
                config.Game.ASSETS.getResult("companyLogo"),
                config.Game.SCREEN_WIDTH / 2,
                config.Game.SCREEN_HEIGHT / 2,
                true
            );

            // Start counter and alpha value for fadding effect.
            this._companyLogo.alpha = 0.1;
            this._waitCounter = 0;
            this._state = LogoState.APPEARING;

            this.Main();
        }

        public Update(): void {
            /**
             * Fadding effect for the company logo.
             * Once it finishes, jump to the play START scene.
             */
            switch (this._state) {
                case LogoState.APPEARING:
                    this._companyLogo.alpha += 0.01;
                    if (this._companyLogo.alpha >= 1) {
                        this._state = LogoState.WAITING;
                    }
                    break;

                case LogoState.WAITING:
                    this._waitCounter += 1;
                    if (this._waitCounter >= 30) {
                        this._state = LogoState.FADING;
                    }
                    break;

                case LogoState.FADING:
                    this._companyLogo.alpha -= 0.01;
                    if (this._companyLogo.alpha <= 0.1) {
                        this._state = LogoState.COMPLETE;
                    }
                    break;

                case LogoState.COMPLETE:
                    config.Game.SCENE = scenes.State.START;
                    break;
            }
        }

        public Main(): void {
            this.addChild(this._background);
            this.addChild(this._companyLogo);
        }
    }
}
