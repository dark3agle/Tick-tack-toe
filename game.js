let turn = "X";
let isgameover = false;
var p1 = document.getElementById("player1");
var p2 = document.getElementById("player2");

// Object Constructor for Players
function Player(name) {
  this.name = name;
}

// Player Objects
var player1 = new Player(p1);
var player2 = new Player(p2);

// Click submit listener
submit.addEventListener("click", () => {
  var error = document.getElementById("error");
  if (p1.value === "" || p2.value === "") {
    // Show the error
    error.textContent = "NAMES OF BOTH PLAYERS NEEDS TO BE ENTERED";
  } else {
    error.textContent = "";
    document.getElementById("playerTurn").innerText = p1.value;
    document.getElementsByClassName("container")[0].style.visibility =
      "visible";
  }
});

// Click reset listener
reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  isgameover = false;
  document.getElementById("playerTurn").innerText = "";
  document.getElementById("info").innerHTML = "<br>";
  p1.value = "";
  p2.value = "";
  document.getElementsByClassName("container")[0].style.visibility = "hidden";
});

// Change the turn between X and O
function changeTurn() {
  if (turn === "X") {
    return (turn = "O");
  } else {
    return (turn = "X");
  }
}

// Update the comment section
function updateComment() {
  const date = new Date().toDateString();
  const time = new Date().toLocaleTimeString();
  if (!isgameover) {
    if (turn === "X") {
      document.getElementById("info").innerHTML +=
        "at " +
        date +
        " " +
        time +
        " " +
        p1.value +
        " played " +
        turn +
        "<br />";
    } else {
      document.getElementById("info").innerHTML +=
        "at " +
        date +
        " " +
        time +
        " " +
        p2.value +
        " played " +
        turn +
        "<br />";
    }
  }
}

// Check The winner (Game logic)
function checkWin() {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      if (isgameover) {
        return;
      } else if (turn === "X") {
        document.getElementById("info").innerText += p1.value + " won the game";
      } else {
        document.getElementById("info").innerText += p2.value + " won the game";
      }
      isgameover = true;
    }
  });
}

// Main Game
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      checkWin();
      updateComment();
      turn = changeTurn();
      if (!isgameover) {
        if (turn === "X") {
          document.getElementById("playerTurn").innerText = p1.value;
        } else {
          document.getElementById("playerTurn").innerText = p2.value;
          // }
        }
      }
    }
  });
});
