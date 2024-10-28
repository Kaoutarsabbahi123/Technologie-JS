import Book, { Status, Format } from '../Book';

document.getElementById('bookForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = (document.getElementById('title') as HTMLInputElement).value;
    const author = (document.getElementById('author') as HTMLInputElement).value;
    const pages = Number((document.getElementById('pages') as HTMLInputElement).value);
    const pagesRead = Number((document.getElementById('pagesRead') as HTMLInputElement).value);
    const status = (document.getElementById('status') as HTMLSelectElement).value as Status;
    const price = Number((document.getElementById('price') as HTMLInputElement).value);
    const format = (document.getElementById('format') as HTMLSelectElement).value as Format;
    const suggestedBy = (document.getElementById('suggestedBy') as HTMLInputElement).value;

    const book = new Book(title, author, pages, status, price, pagesRead, format, suggestedBy);

    try {
        await fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });
        alert("Book added successfully!");
    } catch (error) {
        console.error("Error adding book:", error);
    }
});
