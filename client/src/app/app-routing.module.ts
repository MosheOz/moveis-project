import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";

const routes: Routes = [
  { path: "auth", component: AuthComponent, pathMatch: "full" },
  { path: "home", component: AuthComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
