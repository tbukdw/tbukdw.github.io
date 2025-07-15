let allBooks = [];

function renderBooks(filteredBooks) {
  const container = document.getElementById("book-list");
  container.innerHTML = "";

  filteredBooks.forEach(book => {
    const message = encodeURIComponent(
      `Halo, kak. Saya mau tanya buku "${book.judul}". Apakah stoknya masih ada? Harganya sesuai katalog, ya?`
    );
    const waLink1 = `https://wa.me/${book.waLink1}?text=${message}`;
    const waLink2 = `https://wa.me/${book.waLink2}?text=${message}`;

    const bookElement = document.createElement("div");
    bookElement.className = "book";
    bookElement.innerHTML = `
      <img src="assets/books-img/${book.gambar}" alt="${book.judul}" class="book-image"/>
      <div class="book-content">
        <div class="book-title">${book.judul}</div>
        <div class="book-meta">${book.penulis} | ${book.halaman} | ${book.tahun}</div>
        <div class="book-price">${book.harga}</div>
        <div class="book-desc">${book.deskripsi}</div>
        <div class="book-buttons">
          <a href="${waLink1}" target="_blank" class="btn wa">📱 Tanya Buku ini Via WhatsApp 1</a>
          <a href="${waLink2}" target="_blank" class="btn wa">📱 Tanya Buku ini Via WhatsApp 2</a>
        </div>
      </div>
    `;
    container.appendChild(bookElement);
  });
}

// Load data & setup search
fetch("assets/json/data.json")
  .then(response => response.json())
  .then(data => {
    allBooks = data;
    renderBooks(allBooks); // tampilkan semua buku awalnya

    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.toLowerCase();
      const filtered = allBooks.filter(book =>
        book.judul.toLowerCase().includes(keyword)
      );
      renderBooks(filtered);
    });
  });

  document.getElementById("download-pdf").addEventListener("click", () => {
    const element = document.getElementById("book-list");
  
    const opt = {
      margin:       0.5,
      filename:     'katalog-toko-buku-ukdw.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
  
    html2pdf().set(opt).from(element).save();
  });  

// To Top
const toTopButton = document.getElementById('to-top');
toTopButton.style.visibility = 'hidden';

window.addEventListener('scroll', function(){
    if (window.scrollY > 50) {
        toTopButton.style.visibility = 'visible';
    }else{
        toTopButton.style.visibility = 'hidden';
    }
});

toTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
