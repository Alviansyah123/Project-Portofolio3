// let currentIndex = 0;

// const cards = document.querySelectorAll(".slider-container .card");
// const totalCards = cards.length;

// function showSlide(index) {
//   const sliderContainer = document.querySelector(".slider-container");
//   sliderContainer.style.transform = `translateX(-${index * 100}%)`; // Adjust for full-width slides
// }

// function nextSlide() {
//   currentIndex = (currentIndex + 1) % totalCards;
//   showSlide(currentIndex);
// }

// function prevSlide() {
//   currentIndex = (currentIndex - 1 + totalCards) % totalCards;
//   showSlide(currentIndex);
// }

// // Auto slide every 3 seconds
// setInterval(nextSlide, 3000);

// // Optional: Add event listeners to prev/next buttons
// document.querySelector(".slider-next").addEventListener("click", nextSlide);
// document.querySelector(".slider-prev").addEventListener("click", prevSlide);

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

const arrow = document.querySelector(".arrow");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    arrow.classList.add("visible");
  } else {
    arrow.classList.remove("visible");
  }
});

arrow.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const menuItems = [
  { name: "Espresso", category: "coffee" },
  { name: "Latte", category: "coffee" },
  { name: "Cappuccino", category: "coffee" },
  { name: "Americano", category: "coffee" },
  { name: "Hot Chocolate", category: "non-coffee" },
  { name: "Matcha Latte", category: "non-coffee" },
  { name: "Milkshake", category: "non-coffee" },
  { name: "Honey Lemon", category: "non-coffee" },
  { name: "Green Tea", category: "tea" },
  { name: "Black Tea", category: "tea" },
  { name: "Jasmine Tea", category: "tea" },
  { name: "Chamomile Tea", category: "tea" },
  { name: "Frappuccino", category: "ice-blended" },
  { name: "Oreo Blend", category: "ice-blended" },
  { name: "Mango Blend", category: "ice-blended" },
  { name: "Berry Blend", category: "ice-blended" },
  { name: "Mojito", category: "mocktail" },
  { name: "Sunset", category: "mocktail" },
  { name: "Summer Breeze", category: "mocktail" },
  { name: "Tropical Punch", category: "mocktail" },
];

function updateMenuDisplay() {
  const input = document.getElementById("searchInput");
  const searchValue = input.value.toLowerCase();
  const categories = document.querySelectorAll(".menu-category");
  const autofill = document.getElementById("autofill");
  const notFoundMessage = document.getElementById("notFoundMessage");
  let found = false;

  autofill.innerHTML = "";
  notFoundMessage.style.display = "none";

  // Autofill suggestions excluding exact matches
  const suggestions = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchValue) &&
      item.name.toLowerCase() !== searchValue
  );

  if (searchValue) {
    suggestions.forEach((item) => {
      const dropdownItem = document.createElement("a");
      dropdownItem.className = "dropdown-item";
      dropdownItem.href = "#";
      dropdownItem.textContent = item.name;
      dropdownItem.onclick = () => {
        input.value = item.name;
        autofill.style.display = "none";
        updateMenuDisplay();
      };
      autofill.appendChild(dropdownItem);
    });
    autofill.style.display = suggestions.length ? "block" : "none";
  } else {
    autofill.style.display = "none";
  }

  categories.forEach((category) => {
    const items = category.querySelectorAll(".card");
    let categoryFound = false;

    items.forEach((card) => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      if (name.includes(searchValue)) {
        card.style.display = "block";
        category.style.display = "block";
        found = true;
        categoryFound = true;
      } else {
        card.style.display = "none";
      }
    });

    category.style.display = categoryFound ? "block" : "none";
  });

  if (!found && searchValue) {
    notFoundMessage.style.display = "block";
  }
}

function searchMenu() {
  const input = document.getElementById("searchInput");
  const searchValue = input.value.toLowerCase();
  const categories = document.querySelectorAll(".menu-category");
  const autofill = document.getElementById("autofill");
  const notFoundMessage = document.getElementById("notFoundMessage");
  let found = false;

  autofill.innerHTML = "";
  notFoundMessage.style.display = "none";

  // Autofill suggestions excluding exact matches
  const suggestions = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchValue) &&
      item.name.toLowerCase() !== searchValue
  );

  if (searchValue) {
    suggestions.forEach((item) => {
      const dropdownItem = document.createElement("a");
      dropdownItem.className = "dropdown-item";
      dropdownItem.href = "#";
      dropdownItem.textContent = item.name;
      dropdownItem.onclick = () => {
        input.value = item.name;
        autofill.style.display = "none"; // Close autofill list
        searchMenu(); // Update menu display
      };
      autofill.appendChild(dropdownItem);
    });
    autofill.style.display = suggestions.length ? "block" : "none";
  } else {
    autofill.style.display = "none";
  }

  // Update menu display
  categories.forEach((category) => {
    const items = category.querySelectorAll(".card");
    let categoryFound = false;

    items.forEach((card) => {
      const name = card.querySelector("h3").textContent.toLowerCase();
      if (name.includes(searchValue)) {
        card.style.display = "block";
        category.style.display = "block";
        if (!found) {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
          found = true;
        }
        categoryFound = true;
      } else {
        card.style.display = "none";
      }
    });

    category.style.display = categoryFound ? "block" : "none";
  });

  if (!found && searchValue) {
    notFoundMessage.style.display = "block";
  }

  // Reset input after search
  input.value = "";
  autofill.style.display = "none"; // Close autofill list
}

document
  .querySelector("button[type='button']")
  .addEventListener("click", () => {
    const input = document.getElementById("searchInput");
    const autofill = document.getElementById("autofill");
    const notFoundMessage = document.getElementById("notFoundMessage");

    input.value = ""; // Clear input
    autofill.style.display = "none"; // Hide autofill list
    notFoundMessage.style.display = "none"; // Hide not found message
  });
