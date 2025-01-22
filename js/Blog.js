// FILTER SEARCH

document.getElementById("button-search").addEventListener("click", function () {
  var keyword = document.getElementById("search-input").value.toLowerCase();
  var blogCards = document.querySelectorAll(".blog-card");

  blogCards.forEach(function (card) {
    var cardText = card.getAttribute("data-keyword").toLowerCase();

    if (cardText.includes(keyword)) {
      card.style.display = "block"; // Show the card
    } else {
      card.style.display = "none"; // Hide the card
    }
  });
});
