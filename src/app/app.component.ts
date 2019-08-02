import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    router: Router
  ) {
    authService.user$.subscribe(user => {
      if (!user) return;

      userService.save(user);
      const returnUrl = localStorage.getItem("returnUrl");

      if (!returnUrl) return;

      localStorage.removeItem("returnUrl");
      router.navigateByUrl(returnUrl);
    });
  }
}
