import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Subject } from "rxjs";
import { IUser } from "src/app/interfaces/user.interface";
import { AuthService } from "src/app/services/auth.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit, OnDestroy {
  form: FormGroup;
  user: IUser;
  destroy$ = new Subject();

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      password: ["", Validators.required],
    });

    this.authService.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isUser) => {
        this.user = isUser;
      });
  }

  onAction(action: string) {
    action === "login"
      ? this.authService.login(this.form.value)
      : this.authService.logout();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
