var playing = false;
var interval;
var animVelocity = 4000/100;
var positionX = 0;
var ListOfKeyframes = [];
var ListOfFrames = new Array(100);
var initialized = false;
var index = 0;

var last_selected;

function interpolate(){
  var next_KFrame = 0;
  var last_KFrame = 0;
  while(!ListOfFrames[next_KFrame].KFrameFlag && next_KFrame < ListOfFrames.length ){
    next_KFrame++;
  }
  for(i=1; i<ListOfFrames.length;i++){

    if( i > last_KFrame && i < next_KFrame){
      ListOfFrames[i].position[0] = Number(ListOfFrames[last_KFrame].position[0]) + Number(((i - last_KFrame)/(next_KFrame - last_KFrame))*(ListOfFrames[next_KFrame].position[0] - ListOfFrames[last_KFrame].position[0]));
      ListOfFrames[i].position[1] = Number(ListOfFrames[last_KFrame].position[1]) + Number(((i - last_KFrame)/(next_KFrame - last_KFrame))*(ListOfFrames[next_KFrame].position[1] - ListOfFrames[last_KFrame].position[1]));
    } 
    if(i == next_KFrame){
      var slider  = document.getElementById("myRange");
      var output = document.getElementById("demo");
      last_KFrame = next_KFrame;
      next_KFrame += 1;
      while(next_KFrame < ListOfFrames.length ){
        if(ListOfFrames[next_KFrame].KFrameFlag){
          output.innerHTML = next_KFrame + " " + last_KFrame;
          break;
        }
        next_KFrame++;
      }
      if(next_KFrame >= ListOfFrames.length){
        next_KFrame = last_KFrame;
      }
    }
    if(i > next_KFrame){
      ListOfFrames[i].position[0] = ListOfFrames[next_KFrame].position[0];
      ListOfFrames[i].position[1] = ListOfFrames[next_KFrame].position[1];
    }
  }



}

function setTriangle(){
    document.getElementById("imgtr").style.display = 'block';
    document.getElementById("imgsq").style.display = 'none';
}

function setSquare(){
    document.getElementById("imgtr").style.display = 'none';
    document.getElementById("imgsq").style.display = 'block';
}

function play(){
  interpolate();
  if(initialized == false){
    var slider  = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = "AAAAAAAAAAAAAAAAAA";
    for(i = 0; i < ListOfFrames.length; i++){
      ListOfFrames[i] = new KeyFrame(i,"frame"+i,[0,0],[0,0],[0,0], false);
    }
    initialized = true;
  }
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
      var found = false;
      showKeyframe(parseInt(slider.value));
      //output.innerHTML = slider.value;
      if(slider.value == 100){
        clearInterval(interval)
      }
}

  function KeyFrame(time, name, position, scale, rotation, KFrameFlag){
    this.time = time;
    this.name = name;
    this.position = position;
    this.scale = scale;
    this.rotation = rotation;
    this.KFrameFlag = KFrameFlag;

  }

  function selectKeyframe(){
    var x = document.getElementById("keyframes");
    if(x.selectedIndex > -1){ 
      last_selected = x.selectedIndex;
      updateKeyframe(x.selectedIndex);
      setTranslate(ListOfKeyframes[x.selectedIndex].position[0], ListOfKeyframes[x.selectedIndex].position[1], dragItem);
      showKeyframe(ListOfKeyframes[x.selectedIndex].time);
      
      }
  }

  function updateKeyframe(x){
    document.getElementById("kfName").value = ListOfKeyframes[x].name;
    document.getElementById("positionX").value = ListOfKeyframes[x].position[0];
    document.getElementById("positionY").value = ListOfKeyframes[x].position[1];
    document.getElementById("scaleX").value = ListOfKeyframes[x].scale[0];
    document.getElementById("scaleY").value = ListOfKeyframes[x].scale[1];
    document.getElementById("rotationX").value = ListOfKeyframes[x].rotation[0];
    document.getElementById("rotationY").value = ListOfKeyframes[x].rotation[1];
    
    document.getElementById("myRange").value = ListOfKeyframes[x].time;
    document.getElementById("demo").innerHTML = ListOfKeyframes[x].time;
  }

  
  function showKeyframe(x){
    document.getElementById("kfName").value = ListOfFrames[x].name;
    document.getElementById("positionX").value = ListOfFrames[x].position[0];
    document.getElementById("positionY").value = ListOfFrames[x].position[1];
    document.getElementById("scaleX").value = ListOfFrames[x].scale[0];
    document.getElementById("scaleY").value = ListOfFrames[x].scale[1];
    document.getElementById("rotationX").value = ListOfFrames[x].rotation[0];
    document.getElementById("rotationY").value = ListOfFrames[x].rotation[1];
    
    document.getElementById("myRange").value = ListOfFrames[x].time;
    setTranslate(ListOfFrames[x].position[0], ListOfFrames[x].position[1], dragItem);
      
  }

  function setName(){
    var x = document.getElementById("keyframes");
    if(x.selectedIndex > -1){
      x.options[x.selectedIndex].innerHTML= document.getElementById("kfName").value;
      ListOfKeyframes[x.selectedIndex].name = document.getElementById("kfName").value;
    }
    showKeyframe(x.selectedIndex)
  }

  function setPosition(){
    var x = document.getElementById("keyframes");
    if(x.selectedIndex > -1){
      ListOfKeyframes[x.selectedIndex].position[0] = document.getElementById("positionX").value;
      ListOfKeyframes[x.selectedIndex].position[1] = document.getElementById("positionY").value;
      ListOfFrames[ListOfKeyframes[x.selectedIndex].time].position[0] = document.getElementById("positionX").value;
      ListOfFrames[ListOfKeyframes[x.selectedIndex].time].position[1] = document.getElementById("positionY").value;
    }
    showKeyframe(ListOfKeyframes[x.selectedIndex].time)
  }

  function setScale(){
    var x = document.getElementById("keyframes");
    if(x.selectedIndex > -1){
      ListOfKeyframes[x.selectedIndex].scale[0] = document.getElementById("scaleX").value;
      ListOfKeyframes[x.selectedIndex].scale[1] = document.getElementById("scaleY").value;
      ListOfFrames[ListOfKeyframes[x.selectedIndex].time].scale[0] = document.getElementById("scaleX").value;
      ListOfFrames[ListOfKeyframes[x.selectedIndex].time].scale[1] = document.getElementById("scaleY").value;
    }
    showKeyframe(ListOfKeyframes[x.selectedIndex].time)
  }

  function setRotation(){
    var x = document.getElementById("keyframes");
    if(x.selectedIndex > -1){
      ListOfKeyframes[x.selectedIndex].rotation[0] = document.getElementById("rotationX").value;
      ListOfKeyframes[x.selectedIndex].rotation[1] = document.getElementById("rotationY").value;
      ListOfFrames[ListOfKeyframes[x.selectedIndex].time].rotation[0] = document.getElementById("rotationX").value;
      ListOfFrames[ListOfKeyframes[x.selectedIndex].time].rotation[1] = document.getElementById("rotationY").value;
    }
    showKeyframe(ListOfKeyframes[x.selectedIndex].time)
  }

  function addKeyframe(){
 
    if(initialized == false){
      for(i = 0; i < ListOfFrames.length; i++){
        ListOfFrames[i] = new KeyFrame(i,"frame"+i,[0,0],[0,0],[0,0], false);
      }
      initialized = true;
    }
    var slider  = document.getElementById("myRange");
    var output = document.getElementById("demo");
    slider.value = parseInt(slider.value);
    output.innerHTML = slider.value;
    ListOfKeyframes.push(new KeyFrame(slider.value,"kframe"+index,[0,0],[0,0],[0,0], true));
    ListOfFrames[parseInt(slider.value)] = new KeyFrame(slider.value,"kframe"+index,[0,0],[0,0],[0,0], true);
    
    var x = document.getElementById("keyframes");
    var option = document.createElement("option");
    option.text = ListOfFrames[slider.value].name;
    x.add(option);
    index+=1;

    interpolate()
  }

  function removeKeyframe(){
    var x = document.getElementById("keyframes");
    var n = x.selectedIndex;
    ListOfFrames[ListOfKeyframes[x.selectedIndex].time].KFrameFlag = false;
    interpolate();
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
