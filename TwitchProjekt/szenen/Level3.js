let spielerLayer3, spielerTiles3;
let boostTiles3, powerUpLayer3;
let boss3;
let boost3 = false;

let map3;
let player3;
let text3;
let timedEvent3;


let bosslaufen = false;
let groundTiles3, twitchTiles3, mauerTiles3, tuerTiles3, lavaTiles3, hintergrundTiles3, bitTiles3, schlüsselTiles3;
let groundLayer3, twitchLayer3, mauerLayer3, tuerLayer3, lavaLayer3, hintergrundLayer3, bitLayer3, schlüsselLayer3;
let schildLayer3, schildTiles3;

let bitText3, bitScore3 = 0;
let box3, boxText3, boxScore3 = 0;
let lebensText3, lebensScore3 = 3;
let deathSound3, backroundMusic3;

let schluessel = false;

class Level3 extends Phaser.Scene {


    constructor() {
        super({
            key: 'Level3'
        });
    }



    preload() {

        //Map
        this.load.tilemapTiledJSON('map3', 'maps/map3.json');


        //Hintergrund
        this.load.image('twitchwallpaper', 'bilder/twitchwallpaper.png');


        //Box
        this.load.image('twitch-Box35x35', 'bilder/twitch-Box35x35.png');


        // Bits
        this.load.image('bit', 'bilder/bit.png')

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

        //Spieler, Kappa
        this.load.spritesheet('spieler', 'bilder/kappa.png', {
            frameWidth: 43,
            frameHeight: 55
        });

        //Kugel

        this.load.image('boss', 'bilder/poggers.png');

        //Boost powerup

        this.load.image('boost', 'bilder/boost.png');

        //Schild

        this.load.image('Schild', 'bilder/Schild.png');

        //Schlüssel

        this.load.image('Schlüssel', 'bilder/Schlüssel.png')

        //Tuer
        this.load.image('Tuer', 'bilder/tuer.png');

    }




    create() {




        //Spielumgebung
        map3 = this.make.tilemap({
            key: 'map3'
        });


        //  hintergrundTiles = map.addTilesetImage('twitchwallpaper');
        mauerTiles3 = map3.addTilesetImage('testboden');
        spielerTiles3 = map3.addTilesetImage('testboden');
        boostTiles3 = map3.addTilesetImage('boost');
        schildTiles3 = map3.addTilesetImage('Schild');
        schlüsselTiles3 = map3.addTilesetImage('Schlüssel');

       //  twitchTiles = map.addTilesetImage('twitch-Box35x35');
       tuerTiles3 = map3.addTilesetImage('tuer');
       lavaTiles3 = map3.addTilesetImage('lava');
        //bitTiles = map.addTilesetImage('bit');

        //  groundTiles =  mao.addTilesetImage('LilaBox35x35');

        //hintergrundLayer = map.createDynamicLayer('Hintergrund', hintergrundTiles, 0, 0);
        mauerLayer3 = map3.createDynamicLayer('Boden', mauerTiles3, 0, 0);
        spielerLayer3 = map3.createDynamicLayer('SpielerBoden', spielerTiles3, 0,0);
        powerUpLayer3 = map3.createDynamicLayer('Powerups', boostTiles3, 0,0);
        schildLayer3 = map3.createDynamicLayer('Schilder', schildTiles3, 0,0);
        //twitchLayer = map.createDynamicLayer('Box', twitchTiles, 0, 0);
        tuerLayer3 = map3.createDynamicLayer('Tuer', tuerTiles3, 0, 0);
        lavaLayer3 = map3.createDynamicLayer('Lava', lavaTiles3, 0, 0);
        schlüsselLayer3 = map3.createDynamicLayer('Schlüssel', schlüsselTiles3, 0, 0);
        //bitLayer = map.createDynamicLayer('Bits', bitTiles, 0, 0); // 36 bits aktuell


        // Layer kollidierbar machen
        mauerLayer3.setCollisionByExclusion([-1]);
        spielerLayer3.setCollisionByExclusion([-1]);
        //twitchLayer.setCollisionByExclusion([-1]);
        lavaLayer3.setCollisionByExclusion([-1]);
     //   boss3.setCollisionByExclusion([-1]);

        //Spieler
        player3 = this.physics.add.sprite(450, 1200, 'spieler');
       // player3.setBounce(0.2);


        // Boss
        boss3 = this.physics.add.sprite(150,1170, 'boss');
        boss3.setScale(0.45);
        boss3.setSize(800, 840);
        boss3.setOffset(5,20);

        // kollisionen
        this.physics.add.collider(boss3, player3, bossHit);
        this.physics.add.collider(mauerLayer3, boss3);
        this.physics.add.collider(mauerLayer3, player3);
        this.physics.add.collider(spielerLayer3, player3);
        this.physics.add.collider(lavaLayer3, player3);



        //overlap
        //this.physics.add.overlap(boss3, player3, bossHit, null, this);
        this.physics.add.overlap(schildLayer3, player3);
        this.physics.add.overlap(schlüsselLayer3, player3);
        this.physics.add.overlap(powerUpLayer3, player3);
        //this.physics.add.overlap(twitchLayer, player3);
        //this.physics.add.overlap(bitLayer, player3);
        this.physics.add.overlap(tuerLayer3, player3);


        // Funktionen bei Kollision/Overlap

        //bitLayer.setTileIndexCallback(1050, sammelBit, this);
        lavaLayer3.setTileIndexCallback(2, lavaHit3, this);
        powerUpLayer3.setTileIndexCallback(3, boostPowerUp3, this);
        //twitchLayer.setTileIndexCallback(1, sammelBox, this);
        tuerLayer3.setTileIndexCallback(6, tuerOeffnen3, this);
        schildLayer3.setTileIndexCallback(4, laufen, this);
        schlüsselLayer3.setTileIndexCallback(5, schlüsselEinsammeln, this);

        // Tastaturerkennung
        cursors = this.input.keyboard.createCursorKeys();

        w = this.input.keyboard.addKey('W');
        a = this.input.keyboard.addKey('A');
        d = this.input.keyboard.addKey('D');


        //Kamera
        this.cameras.main.setBounds(0, 0, map3.widthInPixels, map3.heightInPixels);
        this.cameras.main.startFollow(player3);
        this.cameras.main.setBackgroundColor('#ccccff');




        //Anzeigen der Leben

        let leben3 = this.add.image(100, 20, 'leben');
        leben3.setScrollFactor(0);

        lebensText3 = this.add.text(121, 3, + lebensScore3, {
            fontSize: '40px',
            fill: 'white',
        });

        lebensText3.setScrollFactor(0);




        // Anzeige der Bits

        let bitimage3 = this.add.image(20, 20, 'bit');

        bitText3 = this.add.text(35, 3, + bitScore3, {
            fontSize: '40px',
            fill: 'white',
        });

        bitText3.setScrollFactor(0);

        bitimage3.setScrollFactor(0);


        // Twitch-Box Anzeige

        box3 = this.add.image(180, 20, 'twitch-Box35x35');
        box3.setScrollFactor(0);
        box3.setVisible(false);

        boxText3 = this.add.text(205, 3, bitScore3, {
            fontSize: '40px',
            fill: 'white'
        })

        boxText3.setScrollFactor(0);
        boxText3.setVisible(false);


        // Live-Anzeige oben rechts in der Ecke

        let live3 = this.add.text(this.game.renderer.width - 60, 10, 'LIVE');
        live3.setScrollFactor(0);

        let roterPunkt3 = this.add.image(this.game.renderer.width - 72, 17, 'roterPunkt');
        roterPunkt3.setScrollFactor(0);

        //Gamepad
        this.input.gamepad.once('down', function (pad, button, index) {



        gamepad = pad;


    }, this);

    text3 = this.add.text(100,1000);



        backroundMusic3 = new Audio();

        backroundMusic3.src = 'sounds/Backround3.mp3';
        backroundMusic3.volume = 0.2;
        backroundMusic3.play();
        backroundMusic3.loop = true;

    }





    update() {


      //boss Movement

      if(boss3.body.onFloor() && bosslaufen){
        boss3.body.setVelocityX(120);
      }


      //test
      if(boost3){
        timedEvent3 = this.time.delayedCall(5000, onEvent3, [], this);

      }





      if(gamepad)
      {

       if (gamepad.left || cursors.left.isDown || a.isDown)
       {
         if(boost3){
           player3.body.setVelocityX(-500);
         }else{
           player3.body.setVelocityX(-250);
         }
           player3.flipX = true;
       }
       else if (gamepad.right || cursors.right.isDown || d.isDown)

       {
         if(boost3){
           player3.body.setVelocityX(+500);
         }else{
           player3.body.setVelocityX(+250);
         }
           player3.flipX = false;
       } else {
         player3.body.setVelocityX(0);
       }

       if ((gamepad.B || w.isDown || cursors.up.isDown || cursors.space.isDown) && player3.body.onFloor())
       {
         player3.body.setVelocityY(-400);
         let jumpSound3 = new Audio();
         jumpSound3.src = 'sounds/jump2.wav';
         jumpSound3.volume = 0.2;
         jumpSound3.play();
       }
     } else



        // Spielerbewegung
        if (cursors.left.isDown || a.isDown) {
          if(boost3){
            player3.body.setVelocityX(-500);
          }else{
            player3.body.setVelocityX(-250);
          }
            player3.flipX = true;
        } else if (cursors.right.isDown || d.isDown) {
          if(boost3){
          player3.body.setVelocityX(500)
        }else{
            player3.body.setVelocityX(+250);
          }
            player3.flipX = false;
        } else {
            player3.setVelocityX(0);
        }

        if ((w.isDown || cursors.up.isDown || cursors.space.isDown) && player3.body.onFloor()) {
            player3.body.setVelocityY(-400);
            let jumpSound3 = new Audio();
            jumpSound3.src = 'sounds/jump2.wav';
            jumpSound3.volume = 0.2;
            jumpSound3.play();
        }

        if (cursors.space.isDown) {

        }

        if (lebensScore3 < 1) {

            deathSound3 = new Audio();
            deathSound3.src = 'sounds/death.mp3';
            deathSound3.play();

            this.scene.stop('Level3');
            this.scene.start('GameOver3');
            document.body.style.backgroundImage = "url('bilder/Backround.PNG')";
        }


    }



}

// Externe Funktionen
/*

function sammelBit(sprite, tile) {

    let collectBitSound = new Audio();
    collectBitSound.src = 'sounds/collectCoins.wav';
    collectBitSound.play();

    bitLayer.removeTileAt(tile.x, tile.y);

    bitScore = bitScore + 1;
    bitText.setText(bitScore);
}*/

/*
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





}*/


function lavaHit3(sprite, tile) {

    backroundMusic3.muted = true;

    player3.setTint(0xff0000);

    document.body.style.backgroundImage = "url('bilder/BackroundLive.png')";
    document.body.style.backgroundSize = 'cover';

    // Schrei-Sound
    let scream3 = new Audio();
    scream3.src = 'sounds/Scream+3.mp3'
    scream3.volume = 0.5;
    scream3.pause();
    scream3.play();

    // Lava-Sound
    let lavaSound3 = new Audio();
    lavaSound3.src = 'sounds/FastLava.mp3';
    lavaSound3.pause();
    lavaSound3.play();



    // Problem: Spieler kollidiert teilweise mit mehr als einem Layer, ergo werden mehr Leben abgezogen :/ !
    lebensScore3 -= 1;

    lebensText3.setText(lebensScore3);

    this.scene.start('Level3');
    boost3 = false;
    bosslaufen = false;
    bitScore3 = 0;
    boxScore3 = 0;

    box3.setVisible(false);
    boxText3.setVisible(false);






}

function boostPowerUp3 (sprite, tile) {
  if (boost == false){
    let boostSound3 = new Audio();
    boostSound3.src = 'sounds/boost.mp3'
    boostSound3.volume = 0.5;
    boostSound3.pause();
    boostSound3.play();
    boost3 = true;
    powerUpLayer3.removeTileAt(tile.x , tile.y)




}

  }

  function onEvent3 ()
{
  boost = false;
}

  function laufen(){
    bosslaufen= true;
  }

  function schlüsselEinsammeln(sprite, tile){
    schluessel=true;
    schlüsselLayer3.removeTileAt(tile.x , tile.y)
  }

  function tuerOeffnen3(sprite, tile) {

      if (schluessel) {

          backroundMusic3.muted = true;

          document.body.style.backgroundImage = "url('bilder/BackroundLive.png')";
          document.body.style.backgroundSize = 'cover';


          this.scene.stop('Level3');
          this.scene.start('Win');
}
}





function bossHit(sprite, tile) {

    backroundMusic3.muted = true;

    player3.setTint(0xff0000);

    document.body.style.backgroundImage = "url('bilder/BackroundLive.png')";
    document.body.style.backgroundSize = 'cover';

    // Schrei-Sound
    let scream3 = new Audio();
    scream3.src = 'sounds/Scream+3.mp3'
    scream3.volume = 0.5;
    scream3.pause();
    scream3.play();

    // Problem: Spieler kollidiert teilweise mit mehr als einem Layer, ergo werden mehr Leben abgezogen :/ !
    lebensScore3 -= 1;

    lebensText3.setText(lebensScore3);

    game.scene.start('Level3');
    boost3 = false;
    bosslaufen = false;
    bitScore3 = 0;
    boxScore3 = 0;

    box3.setVisible(false);
    boxText3.setVisible(false);





}
