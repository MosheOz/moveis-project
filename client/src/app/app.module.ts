import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MovieCardComponent } from "./components/movie-card/movie-card.component";
import { MenuComponent } from "./components/menu/menu.component";
import { HomeComponent } from "./components/home/home.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    MenuComponent,
    HomeComponent,
  ],
  imports: [CommonModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
