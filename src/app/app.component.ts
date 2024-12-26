import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BookListComponent } from "./components/book-list/book-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterModule, BookListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'catalogue-admin';
}
