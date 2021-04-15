class Menuee extends Phaser.Scene{

  constructor() {
      super({
          key: 'MenueScreen'
      });
  }

preload(){

  this.load.spritesheet('KappaHover', 'bilder/KappaHover-sheet.png',{
    frameWidth: 1440,
    frameHeight: 1440
  });

  this.load.image('MenueScreen', 'bilder/FirstMenueScreen.png');

  this.load.image('PlayButton', 'bilder/play.png')
  }


create() {
  let bild = this.add.image(0,0, 'MenueScreen').setOrigin(0).setDepth(1);
  bild.setScale(10);

  let playButton = this.add.image(450,400, 'PlayButton').setDepth(2);
  playButton.setScale(10);

  let hoverKappa = this.add.sprite(300,390, 'KappaHover').setDepth(3);
  hoverKappa.setScale(0.045);
  hoverKappa.setVisible(false);

  //
  // this.anims.create({
  //   key: "kappa",
  //   frameRate: 4,
  //   repeat: -1,
  //   frames : this.anims.generateFrameNumbers("kappa",{
  //     start: 0, end: 8
  //     //frames: [1,2,3,4,,5,6,7,8,9]
  //   })
  // })



  playButton.setInteractive();

    playButton.on("pointerover",()=>{
      hoverKappa.setVisible(true);


    })

    playButton.on("pointerout", ()=>{
      hoverKappa.setVisible(false);

    })

    playButton.on("pointerup", ()=>{
      this.scene.start("Level1")
    })


}

update(){

}

}
