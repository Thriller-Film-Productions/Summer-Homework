let problems;

function setup() {
  createCanvas(windowWidth, windowHeight).position(0, 0).parent("container");
  getProblems();
}

function draw() {
  background(51);
  fill(235);
  noStroke();
  rect(width/3, height*(2/3), width/8, height/8);
  rect(width/3*2, height*(2/3), width/8, height/8);
  rect(width/6, height/6, width/8, height/8);
  fill(51);
  textAlign(CENTER);
  text("Finnished a problem", width*(1/3)+width/16, height*(2/3)+(height/16));
  text("Read a page", width*(2/3)+width/16, height*(2/3)+(height/16));
  text("Reset", width/6+width/16, height/6+height/16);
  fill(235);
  if (problems.questionsDone !== problems.questions) {
    text("You've finnished "+problems.questionsDone+" out of "+problems.questions+" problems.", width/3, height/2);
    text("You're "+problems.questionsDone/problems.questions*100+"% done.", width/3, height/2.2);
  } else {
    text("You've finnished all your problems!", width/3, height/2)
  }
  if (problems.pagesDone !== problems.pages) {
    text("You've finnished "+problems.pagesDone+" out of "+problems.pages+" pages.", width/3*2, height/2);
    text("You're "+problems.pagesDone/problems.pages*100+"% done.", width/3*2, height/2.2);
  } else {
    text("You've finnished reading all your pages!", width/3*2, height/2);
  }
  if (problems.pagesDone+problems.questionsDone !== problems.pages+problems.questions) {
    text("You are "+round((problems.pagesDone+problems.questionsDone)/(problems.pages+problems.questions)*100)+"% done with everything.", width/2, height/3.5);
    text("You will finish around "+getDate(), width/2, height/4.5);
  } else {
    text("WOOHOO! ALL YOUR HOMEWORK DONE!!!!!", width/2, height/3.5)
  }
}

function mousePressed() {
  if (collidePointRect(mouseX, mouseY, width/3, height*(2/3), width/8, height/8) && problems.questionsDone !== problems.questions) {
    problems.questionsDone++;
  }
  if (collidePointRect(mouseX, mouseY, width/3*2, height*(2/3), width/8, height/8) && problems.pagesDone !== problems.pages) {
    problems.pagesDone++;
  }
  setProblems();
  if (collidePointRect(mouseX, mouseY, width/6, height/6, width/8, height/8)) {
    if (confirm("Are you sure you want to delete your progress?")) {
      localStorage.removeItem("problems");
      location.reload();
    }
  }
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
    let questions;
    let pages;
    while (!parseInt(questions)) {
      questions = prompt("How many questions do you have for summer homework? Must be a number");
    }
    while (!parseInt(pages)) {
      pages = prompt("How many pages to you have to read for summer homework? Must be a number");
    }
    problems = {
      questions:parseInt(questions),
      pages:parseInt(pages),
      questionsDone:0,
      pagesDone:0,
      startingDate:Date.now()
    }
    setProblems();
  }
}

function getDate() {
  let time = ((Date.now()-problems.startingDate)/86400000);
  let avg = time/(problems.questionsDone+problems.pagesDone);
  return new Date((avg*(problems.pages+problems.questions)*86400000)+problems.startingDate);
}
