var game = new SnakeGame.Game()

$(function(){
  $('pre').html(game.board.printBoard())
});