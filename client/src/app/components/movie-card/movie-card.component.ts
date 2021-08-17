import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { IMovie } from "src/app/interfaces/movie.interface";
import { IUser } from "src/app/interfaces/user.interface";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent implements OnInit {
  @Input() movie: IMovie;
  @Input() user: IUser;
  @Output() deleteMovie = new EventEmitter<{ [key: string]: string }>();

  isAdmin = false;

  ngOnInit() {
    if (!this.user) return;
    this.isAdmin = this.user.role === "admin";
  }

  goToMovie() {
    window.location.href = this.movie.url;
  }

  onRemoveMovie() {
    this.deleteMovie.emit({ id: this.movie.id, userId: this.user.id });
  }
}
