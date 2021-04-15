// GLOBALE VARIABLEN //////////////
let map;
let groundTiles, twitchTiles, mauerTiles, tuerTiles, lavaTiles, hintergrundTiles, bitTiles;
let groundLayer, twitchLayer, mauerLayer, tuerLayer, lavaLayer, hintergrundLayer, bitLayer;

let bitText, bitScore = 0;
let box, boxText, boxScore = 0;
let lebensText, lebensScore = 3;

let gamepad;
let cursors;
let a, w, d;

let player;

let deathSound;

let endText;

let timedEvent;

let backroundMusic;

// GLOBALE VARIABLEN ENDE //////////

class Level1 extends Phaser.Scene {


    constructor() {
        super({
            key: 'Level1'
        });
    }



    preload() {

        //Map
        this.load.tilemapTiledJSON('map', 'maps/map.json');


        //Hintergrund
        this.load.image('twitchwallpaper', 'bilder/twitchwallpaper.png');


        //Box
        this.load.image('twitch-Box35x35', 'bilder/twitch-Box35x35.png');


        // Bits
        this.load.image('bit', 'bilder/bit.png');

        //Herz/Leben
        this.load.image('leben', 'bilder/herz.png');

        // roter Punkt
        this.load.image('roterPunkt', 'bilder/live_punkt.png');

        //Boden
        this.load.image('testboden', 'bilder/testboden.png');


        //Lava
        this.load.image('lava', 'bilder/lava.png');


        //Tür
        this.load.image('tuer', 'bilder/tuer.png');


        //Spieler, Lila Figur

        this.load.spritesheet('spieler2', 'bilder/spielerSpritesheet.png', {
            frameWidth: 54,
            frameHeight: 53
        });


        //Spieler, Kappa
        this.load.spritesheet('spieler', 'bilder/kappa.png', {
            frameWidth: 45,
            frameHeight: 55
        });

    }




    create() {


        //Spielumgebung
        map = this.make.tilemap({
            key: 'map'
        });


        hintergrundTiles = map.addTilesetImage('twitchwallpaper');
        mauerTiles = map.addTilesetImage('testboden');
        twitchTiles = map.addTilesetImage('twitch-Box35x35');
        tuerTiles = map.addTilesetImage('tuer');
        lavaTiles = map.addTilesetImage('lava');
        bitTiles = map.addTilesetImage('bit');

        //  groundTiles =  mao.addTilesetImage('LilaBox35x35');

        hintergrundLayer = map.createDynamicLayer('Hintergrund', hintergrundTiles, 0, 0);
        mauerLayer = map.createDynamicLayer('Boden', mauerTiles, 0, 0);
        twitchLayer = map.createDynamicLayer('Box', twitchTiles, 0, 0);
        tuerLayer = map.createDynamicLayer('Tuer', tuerTiles, 0, 0);
        lavaLayer = map.createDynamicLayer('Lava', lavaTiles, 0, 0);
        bitLayer = map.createDynamicLayer('Bits', bitTiles, 0, 0); // 36 bits aktuell


        // Layer kollidierbar machen
        mauerLayer.setCollisionByExclusion([-1]);
        twitchLayer.setCollisionByExclusion([-1]);
        lavaLayer.setCollisionByExclusion([-1]);
        tuerLayer.setCollisionByExclusion([-1]);


        // Spieler
        player = this.physics.add.sprite(100, 1650, 'spieler2', 0);
        player.setSize(30, 55);
        player.setOffset(18, -2);
        //  player.setBounce(0.2);

        // kollisionen
        this.physics.add.collider(mauerLayer, player);
        this.physics.add.collider(lavaLayer, player);
        this.physics.add.collider(tuerLayer, player);

        // overlap

        this.physics.add.overlap(twitchLayer, player);
        this.physics.add.overlap(bitLayer, player);



        // Funktionen bei Kollision/Overlap

        bitLayer.setTileIndexCallback(1050, sammelBit, this);
        lavaLayer.setTileIndexCallback(9, lavaHit, this);
        twitchLayer.setTileIndexCallback(1, sammelBox, this);
        tuerLayer.setTileIndexCallback(3, tuerOeffnen, this);

        // Tastaturerkennung
        cursors = this.input.keyboard.createCursorKeys();

        w = this.input.keyboard.addKey('W');
        a = this.input.keyboard.addKey('A');
        d = this.input.keyboard.addKey('D');


        //Kamera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(player);
        this.cameras.main.setBackgroundColor('#ccccff');




        //Anzeigen der Leben

        let leben = this.add.image(100, 20, 'leben');
        leben.setScrollFactor(0);

        lebensText = this.add.text(121, -245, +lebensScore, {
            fontSize: '40px',
            fill: 'white',
        });

        lebensText.setScrollFactor(0);




        // Anzeige der Bits

        let bitimage = this.add.image(20, 20, 'bit');

        bitText = this.add.text(35, -245, + bitScore, {
            fontSize: '40px',
            fill: 'white',
        });

        bitText.setScrollFactor(0);

        bitimage.setScrollFactor(0);


        // Twitch-Box Anzeige

        box = this.add.image(180, 20, 'twitch-Box35x35');
        box.setScrollFactor(0);
        box.setVisible(false);

        boxText = this.add.text(205, 3, bitScore, {
            fontSize: '40px',
            fill: 'white'
        })

        boxText.setScrollFactor(0);
        boxText.setVisible(false);


        // Live-Anzeige oben rechts in der Ecke

        let live = this.add.text(this.game.renderer.width - 60, -90, 'LIVE');
        live.setScrollFactor(0);

        let roterPunkt = this.add.image(this.game.renderer.width - 72, 17, 'roterPunkt');
        roterPunkt.setScrollFactor(0);

        //Text bei ungenügend Bits/Abonennten

        endText = this.add.text(this.game.renderer.width - 800, 228, 'HaHAA, nicht genug Bits oder Abonennten gesammelt! Versuchs erneut!', {
            fontSize: '20px',
            fill: 'white',
            fontWeight: '900'

        });

        endText.setVisible(false);
        endText.setScrollFactor(0);


        //Gamepad
        this.input.gamepad.once('down', function (pad, button, index) {



            gamepad = pad;


        }, this);


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



        backroundMusic = new Audio();

        backroundMusic.src = 'sounds/Backround1.mp3';
        backroundMusic.volume = 0.2;
        backroundMusic.play();
        backroundMusic.loop = true;

    }





    update() {



      if(gamepad)
      {

       if (gamepad.left || cursors.left.isDown || a.isDown)
       {
         player.setOffset(5, -2);
         player.body.setVelocityX(-250);
         player.anims.play('rechts', true);
         player.flipX = true;
       }
       else if (gamepad.right || cursors.right.isDown || d.isDown)

       {
         player.setOffset(18, -2);
         player.body.setVelocityX(+250);
         player.anims.play('rechts', true);
         player.flipX = false;
       } else {
         player.setVelocityX(0);
         player.anims.play('stand', true);
       }

       if ((gamepad.B || w.isDown || cursors.up.isDown || cursors.space.isDown) && player.body.onFloor())
       {
         player.body.setVelocityY(-400);
         let jumpSound = new Audio();
         jumpSound.src = 'sounds/jump2.wav';
         jumpSound.volume = 0.2;
         jumpSound.play();
       }
     } else


            // Spielerbewegung
            if (cursors.left.isDown || a.isDown /*|| gamepad.left.isDown*/ ) {
                player.setOffset(5, -2);
                player.body.setVelocityX(-250);
                player.anims.play('rechts', true);
                player.flipX = true;
            } else if (cursors.right.isDown || d.isDown) {
            player.setOffset(18, -2);
            player.body.setVelocityX(+250);
            player.anims.play('rechts', true);
            player.flipX = false;

        } else {
            player.setVelocityX(0);
            player.anims.play('stand', true);
        }

        if ((w.isDown || cursors.up.isDown || cursors.space.isDown) && player.body.onFloor()) {
            player.body.setVelocityY(-400);
            let jumpSound = new Audio();
            jumpSound.src = 'sounds/jump2.wav';
            jumpSound.volume = 0.2;
            jumpSound.play();
        }

        if (!player.body.onFloor()) {

            player.anims.play('sprung', true);
        }

        if (lebensScore < 1) {

            deathSound = new Audio();
            deathSound.src = 'sounds/death.mp3';
            deathSound.play();

            backroundMusic.muted = true;

            this.scene.stop('Level1');
            this.scene.start('GameOver');
            document.body.style.backgroundImage = "url('bilder/Backround.PNG')";
        }


    }



}

// Externe Funktionen


function sammelBit(sprite, tile) {

    let collectBitSound = new Audio();
    collectBitSound.src = 'sounds/collectCoins.wav';
    collectBitSound.volume = 0.4;
    collectBitSound.play();

    bitLayer.removeTileAt(tile.x, tile.y);

    bitScore = bitScore + 1;
    bitText.setText(bitScore);
}

function sammelBox(sprite, tile) {


    twitchLayer.removeTileAt(tile.x, tile.y);
    box.setVisible(true);
    boxText.setVisible(true);

    boxScore += 1;
    boxText.setText(boxScore);

    let boxSound = new Audio();
    boxSound.src = 'sounds/claps3.mp3';
    boxSound.play();


    if (boxScore == 1) {

        document.body.style.backgroundImage = "url('bilder/BackroundLive1Abo.png')";
        document.body.style.backgroundSize = 'cover';


    } else if (boxScore == 2) {

        document.body.style.backgroundImage = "url('bilder/BackroundLive2Abo.png')";
        document.body.style.backgroundSize = 'cover';
    }




}

function lavaHit(sprite, tile) {

    backroundMusic.muted = true;

    player.setTint(0xff0000);

    document.body.style.backgroundImage = "url('bilder/BackroundLive.png')";
    document.body.style.backgroundSize = 'cover';

    // Schrei-Sound
    let scream = new Audio();
    scream.src = 'sounds/Scream+3.mp3'
    scream.volume = 0.5;
    scream.pause();
    scream.play();

    // Lava-Sound
    let lavaSound = new Audio();
    lavaSound.src = 'sounds/FastLava.mp3';
    lavaSound.pause();
    lavaSound.play();



    // Problem: Spieler kollidiert teilweise mit mehr als einem Layer, ergo werden mehr Leben abgezogen :/ !
    lebensScore -= 1;

    lebensText.setText(lebensScore);

    this.scene.start('Level1');

    bitScore = 0;
    boxScore = 0;

    box.setVisible(false);
    boxText.setVisible(false);


}


function tuerOeffnen(sprite, tile) {

    document.body.style.backgroundImage = "url('bilder/BackroundLive.png')";
    document.body.style.backgroundSize = 'cover';


    if ((bitScore >= 30 && boxScore >= 1) || boxScore == 2) {

        backroundMusic.muted = true;

        this.scene.stop('Level1');
        level1Geschafft = true;
        this.scene.start('Level2');
        /*        bitScore = 0;
                boxScore = 0;*/
        /*        box.setVisible(false);
                boxScore.setVisible(false);*/
    } else
        player.setTint(0xff0000);
        endText.setVisible(true);
        this.physics.pause();
        sprite.body.moves = false;

        timedEvent = this.time.delayedCall(4000, notEnoughBits, [], this);

}








function notEnoughBits() {

    backroundMusic.muted = true;

    lebensScore -= 1;

    lebensText.setText(lebensScore);

    this.scene.start('Level1');

    bitScore = 0;
    boxScore = 0;

    box.setVisible(false);
    boxText.setVisible(false);

}
