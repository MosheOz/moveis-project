import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IMovie } from "../interfaces/movie.interface";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  private _moviesArray = new BehaviorSubject<IMovie[]>(null);

  get movies() {
    return this._moviesArray;
  }

  constructor(private http: HttpClient) {
    this.getMovies().subscribe((data) => this._moviesArray.next(data));
  }

  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`http://localhost:3000/api/movies`);
  }
}
