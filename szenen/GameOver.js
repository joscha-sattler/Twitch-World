
class GameOver extends Phaser.Scene {
    
    
    constructor() {
        super({key: 'GameOver'});
    }
    
    
    
    preload() {
        
        
    }
    
    
    
    
    create(){
        
        backroundMusic.muted = true;
        
        // Stream over
        
        this.add.text(this.game.renderer.width - 70, 10, 'offline');
        
        this.add.text(this.game.renderer.width - 750, 100, 'Stream Over!', {
            fontSize: '80px'
        });
        
        
                // Level1 neu starten

        let neustart = this.add.text(this.game.renderer.width - 740, 275, 'Level 1 nochmal streamen?!', {
            fontSize: '35px',
            fill: 'white'
        });

        neustart.setInteractive({
            useHandCursor: true
        });

        neustart.on('pointerover', () => {

            neustart.setColor('yellow');

        });


        neustart.on('pointerout', () => {

            neustart.setColor('white');

        });


        neustart.on('pointerdown', () => {
            
            
            this.scene.stop('GameOver');
            lebensScore = 3;
            deathSound.pause();
            this.scene.start('Level1');

        });
        
   
        
        // Zurück ins Menü
        
        let zurueckInsMenue = this.add.text(this.game.renderer.width - 630, 400, 'zum Dashboard?!',
                                            
                                {fontSize: '35px', fill: 'white'});
        
        
        zurueckInsMenue.setInteractive({useHandCursor: true});
        
        
        zurueckInsMenue.on("pointerover", ()=> {
            
             zurueckInsMenue.setColor('yellow');
        });
                           
        
        zurueckInsMenue.on('pointerout', () => { 
                
            zurueckInsMenue.setColor('white');
        
        });                   
                           
        
        zurueckInsMenue.on("pointerdown", ()=> {
            
          //  if (level2 == true && level3 == true){
            this.scene.stop('GameOver');
            deathSound.pause();
            this.scene.start('Menue');
/*            } else if (level2 == true && level3 == false) {
                this.scene.stop('GameOver');
            deathSound.pause();
            this.scene.start('Menue2');
            } else if (level2 == true && level3 == true) {
            this.scene.stop('GameOver');
            deathSound.pause();
            this.scene.start('Menue3');
            } else
                alert('Hallo');
            */
        })
        
        
        }
    
    
    
    
    
    updatde() {
        
        
    }
    
    
    
}