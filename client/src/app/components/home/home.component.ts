import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IMovie } from "src/app/interfaces/movie.interface";
import { MoviesService } from "src/app/services/movies.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  movies$: BehaviorSubject<IMovie[]>;

  constructor(private moviesService: MoviesService, private http: HttpClient) {}

  ngOnInit() {
    this.getMovies().subscribe((data) => console.log(data));
    this.movies$ = this.moviesService.movies;
  }

  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`http://localhost:3000/api/movies`);
  }
}
