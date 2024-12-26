import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Book, BookService } from '../../services/book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];

  categories: string[] = [];  // Liste des catégories extraites
  selectedCategory: string = '';  // Catégorie sélectionnée pour filtrer
  showDetailsModal: boolean = false;
  selectedBook: any = null;
  searchQuery: string = '';
  selectedFilter: string = 'title';
  isSearchActive: boolean = false;
  filteredBooks: any[] = [...this.books];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((data) => {
      this.books = data;
      this.filteredBooks = data;
      this.extractCategories();  // Extraire les catégories à partir des livres
    });
  }

  // Méthode pour extraire les catégories uniques
  extractCategories(): void {
    const categoriesSet = new Set<string>();
    this.books.forEach(book => {
      if (book.category) {
        categoriesSet.add(book.category);
      }
    });
    this.categories = Array.from(categoriesSet);  // Convertir le Set en tableau
  }

  // Filtrer les livres par catégorie
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filteredBooks = this.books.filter((book) => book.category === category);
  }

  showBookDetails(book: any): void {
    this.selectedBook = book;
    this.showDetailsModal = true;
  }

  closeDetails(): void {
    this.showDetailsModal = false;
    this.selectedBook = null;
  }


  filterBooksByCategory(category: string): void {
    if (category === 'all') {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books.filter(book => book.category === category);
    }
  }

  // Filtrage par recherche de texte
  get filteredBooksBySearch(): Book[] {
    return this.filteredBooks.filter(book =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


  filterBooks() {
    if (this.searchQuery) {
      // Si la barre de recherche contient du texte, on filtre les livres
      if (this.selectedFilter === 'title') {
        this.filteredBooks = this.books.filter(book =>
          book.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else if (this.selectedFilter === 'author') {
        this.filteredBooks = this.books.filter(book =>
          book.author.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    } else {
      // Si la barre de recherche est vide, réapplique les filtres de catégorie
      this.filteredBooks = [...this.books];
    }
  }

}
