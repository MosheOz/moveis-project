import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { IMovie } from "src/app/interfaces/movie.interface";
import { IUser } from "src/app/interfaces/user.interface";
import { AuthService } from "src/app/services/auth.service";
import { MoviesService } from "src/app/services/movies.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  isOpen = false;
  user$: BehaviorSubject<IUser>;
  categories: string[];
  movies: IMovie[];

  constructor(
    private authService: AuthService,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$;
    this.getMoviesList();
  }

  toggleNavbar(): void {
    !this.isOpen ? this.showNavbar() : this.hideNavbar();
    this.isOpen = !this.isOpen;
  }

  showNavbar(): void {
    (document.querySelector(".menu-res") as HTMLElement).style.display = "block";
  }

  hideNavbar(): void {
    (document.querySelector(".menu-res") as HTMLElement).style.display = "none";
  }

  getMoviesList(): void {
    this.moviesService.movies.subscribe((movies) => {
      this.movies = movies;
    });
  }

  getCategories() {
    if (!this.movies) return;
    const currentCategories = this.movies.map((m) => m.category);
    return [...new Set(currentCategories)];
  }

  filterByCategory(c: string): void {
    this.moviesService.filterMovies(c);
  }

  onLogout() {
    this.authService.logout();
  }

  onAddMovie(): void {
    this.moviesService.addMovie();
  }
}
