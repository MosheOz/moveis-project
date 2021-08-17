import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MoviesService } from "src/app/services/movies.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  form: FormGroup;
  categories = [
    "Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Thriller",
  ];

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private fb: FormBuilder,
    // private moviesService: MoviesService,
    @Inject(MAT_DIALOG_DATA) public modalData: any
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ["", Validators.required],
      category: ["", Validators.required],
      url: ["", Validators.required],
      image: ["", Validators.required],
    });
  }
  actionFunction() {
    // this.moviesService.onAddMovie(this.form.value)
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close(this.form.value);
  }
}
