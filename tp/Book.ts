
export enum Status {
    READ = "Read",
    RE_READ = "Re-read",
    DNF = "DNF",
    CURRENTLY_READING = "Currently reading",
    RETURNED_UNREAD = "Returned Unread",
    WANT_TO_READ = "Want to read"
}

export enum Format {
    PRINT = "Print",
    PDF = "PDF",
    EBOOK = "Ebook",
    AUDIOBOOK = "AudioBook"
}

export default class Book {
    title: string;
    author: string;
    pages: number;
    pagesRead: number;
    status: Status;
    price: number;
    format: Format;
    suggestedBy: string;
    finished: boolean;

    constructor(
        title: string,
        author: string,
        pages: number,
        status: Status,
        price: number,
        pagesRead: number,
        format: Format,
        suggestedBy: string,
        finished: boolean = false
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.pagesRead = pagesRead;
        this.status = status;
        this.price = price;
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = finished || this.pagesRead >= this.pages;
    }

    currentlyAt(): string {
        return `${((this.pagesRead / this.pages) * 100).toFixed(2)}%`;
    }

    deleteBook() {
        console.log(`Book "${this.title}" deleted.`);
    }
}
