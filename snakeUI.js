var game = new SnakeGame.Game()
game.start();
var run_step = function(){
  $('pre').html(game.board.printBoard())
}
$(function(){
  $(document).keydown(function(event){
    if (event.keyCode === 38){
      game.north = true;
      game.south = false;
      game.east = false;
      game.west = false;
    }
    else if(event.keyCode === 40){
      game.nort = false;
      game.south = true;
      game.east = false;
      game.west = false;
    }
    else if(event.keyCode === 37){
      game.nort = false;
      game.south = false;
      game.east = false;
      game.west = true;
    }
    else if(event.keyCode === 39){
      game.nort = false;
      game.south = false;
      game.east = true;
      game.west = false;
    }
  })
  window.setInterval(run_step, 16)
});

