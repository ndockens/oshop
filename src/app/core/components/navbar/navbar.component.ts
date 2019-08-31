import { Component, OnInit } from "@angular/core";
import { AuthService } from "shared/services/auth.service";
import { ShoppingCartService } from "shared/services/shopping-cart.service";
import { AppUser } from "shared/models/app-user";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount = 0;

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  logout() {
    this.authService.logout();
  }

  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => (this.appUser = appUser));

    const cart$ = await this.shoppingCartService.getCart();
    cart$.subscribe(cart => {
      this.shoppingCartItemCount = 0;

      for (let productId in cart.items) {
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });
  }
}
