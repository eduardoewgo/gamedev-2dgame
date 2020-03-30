"use strict";
var util;
(function (util) {
    var Util = /** @class */ (function () {
        function Util() {
        }
        // PUBLIC STATIC FUNCTIONS
        Util.enumNumberToArray = function (enumType) {
            var result = Object.keys(enumType).map(function (key) { return enumType[key]; });
            return result;
        };
        Util.enumStringToArray = function (enumType) {
            var result = Object.keys(enumType).map(function (key) { return enumType[key]; });
            return result;
        };
        return Util;
    }());
    util.Util = Util;
})(util || (util = {}));
//# sourceMappingURL=Util.js.map