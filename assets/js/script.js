// Mode
const modeButton = document.querySelector('#mode-button');
if (typeof(Storage) !== "undefined") {
    const isDark = localStorage.getItem('isDark');
    
    if (isDark == 'active'){
        const bodyMode = document.body.classList.add('dark-mode');
        modeButton.setAttribute('title', 'Klik untuk mengaktifkan mode terang');
        modeButton.innerHTML = '🌞';
    }   
}

modeButton.addEventListener('click', function () {   
    const bodyMode = document.body.classList.toggle('dark-mode');

    if (bodyMode == true) {
        modeButton.setAttribute('title', 'Klik untuk mengaktifkan mode terang');
        modeButton.innerHTML = '🌞';
        localStorage.setItem('isDark', 'active');
    } else {
        modeButton.setAttribute('title', 'Klik untuk mengaktifkan mode gelap');
        modeButton.innerHTML = '🌚';
        localStorage.removeItem('isDark');
    }
});

let allBooks = [];

function renderBooks(filteredBooks) {
  const container = document.getElementById("book-list");
  container.innerHTML = "";

  const keyword = document
    .getElementById("search-input")
    .value
    .toLowerCase();

  filteredBooks.forEach(book => {
    const message = encodeURIComponent(
      `Halo, kak. Saya mau tanya buku "${book.judul}". Apakah stoknya masih ada? Harganya berapa, ya?`
    );
    const waLink1 = `https://wa.me/${book.waLink1}?text=${message}`;
    const waLink2 = `https://wa.me/${book.waLink2}?text=${message}`;

    const bookElement = document.createElement("div");
    bookElement.className = "book";
    bookElement.innerHTML = `
      <div class="book-header">
        <div class="book-title">
          ${highlightText(book.judul, keyword)}
        </div>
        <img src="assets/books-img/${book.gambar}" 
            alt="${book.judul}" 
            class="book-image"/>
      </div>

      <div class="book-content">    
        <table class="book-meta-table">
          <tr>
            <td><span class="badge-pill badge-primary">Penulis</span></td>
            <td class="meta-value">
              ${highlightText(book.penulis, keyword)}
            </td>
          </tr>
          <tr>
            <td><span class="badge-pill badge-primary">Penerbit</span></td>
            <td class="meta-value">
              ${highlightText(book.penerbit, keyword)}
            </td>
          </tr>
          <tr>
            <td><span class="badge-pill badge-primary">Tahun Terbit</span></td>
            <td class="meta-value">${book.tahun}</td>
          </tr>
        </table>

        <div class="book-buttons">
          <a href="6281292238622" target="_blank" class="btn wa">📱 WhatsApp 1</a>
          <a href="6282226529756" target="_blank" class="btn wa">📱 WhatsApp 2</a>
        </div>

        <em class="note">*Tanya stok dan harga lewat No. WhatsApp di atas</em>
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
    renderBooks(allBooks);
    updateBookCounter(allBooks.length, allBooks.length);
    
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.toLowerCase();
        const filtered = allBooks.filter(book =>
          book.judul.toLowerCase().includes(keyword) ||
          book.penulis.toLowerCase().includes(keyword) ||
          book.penerbit.toLowerCase().includes(keyword)
        );

        renderBooks(filtered);
        updateBookCounter(filtered.length, allBooks.length);
      });
  });

  
function updateBookCounter(shown, total) {
  const counter = document.getElementById("bookCounter");
  if (!counter) return;

  if(shown == 0){
    counter.textContent = `Tidak ada buku yang cocok dengan pencarianmu.`;  
  }else{
   counter.textContent = `Menampilkan ${shown} dari ${total} buku`; 
  }
}

function highlightText(text, keyword) {
  if (!keyword) return text;

  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");

  return text.replace(regex, `<span class="highlight">$1</span>`);
}

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













