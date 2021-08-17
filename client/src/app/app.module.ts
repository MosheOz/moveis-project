import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { MovieCardComponent } from "./components/movie-card/movie-card.component";
import { MenuComponent } from "./components/menu/menu.component";
import { HomeComponent } from "./components/home/home.component";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./components/auth/auth.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { ModalComponent } from "./components/modal/modal.component";
import {
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
} from "@angular/material";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: "auth", component: AuthComponent, pathMatch: "full" },
  {
    path: "home",
    component: HomeComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  { path: "", component: AuthComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    MenuComponent,
    HomeComponent,
    AuthComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent],
})
export class AppModule {}
