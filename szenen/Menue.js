class Menue extends Phaser.Scene {


    constructor() {
        super({
            key: 'Menue'
        });
    }



    preload() {


    }




    create() {

        // offline oben rechts in der Ecke
        this.add.text(this.game.renderer.width - 70, 10, 'offline');


        // Start- Text mit Mausevents ANFANG

        let start = this.add.text(this.game.renderer.width - 650, 120, 'Level 1 streamen!', {
            fontSize: '40px',
            fill: 'white'
        });

        start.setInteractive({
            useHandCursor: true
        });

        start.on('pointerover', () => {

            start.setColor('green');

        });


        start.on('pointerout', () => {

            start.setColor('white');

        });


        start.on('pointerdown', () => {
            lebensScore = 3;
            this.scene.stop('Menue');
            this.scene.start('Level1');
            document.body.style.backgroundImage = "url('bilder/BackroundLive.png')";
            document.body.style.backgroundSize = 'cover';
        });

        // Start- Text mit Mausevents ENDE


        // Start- Text2 mit Mausevents ANFANG

       let start2 = this.add.text(this.game.renderer.width - 650, 205, 'Level 2 streamen!', {
            fontSize: '40px',
            fill: 'white'
        });

        start2.setInteractive({
            useHandCursor: true
        });

        start2.on('pointerover', () => {

            if(level1Geschafft){
            start2.setColor('green');
            } else
               start2.setColor('red');

        });


        start2.on('pointerout', () => {

            start2.setColor('white');

        });


        start2.on('pointerdown', () => {
          if(level1Geschafft){
            lebensScore2 = 3;
            this.scene.stop('Menue');
            this.scene.start('Level2');
            document.body.style.backgroundImage = "url('bilder/BackroundLive.png')";
            document.body.style.backgroundSize = 'cover';
          }

        });


        // Start- Text3 mit Mausevents ANFANG

                let start3 = this.add.text(this.game.renderer.width - 650, 290, 'Level 3 streamen!', {
            fontSize: '40px',
            fill: 'white'
        });

        start3.setInteractive({
            useHandCursor: true
        });

        start3.on('pointerover', () => {
            
            if(level2Geschafft){
            start3.setColor('green');
            } else
               start3.setColor('red');
        });


        start3.on('pointerout', () => {

            start3.setColor('white');

        });


        start3.on('pointerdown', () => {
          if(level2Geschafft){
            lebensScore3 = 3;
            this.scene.stop('Menue');
            this.scene.start('Level3');
            document.body.style.backgroundImage = "url('bilder/BackroundLive.png')";
            document.body.style.backgroundSize = 'cover';
          }

        });

        
        // Anleitung

                let dieAnleitung = this.add.text(this.game.renderer.width - 700, 420, 'Steuerung / Anleitung!', {
            fontSize: '40px',
            fill: 'white'
        });

        dieAnleitung.setInteractive({
            useHandCursor: true
        });

        dieAnleitung.on('pointerover', () => {

            dieAnleitung.setColor('yellow');

        });


        dieAnleitung.on('pointerout', () => {

            dieAnleitung.setColor('white');

        });


        dieAnleitung.on('pointerdown', () => {
          
            this.scene.stop('Menue');
            this.scene.start('Anleitung');

          

        });


        

    }


    updatde() {


    }


}
