var SnakeGame = (function(){

  var SIZE = 30
  var SNAKESPEED = 100
  var SNAKEINTERVAL

  var Board = function(size){
    this.width = size;
    this.height = size;
    this.grid = [];
    //initialize grid
    var that = this
    _.times(size*size, function(){
      that.grid.push("_");
    })

    this.getPosition = function(coords){
      return this.grid[coords[0]+coords[1]*this.width];
    };

    this.setPosition = function(coords, elem){
      this.grid[coords[0]+coords[1]*this.width] = elem;
    };

    this.offBoard = function(coords){
      return coords[0] < 0 || coords[0] > this.width - 1  ||
             coords[1] < 0 || coords[1] > this.height - 1 ;
    }

    this.update = function(snakes){
      var that = this;
      this.clearBoard();
      _.each(snakes, function(snake, snakeNum){
        _.each(snake.bodyParts, function(bodyPart, index){
          var item = ""
          if (index === 0){
            item = "rattle"
          }
          else {
            item = "snake"
          }
          that.setPosition([bodyPart.xPos, bodyPart.yPos], item)
        })
      })
    }

    this.clearBoard = function(){
      var that = this;

      _.each(this.grid, function(elem, index){
        if (elem === "snake" || elem === "rattle"){
          that.grid[index] = "_";
        }
      })
    }

  }

  var Snake = function(board){
    this.bodyParts = [new SnakeElement(board.width/2 - 1, board.height/2),
                      new SnakeElement(board.width/2, board.height/2)]
    this.direction = [1,0];
    this.board = board;
    this.front = function(){
      return this.bodyParts[this.bodyParts.length - 1]
    };
    this.back = function(){
      return this.bodyParts[0];
    };

    this.setDirection = function(direc){
      if (this.direction[0] === direc[0]* -1 ||
          this.direction[1] === direc[1]* -1){
        this.direction = this.direction;
      }
      else {
        this.direction = direc;
      }
    };

    this.dead = function(){
      var front = this.front();
      var nextXSpot = front.xPos + this.direction[0];
      var nextYSpot = front.yPos + this.direction[1]
      return this.board.getPosition([nextXSpot, nextYSpot]) === "snake" ||
             this.board.offBoard([nextXSpot, nextYSpot]);
    };

    this.eat = function(){
      var front = this.front();
      var nextXSpot = front.xPos + this.direction[0];
      var nextYSpot = front.yPos + this.direction[1]
      return this.board.getPosition([nextXSpot, nextYSpot]) === "apple";
    };

    this.move = function(){
      var back = this.bodyParts.shift();
      var front = this.front();
      back.xPos = front.xPos + this.direction[0];
      back.yPos = front.yPos + this.direction[1];
      this.bodyParts.push(back);
    };

    this.grow = function(){
      var xPos = this.front().xPos + this.direction[0];
      var yPos = this.front().yPos + this.direction[1];
      var newPart = new SnakeElement(xPos, yPos);
      this.bodyParts.push(newPart);
    };
  };

  var SnakeElement = function(xPos, yPos){
    this.xPos = xPos;
    this.yPos = yPos;
  }

  var Game = function(){
    this.board = new Board(SIZE);
    this.snake = new Snake(this.board);
    this.snake2 = new Snake(this.board);
    this.snake2.direction = [-1, 0];
    this.snake2.move();
    this.snake2.move();
    this.snake2.move();
    this.snake2.move();
    this.east = false;
    this.west = false;
    this.north = false;
    this.south = false;
    this.east2 = false;
    this.west2 = false;
    this.north2 = false;
    this.south2 = false;
    this.score = 0;
    this.stop = false;
    this.losingSnake = 0

    this.nextMove = function(){
      var direc = this.snake.direction
      if (this.east){
        direc = [1,0];
      }
      else if(this.west){
        direc = [-1,0];
      }
      else if(this.south){
        direc = [0,-1];
      }
      else if(this.north){
        direc = [0,1];
      }
      this.snake.setDirection(direc);

      var direc2 = this.snake2.direction;

      if (this.east2){
        direc2 = [1,0];
      }
      else if(this.west2){
        direc2 = [-1,0];
      }
      else if(this.south2){
        direc2 = [0,-1];
      }
      else if(this.north2){
        direc2 = [0,1];
      }
      this.snake2.setDirection(direc2);
    }

    this.gameOver = function(deadSnake){
      this.snake = new Snake(this.board);
      this.snake.direction = [1,0];
      this.snake2 = new Snake(this.board);
      this.snake2.direction = [-1, 0];
      this.snake2.move();
      this.snake2.move();
      this.snake2.move();
      this.snake2.move();
      this.east = false;
      this.west = false;
      this.north = false;
      this.south = false;
      this.east2 = false;
      this.west2 = false;
      this.north2 = false;
      this.south2 = false;
      this.losingSnake = deadSnake;
      window.clearInterval(SNAKEINTERVAL);
      this.stop = true;
    };

    this.resetGame = function(){
      var that = this;
      SNAKEINTERVAL = window.setInterval(function(){
        that.step();
      }, SNAKESPEED);
      this.score = 0;
      this.stop = false;
      this.losingSnake = 0;
    };

    this.increaseSpeed = function(){
      var that = this;
      window.clearInterval(SNAKEINTERVAL);
      SNAKEINTERVAL = window.setInterval(function(){
        that.step();
      }, SNAKESPEED - that.score/2)
    }

    this.step = function(){
      this.nextMove();
      //snake 1
      if (this.snake.dead()){
        this.gameOver(1);
      }
      else if (this.snake2.dead()){
        this.gameOver(2);
      }

      this.snake.grow();
      this.snake2.grow();

      this.board.update([this.snake,this.snake2]);
    };

    this.start = function(){
      var that = this;
      that.board.update(this.snake);
      SNAKEINTERVAL = window.setInterval(function(){
        that.step();
      }, SNAKESPEED);
    };
  }

  return {
    Game: Game,
    size: SIZE
  };
})();