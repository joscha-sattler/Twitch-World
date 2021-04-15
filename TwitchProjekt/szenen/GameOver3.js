
class GameOver3 extends Phaser.Scene {


    constructor() {
        super({key: 'GameOver3'});
    }



    preload() {


    }




    create(){



        backroundMusic3.muted = true;

        // Stream over

        this.add.text(this.game.renderer.width - 70, 10, 'offline');

        this.add.text(this.game.renderer.width - 750, 100, 'Stream Over!', {
            fontSize: '80px'
        });


                  // Level2 neu starten

        let neustart3 = this.add.text(this.game.renderer.width - 740, 280, 'Level 3 nochmal streamen?!', {
            fontSize: '35px',
            fill: 'white'
        });

        neustart3.setInteractive({
            useHandCursor: true
        });

        neustart3.on('pointerover', () => {

            neustart3.setColor('yellow');

        });


        neustart3.on('pointerout', () => {

            neustart3.setColor('white');

        });


        neustart3.on('pointerdown', () => {


            this.scene.stop('GameOver3');
            lebensScore3 = 3;
            deathSound3.pause();
            this.scene.start('Level3');

        });


        // Zurück ins Menü

        let zurueckInsMenue3 = this.add.text(this.game.renderer.width - 630, 400, 'zum Dashboard?!',

                                {fontSize: '35px', fill: 'white'});


        zurueckInsMenue3.setInteractive({useHandCursor: true});


        zurueckInsMenue3.on("pointerover", ()=> {

             zurueckInsMenue3.setColor('yellow');
        });


        zurueckInsMenue3.on('pointerout', () => {

            zurueckInsMenue3.setColor('white');

        });


        zurueckInsMenue3.on("pointerdown", ()=> {
            lebensScore3 = 3;
            this.scene.stop('GameOver3');
            deathSound3.pause();
            this.scene.start('Menue');
        })


    }





    updatde() {


    }



}
