import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  imageurl: string;
  description: string;
  isbn: string;
  status: boolean;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8082/api/books';

  constructor(private http: HttpClient) {}

  // Récupérer tous les livres
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  // Récupérer un livre par ID
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un livre
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  // Modifier un livre
  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  // Supprimer un livre
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Recherche par titre
  searchByTitle(keyword: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/searchByTitle?keyword=${keyword}`);
  }

  // Recherche par auteur
  searchByAuthor(author: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/searchByAuthor?author=${author}`);
  }

  // Recherche par catégorie
  searchByCategory(category: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/searchByCategory?category=${category}`);
  }
}
