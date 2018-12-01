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
  playing = false;
  clearInterval(interval);
  document.getElementById("button_timeline").innerHTML ="►";
  var slider  = document.getElementById("myRange");
  var output = document.getElementById("demo");
  slider.value = parseInt(slider.value);
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
var dragItem = document.querySelector("#item");
var container = document.querySelector("#container");

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  if (e.target === dragItem) {
    active = true;
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;
}

function drag(e) {
  if (active) {

    e.preventDefault();

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, dragItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
