// test mode parameters
const testMode = true;
const testIterations = 1;

// asset container array definitions
let testValues;
let compoSrc;

// object structures
let objects = [
  {
    type: "triangle",
    vertices: [
      {x: 50, y: 80},
      {x: 80, y: 70},
      {x: 90, y: 110}
    ]
  },
  {
    type: "triangle",
    vertices: [
      {x: 180, y: 130},
      {x: 240, y: 170},
      {x: 140, y: 190}
    ]
  },
  {
    type: "triangle",
    vertices: [
      {x: 130, y: 100},
      {x: 150, y: 110},
      {x: 135, y: 60}
    ]
  }
];

let camera = {
  pos: {x: 50, y: 200},
  dir: 20,
  fov: 60,
  speed: 1
};

// preload runs before setup and draw
function preload() {
  if(testMode) {
    testValues = loadStrings('test_values.txt');
    compoSrc = loadStrings('compo.js?a='+random(0, 9999999));
  }
}

// setup runs once at start up
function setup() {
  createCanvas(256, 256);

  if(testMode) {
    test();
  }
}

// draw is called each frame
function draw() {
  background(0);

  if(keyIsDown(LEFT_ARROW)) {
    camera.dir -= camera.speed;
    if (camera.dir < 0)
      camera.dir += 360;
  }
  if(keyIsDown(RIGHT_ARROW)) {
    camera.dir += camera.speed;
    if (camera.dir >= 360)
      camera.dir -= 360;
  }
  if(keyIsDown(UP_ARROW)) {
    camera.pos.x += camera.speed * cos(camera.dir / 180 * PI);
    camera.pos.y += camera.speed * sin(camera.dir / 180 * PI);
  }
  if(keyIsDown(DOWN_ARROW)) {
    camera.pos.x -= camera.speed * cos(camera.dir / 180 * PI);
    camera.pos.y -= camera.speed * sin(camera.dir / 180 * PI);
  }

  drawObjects();
  shootRay();
  drawCamera();
}

// draws all objects (triangles) to the canvas
function drawObjects() {
  let objectColor = color(150, 155, 100);
  let objectBorderColor = color(255, 255, 0);
  fill(objectColor);
  stroke(objectBorderColor);
  strokeWeight(1);

  for(i = 0; i < objects.length; ++i) {
    let o = objects[i];
    beginShape(TRIANGLES);
    for(j = 0; j < o.vertices.length; ++j) {
      let v = o.vertices[j];
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}

// draws camera position and direction
function drawCamera() {
  let cameraColor = color(255, 204, 0);
  fill(cameraColor);
  stroke(cameraColor);
  strokeWeight(3);
  circle(camera.pos.x, camera.pos.y, 10);

  const directionRayLength = 30;
  let directionRayPos = {
    x: camera.pos.x + directionRayLength * cos(camera.dir / 180 * PI),
    y: camera.pos.y + directionRayLength * sin(camera.dir / 180 * PI)
  };

  line(camera.pos.x, camera.pos.y, directionRayPos.x, directionRayPos.y);
}

// shoots a ray from camera position and shows hit
// point using a circle around the camera
function shootRay() {
  let rayColor = color(255, 0, 255);
  stroke(rayColor);
  noFill();
  strokeWeight(1);

  let distanceHit = getClosestLineDistance(camera.pos);

  circle(camera.pos.x, camera.pos.y, 2*distanceHit);
}

// gets the closest line hit point in all objects
function getClosestLineDistance(p) {
  let minDistance = 256;

  for(i = 0; i < objects.length; ++i) {
    let o = objects[i];
    let d = getDistanceToTriangle(p, o.vertices);
    if(d < minDistance) minDistance = d;
  }

  return minDistance;
}

// gets the closest line hit point of a triangle
function getDistanceToTriangle(p, vertices) {
  let minDistance = 256;

  let d = f(p, vertices[0], vertices[1]);
  if(d < minDistance) minDistance = d;
  d = f(p, vertices[1], vertices[2]);
  if(d < minDistance) minDistance = d;
  d = f(p, vertices[2], vertices[0]);
  if(d < minDistance) minDistance = d;

  return minDistance;
}

function test() {
  // create two dimensioned distance buffer
  let d = [];
  for(let i = 0; i < 256; ++i) {
    d[i] = [];
  }

  // get initial time in milliseconds
  let timeStart = millis();

  // do the test for all 256x256 coordinates
  // with defined number of iterations
  for(let k = testIterations; k > 0; --k) {
    for(let y = 255; y >= 0; --y) {
      for(let x = 255; x >= 0; --x) {
        d[x][y] = getClosestLineDistance({x: x, y: y});
      }
    }
  }

  // calculate average execution time
  let averageExecutionTime = (millis() - timeStart) / testIterations;
  console.log(`Test execution time: ${averageExecutionTime} ms`);

  // evaluate test results and find a success ratio
  let success = 0;

  for(i = 0; i < 256; ++i) {
    for(j = 0; j < 256; ++j) {
      if(abs(d[i][j] - testValues[i * 256 + j]) < 0.01) success++;
    }
  }
  successRatio = success / 655.36;
  console.log(`Success ratio: ${successRatio}%`);

  // right trim source code, replace new lines
  // with single space characters and
  // find script size
  for(i = 0; i < compoSrc.length; ++i) {
    compoSrc[i] = compoSrc[i].replace(/~+$/, '');
  }
  compoSrc = compoSrc.join(" ").trim();
  codeLength = compoSrc.length;
  console.log(`Code length: ${codeLength} bytes`);
}
