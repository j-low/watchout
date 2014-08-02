// start slingin' some d3 here.
var highScore = 0;

var game = function(){
  var enemies = [];
  var score = 0;

  //reset board background post-collision
  if(d3.select('svg').attr('collision')) {
    d3.select('svg').removeClass
  }

  //define drag event listener
  var drag = d3.behavior.drag()
  .on("drag", function() {
    if(d3.mouse(this)[0] < 670 && d3.mouse(this)[0] > 0){
      d3.select(this).attr('cx', d3.mouse(this)[0]);
    }
    if(d3.mouse(this)[1] < 420 && d3.mouse(this)[1] > 0) {
      d3.select(this).attr('cy', d3.mouse(this)[1]);
    }
  });

  //populate screen with enemies at random positions
  for(var i = 0; i <= 30; i++){
    d3.select('svg').append('circle')
      .attr('class', 'enemy')
      .attr('cx', function(){
        return Math.random()*680;
      })
      .attr('cy', function(){
        return Math.random()*430;
      })
      .attr('r', 5)
      .attr('filter', 'url(#shuri)')
      // .style('fill', 'url(Users/student/Code/Geoffrey_Abdallah/2014-07-watchout/shuriken.png)')
  }

  //add player to board
  d3.select('svg').append('circle')
    .attr('class', 'player')
    .attr('cx', 300)
    .attr('cy', 300)
    .attr('r', 10)
    .attr('filter', 'url(#bruce)')
    .call(drag);


  //check for player-enemy collision
  var collisionCheck = function(){
    var playerX = d3.select('.player').attr('cx');
    var playerY = d3.select('.player').attr('cy');
    var playerR = parseInt(d3.select('.player').attr('r'));
    var enemies = d3.selectAll('.enemy');
    var collision = false;
    while(!collision){
      enemies.each(function() {
        var xDist = Math.abs(playerX - d3.select(this).attr('cx'));
        var yDist = Math.abs(playerY - d3.select(this).attr('cy'));
        var distance = Math.sqrt(xDist^2 + yDist^2);
        var boundary = playerR + parseInt(d3.select(this).attr('r'));
        collision = (distance < boundary);
      });

      //if collision occurs => check highScore, reset score
     if(collision){
      if(score > highScore) {
        highScore = score;
        //TODO: do something visual to board/pieces on collision
      }
      score = 0;
     }
     //return true/false for collision
     return collision;
    }
  };


  //set intervalic random enemy movement
  setInterval(function(){
    d3.selectAll('.enemy')
      .transition().duration(1500)
      .attr('cx', function(){
        return Math.random()*680;
      })
      .attr('cy', function(){
        return Math.random()*430;
      })
      //transition
      //set new attributes
  }, 2000);

  //check for collisions, increment score
  setInterval(function() {
    collisionCheck();
    score++;
  },10);
};

game();







