var mainState = {
  //Will execute at the beginning
  preload: function () {
      game.load.image('bird', 'assets/bird.png');
      game.load.image('pipe', 'assets/pipe.png');
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
        var spaceKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);


       //Create an empty group of pipes
       this.pipes = game.add.group();

       //Create a timer which calles the "addRowOfPipes" function
       //every 1.5 seconds
       this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

       //Set starting score to 0
       this.score = 0;

       //labelScore will display the score text
       this.labelScore = game.add.text(20, 20, "0",
            { font: "30px Arial", fill: '#ffffff' });

  },

  //Contains game logic
  update: function () {
      //if bird's y axis is below OR above screen
      //Call 'restartGame' function
      if(this.bird.y < 0 || this.bird.y > 490)
         this.restartGame();

      //Add overlap (collision) physics
      game.physics.arcade.overlap(
          //when the bird overlaps with a pipe restartGame
          this.bird, this.pipes, this.restartGame, null, this);
  },

  jump: function() {
    //Add vertical velocity to the bird (y-axis)
    this.bird.body.velocity.y = -350;
  },

  restartGame: function () {
    game.state.start('main');
  },

  //Function to add A pipe taking x and y as params
  addOnePipe: function(x, y) {
      //Create pipe at the x and y position
      var pipe = game.add.sprite(x, y, 'pipe');

      //Add pipe to the pipe group
      this.pipes.add(pipe);

      //Enable physics to the pipe
      game.physics.arcade.enable(pipe);

      //Add velocity to pipe to make it move left
      pipe.body.velocity.x = -200;

      //Automatically 'kill' pipe when it is no longer visible
      pipe.checkWorldBounds = true;
      pipe.outOfBoundsKill = true;
  },

  addRowOfPipes: function() {
      //Randomly choose number between 1 and 5
      //Chosen number will the the "hole" position
      var hole = Math.floor(Math.random() * 5) + 1;

      for(var i = 0; i < 8; i++)
          //If i is NOT equal to hole (defined above)
          //AND i is NOT equal to hole plus 1
          if(i != hole && i != hole + 1)
            //Then add a pipe at this location
            //                    vvvvvvvvv
            this.addOnePipe(600, i * 60 + 10);

      //When a new pipe is created,
      //increase the score by 1
      this.score += 1;
      //Update labelScore with cuurent score
      this.labelScore.text = this.score;
  },
};

//Initializes Phaser         |
//    |         creates 400px by 490px game
var game = new Phaser.Game(600, 490);


//                 Add 'mainState'
//Call mainState 'main'    |
game.state.add('main', mainState);

//Start the game with 'main'
game.state.start('main');
