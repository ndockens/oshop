import { Component, OnInit, OnDestroy } from "@angular/core";
import { ShoppingCartService } from "src/app/services/shopping-cart.service";
import { ShoppingCart } from "src/app/models/shopping-cart";
import { Subscription } from "rxjs";
import { OrderService } from "src/app/services/order.service";
import { AuthService } from "src/app/services/auth.service";
import { Order } from "src/app/models/order";
import { Router } from "@angular/router";

@Component({
  selector: "checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart: ShoppingCart;
  userId: string;
  shoppingCartItems = [];
  shoppingCartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.shoppingCartItems);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(["/order-success", result.key]);
  }

  async ngOnInit() {
    // const cart$ = await this.shoppingCartService.getCart();
    // this.subscription = cart$.subscribe(cart => (this.cart = cart));
    const shoppingCartItems$ = await this.shoppingCartService.getAllItems();
    this.shoppingCartSubscription = shoppingCartItems$.subscribe(
      items => (this.shoppingCartItems = items)
    );

    this.userSubscription = this.authService.user$.subscribe(
      user => (this.userId = user.uid)
    );
  }

  ngOnDestroy() {
    this.shoppingCartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
