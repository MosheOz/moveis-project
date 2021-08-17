import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IMovie } from "src/app/interfaces/movie.interface";
import { IUser } from "src/app/interfaces/user.interface";
import { AuthService } from "src/app/services/auth.service";
import { MoviesService } from "src/app/services/movies.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  movies$: BehaviorSubject<IMovie[]>;
  user: IUser;

  constructor(
    private moviesService: MoviesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.movies$ = this.moviesService.movies;
    this.authService.user$.subscribe((user) => (this.user = user));
  }

  deleteMovie($event) {
    const { id, userId } = $event;
    this.moviesService.deleteMovie(id, userId);
  }
}
