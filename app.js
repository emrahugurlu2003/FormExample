var modalVisible = false; // Track the modal's visibility
function toggleModal() {
  // Get the modalContent element
  var modalContent = document.getElementById("modalContent");

  // Get the toggle button element
  var btn = document.getElementById("toggle-myModal");
  btn.textContent = modalVisible ? "Show Game Rules" : "Hide Game Rules";

  // Get the image and set its source
  var img = document.getElementById("modalImage");
  img.src = "assets/game.jpeg";

  // Toggle the modal's visibility
  modalVisible = !modalVisible;

  // Update the display property based on visibility
  modalContent.style.display = modalVisible ? "block" : "none";
}

//* ------ Selectors ------- */
const selectionArticle = document.querySelector(".selection");

// //? Images
// const rockImg = document.getElementById("rock");
// const paperImg = document.getElementById("paper");
// const scissorImg = document.getElementById("scissor");

//? divs of the selected elements
const yourChoiceDiv = document.getElementById("your-choice");
const pcChoiceDiv = document.getElementById("pc-choice");

//* ------- Variables ------- */
// let image = document.createElement("img");
let userSelectImg = document.createElement("img");
let pcSelectImg = document.createElement("img");

//* ------- Event Listeners ------- */
selectionArticle.addEventListener("click", (e) => {
  // console.log(e.target.id)
  if (e.target.id) {
    userSelectImg.src = `./assets/${e.target.id}.png`;
    userSelectImg.alt = e.target.id;
    yourChoiceDiv.appendChild(userSelectImg);
    createPcSelection();
    calculateResult();
  }
});

const createPcSelection = () => {
  const pcArr = ["rock", "paper", "scissor"];
  const pcRandom = pcArr[Math.floor(Math.random() * 3)];
  pcSelectImg.src = `./assets/${pcRandom}.png`;
  pcSelectImg.alt = pcRandom;
  pcChoiceDiv.appendChild(pcSelectImg);
};

const calculateResult = () => {
  console.log(userSelectImg.alt);
  console.log(pcSelectImg.alt);

  //? Case:Draw
  if (userSelectImg.alt === pcSelectImg.alt) {
    draw();
  }
};

const draw = () => {
  console.log("It's a draw!");
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
// scissorImg.addEventListener("click", () => {
//   image.src = "./assets/scissor.png";
//   image.alt = "scissor";
//   yourChoiceDiv.appendChild(image);
// });
//* ------- Functions ------- */
