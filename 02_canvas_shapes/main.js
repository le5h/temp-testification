window.nextFrame = (function(callback){
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback){window.setTimeout(callback, 1000 / 60);};
})();

window.onload = function(){

  /*
    Нарисуйте на canvas основные геометрические фигуры
    (окружность, треугольник, квадрат, прямоугольник),
    расположите на холсте размером 800*600 по 4-м углам.
  */
  
  var size = 80, dist = 100; /* of shapes */

  /* OUSH */
  function corner(c, name, dist){
    var xPos, yPos, dxp, dyp, cxp, cyp;
    switch(name){
      case 'top left': case 'left top':
        dxp = 1; dyp = 1; cxp = 0; cyp = 0;
      break;
      case 'top right': case 'right top':
        dxp = -1; dyp = 1; cxp = 1; cyp = 0;
      break;
      case 'bottom left': case 'left bottom':
        dxp = 1; dyp = -1; cxp = 0; cyp = 1;
      break;
      case 'bottom right': case 'right bottom':
        dxp = -1; dyp = -1; cxp = 1; cyp = 1;
      break;
      default: dxp = 0; dyp = 0;
    }
    xPos = c.canvas.width * cxp + dist * dxp;
    yPos = c.canvas.height * cyp + dist * dyp;
    return {x: xPos, y: yPos};
  }

  function circle(context, position, size){
    context.beginPath();
    context.arc(position.x, position.y, size/2, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
  }

  function triangle(context, position, size){
    context.beginPath();
    context.moveTo(position.x, position.y - size/2); // 1st point
    context.lineTo(position.x + size/2, position.y + size/2); // 2nd poinr 
    context.lineTo(position.x - size/2, position.y + size/2); // 3rd point
    context.closePath();
    context.fill();
  }

  function square(context, position, size){
    context.fillRect(position.x-size/2,position.y-size/2,size,size);
  }

  function rectangle(context, position, sizeX, sizeY){
    context.fillRect(position.x-sizeX/2,position.y-sizeY/2,sizeX,sizeY);
  }

  function flush(context){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }

  function drawFrame(context, frame, content){

    content(context, frame);

    nextFrame(function(){drawFrame(context, frame + 1, content)});

  }

  var canvas = document.getElementById('showcase');

  if (canvas.getContext) {

    var context = canvas.getContext('2d');

    drawFrame(context, 0, function(context, frame){

      dist = frame % Math.max(context.canvas.width,context.canvas.height);

      flush(context);
  
      // circle
      circle(context, corner(context, 'top left', dist), size);
  
      // triangle
      triangle(context, corner(context, 'top right', dist), size);
  
      // square
      square(context, corner(context, 'bottom right', dist), size);
      
      // rectangle
      rectangle(context, corner(context, 'bottom left', dist), size, size/3);

    });

  }

}
