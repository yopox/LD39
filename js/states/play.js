var scrollSprite;
var uranium;
var steam;
var uraniumCount;
var justPressedSpace = false;
var background;
var backerground;
// var foreground;
var rob;
var map;
var gui = [];
var layerGround;
var layerScenery;
var eqPos; // equilibrium position of the character during the scroll
var isCrouching = false;

var playState = {
    create: function() {
        // MUSIC PLAYBACK
        // var buffer = game.cache.getBinary('xm');
        // music.play(buffer);

        // Backerground
        backerground = game.add.tileSprite(0, 0, 4096, 288, "backerground");

        // Background
        background = game.add.tileSprite(0, 0, 4096, 288, "background");

        // Map init
        map = game.add.tilemap('map' + levelSelector);
        map.addTilesetImage('tiles');
        map.setCollisionBetween(0, 100, true);
        // Layers
        layerGround = map.createLayer('ground');
        game.physics.arcade.enable(layerGround);
        layerGround.resizeWorld();
        layerScenery = map.createLayer('scenery');

        // Player
        rob = game.add.sprite(-64, 288 - 136, 'robot');
        rob.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 14, true);
        rob.animations.add('crouch', [8, 9, 10, 11, 12, 13], 14, true);
        initSprite(rob, [0, 0]);
        rob.animations.play('walk');
        game.physics.arcade.enable(rob);
        rob.body.setSize(10, 24, 3, 8);
        rob.body.velocity.x = 125;
        rob.body.gravity.y = 800;
        rob.body.bounce.y = 0;

        // Invisible scroll sprite
        scrollSprite = game.add.sprite(game.width / 2 - 128, game.height / 2);
        game.physics.arcade.enable(scrollSprite);
        scrollSprite.body.velocity.x = 80;
        scrollSprite.body.collideWorldBounds = true;
        game.camera.follow(scrollSprite);
        game.camera.roundPx = false;

        // Collectibles
        uranium = game.add.group();
        uranium.enableBody = true;
        map.createFromObjects('uranium', 2, 'uranium', 0, true, false, uranium);
        uranium.callAll('animations.add', 'animations', 'idle', [0, 1, 0, 2], 4, true);
        uranium.callAll('animations.play', 'animations', 'idle');
        uraniumCount = 0;

        // Steam
        steam = game.add.group();
        steam.enableBody = true;
        map.createFromObjects('steam', 34, 'steam', 0, true, false, steam);
        steam.callAll('animations.add', 'animations', 'idle', [0, 1, 2, 3, 4, 5, 6, 7, 8], 9, true);
        steam.callAll('animations.play', 'animations', 'idle');

        // GUI
        gui.push(game.add.sprite(32, 16, 'counter'));
        gui[0].fixedToCamera = true;
        gui.push(game.add.bitmapText(68, 32, 'SullyVerge', 'x00', 16));
        gui[1].fixedToCamera = true;

        game.renderer.renderSession.roundPixels = true;
    },

    update: function() {
        backerground.tilePosition.x = layerGround.position.x / 1.1;
        background.tilePosition.x = layerGround.position.x / 2;
        game.physics.arcade.collide(rob, layerGround);
        game.physics.arcade.collide(rob, uranium, collectUranium, null, this);
        input();
        recall();
        checkDeath();
        checkEnd();
    },

    render: function() {
        // game.debug.body(rob);
    }
};

function input() {
    jump();
    crouch();
    move();
}

function cleanPlay() {
    gui = [];
}