module objects {
    export class Button extends GameObject {
        private _selected: boolean = null;

        // constructor
        constructor(
            buttonName: string = "button",
            x: number = 0,
            y: number = 0,
            isCentered: boolean = false,
            scale: number = 1,
            mirror: boolean = false
        ) {
            super(config.Game.ATLAS, buttonName, x, y, isCentered);

            this.on("mouseover", this.MouseOver);
            this.on("mouseout", this.MouseOut);

            this.scaleX = mirror ? scale * -1 : scale;
            this.scaleY = scale;

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {}

        // PUBLIC METHODS
        MouseOver(): void {
            if (this._selected == null) this.alpha = 0.7;
        }

        MouseOut(): void {
            if (this._selected == null) this.alpha = 1.0;
        }

        SetActive(): void {
            this._selected = true;
            this.alpha = 1;
        }

        SetInactive(): void {
            this._selected = false;
            this.alpha = 0.5;
        }

        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        public Start(): void {
            this.type = enums.GameObjectType.BUTTON;
        }

        public Update(): void {}

        public Reset(): void {}
    }
}
