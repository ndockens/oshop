import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [NavbarComponent, HomeComponent, LoginComponent],
  imports: [CommonModule, NgbModule, RouterModule.forChild([])],
  exports: [NavbarComponent]
})
export class CoreModule {}
