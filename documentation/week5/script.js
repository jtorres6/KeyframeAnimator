
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
    document.getElementById("button_timeline").innerHTML ="❚❚";
    interval = setInterval(loop, animVelocity);
    playing = true;
  }
  else{
    document.getElementById("button_timeline").innerHTML ="►"
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
// Make the DIV element draggable:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
