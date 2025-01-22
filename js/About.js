document.getElementById("about-btn").addEventListener("click", function () {
  var moreContent = document.getElementById("more-content");
  var button = document.getElementById("about-btn");
  var nextSection = document.querySelector(".next-section"); // Section setelah 'about' (misalnya .next-section)

  // Jika konten lebih lanjut disembunyikan, tampilkan dengan transisi
  if (
    moreContent.style.display === "none" ||
    moreContent.style.display === ""
  ) {
    moreContent.style.display = "block"; // Tampilkan konten
    setTimeout(function () {
      moreContent.style.opacity = "1"; // Animasi opacity
      moreContent.classList.add("show"); // Menambahkan kelas untuk menunjukkan konten

      // Tombol turun
      button.style.transform = "translateY(30px)"; // Tombol bergerak turun
    }, 10);

    // Menurunkan section di bawah
    if (nextSection) {
      nextSection.classList.add("show"); // Memberi efek turun pada section berikutnya
    }
  } else {
    moreContent.style.opacity = "0"; // Mulai animasi sembunyikan
    setTimeout(function () {
      moreContent.style.display = "none"; // Sembunyikan konten setelah transisi
      moreContent.classList.remove("show"); // Menghapus kelas yang menampilkan konten

      // Tombol kembali ke posisi semula
      button.style.transform = "translateY(0)";
    }, 500); // Waktu transisi (sesuai dengan durasi opacity)

    // Section kembali ke posisi semula
    if (nextSection) {
      nextSection.classList.remove("show"); // Menghapus efek turun pada section
    }
  }
});

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
