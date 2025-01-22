function filterMenu(category) {
  const categories = document.querySelectorAll(".menu-category");
  categories.forEach((cat) => {
    if (category === "all" || cat.id === category) {
      cat.style.display = "block";
    } else {
      cat.style.display = "none";
    }
  });
}

// Get the arrow element
const arrow = document.querySelector(".arrow");

// Function to show/hide the arrow based on scroll position
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    // When user scrolls more than 300px down
    arrow.classList.add("visible"); // Show the arrow
  } else {
    arrow.classList.remove("visible"); // Hide the arrow
  }
});

// Optional: Smooth scroll to the top when the arrow is clicked
arrow.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
