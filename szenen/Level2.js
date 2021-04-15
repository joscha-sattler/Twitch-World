// GLOBALE VARIABLEN //////////////

let map2;

let groundTiles2, twitchTiles2, mauerTiles2, tuerTiles2, lavaTiles2, hintergrundTiles2, bitTiles2;
let groundLayer2, twitchLayer2, mauerLayer2, tuerLayer2, lavaLayer2, hintergrundLayer2, bitLayer2;
let lavaMitteLayer2, lavaMitteTiles2;

let bitText2, bitScore2 = 0;
let box2, boxText2, boxScore2 = 0;
let lebensText2, lebensScore2 = 3;

let backroundMusic2;

/*let cursors;
let a, w, d;*/


let player2;

let deathSound2;

let endText2;
let timedEvent2;


// GLOBALE VARIABLEN ENDE //////////


class Level2 extends Phaser.Scene {


    constructor() {
        super({
            key: 'Level2'
        });
    }



    preload() {

        // Map
        this.load.tilemapTiledJSON('map2', 'maps/map2.json');


        // Hintergrund
        this.load.image('TileSet', 'bilder/TileSet.png');


        // Box
        this.load.image('twitch-Box35x35', 'bilder/twitch-Box35x35.png');

        // Bits
        this.load.image('bit', 'bilder/bit.png')

        //Herz/Leben
        this.load.image('leben', 'bilder/herz.png');

        // roter Punkt
        this.load.image('roterPunkt', 'bilder/live_punkt.png');

        // Boden
        this.load.image('Boden', 'bilder/testboden.png');


        // Lava
        this.load.image('Lava', 'bilder/lava.png');

        // LavaMitte
        this.load.image('lavaMitte', 'bilder/lavaMitte.png');

        // Tür
        this.load.image('Tuer', 'bilder/tuer.png');

        // Spieler, Kappa
        this.load.spritesheet('spieler', 'bilder/kappa.png', {
            frameWidth: 43,
            frameHeight: 55
        });

        // Spieler, Lila Figur
         this.load.spritesheet('spieler2', 'bilder/spielerSpritesheet.png', {
            frameWidth: 54,
            frameHeight: 53
        });

    }




    create() {

        //Spielumgebung
        map2 = this.make.tilemap({
            key: 'map2'
        });


        hintergrundTiles2 = map2.addTilesetImage('TileSet');
        mauerTiles2 = map2.addTilesetImage('Boden');
        twitchTiles2 = map2.addTilesetImage('twitch-Box35x35');
        tuerTiles2 = map2.addTilesetImage('Tuer', );
        lavaTiles2 = map2.addTilesetImage('Lava');
        lavaMitteTiles2 = map2.addTilesetImage('lavaMitte');
        bitTiles2 = map2.addTilesetImage('bit');

        hintergrundLayer2 = map2.createDynamicLayer('Hintergrund', hintergrundTiles2, 0, 0);
        mauerLayer2 = map2.createDynamicLayer('Boden', mauerTiles2, 0, 0);
        twitchLayer2 = map2.createDynamicLayer('Box', twitchTiles2, 0, 0);
        tuerLayer2 = map2.createDynamicLayer('Tuer', tuerTiles2, 0, 0);
        lavaLayer2 = map2.createDynamicLayer('Lava', lavaTiles2, 0, 0);
        lavaMitteLayer2 = map2.createDynamicLayer('lavaMitte', lavaMitteTiles2, 0, 0);
        bitLayer2 = map2.createDynamicLayer('Bit', bitTiles2, 0, 0);

        mauerLayer2.setCollisionByExclusion([-1]);
        twitchLayer2.setCollisionByExclusion([-1]);
        lavaLayer2.setCollisionByExclusion([-1]);
        tuerLayer2.setCollisionByExclusion([-1]);

        //Spieler
        player2 = this.physics.add.sprite(50, 1600, 'spieler2');
        player2.setSize(30, 55);
        player2.setOffset(18, -2);
       // player2.setBounce(0.2);


        // kollisionen für den Spieler
        this.physics.add.collider(mauerLayer2, player2);
        this.physics.add.collider(lavaLayer2, player2);
        
        this.physics.add.overlap(tuerLayer2, player2);
        this.physics.add.overlap(twitchLayer2, player2);
        this.physics.add.overlap(bitLayer2, player2);


        lavaLayer2.setTileIndexCallback(8, lavaHit2, this);
        twitchLayer2.setTileIndexCallback(1305, sammelBox2, this);
        tuerLayer2.setTileIndexCallback(2, tuerOeffnen2, this);
        bitLayer2.setTileIndexCallback(1308, sammelBit2, this);

        // Tastaturerkennung
        cursors = this.input.keyboard.createCursorKeys();

        w = this.input.keyboard.addKey('W');
        a = this.input.keyboard.addKey('A');
        d = this.input.keyboard.addKey('D');


        //Kamera
        this.cameras.main.setBounds(0, 0, map2.widthInPixels, map2.heightInPixels);
        this.cameras.main.startFollow(player2);
        this.cameras.main.setBackgroundColor('#ccccff');


        // Twitch-Box Anzeige

        box2 = this.add.image(180, 20, 'twitch-Box35x35');
        box2.setScrollFactor(0);
        box2.setVisible(false);

        boxText2 = this.add.text(205, 3, +bitScore2, {
            fontSize: '40px',
            fill: 'white'
        })

        boxText2.setScrollFactor(0);
        boxText2.setVisible(false);

        //Anzeigen der Leben

        let leben2 = this.add.image(100, 20, 'leben');
        leben2.setScrollFactor(0);

        lebensText2 = this.add.text(121, 3, +lebensScore2, {
            fontSize: '40px',
            fill: 'white',
        });

        lebensText2.setScrollFactor(0);

        // roter Punkt oben rechts in der Ecke

        let live = this.add.text(this.game.renderer.width - 60, 10, 'LIVE');
        live.setScrollFactor(0);

        let roterPunkt = this.add.image(this.game.renderer.width - 72, 17, 'roterPunkt');
        roterPunkt.setScrollFactor(0);




        // Anzeige der Bits

        let bitimage2 = this.add.image(20, 20, 'bit');

        bitText2 = this.add.text(35, 3, +bitScore2, {
            fontSize: '40px',
            fill: 'white',
        });

        bitText2.setScrollFactor(0);

        bitimage2.setScrollFactor(0);


        //Backroundmusic


        backroundMusic2 = new Audio();

        backroundMusic2.src = 'sounds/Backround2.mp3';
        backroundMusic2.volume = 0.2;
        backroundMusic2.play();
        backroundMusic2.loop = true;

        
        
        //Text bei ungenügend Bits/Abonennten

        endText2 = this.add.text(this.game.renderer.width - 660, 110, 'HaHAA, nicht genug Bits oder Abonennten gesammelt! Versuchs erneut!', {
            fontSize: '14px',
            fill: 'red',
            fontWeight: '900'

        });

        endText2.setVisible(false);
        endText2.setScrollFactor(0);
        
        // Animation

        this.anims.create({
            key: 'rechts',
            frames: this.anims.generateFrameNumbers('spieler2', {
                start: 0,
                end: 15
            }),
            frameRate: 23,
            //repeat: -1
        });

        this.anims.create({
            key: 'stand',
            frames: this.anims.generateFrameNumbers('spieler2', {
                start: 13,
                end: 13
            }),

        });


        this.anims.create({
            key: 'sprung',
            frames: this.anims.generateFrameNumbers('spieler2', {
                start: 2,
                end: 2
            }),

        });


        //Gamepad

        this.input.gamepad.once('down', function (pad, button, index) {


            gamepad = pad;


        }, this);

    }

    update() {
        //Gamepad steuerung
        if(gamepad)
        {

         if (gamepad.left || cursors.left.isDown || a.isDown)
         {
             player2.body.setVelocityX(-250);
             player2.flipX = true;
         }
         else if (gamepad.right || cursors.right.isDown || d.isDown)

         {
             player2.body.setVelocityX(+250);
             player2.flipX = false;
         } else {
           player2.body.setVelocityX(0);
         }

         if ((gamepad.B || w.isDown || cursors.up.isDown || cursors.space.isDown) && player2.body.onFloor())
         {
             player2.body.setVelocityY(-400);
         }
       } else


            // Spielerbewegung
            if (cursors.left.isDown || a.isDown) {
                 player2.setOffset(5, -2);
                player2.body.setVelocityX(-250);
                player2.anims.play('rechts', true);
                player2.flipX = true;

            } else if (cursors.right.isDown || d.isDown) {
            player2.setOffset(18, -2);
            player2.body.setVelocityX(+250);
            player2.anims.play('rechts', true);
            player2.flipX = false;
        } else {
            player2.setVelocityX(0);
            player2.anims.play('stand', true);
        }

        if ((w.isDown || cursors.up.isDown || cursors.space.isDown) && player2.body.onFloor()) {
            player2.body.setVelocityY(-400);
            let jumpSound2 = new Audio();
            jumpSound2.src = 'sounds/jump2.wav';
            jumpSound2.volume = 0.2;
            jumpSound2.play();
        }

        if(!player2.body.onFloor()) {
            player2.anims.play('sprung', true);
        }


        if (lebensScore2 < 1) {

            backroundMusic2.muted = true;

            deathSound2 = new Audio();
            deathSound2.src = 'sounds/death.mp3';
            deathSound2.play();

            this.scene.stop('Level2');
            this.scene.start('GameOver2');
            document.body.style.backgroundImage = "url('bilder/Backround.PNG')";
        }

    }

}

// Externe Funktionen

function sammelBit2(sprite, tile) {

    let collectBitSound2 = new Audio();
    collectBitSound2.src = 'sounds/collectCoins.wav';
    collectBitSound2.play();

    bitLayer2.removeTileAt(tile.x, tile.y);

    bitScore2 = bitScore2 + 1;
    bitText2.setText(bitScore2);
}


function sammelBox2(sprite, tile) {


    twitchLayer2.removeTileAt(tile.x, tile.y);
    box2.setVisible(true);
    boxText2.setVisible(true);

    boxScore2 += 1;
    boxText2.setText(boxScore2);

    let boxSound2 = new Audio();
    boxSound2.src = 'sounds/claps3.mp3';
    boxSound2.play();


    if (boxScore2 == 1) {

        document.body.style.backgroundImage = "url('bilder/BackroundLivelvl2_1Abo.png')";
        document.body.style.backgroundSize = 'cover';


    } else if (boxScore2 == 2) {

        document.body.style.backgroundImage = "url('bilder/BackroundLivelvl2_2Abo.png')";
        document.body.style.backgroundSize = 'cover';
    }



}

function lavaHit2(sprite, tile) {

    backroundMusic2.muted = true;

    player2.setTint(0xff0000);
    document.body.style.backgroundImage = "url('bilder/BackroundLive.png')";
    document.body.style.backgroundSize = 'cover';

    // Schrei-Sound
    let scream2 = new Audio();
    scream2.src = 'sounds/Scream+3.mp3'
    scream2.volume = 0.5;
    scream2.pause();
    scream2.play();

    // Lava-Sound
    let lavaSound2 = new Audio();
    lavaSound2.src = 'sounds/FastLava.mp3';
    lavaSound2.pause();
    lavaSound2.play();


    lebensScore2 -= 1;

    lebensText2.setText(lebensScore2);

    this.scene.start('Level2');

    bitScore2 = 0;
    boxScore2 = 0;

    box2.setVisible(false);
    boxText2.setVisible(false);
}

function tuerOeffnen2(sprite, tile) {

    if ((bitScore2 >= 20 || boxScore2 == 2 || (boxScore2 >= 1 && bitScore2 >= 17))) {

        backroundMusic2.muted = true;

        document.body.style.backgroundImage = "url('bilder/BackroundLive.png')";
        document.body.style.backgroundSize = 'cover';


        this.scene.stop('Level2');
        level2Geschafft = true;
        this.scene.start('Level3');

    } else
        
        player2.setTint(0xff0000);
        endText2.setVisible(true);
        this.physics.pause();

        timedEvent2 = this.time.delayedCall(4000, notEnoughBits2, [], this);

}


function notEnoughBits2() {

    backroundMusic2.muted = true;

    lebensScore2 -= 1;

    lebensText2.setText(lebensScore);

    this.scene.start('Level2');

    bitScore2 = 0;
    boxScore2 = 0;

    box2.setVisible(false);
    boxText2.setVisible(false);

}
