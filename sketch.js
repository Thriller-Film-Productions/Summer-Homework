let problems;

function setup() {
  createCanvas(windowWidth, windowHeight).position(0, 0).parent("container");
  getProblems();
}

function draw() {
  background(51);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setProblems() {
  localStorage.setItem("problems", JSON.stringify(problems));
}

function getProblems() {
  if (localStorage.getItem("problems")) {
    problems = JSON.parse(localStorage.getItem("problems"));
  } else {
    problems = {
      questions:0,
      pages:0
    }
    setProblems();
  }
}
