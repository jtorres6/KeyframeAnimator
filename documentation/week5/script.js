
var playing = false;
var interval;
var animVelocity = 4000/100;

function setTriangle(){
    document.getElementById("imgtr").style.display = 'block';
    document.getElementById("imgsq").style.display = 'none';
}

function setSquare(){
    document.getElementById("imgtr").style.display = 'none';
    document.getElementById("imgsq").style.display = 'block';
}

function play(){
  if(!playing){
    interval = setInterval(loop, animVelocity);
    playing = true;
  }
  else{
    clearInterval(interval);
    playing = false;
  }
}

function loop() {
      var slider  = document.getElementById("myRange");
      var output = document.getElementById("demo");
      slider.value = parseInt(slider.value) + 1;
      output.innerHTML = slider.value;
      if(slider.value == "100"){
        clearInterval(interval)

      }
}
