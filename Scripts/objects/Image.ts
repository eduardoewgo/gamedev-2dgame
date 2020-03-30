module objects {
    export class Image extends GameObject {
        // constructor
        constructor(imageName: string = "placeholder", x: number = 0, y: number = 0, isCentered: boolean = false) {
            super(config.Game.ATLAS, imageName, x, y, isCentered);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {}

        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        public Start(): void {
            this.type = enums.GameObjectType.IMAGE;
        }

        public Update(): void {}

        public Reset(): void {}
    }
}
