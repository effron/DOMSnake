var game = new SnakeGame.Game()
var size = SnakeGame.size
game.start();
var run_step = function(){
  _.each(game.board.grid, function(elem, index){
    square = $('#'+index);
    square.removeClass("snake apple");
    square.removeClass("rattle");
    if (elem === "snake"){
      square.addClass("snake");
    }
    else if (elem === "rattle"){
      square.addClass("rattle")
    }
    else if (elem === "apple"){
      square.addClass("apple")
    }
  });
  $('#score').html('<h1>' + game.score + '</h1>')

  if (game.stop){
    $('#gameover').html('<h1>PLAYER ' + game.losingSnake + ' LOSES.</h1><h2> Press return to start a new game</h2>')
  }
  else{
    $('#gameover').html('')
  }
}

$(function(){

  //register key handlers
  $(document).keydown(function(event){
    if (event.keyCode === 38){
      game.north = false;
      game.south = true;
      game.east = false;
      game.west = false;
    }
    else if(event.keyCode === 40){
      game.north = true;
      game.south = false;
      game.east = false;
      game.west = false;
    }
    else if(event.keyCode === 37){
      game.north = false;
      game.south = false;
      game.east = false;
      game.west = true;
    }
    else if(event.keyCode === 39){
      game.north = false;
      game.south = false;
      game.east = true;
      game.west = false;
    }
    if (event.keyCode === 65){
      game.north2 = false;
      game.south2 = false;
      game.east2 = false;
      game.west2 = true;
    }
    else if(event.keyCode === 87){
      game.north2 = false;
      game.south2 = true;
      game.east2 = false;
      game.west2 = false;
    }
    else if(event.keyCode === 83){
      game.north2 = true;
      game.south2 = false;
      game.east2 = false;
      game.west2 = false;
    }
    else if(event.keyCode === 68){
      game.north2 = false;
      game.south2 = false;
      game.east2 = true;
      game.west2 = false;
    }

    else if(event.keyCode === 13){
      if(game.stop){
        game.resetGame();
      }
    }
  })

  //draw empty grid of divs
  for (var row = 0; row < size; row++){
    $('table').append('<tr id=row_' + row + '></tr>');
    for (var column = 0; column < size; column++){
      var id = row * size + column;
      $('#row_'+row).append('<td><div id=' + id + '></div></td>');
    }
  }

  window.setInterval(run_step, 16);
});

