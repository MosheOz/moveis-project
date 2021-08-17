import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { BehaviorSubject, Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { ModalComponent } from "../components/modal/modal.component";
import { IMovie } from "../interfaces/movie.interface";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  private _moviesArray = new BehaviorSubject<IMovie[]>(null);
  private moviesState = new BehaviorSubject<IMovie[]>(null);

  get movies() {
    return this._moviesArray;
  }

  constructor(
    private http: HttpClient,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {
    this.getMovies().subscribe((data) => {
      this._moviesArray.next(data);
      this.moviesState.next(data);
    });
  }

  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${environment.BASE_URL}/movies`);
  }

  deleteMovie(id: string, userId: string): void {
    this.http
      .delete<IMovie[]>(`${environment.BASE_URL}/movies/${id}/${userId}`)
      .subscribe(
        (data) => {
          this._moviesArray.next(data);
          this.moviesState.next(data);
        },
        (err) => {
          const data = {
            title: "Error",
            description: err.error.err,
            isFooter: false,
            height: "200px",
          };
          this.openModal(data);
        }
      );
  }

  filterMovies(c: string) {
    console.log(c);
    if (!c) return this._moviesArray.next(this.moviesState.value);
    const movies = this.moviesState.value.filter((m) => m.category === c);
    this._moviesArray.next(movies);
  }

  addMovie(): void {
    const data = {
      title: "Add movie",
      description: "",
      isFooter: true,
      height: "500px",
    };
    const modal = this.openModal(data);
    modal
      .afterClosed()
      .pipe(switchMap((result) => this.onAddMovie(result)))
      .subscribe(
        (data) => {
          this._moviesArray.next(data);
          this.moviesState.next(data);
        },
        (err) => {
          const data = {
            title: "Error",
            description: err.error.err,
            isFooter: false,
            height: "200px",
          };
          this.openModal(data);
        }
      );
  }

  onAddMovie(data: any): Observable<any> {
    data.userId = this.authService.user.id;
    return this.http.post<any>(`${environment.BASE_URL}/movies`, data);
  }

  openModal(data?: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = data.height;
    dialogConfig.width = "350px";
    dialogConfig.data = {
      title: data.title,
      description: data.description,
      isFooter: data.isFooter,
    };
    const modalInstance = this.matDialog.open(ModalComponent, dialogConfig);
    return modalInstance;
  }
}
