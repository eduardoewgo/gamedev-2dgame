module util {
    export class Util {
        // PUBLIC STATIC FUNCTIONS
        public static enumNumberToArray(enumType: any): Array<number> {
            let result = Object.keys(enumType).map(key => enumType[key]);
            return result;
        }

        public static enumStringToArray(enumType: any): Array<string> {
            let result = Object.keys(enumType).map(key => enumType[key]);
            return result;
        }
    }
}
