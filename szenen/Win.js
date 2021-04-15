class Win extends Phaser.Scene {


    constructor() {
        super({key: 'Win'});
    }



    preload() {


    }




    create(){



        backroundMusic3.muted = true;

        // Stream over

        this.add.text(this.game.renderer.width - 70, 10, 'offline');

        this.add.text(this.game.renderer.width - 750, 100, 'GEWONNEN!', {
            fontSize: '80px'
        });


                  // Level2 neu starten

        let neustart3 = this.add.text(this.game.renderer.width - 740, 280, 'Zurück zum Menue', {
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


            this.scene.stop('Level3');

            this.scene.start('Menue');

        });



    }





    updatde() {


    }



}
