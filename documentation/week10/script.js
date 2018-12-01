var playing = false;
var interval;
var animVelocity = 4000/100;
var positionX = 0;
var ListOfKeyframes = []
var index = 0;

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
    clearInterval(interval);
    document.getElementById("button_timeline").innerHTML ="►";
    playing = false;
  }
}

function stop(){
  clearInterval(interval);
  playing = false;
  document.getElementById("button_timeline").innerHTML ="►";
  var slider  = document.getElementById("myRange");
  var output = document.getElementById("demo");
  slider.value = parseInt(slider.value) + 1;
  output.innerHTML = slider.value;

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

  function KeyFrame(time, name, position, scale, rotation){
    this.time = time;
    this.name = name;
    this.position = position;
    this.scale = scale;
    this.rotation = rotation;
    var x = document.getElementById("keyframes");
    var option = document.createElement("option");
    option.text = name;
    x.add(option);

  }

  function selectKeyframe(){
    var x = document.getElementById("keyframes");
    if(x.selectedIndex > -1){
      document.getElementById("kfName").value = ListOfKeyframes[x.selectedIndex].name;
      var pos = document.getElementById("positionX").value = ListOfKeyframes[x.selectedIndex].position[0];
      pos = document.getElementById("positionY").value = ListOfKeyframes[x.selectedIndex].position[1];
      document.getElementById("scaleX").value = ListOfKeyframes[x.selectedIndex].scale[0];
      document.getElementById("scaleY").value = ListOfKeyframes[x.selectedIndex].scale[1];
      document.getElementById("rotationX").value = ListOfKeyframes[x.selectedIndex].rotation[0];
      document.getElementById("rotationY").value = ListOfKeyframes[x.selectedIndex].rotation[1];
    }
  }

  function setName(){
    var x = document.getElementById("keyframes");
    if(x.selectedIndex > -1){ 
      x.options[x.selectedIndex].innerHTML= document.getElementById("kfName").value;
      ListOfKeyframes[x.selectedIndex].name = document.getElementById("kfName").value;
    }
  }

  function setPosition(){
    var x = document.getElementById("keyframes");
    if(x.selectedIndex > -1){ 
      ListOfKeyframes[x.selectedIndex].position[0] = document.getElementById("positionX").value;
      ListOfKeyframes[x.selectedIndex].position[1] = document.getElementById("positionY").value;
    }
  }

  function setScale(){
    var x = document.getElementById("keyframes");
    if(x.selectedIndex > -1){ 
      ListOfKeyframes[x.selectedIndex].scale[0] = document.getElementById("scaleX").value;
      ListOfKeyframes[x.selectedIndex].scale[1] = document.getElementById("scaleY").value;
    }
  }

  function setRotation(){
    var x = document.getElementById("keyframes");
    if(x.selectedIndex > -1){ 
      ListOfKeyframes[x.selectedIndex].rotation[0] = document.getElementById("rotationX").value;
      ListOfKeyframes[x.selectedIndex].rotation[1] = document.getElementById("rotationY").value;
    }
  }

  function addKeyframe(){
    ListOfKeyframes.push(new KeyFrame(0,"kframe"+index,[0,0],[0,0],[0,0]))
    index+=1;

  }

  function removeKeyframe(){
    var x = document.getElementById("keyframes");
    var n = x.selectedIndex;
    x.remove(x.selectedIndex);
    for(i = n; i<ListOfKeyframes.length; i++){
      ListOfKeyframes[i].position[0] = ListOfKeyframes[i+1].position[0];
      ListOfKeyframes[i].position[1] = ListOfKeyframes[i+1].position[1];
      ListOfKeyframes[i].scale[0] = ListOfKeyframes[i+1].scale[0];
      ListOfKeyframes[i].scale[1] = ListOfKeyframes[i+1].scale[1];
      ListOfKeyframes[i].rotation[0] = ListOfKeyframes[i+1].rotation[0];
      ListOfKeyframes[i].rotation[1] = ListOfKeyframes[i+1].rotation[1];
      ListOfKeyframes[i].name = ListOfKeyframes[i+1].name;
    }
    ListOfKeyframes.pop(n);
  }
