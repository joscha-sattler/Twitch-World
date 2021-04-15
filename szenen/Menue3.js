class Menue3 extends Phaser.Scene {


    constructor() {
        super({
            key: 'Menue3'
        });
    }



    preload() {


    }




    create() {

        // offline oben rechts in der Ecke
        this.add.text(this.game.renderer.width - 70, 10, 'offline');


        // Start- Text mit Mausevents ANFANG

        let start = this.add.text(this.game.renderer.width - 650, 180, 'Level 1 streamen!', {
            fontSize: '40px',
            fill: 'white'
        });

        start.setInteractive({
            useHandCursor: true
        });

        start.on('pointerover', () => {

            start.setColor('yellow');

        });


        start.on('pointerout', () => {

            start.setColor('white');

        });


        start.on('pointerdown', () => {
            lebensScore = 3;
            this.scene.stop('Menue3');
            this.scene.start('Level1');
            document.body.style.backgroundImage = "url('bilder/BackroundLive.png')";
            document.body.style.backgroundSize = 'cover';
        });

        // Start- Text mit Mausevents ENDE

        
        // Start- Text2 mit Mausevents ANFANG

        let start2 = this.add.text(this.game.renderer.width - 650, 265, 'Level 2 streamen!', {
            fontSize: '40px',
            fill: 'white'
        });

        start2.setInteractive({
            useHandCursor: true
        });

        start2.on('pointerover', () => {

            start2.setColor('yellow');

        });


        start2.on('pointerout', () => {

            start2.setColor('white');

        });


        start2.on('pointerdown', () => {
            lebensScore2 = 3;
            this.scene.stop('Menue3');
            this.scene.start('Level2');
            document.body.style.backgroundImage = "url('bilder/BackroundLive.png')";
            document.body.style.backgroundSize = 'cover';
        });

        
        // Start- Text3 mit Mausevents ANFANG
        
                let start3 = this.add.text(this.game.renderer.width - 650, 350, 'Level 3 streamen!', {
            fontSize: '40px',
            fill: 'white'
        });

        start3.setInteractive({
            useHandCursor: true
        });

        start3.on('pointerover', () => {

            start3.setColor('yellow');

        });


        start3.on('pointerout', () => {

            start3.setColor('white');

        });


        start3.on('pointerdown', () => {
            lebensScore3 = 3;
            this.scene.stop('Menue3');
            this.scene.start('Level3');
            document.body.style.backgroundImage = "url('bilder/BackroundLive.png')";
            document.body.style.backgroundSize = 'cover';
        });
        

    }


    



    updatde() {


    }

    
}