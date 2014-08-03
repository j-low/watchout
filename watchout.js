// start slingin' some d3 here.
var highScore = 0;



var game = function(){
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
  for(var i = 0; i <= 10; i++){
    d3.select('svg').append('circle')
      .attr('class', 'enemy')
      .attr('cx', function(){
        return Math.random()*680;
      })
      .attr('cy', function(){
        return Math.random()*430;
      })
      .attr('r', 15)
      .attr('filter', 'url(#shuri)')
  }

    //add Kareem enemy
    d3.select('svg').append('circle')
      .attr('class', 'kareem')
      .attr('cx', function(){
        return Math.random()*680;
      })
      .attr('cy', function(){
        return Math.random()*430;
      })
      .attr('r', 75)
      .attr('filter', 'url(#kareem)')

  //add player to board
  d3.select('svg').append('circle')
    .attr('class', 'player')
    .attr('cx', 300)
    .attr('cy', 300)
    .attr('r', 30)
    .attr('filter', 'url(#bruce)')
    .call(drag);


  //check for player-enemy collision
  var collisionCheck = function(){
    var playerX = d3.select('.player').attr('cx');
    var playerY = d3.select('.player').attr('cy');
    var playerR = parseInt(d3.select('.player').attr('r'));
    var enemies = d3.selectAll('.enemy');
    var collision = false;

      enemies.each(function() {
        var xDist = Math.abs(playerX - d3.select(this).attr('cx'));
        var yDist = Math.abs(playerY - d3.select(this).attr('cy'));
        var distance = Math.sqrt((xDist * xDist) + (yDist *yDist));
        var boundary = playerR + parseInt(d3.select(this).attr('r'));
        collision = (distance < boundary);
        if(collision) {
          d3.select('.player').transition().attr('filter', 'url(#brucecol)').transition().attr('filter', 'url(#bruce)')
          d3.select('body').style('background', '#991C20').transition().style('background', 'yellow')
          if(score > highScore) {
            highScore = score;
            d3.select('.high').text(highScore);
          }
        score = 0;
       }
      });
  };


  //set intervalic random enemy movement
  setInterval(function(){
    d3.selectAll('.enemy')
      .transition().duration(1000)
      .attr('cx', function(){
        return Math.random()*680;
      })
      .attr('cy', function(){
        return Math.random()*430;
      })
  }, 2000);

  setInterval(function(){
    d3.select('.kareem')
      .transition().duration(500)
      .attr('cx', function(){
        return Math.random()*680;
      })
      .attr('cy', function(){
        return Math.random()*430;
      })
  }, 1500);

  setInterval(function(){
    d3.select('.kareem').transition.duration(200)
  },250);

  //Kareem's enter exit
  // setInterval(function(){
  //   d3.selectAll('.kareem').transition().duration(500)
  //   .attr('x', function(){
  //     return Math.random * 680;
  //   })
  //   .attr('y', function(){
  //     return Math.random() * 430;
  //   });

  // }, 1000);

  //check for collisions, increment score
  setInterval(function() {
    collisionCheck()
    score++
    d3.select('.current').text(score);
  },10);
};

game();







