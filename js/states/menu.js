var levelSelector = 0;
var nbLevel = 3;
var moving = false;
var robot;
var levelNameText;

var menuState = {

    create: function() {

        background = game.add.sprite(0, 0, "menuBackground");
        background.scale.x = 2;
        background.scale.y = 2;

        levelNameText = game.add.bitmapText(32, 32, 'SullyVerge', levelNames[levelSelector])
        initSprite(levelNameText, [0, 0.5])

        robot = game.add.sprite(platformPosition[levelSelector][0] * 2, platformPosition[levelSelector][1] * 2, "robot", 15);
        initSprite(robot, [0.5, 0.94]);
        robot.scale.x = 2;
        robot.scale.y = 2;

    },

    update: function() {
        if (spaceKey.isDown) {
            start();
        }
        if (!moving && (rightKey.isDown || leftKey.isDown || upKey.isDown || downKey.isDown)) {
            key = 0;
            if (downKey.isDown) {
                key = 1;
            } else if (leftKey.isDown) {
                key = 2;
            } else if (rightKey.isDown) {
                key = 3;
            }
            if (roads[levelSelector][key] != -1 && !moving) {
                newLevelSelector = roads[levelSelector][key];
                levelNameText.text = levelNames[newLevelSelector];
                moving = true;
                tween = game.add.tween(robot).to({
                    x: robot.x + (platformPosition[newLevelSelector][0] - platformPosition[levelSelector][0]) * 2,
                    y: robot.y + (platformPosition[newLevelSelector][1] - platformPosition[levelSelector][1]) * 2
                }, 250, Phaser.Easing.Cubic.InOut, true);
                levelSelector = newLevelSelector;
                tween.onComplete.add(stopMoving);
            }
        }
    }

}

function start() {
    game.state.start("play");
}

function stopMoving() {
    moving = false;
}