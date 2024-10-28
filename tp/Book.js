"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Format = exports.Status = void 0;
var Status;
(function (Status) {
    Status["READ"] = "Read";
    Status["RE_READ"] = "Re-read";
    Status["DNF"] = "DNF";
    Status["CURRENTLY_READING"] = "Currently reading";
    Status["RETURNED_UNREAD"] = "Returned Unread";
    Status["WANT_TO_READ"] = "Want to read";
})(Status || (exports.Status = Status = {}));
var Format;
(function (Format) {
    Format["PRINT"] = "Print";
    Format["PDF"] = "PDF";
    Format["EBOOK"] = "Ebook";
    Format["AUDIOBOOK"] = "AudioBook";
})(Format || (exports.Format = Format = {}));
var Book = /** @class */ (function () {
    function Book(title, author, pages, status, price, pagesRead, format, suggestedBy, finished) {
        if (finished === void 0) { finished = false; }
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
    Book.prototype.currentlyAt = function () {
        return "".concat(((this.pagesRead / this.pages) * 100).toFixed(2), "%");
    };
    Book.prototype.deleteBook = function () {
        console.log("Book \"".concat(this.title, "\" deleted."));
    };
    return Book;
}());
exports.default = Book;
