let cart = []; // Array untuk menyimpan item dalam keranjang

function addToCart(productName, productId, price, image, productImgElement) {
  // Menambahkan produk ke keranjang
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1; // Menambah jumlah produk jika sudah ada
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: parseInt(price),
      image: image,
      quantity: 1,
    });
  }

  // Animasi gambar menuju ikon keranjang
  if (productImgElement) {
    // Salin elemen gambar produk
    const clonedImg = productImgElement.cloneNode();
    document.body.appendChild(clonedImg);

    // Atur gaya awal elemen gambar yang disalin
    const imgRect = productImgElement.getBoundingClientRect();
    clonedImg.style.position = "fixed";
    clonedImg.style.zIndex = 999;
    clonedImg.style.top = `${imgRect.top}px`;
    clonedImg.style.left = `${imgRect.left}px`;
    clonedImg.style.width = `${imgRect.width}px`;
    clonedImg.style.height = `${imgRect.height}px`;
    clonedImg.style.transition = "all 0.8s ease-in-out";

    // Hitung posisi dinamis ikon keranjang
    const cartIcon = document.getElementById("cartIcon");
    const updateCartPosition = () => {
      const cartIconRect = cartIcon.getBoundingClientRect();
      return {
        x: cartIconRect.left + cartIconRect.width / 2,
        y: cartIconRect.top + cartIconRect.height / 2,
      };
    };

    // Mulai animasi
    const { x, y } = updateCartPosition();
    const translateX = x - (imgRect.left + imgRect.width / 2);
    const translateY = y - (imgRect.top + imgRect.height / 2);

    setTimeout(() => {
      clonedImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.2)`;
      clonedImg.style.opacity = "0.5";
    }, 10);

    // Menghapus elemen setelah animasi selesai
    clonedImg.addEventListener("transitionend", () => {
      clonedImg.remove();
      updateCartUI(); // Memperbarui tampilan keranjang
    });
  }

  // Memperbarui tampilan keranjang setelah menambahkan item
  updateCartUI();

  console.log(`Menambahkan ${productName} ke keranjang!`);
}

function updateCartUI() {
  // Menghitung jumlah total item dan harga total di keranjang
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  // Memperbarui jumlah item dan harga total di UI
  document.getElementById("cartCount").innerText = `${cartCount} item${
    cartCount !== 1 ? "s" : ""
  }`;
  document.getElementById("totalPrice").innerText = `${totalPrice}k`;

  // Memperbarui jumlah item di sidebar
  document.getElementById("cartCountSidebar").innerText = `${cartCount} item${
    cartCount !== 1 ? "s" : ""
  }`;

  // Memperbarui konten sidebar
  const sidebarContent = document.getElementById("sidebarContent");
  sidebarContent.innerHTML = ""; // Menghapus konten lama sebelum menambahkan yang baru

  // Menampilkan setiap item dalam keranjang
  cart.forEach((item) => {
    const itemHTML = `
        <div class="sidebar-item">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <h4>${item.name}</h4>
            <p class="price">${item.price}k</p>
          </div>
          <div class="quantity-controls">
            <button onclick="changeQuantity('${item.id}', -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity('${item.id}', 1)">+</button>
          </div>
        </div>
      `;
    sidebarContent.innerHTML += itemHTML; // Menambahkan item ke sidebar
  });

  // Memperbarui total harga saat checkout
  document.getElementById("checkoutTotal").innerText = `Total: ${totalPrice}k`;

  // Aktifkan atau nonaktifkan tombol checkout berdasarkan isi keranjang
  const checkoutButton = document.getElementById("checkoutButton");
  if (cart.length > 0) {
    checkoutButton.disabled = false;
    checkoutButton.classList.remove("disabled");
  } else {
    checkoutButton.disabled = true;
    checkoutButton.classList.add("disabled");
  }
}

function changeQuantity(productId, change) {
  // Mengubah jumlah item dalam keranjang
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity += change;

    // Menghapus item dari keranjang jika jumlahnya kurang dari atau sama dengan 0
    if (item.quantity <= 0) {
      cart = cart.filter((item) => item.id !== productId);
    }

    updateCartUI(); // Memperbarui tampilan keranjang
  }
}

function toggleCart() {
  // Menampilkan atau menyembunyikan sidebar produk
  document.getElementById("productSidebar").classList.toggle("open");
}

function closeSidebar() {
  // Menutup sidebar produk
  document.getElementById("productSidebar").classList.remove("open");
}

document
  .getElementById("checkoutButton")
  .addEventListener("click", openCheckoutModal);

function openCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  const orderItems = document.getElementById("orderItems");
  const totalAmount = document.getElementById("totalAmount");

  // Tampilkan rincian pesanan
  orderItems.innerHTML = "";
  cart.forEach((item) => {
    orderItems.innerHTML += `
      <div class="order-item">
        <span>${item.name} (${item.quantity})</span>
        <span>${item.price * item.quantity}k</span>
      </div>
    `;
  });

  // Tampilkan total jumlah
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  totalAmount.innerText = `Total: ${totalPrice}k`;

  // Tampilkan modal
  modal.style.display = "block";
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  modal.style.display = "none";
}

function payViaQRIS() {
  alert("Redirecting to QRIS payment...");
  // Tambahkan logika untuk QRIS di sini
}

function payViaBank() {
  alert("Redirecting to Bank Transfer instructions...");
  // Tambahkan logika untuk transfer bank di sini
}

function payViaWhatsApp() {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const orderDetails = cart
    .map(
      (item) =>
        `${item.name} (${item.quantity}): ${item.price * item.quantity}k`
    )
    .join("\n");
  const message = encodeURIComponent(
    `Halo, saya ingin melakukan pemesanan:\n\n${orderDetails}\n\nTotal: ${totalPrice}k`
  );
  const waLink = `https://wa.me/1234567890?text=${message}`;
  window.open(waLink, "_blank");
}

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
