import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ILogin } from "../interfaces/login.interface";
import { environment } from "src/environments/environment";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ModalComponent } from "../components/modal/modal.component";
import { BehaviorSubject } from "rxjs";
import { IUser } from "../interfaces/user.interface";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _user = new BehaviorSubject<IUser>(null);

  get user(): IUser {
    return this._user.value;
  }

  get user$(): BehaviorSubject<IUser> {
    return this._user;
  }
  constructor(
    private http: HttpClient,
    private matDialog: MatDialog,
    private router: Router
  ) {}

  login(auth: ILogin): void {
    this.http.post<IUser>(`${environment.BASE_URL}/login`, auth).subscribe(
      (user) => {
        this._user.next(user);
        this.router.navigate(["home"]);
      },
      (err) => this.openModal(err)
    );
  }

  logout(): void {
    this._user.next(null);
    this.router.navigate(["/auth"]);
  }

  openModal(message: HttpErrorResponse) {
    const error = message.error.err;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "200px";
    dialogConfig.width = "350px";
    dialogConfig.data = {
      title: "Error",
      description: error,
      isFooter: false,
    };
    this.matDialog.open(ModalComponent, dialogConfig);
  }
}
