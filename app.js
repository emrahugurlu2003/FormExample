var modalVisible = false; // Track the modal's visibility
function toggleModal() {
  // Get the modal element
  var modal = document.getElementById("myModal");

  // Get the toggle button element
  var btn = document.getElementById("toggle-myModal");
  btn.textContent = modalVisible ? "Show Game Rules" : "Hide Game Rules";

  // Get the image and set its source
  var img = document.getElementById("modalImage");
  img.src = "assets/game.jpeg";

  // Toggle the modal's visibility
  modalVisible = !modalVisible;

  // Update the display property based on visibility
  modal.style.display = modalVisible ? "block" : "none";
}
