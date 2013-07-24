var game = new SnakeGame.Game()
game.start();
var run_step = function(){
  $('pre').html(game.board.printBoard())
}
$(function(){
  window.setInterval(run_step, 16)
});

