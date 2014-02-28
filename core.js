  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  context.lineWidth = 10;
  context.lineCap='round';

  canvas.addEventListener('click',refresh,false);

  var width = 50;
  computer = false;
  var player = true;
  var rows = 2;
  var columns = 2;
  var area = [];

function start(){
  context.clearRect(0,0,canvas.width,canvas.height)
  drawGrid(150,150,rows,columns,2*width,'#999');
  area = [];
  for(i=0;i<=columns;i++){
    var y = [];
    for(j=0;j<=rows;j++){
        x=new block(i, j, 2);
        y.push(x);
    }
    area.push(y);
  }
}

  function block(x, y, state){
    this.x = x;
    this.y = y;
    this.state = state;
  }

  function refresh(e){
    x=Math.floor((e.clientX-50)/100);
    y=Math.floor((e.clientY-50)/100);

    if(x>-1 && x<=columns && y>-1 && y<=rows){
        if(typeof(area[x][y].state) =="number"){
            area[x][y].state = player;
            addSymbol(100*(x+1),100*(y+1));

            update(x,y);
        }
    }
  } 

  function addSymbol(x,y){

    if(player){
      drawCircle(x,y,width,'#d55')
    }
    else
      drawCross(x,y,width,'#55d')

    player = !player;
  }

  function drawCircle (x,y,r,color) {
    context.save();
    context.strokeStyle=color;
    context.moveTo(x,y);
    context.beginPath();
    context.arc(x,y,r-10,0,Math.PI*2,false);
    context.stroke();
    context.restore;
  }

  function drawCross (x,y,r,color) {
    r/=Math.sqrt(2);
    context.save();
    context.strokeStyle=color;
    context.beginPath();
    context.moveTo(x-r,y-r);
    context.lineTo(x+r,y+r);
    context.moveTo(x-r,y+r);
    context.lineTo(x+r,y-r);
    context.stroke();
    context.restore;
  }

  function drawGrid(x,y,rows,columns,width,color){
    context.save();
    context.strokeStyle=color;
    for(i=1; i<=rows; i++){
      context.beginPath();
      context.moveTo(x-width,y+(i-1)*width);
      context.lineTo(x+columns*width,y+(i-1)*width);
      context.stroke();
    }

    for(j=1; j<=columns; j++){
      context.beginPath();
      context.moveTo(x+(j-1)*width,y-width);
      context.lineTo(x+(j-1)*width,y+rows*width);
      context.stroke();
    }
    context.restore();
  }

  function update(x, y){

    check_Horizontal=checkHorizontal(x, y);
    if(typeof(check_Horizontal) != 'number' && check_Horizontal != undefined){
        if(check_Horizontal){
          alert('player 1 wins');
          start();
        }
        else{
          alert('player 2 wins')
          start();
        }
    }

    check_Vertical=checkVertical(x, y);
    if(typeof(check_Vertical) != 'number' && check_Vertical != undefined){
        if(check_Vertical){
          alert('player 1 wins');
          start();
        }
        else{
          alert('player 2 wins')
          start();
        }
    }

    check_Diagonal_R=checkDiagonal_R(x, y);
    if(typeof(check_Diagonal_R) != 'number' && check_Diagonal_R != undefined){
        if(check_Diagonal_R){
          alert('player 1 wins');
          start();
        }
        else{
          alert('player 2 wins')
          start();
        }
    }

    check_Diagonal_L=checkDiagonal_L(x, y);
    if(typeof(check_Diagonal_L) != 'number' && check_Diagonal_L != undefined){
        if(check_Diagonal_L){
          alert('player 1 wins');
          start();
        }
        else{
          alert('player 2 wins')
          start();
        }
    }
  }
    

  function checkHorizontal(x, y){
    if(x<columns && area[x][y].state == area[x+1][y].state ){
        if(x<columns-1 && area[x][y].state == area[x+2][y].state)
            return area[x][y].state;
        else if(x>0  && area[x][y].state == area[x-1][y].state )
            return area[x][y].state;
    }
    else if(x>0 && area[x][y].state == area[x-1][y].state){
        if(x>1 && area[x][y].state == area[x-2][y].state)
            return area[x][y].state;
        else 
            return 2;
    }
    else
        return 2;
    
  }

  function checkVertical(x, y){
    if(y<rows && area[x][y].state == area[x][y+1].state ){
        if(y<rows-1 && area[x][y].state == area[x][y+2].state)
            return area[x][y].state;
        else if(y>0  && area[x][y].state == area[x][y-1].state )
            return area[x][y].state;
    }
    else if(y>0 && area[x][y].state == area[x][y-1].state){
        if(y>1 && area[x][y].state == area[x][y-2].state)
            return area[x][y].state;
        else 
            return 2;
    }
    else
        return 2;
    
  }

  function checkDiagonal_R(x, y){
    if(x<columns && y<rows && area[x][y].state == area[x+1][y+1].state ){
        if(x<rows-1 && y<rows-1 && area[x][y].state == area[x+2][y+2].state)
            return area[x][y].state;
        else if(y>0 && x>0 && area[x][y].state == area[x-1][y-1].state )
            return area[x][y].state;
    }
    else if(y>0 && x>0 && area[x][y].state == area[x-1][y-1].state){
        if(y>1 && x>1 && area[x][y].state == area[x-2][y-2].state)
            return area[x][y].state;
        else 
            return 2;
    }
    else
        return 2;
    
  }

  function checkDiagonal_L(x, y){
    if(x>0 && y<rows && area[x][y].state == area[x-1][y+1].state ){
        if(x>1 && y<rows-1 && area[x][y].state == area[x-2][y+2].state)
            return area[x][y].state;
        else if(y>0 && x<columns && area[x][y].state == area[x+1][y-1].state )
            return area[x][y].state;
    }
    else if(y>0 && x<columns && area[x][y].state == area[x+1][y-1].state){
        if(y>1 && x<columns-1 && area[x][y].state == area[x+2][y-2].state)
            return area[x][y].state;
        else 
            return 2;
    }
    else
        return 2;
    
  }
