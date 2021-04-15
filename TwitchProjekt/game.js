
let config = {
  type: Phaser.AUTO,
  width: 920,
  height: 500,
  input: {
        gamepad: true
    },
  physics: {
      default: 'arcade',
      arcade: {
          gravity: {y: 500},
          debug: false
      }
  },
  scene:[ Menuee,Menue, Anleitung, Menue2, Menue3, Level1, Level2, Level3 , GameOver, GameOver2, GameOver3, Win],
  render: {
    pixelArt: true
  }
}

let game = new Phaser.Game(config);

let level1Geschafft = false;
let level2Geschafft = true;
