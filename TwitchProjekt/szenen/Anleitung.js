class Anleitung extends Phaser.Scene {


    constructor() {
        super({
            key: 'Anleitung'
        });
    }



    preload() {


    }




    create() {

        // offline oben rechts in der Ecke
        this.add.text(this.game.renderer.width - 70, 10, 'offline');


            // zurück ins Menü

    let zurueck = this.add.text(this.game.renderer.width - 900, 10, 'zurück');

        zurueck.setInteractive({
            useHandCursor: true
        });

         zurueck.on('pointerover', () => {

            zurueck.setColor('yellow');

        });


        zurueck.on('pointerout', () => {

            zurueck.setColor('white');

        });


        zurueck.on('pointerdown', () => {

            this.scene.stop('Anleitung');
            this.scene.start('Menue');



        });

        this.add.text(this.game.renderer.width - 720, 100, 'Steuerung: Pfeiltasten(oben, links, rechts) oder W,A,D');

        this.add.text(this.game.renderer.width - 720, 130, 'zusätzlich ist springen auch mit Leertaste möglich!');

        this.add.text(this.game.renderer.width - 720, 220, 'Ziel: \n \n bewältigen Sie den Parkour mit weniger als drei Versuchen, \n um das nächste Level freizuschalten! Achtung: Sammeln Sie \n zu wenig  Bits oder Abonennten, dann verlieren Sie am Ende \n des Levels ein Leben  und Starten das Level neu! \n \n Level 3 sollte selbsterklärend sein.  \n Kurz endkommen Sie dem Boss! ');


    }







    updatde() {


    }


}
