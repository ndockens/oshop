import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ShoppingCartService } from "src/app/services/shopping-cart.service";
import { ShoppingCart } from "src/app/models/shopping-cart";

@Component({
  selector: "checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {
  cart: ShoppingCart;
  shoppingCartItems = [];
  shoppingCartItems$: Observable<any[]>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    // const cart$ = await this.shoppingCartService.getCart();
    // this.subscription = cart$.subscribe(cart => (this.cart = cart));
    this.shoppingCartItems$ = await this.shoppingCartService.getAllItems();
  }
}
