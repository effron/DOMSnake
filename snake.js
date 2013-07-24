var us = require("./underscore.js");

var SnakeGame = (function(){

  var SIZE = 10

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
      this.grid[coords[0]+coords[1]*this.width];
    };

    this.setPosition = function(coords, elem){
      this.grid[coords[0]+coords[1]*this.width] = elem;
    };

    this.offBoard = function(coords){
      return coords[0] < 0 || coords[0] > this.width ||
             coords[1] < 0 || coords[1] > this.height;
    }

    this.addApple = function(){
      var openPositions = []
      _.each(this.grid, function(pos, index){
        if (pos === "_"){
          openPositions.push(index);
        }
      });
      this.grid[openPositions[_.random(0,openPositions.length)]] = "apple"
    }

    this.update = function(snake){
      var that = this;
      this.clearBoard();
      _.each(snake.bodyParts, function(bodyPart){
        that.setPosition([bodyPart.xPos, bodyPart.yPos], "snake")
      })
    }

    this.clearBoard = function(){
      var that = this;

      _.each(this.grid, function(elem, index){
        if (elem === "snake"){
          that.grid[index] = "_";
        }
      })
    }

    this.printBoard = function(){
      var that = this;
      boardString = "";
      _.each(this.grid, function(el, index){
        if (index % that.width === 0){
          boardString += "\n"
        }

        if (el === "apple")
          boardString += "a";
        else if(el === "snake")
          boardString += "s";
        else
          boardString += "_";
      })

      return boardString
    }

    //add initial apple

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
      return this.board.getPosition([front.xPos, front.yPos]) === "snake" ||
             this.board.offBoard([front.xPos, front.yPos]);
    }

    this.eat = function(){
      var front = this.front();
      return this.board.getPosition([front.xPos, front.yPos]) === "apple";
    }

    this.move = function(){
      var back = this.bodyParts.shift();
      var front = this.front();
      back.xPos = front.xPos + this.direction[0];
      back.yPos = front.yPos + this.direction[1];
      this.bodyParts.push(back);
    }

    this.grow = function(){
      var xPos = this.front().xPos + this.direction[0];
      var yPos = this.front().yPos + this.direction[1];
      var newPart = new SnakeElement(xPos, yPos);
      this.bodyParts.push(newPart);
    }


  }

  var SnakeElement = function(xPos, yPos){
    this.xPos = xPos;
    this.yPos = yPos;
  }



  var Game = function(){
    this.board = new Board(SIZE);
    this.snake = new Snake(this.board);
    this.east = false;
    this.west = false;
    this.north = false;
    this.south = false;
    this.gameOver = false;

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
    }

    this.step = function(){
      this.nextMove();
      if (this.snake.eat()){
        this.snake.grow();
        this.board.addApple();
      }
      else {
        this.snake.move();
      }
      this.board.update(this.snake);
      if (this.snake.dead){
        this.gameOver = true;
      }
    };

    this.start = function(){
      var that = this;
      that.board.update(this.snake);
      that.board.addApple();
      window.setInterval(function(){
        that.step();
      }, 2000);
    };
  }

  return {
    Game: Game
  };
})();