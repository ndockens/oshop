import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "app/shopping/components/products/products.component";

import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "", component: ProductsComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
