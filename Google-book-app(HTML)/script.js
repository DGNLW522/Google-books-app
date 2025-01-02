let currentPage = 1;
const booksPerPage = 10;
let totalItems = 0;
let searchQuery = '';

document.getElementById("searchButton").addEventListener("click", searchBooks);

function searchBooks() {
    searchQuery = document.getElementById("searchInput").value.trim();
    if (!searchQuery) return;

    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${(currentPage - 1) * booksPerPage}&maxResults=${booksPerPage}`;

    document.getElementById("loading").style.display = 'block';  // Show loading
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            totalItems = data.totalItems;
            displayBooks(data.items);
            updatePagination();
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        })
        .finally(() => {
            document.getElementById("loading").style.display = 'none';  // Hide loading
        });
}

function displayBooks(books) {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = ""; // Clear previous results

    if (!books || books.length === 0) {
        bookList.innerHTML = "<p>No books found.</p>";
        return;
    }

    books.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-card");
        
        const bookUrl = book.volumeInfo.infoLink;

        // Make the book card clickable, redirecting to the original book page
        bookItem.onclick = () => {
            window.open(bookUrl, "_blank");
        };

        const bookImage = book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/200x300";
        const bookTitle = book.volumeInfo.title || "No title available";
        const bookAuthors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "No authors available";
        const bookDescription = book.volumeInfo.description || "No description available.";
        const bookRating = book.volumeInfo.averageRating ? getStars(book.volumeInfo.averageRating) : "No ratings";

        bookItem.innerHTML = `
            <img src="${bookImage}" alt="${bookTitle}" />
            <div class="book-title">${bookTitle}</div>
            <div class="book-author">${bookAuthors}</div>
            <div class="book-description">${bookDescription}</div>
            <div class="book-rating">${bookRating}</div>
        `;

        bookList.appendChild(bookItem);
    });
}

function getStars(rating) {
    const stars = Math.round(rating);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
}

function updatePagination() {
    const totalPages = Math.ceil(totalItems / booksPerPage);

    const prevButton = document.getElementById("prevPageButton");
    const nextButton = document.getElementById("nextPageButton");
    const pageNumberDisplay = document.getElementById("pageNumberDisplay");

    // Disable previous/next buttons based on the current page
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // Update the current page number display
    pageNumberDisplay.textContent = `Page ${currentPage} of ${totalPages}`;
}

document.getElementById("prevPageButton").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        searchBooks();
    }
});

document.getElementById("nextPageButton").addEventListener("click", () => {
    const totalPages = Math.ceil(totalItems / booksPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        searchBooks();
    }
});
