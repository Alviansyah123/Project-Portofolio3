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

// JavaScript to toggle visibility of the answer
document.querySelectorAll(".faq-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("active"); // Toggle the active class on click
  });
});

//testimonial
// Get the scroll arrows
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");
const row = document.querySelector("#testimonial .row");

// Scroll left
leftArrow.addEventListener("click", () => {
  row.scrollBy({
    left: -300, // Adjust value to control scroll distance
    behavior: "smooth",
  });
});

// Scroll right
rightArrow.addEventListener("click", () => {
  row.scrollBy({
    left: 300, // Adjust value to control scroll distance
    behavior: "smooth",
  });
});

//Frequently Asked Questions Toggle
document
  .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
  .forEach((faqItem) => {
    faqItem.addEventListener("click", () => {
      faqItem.parentNode.classList.toggle("faq-active");
    });
  });

//
