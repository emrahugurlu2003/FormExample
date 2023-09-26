var modalVisible = false; // Track the modal's visibility
function toggleModal() {
  // Get the modalContent element
  var modalContent = document.getElementById("myToggle-Modal");

  // Get the toggle button element
  var btn = document.getElementById("button-toggle-Modal");

  // Toggle the modal's visibility
  modalVisible = !modalVisible;

  // Update the button text based on visibility
  // Adjust button position based on modal visibility
  if (modalVisible) {
    // btn.style.top = "10px"; // Move the button to 10px from the top when the modal is visible
    btn.textContent = "Hide Game Rules";
    modalContent.classList.add("show");
  } else {
    // btn.style.top = ""; // Reset the top position when hiding the modal
    btn.textContent = "Show Game Rules";
    modalContent.classList.remove("show");
  }
  //btn.textContent = modalVisible ? "Hide Game Rules" : "Show Game Rules";

  // Get the image and set its source
  var img = document.getElementById("toggle-modalImage");
  //img.src = "assets/game.jpeg";

  // Update the display property based on visibility
  modalContent.style.display = modalVisible ? "block" : "none";
}

//* ------ Selectors ------- */
const selectionArticle = document.querySelector(".selection");

// //? Images
// const rockImg = document.getElementById("rock");
// const paperImg = document.getElementById("paper");
// const scissorsImg = document.getElementById("scissors");

//? divs of the selected elements
const yourChoiceDiv = document.getElementById("your-choice");
const pcChoiceDiv = document.getElementById("pc-choice");

//? message
const messagePar = document.querySelector(".message");
//? Score
const scoreCardSection = document.querySelector(".score-card");
const pcScoreSpan = document.getElementById("pc-score");
const userScoreSpan = document.getElementById("your-score");
//? Modal
const modalCardSection = document.querySelector(".modal-card");
const finalMessagePar = document.getElementById("final-message");
const playAgainBtn = document.getElementById("play-again");

//!top-score
const spanTopScore = document.getElementById("top-score");
//!top-score is initially read from local storage
const userAtLocal = localStorage.getItem("TopUser");
const pcAtLocal = localStorage.getItem("TopPc");
spanTopScore.textContent =
  userAtLocal !== null && pcAtLocal !== null
    ? `${userAtLocal} : ${pcAtLocal}`
    : `0 : 0`;

//* ------- Variables ------- */
// let image = document.createElement("img");
let userSelectImg = document.createElement("img");
let pcSelectImg = document.createElement("img");
//? Define Colors
const DRAW = "#ffc538";
const LOST = "#fb778b";
const WIN = "#5ab7ac";

//* ------- Event Listeners ------- */
selectionArticle.addEventListener("click", (e) => {
  // console.log(e.target.id)
  if (
    e.target.id ||
    (parseInt(pcScoreSpan.textContent) < 10 &&
      parseInt(userScoreSpan.textContent) < 10)
  ) {
    userSelectImg.src = `./assets/${e.target.id}.png`;
    userSelectImg.alt = e.target.id;
    yourChoiceDiv.appendChild(userSelectImg);
    createPcSelection();
    calculateResult();
  }
});

const createPcSelection = () => {
  const pcArr = ["rock", "paper", "scissors"];
  const pcRandom = pcArr[Math.floor(Math.random() * 3)];
  pcSelectImg.src = `./assets/${pcRandom}.png`;
  pcSelectImg.alt = pcRandom;
  pcChoiceDiv.appendChild(pcSelectImg);
};

const calculateResult = () => {
  // console.log(userSelectImg.alt);
  // console.log(pcSelectImg.alt);

  //? Case:Draw
  if (userSelectImg.alt === pcSelectImg.alt) {
    draw(userSelectImg.alt, pcSelectImg.alt);
  } else {
    switch (userSelectImg.alt) {
      case "paper":
        if (pcSelectImg.alt === "rock") {
          userWins(userSelectImg.alt, pcSelectImg.alt);
        } else {
          pcWins(userSelectImg.alt, pcSelectImg.alt);
        }
        break;
      case "scissors":
        if (pcSelectImg.alt === "paper") {
          userWins(userSelectImg.alt, pcSelectImg.alt);
        } else {
          pcWins(userSelectImg.alt, pcSelectImg.alt);
        }
        break;
      case "rock":
        if (pcSelectImg.alt === "scissors") {
          userWins(userSelectImg.alt, pcSelectImg.alt);
        } else {
          pcWins(userSelectImg.alt, pcSelectImg.alt);
        }
        break;

      default:
        break;
    }
  }

  if (pcScoreSpan.textContent === "10" || userScoreSpan.textContent === "10") {
    openModal();
  }
};

const draw = (userChoice, pcChoice) => {
  // console.log(`It's a draw! ${userChoice} versus ${pcChoice}`);
  messagePar.textContent = `It's a draw! ${userChoice.toUpperCase()} versus ${pcChoice.toUpperCase()}`;
  scoreCardSection.style.color = DRAW;
  messagePar.style.backgroundColor = DRAW;
};
const userWins = (userChoice, pcChoice) => {
  // console.log(`You Win! ${userChoice} beats ${pcChoice}`);
  messagePar.textContent = `You Win! ${userChoice.toUpperCase()} beats ${pcChoice.toUpperCase()}`;
  scoreCardSection.style.color = WIN;
  messagePar.style.backgroundColor = WIN;
  userScoreSpan.textContent++;
};
const pcWins = (userChoice, pcChoice) => {
  // console.log(`You Lost! ${userChoice} is beaten by ${pcChoice}`);
  messagePar.textContent = `You Lost! ${userChoice.toUpperCase()} is beaten by ${pcChoice.toUpperCase()}`;
  scoreCardSection.style.color = LOST;
  messagePar.style.backgroundColor = LOST;
  pcScoreSpan.textContent++;
};

// Function to show the "modal-card" modal
function showModal() {
  modalCardSection.classList.add("show");
}

// Function to hide the "modal-card" modal
function hideModal() {
  modalCardSection.classList.remove("show");
}
function checkTopScore(user, pc) {
  // console.log(userAtLocal);
  // console.log(pcAtLocal);
  // console.log(user);
  // console.log(pc);
  // console.log(user - pc);
  // console.log(userAtLocal - pcAtLocal);
  if (user - pc > userAtLocal - pcAtLocal) {
    finalMessagePar.textContent = "🎈🎵Top Score! 🚀💥";
    document.querySelector(".modal").style.backgroundColor = "orange";
    playAgainBtn.style.color = WIN;
    localStorage.setItem("TopUser", user);
    localStorage.setItem("TopPc", pc);
    spanTopScore.textContent = `${user} : ${pc}`;
  }
}

const openModal = () => {
  showModal();

  if (userScoreSpan.textContent === "10") {
    finalMessagePar.textContent = "👍 You Have Won🦾😃";
    document.querySelector(".modal").style.backgroundColor = WIN;
    playAgainBtn.style.color = WIN;
    checkTopScore(userScoreSpan.textContent, pcScoreSpan.textContent);
  } else {
    finalMessagePar.textContent = "🤢🤞You Have Lost ☹️";
    document.querySelector(".modal").style.backgroundColor = LOST;
    playAgainBtn.style.color = LOST;
  }
};

// rockImg.addEventListener("click", () => {
//   image.src = "./assets/rock.png";
//   image.alt = "rock";
//   yourChoiceDiv.appendChild(image);

//   //? innerHTML
//   // yourChoiceDiv.innerHTML = `<img src="./assets/rock.png" alt="rock">`
// });
// paperImg.addEventListener("click", () => {
//   image.src = "./assets/paper.png";
//   image.alt = "paper";
//   yourChoiceDiv.appendChild(image);
// });
// scissorsImg.addEventListener("click", () => {
//   image.src = "./assets/scissors.png";
//   image.alt = "scissors";
//   yourChoiceDiv.appendChild(image);
// });

playAgainBtn.addEventListener("click", () => {
  // modalCardSection.classList.toggle("show")
  // modalCardSection.classList.toggle("remove")
  modalCardSection.style.display = "none";
  window.location.reload();
});
//* ------- Functions ------- */
