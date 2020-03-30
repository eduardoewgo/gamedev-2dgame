module objects {
    export enum GameBarType {
        HEALTH,
        EXPERIENCE
    }

    export class GraphicBar extends createjs.Shape {
        // PRIVATE MEMBERS
        private _value: number;
        private _type: GameBarType;
        private _fgColor: string;
        private _bgColor: string;
        private _posX: number;
        private _posY: number;
        private _width: number;
        private _height: number;
        private _rightSide: boolean;

        // PUBLIC PROPERTIES
        public get Value(): number {
            return this._value;
        }
        public set Value(value: number) {
            // Do not accept values less then 0 or greater then 100
            value = value < 0 ? 0 : value > 100 ? 100 : value;
            this._value = value;
            this.verifyColor();

            // Calculate the X position and the current width of the bar
            let width = this._width * (this._value / 100);
            let posX = this._rightSide ? this._posX + (this._width - width) : this._posX;
            posX += 1;

            // Draw the background bar first, and the foreground above it
            this.graphics.beginFill(this._bgColor).drawRect(this._posX, this._posY, this._width + 2, this._height + 2);
            this.graphics.beginFill(this._fgColor).drawRect(posX, this._posY + 1, width, this._height);
        }

        // CONSTRUCTOR
        constructor(
            posX: number,
            posY: number,
            width: number,
            height: number,
            type: GameBarType = GameBarType.HEALTH,
            rightSide: boolean = false
        ) {
            super();

            this._posX = posX;
            this._posY = posY;
            this._width = width;
            this._height = height;
            this._type = type;
            this._rightSide = rightSide;

            // Sets the background and foreground color based on the type, and the initial value
            if (type == GameBarType.HEALTH) {
                this._bgColor = "#000000";
                this._fgColor = "#007506";
                this.Value = 100;
            } else {
                this._bgColor = "#BDDDFF";
                this._fgColor = "#021775";
                this.Value = 0;
            }
        }

        // PRIVATE FUNCTIONS
        private verifyColor(): void {
            if (this._type == GameBarType.HEALTH) {
                if (this.Value > 50) {
                    this._fgColor = "#007506";
                } else if (this.Value > 25) {
                    this._fgColor = "#fffc3b";
                } else {
                    this._fgColor = "#bd1919";
                }
            }
        }

        // PUBLIC FUNCTIONS
    }
}
