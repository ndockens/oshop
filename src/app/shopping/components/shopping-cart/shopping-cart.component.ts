import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ShoppingCartService } from "shared/services/shopping-cart.service";

@Component({
  selector: "shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"]
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  shoppingCartItems = [];
  shoppingCartItemsSubscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) {}

  get itemCount() {
    let count = 0;

    for (let item of this.shoppingCartItems) {
      count += item.quantity;
    }

    return count;
  }

  get itemTotal() {
    let total = 0;

    for (let item of this.shoppingCartItems) {
      total += item.product.price * item.quantity;
    }

    return total;
  }

  removeFromCart(product) {
    this.shoppingCartService.removeFromCart(product);
  }

  addToCart(product) {
    this.shoppingCartService.addToCart(product);
  }

  clearCart() {
    if (confirm("Are you sure you want to clear your shopping cart?"))
      this.shoppingCartService.clearCart();
  }

  async ngOnInit() {
    this.shoppingCartItemsSubscription = (await this.shoppingCartService.getAllItems()).subscribe(
      items => {
        this.shoppingCartItems = items;
      }
    );
  }

  ngOnDestroy() {
    this.shoppingCartItemsSubscription.unsubscribe();
  }
}
