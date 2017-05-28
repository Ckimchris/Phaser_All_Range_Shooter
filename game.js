var game = new Phaser.Game(800,600, Phaser.AUTO, 'phaser-demo', {preload: preload, create: create, update: update, render: render});

var player;
var starfield;
var cursors;
var bank;
var shipTrail;
var bullets;
var fireButton;
var bulletVelocity;

var ACCLERATION = 600;
var DRAG = 400;
var MAXSPEED = 400;

function preload() {
        game.load.image('starfield', 'assets/starfield.png');
        game.load.image('ship', 'assets/player.png');
        game.load.image('bullet', 'assets/bullet.png');
   }

function create() {
    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    //  The hero!
    player = game.add.sprite(400, 500, 'ship');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
    player.body.drag.setTo(DRAG, DRAG);

    //  And some controls to play the game with
    cursors = game.input.keyboard.createCursorKeys();

    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //  Add an emitter for the ship's trail
    shipTrail = game.add.emitter(player.x, player.y + 10, 400);
    shipTrail.width = 10;
    shipTrail.setXSpeed(30, -30);
    shipTrail.setYSpeed(200, 180);
    shipTrail.setRotation(50,-50);
    shipTrail.setAlpha(1, 0.01, 800);
    shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
    shipTrail.start(false, 5000, 10);

    //  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(1000, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
}

function update() {
    //  Scroll the background
    starfield.tilePosition.y += 2;

    //  Reset the player, then check for movement keys
    player.body.acceleration.x = 0;
    player.body.acceleration.y = 0;

    //  Fire bullet
    if (fireButton.isDown || game.input.activePointer.isDown) {
        fireBullet();
    }

        //  Stop at screen edges
    if (player.x > game.width - 10) {
        player.x = game.width - 10;
        player.body.acceleration.x = 0;
    }
    if (player.x < 10) {
        player.x = 10;
        player.body.acceleration.x = 0;
    }

    if (player.y > game.height - 10) {
        player.y = game.height - 10;
        player.body.acceleration.y = 0;
    }
    if (player.y < 10) {
        player.y = 10;
        player.body.acceleration.y = 0;
    }

    if (cursors.left.isDown)
    {
        player.body.acceleration.x = -ACCLERATION;
        player.angle = -90;

        

    }
    else if (cursors.right.isDown)
    {
        player.body.acceleration.x = ACCLERATION;
        player.angle = 90;

    }
    
    if(cursors.up.isDown)
    {
        player.body.acceleration.y = -ACCLERATION;
        player.angle = 0;

    }
    else if(cursors.down.isDown)
    {
        player.body.acceleration.y = ACCLERATION;
        player.angle = 180;
    }

    if(cursors.up.isDown && cursors.left.isDown)
    {
        player.angle = -45;
    }
    else if(cursors.up.isDown && cursors.right.isDown)
    {
        player.angle = 45;
    }
    else if(cursors.down.isDown && cursors.left.isDown)
    {
        player.angle = -135;
    }
    else if(cursors.down.isDown && cursors.right.isDown)
    {
        player.angle = 135;
    }

    shipTrail.x = player.x;
    shipTrail.y = player.y;

    //  Squish and rotate ship for illusion of "banking"
    /*
    bank = player.body.velocity.x / MAXSPEED;
    player.scale.x = 1 - Math.abs(bank) / 2;
    player.angle = bank * 10;
    */
}

function fireBullet() {
    //  Grab the first bullet we can from the pool
    var bullet = bullets.getFirstExists(false);

    if (bullet)
    {
        //  And fire it
        bullet.reset(player.x, player.y);
        bullet.angle = player.angle;
        if(player.angle == 0)
        {
            bullet.body.velocity.y = -400;
        }
        else if(player.angle == 90)
        {
            bullet.body.velocity.x = 400;
        }
        else if(player.angle == -90)
        {
            bullet.body.velocity.x = -400;
        }
        else if(player.angle == -180)
        {
            bullet.body.velocity.y = 400;
        }
        else if(player.angle == -45)
        {
            bullet.body.velocity.x = -400;
            bullet.body.velocity.y = -400;
        }
        else if(player.angle == 45)
        {
            bullet.body.velocity.x = 400;
            bullet.body.velocity.y = -400;
        }
        else if(player.angle == -135)
        {
            bullet.body.velocity.x = -400;
            bullet.body.velocity.y = 400;
        }
        else if(player.angle == 135)
        {
            bullet.body.velocity.x = 400;
            bullet.body.velocity.y = 400;
        }
    }
}



function render() {

}

