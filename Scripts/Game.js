"use strict";
//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
var Sprite = createjs.Sprite;
var SpriteSheet = createjs.SpriteSheet;
var Game = (function () {
    // variable declarations
    var canvas = document.getElementsByTagName("canvas")[0];
    var stage;
    var currentSceneState;
    var currentScene;
    var assets;
    var itemsAtlas;
    var assetManifest = [
        // New sprites folder
        { id: "game", src: "./Assets/sprites/mysprites.json", type: "spritesheet" },
        // Images
        { id: "companyLogo", src: "./Assets/images/CompanyLogo.png" },
        { id: "blackBackground", src: "./Assets/images/bg_blackBackground.png" },
        { id: "forestBackground", src: "./Assets/images/bg_forest.png" },
        { id: "heart", src: "./Assets/images/heart.png" },
        // Buttons
        { id: "btnConfirm", src: "./Assets/images/btn_confirm.png" },
        { id: "btnPlay", src: "./Assets/images/btn_play.png" },
        { id: "btnConfirm", src: "./Assets/images/btn_confirm.png" },
        { id: "btnBack", src: "./Assets/images/btn_back.png" },
        // Characters
        { id: "mage", src: "./Assets/images/mage.png" },
        { id: "mageAttack", src: "./Assets/images/mage_attack.png" },
        { id: "mageHit", src: "./Assets/images/mage_hit.png" },
        { id: "rogue", src: "./Assets/images/rogue.png" },
        { id: "rogueAttack", src: "./Assets/images/rogue_attack.png" },
        { id: "rogueHit", src: "./Assets/images/rogue_hit.png" },
        // Attacks
        { id: "attack1", src: "./Assets/images/attack1.png" },
        { id: "attack2", src: "./Assets/images/attack2.png" },
        { id: "attackCollision", src: "./Assets/images/attack_collision.png" },
        // Atlas
        { id: "itemAtlas", src: "./Assets/sprites/itemsAtlas.png" },
        { id: "gameAtlas", src: "./Assets/sprites/mysprites.png" },
        // Items
        { id: "itemArmor", src: "./Assets/images/item_armor.png" },
        { id: "itemBoots", src: "./Assets/images/item_boots.png" },
        { id: "itemHp", src: "./Assets/images/item_hp.png" },
        { id: "itemSpellScroll", src: "./Assets/images/item_spellScroll.png" },
        { id: "itemXp", src: "./Assets/images/item_xp.png" },
        { id: "itemTrap", src: "./Assets/images/item_trap.png" }
    ];
    var itemsSpriteData = {
        images: {},
        frames: [
            [0, 0, 15, 12, 0, 0, 0],
            [15, 0, 20, 18, 0, 0, 0],
            [35, 0, 32, 32, 0, 0, 0],
            [67, 0, 32, 32, 0, 0, 0],
            [99, 0, 32, 32, 0, 0, 0],
            [131, 0, 32, 32, 0, 0, 0],
            [163, 0, 32, 32, 0, 0, 0],
            [195, 0, 32, 32, 0, 0, 0],
            [0, 32, 32, 32, 0, 0, 0],
            [32, 32, 32, 32, 0, 0, 0],
            [64, 32, 32, 32, 0, 0, 0],
            [96, 32, 32, 32, 0, 0, 0],
            [128, 32, 32, 32, 0, 0, 0],
            [160, 32, 71, 56, 0, 0, 0],
            [0, 88, 72, 56, 0, 0, 0],
            [72, 88, 72, 56, 0, 0, 0],
            [144, 88, 72, 56, 0, 0, 0],
            [0, 144, 72, 56, 0, 0, 0],
            [72, 144, 72, 56, 0, 0, 0],
            [0, 200, 128, 128, 0, 0, 0],
            [128, 200, 128, 128, 0, 0, 0],
            [0, 328, 200, 200, 0, 0, 0],
            [0, 528, 200, 200, 0, 0, 0]
        ],
        animations: {
            btnConfirm: { frames: [0] },
            heart: { frames: [1] },
            attack1: { frames: [2] },
            armor: { frames: [3] },
            armorDis: { frames: [4] },
            boots: { frames: [5] },
            bootsDis: { frames: [6] },
            itemHp: { frames: [7] },
            spellScroll: { frames: [8] },
            spellScrollDis: { frames: [9] },
            trap: { frames: [10] },
            trapDis: { frames: [11] },
            itemXp: { frames: [12] },
            mageAttack: { frames: [13] },
            mage: { frames: [14] },
            mageHit: { frames: [15] },
            rogue: { frames: [16] },
            rogueAttack: { frames: [17] },
            rogueHit: { frames: [18] },
            attack2: { frames: [19] },
            attackCollision: { frames: [20] },
            btnBack: { frames: [21] },
            btnPlay: { frames: [22] },
            armorHalftime: {
                frames: [3, 4],
                speed: 0.8
            },
            armorExpiring: {
                frames: [3, 4],
                speed: 0.4
            },
            bootsHalftime: {
                frames: [5, 6],
                speed: 0.8
            },
            bootsExpiring: {
                frames: [5, 6],
                speed: 0.4
            },
            spellScroolHalftime: {
                frames: [8, 9],
                speed: 0.8
            },
            spellScroolExpiring: {
                frames: [8, 9],
                speed: 0.4
            },
            trapHalftime: {
                frames: [10, 11],
                speed: 0.8
            },
            trapExpiring: {
                frames: [10, 11],
                speed: 0.4
            }
        }
    };
    function Preload() {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log("%c Game Started!", "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        // Load the atlas
        itemsSpriteData.images = [assets.getResult("itemAtlas")];
        itemsAtlas = new createjs.SpriteSheet(itemsSpriteData);
        // TODO: refactor the atlas.
        config.Game.ATLAS = itemsAtlas;
        config.Game.ATLAS2 = assets.getResult("game");
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.COMPANY_LOGO;
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        if (currentSceneState != config.Game.SCENE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log("%c Scene Switched...", "color: green; font-size: 16px;");
        // clean up
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }
        // switch to the new scene
        switch (config.Game.SCENE) {
            case scenes.State.COMPANY_LOGO:
                console.log("switch to Company Logo");
                currentScene = new scenes.CompanyLogo();
                break;
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start();
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play();
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End();
                break;
        }
        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=Game.js.map