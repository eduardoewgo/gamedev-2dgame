module objects {
  export class Grid {
    // private instance members
    private _cols: number;
    private _rows: number;
    private _data: string[];
    private _tile_size: number;
    private _tiles: createjs.Sprite[];
    private _isDataLoaded: boolean;
    private _spriteSheet: createjs.SpriteSheet;

    // Public properties
    public get data(): string[] {
      return this._data;
    }

    public get cols(): number {
      return this._cols;
    }

    public set cols(v: number) {
      this._cols = v;
    }

    public get rows(): number {
      return this._rows;
    }

    public set rows(v: number) {
      this._rows = v;
    }

    // Constructor
    constructor(spriteSheet: createjs.SpriteSheet, cols: number = 0, rows: number = 0, tile_size: number = 32) {
      this._data = new Array<string>();
      this.rows = rows;
      this.cols = cols;
      this._isDataLoaded = false;
      this._spriteSheet = spriteSheet;

      this._tile_size = tile_size;
      this._tiles = new Array<createjs.Sprite>();
    }

    public stringToGrid(csv: Object): void {
      let lines = csv.toString().split("\n");
      //console.info("lines: " + lines.length);
      lines.forEach(line => {
        let array = line.split("\t");
        //console.info("items this line: " + array.length);
        array.forEach(item => {
          this._data.push(item);
        });
      });
      if (this._data.length > 0) {
        this._isDataLoaded = true;
      }
    }

    public buildTiles(): void {
      for (let index = 0; index < this._data.length; index++) {
        if (this._data[index] != "-1" && this._data[index] != "-1\r") {
          let data = this._data[index];
          if (data.slice(-1) == "\r") {
            data = data.slice(0, -1);
          }
          let sprite = new createjs.Sprite(this._spriteSheet, data);
          this._tiles[index] = sprite;
        } else {
          this._tiles[index] = undefined;
        }
      }
    }

    public drawTiles(scene: objects.Scene): void {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          if (this._tiles[col + row * this.cols] != undefined) {
            let tile = this._tiles[col + row * this.cols];
            tile.x = this._tile_size * col;
            tile.y = this._tile_size * row;
            scene.addChild(tile);
          }
        }
      }
    }

    public toString(): string {
      let outputString = "";
      if (this._isDataLoaded) {
        for (let row = 0; row < this.rows; row++) {
          for (let col = 0; col < this.cols; col++) {
            if (this._data[col + row * this.cols] != undefined) {
              outputString += this._data[col + row * this.cols];
            }
          }
          outputString += "\n";
        }
      } else {
        console.error("No Data to display");
      }

      return outputString;
    }
  }
}
