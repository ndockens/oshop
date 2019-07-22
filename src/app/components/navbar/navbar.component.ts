import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { AppUser } from "src/app/models/app-user";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent {
  appUser: AppUser;

  constructor(private authService: AuthService) {
    authService.appUser$.subscribe(appUser => (this.appUser = appUser));
  }

  logout() {
    this.authService.logout();
  }
}
