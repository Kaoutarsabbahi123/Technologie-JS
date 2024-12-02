import { Component } from '@angular/core';
import { Book } from '../shared/book'; // Import the Book class

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  books: Book[] = [
    new Book('The Great Gatsby', true),
    new Book('1984', false),
    new Book('To Kill a Mockingbird', true)
  ];
}
