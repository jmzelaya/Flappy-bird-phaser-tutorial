var mainState = {
  //Will execute at the beginning
  preload: function () {
      game.load.image('bird', 'assets/bird.png');
  },

  //Called after preload
  create: function() {
      //Set the backgroundColor to blue
      game.stage.backgroundColor = '#72c5cf';

      //Set physics
      game.physics.startSystem(Phaser.Physics.ARCADE);

      //Display bird at position x=100 & y=245
      //                              |
      this.bird = game.add.sprite(100, 245, 'bird');

      //Add physics to the bird
      //Physics give the ability for: movements, gravity, collisions, etc.
      game.physics.arcade.enable(this.bird);

      // Enable gravity to the bird so it falls on the y-axis
      this.bird.body.gravity.y = 1000;

      //Call 'jump' function when spaceKey is pressed down
      var spaceKey = game.input.keyboard.addkey(
                      Phaser.Keyboard.SPACEBAR);
      spaceKey.onDown.add(this.jump, this);
  },

  //Contains game logic
  update: function () {
      //if bird's y axis is below OR above screen
      //Call 'restartGame' function
      if(this.bird.y < 0 || this.bird.y > 490)
         this.restartGame();
  },

  jump: function() {
    //Add vertical velocity to the bird (y-axis)
    this.bird.body.velocity.y = -350;
  },

  restartGame: function () {
    game.state.start('main');
  }

};

//Initializes Phaser         |
//    |         creates 400px by 490px game
var game = new Phaser.Game(400, 490);


//                 Add 'mainState'
//Call mainState 'main'    |
game.state.add('main', mainState);

//Start the game with 'main'
game.state.start('main');
