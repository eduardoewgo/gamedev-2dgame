"use strict";
var scenes;
(function (scenes) {
    var State;
    (function (State) {
        State[State["NO_SCENE"] = -1] = "NO_SCENE";
        State[State["COMPANY_LOGO"] = 0] = "COMPANY_LOGO";
        State[State["START"] = 1] = "START";
        State[State["CONFIGURATION"] = 2] = "CONFIGURATION";
        State[State["HIGHSCORE"] = 3] = "HIGHSCORE";
        State[State["CHAR_SELECTOR"] = 4] = "CHAR_SELECTOR";
        State[State["PLAY"] = 5] = "PLAY";
        State[State["END"] = 6] = "END";
        State[State["NUM_OF_SCENES"] = 7] = "NUM_OF_SCENES";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map