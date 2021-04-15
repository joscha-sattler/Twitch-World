
class GameOver2 extends Phaser.Scene {
    
    
    constructor() {
        super({key: 'GameOver2'});
    }
    
    
    
    preload() {
        
        
    }
    
    
    
    
    create(){
        
       backroundMusic2.muted = true;
        
        // Stream over
        
        this.add.text(this.game.renderer.width - 70, 10, 'offline');
        
        this.add.text(this.game.renderer.width - 750, 100, 'Stream Over!', {
            fontSize: '80px'
        });
        
        
                  // Level2 neu starten

        let neustart2 = this.add.text(this.game.renderer.width - 740, 280, 'Level 2 nochmal streamen?!', {
            fontSize: '35px',
            fill: 'white'
        });

        neustart2.setInteractive({
            useHandCursor: true
        });

        neustart2.on('pointerover', () => {

            neustart2.setColor('yellow');

        });


        neustart2.on('pointerout', () => {

            neustart2.setColor('white');

        });


        neustart2.on('pointerdown', () => {
            
            
            this.scene.stop('GameOver');
            lebensScore2 = 3;
            deathSound2.pause();
            this.scene.start('Level2');

        });
        
        
        // Zurück ins Menü
        
        let zurueckInsMenue2 = this.add.text(this.game.renderer.width - 630, 400, 'zum Dashboard?!',
                                            
                                {fontSize: '35px', fill: 'white'});
        
        
        zurueckInsMenue2.setInteractive({useHandCursor: true});
        
        
        zurueckInsMenue2.on("pointerover", ()=> {
            
             zurueckInsMenue2.setColor('yellow');
        });
                           
        
        zurueckInsMenue2.on('pointerout', () => { 
                
            zurueckInsMenue2.setColor('white');
        
        });                   
                           
        
        zurueckInsMenue2.on("pointerdown", ()=> {

            this.scene.stop('GameOver2');
            deathSound2.pause();
            this.scene.start('Menue');
        })
        
        
    }
    
    
    
    
    
    updatde() {
        
        
    }
    
    
    
}