import { Component, OnInit, OnDestroy } from "@angular/core";
import { ShoppingCartService } from "src/app/services/shopping-cart.service";
import { ShoppingCart } from "src/app/models/shopping-cart";
import { Subscription } from "rxjs";
import { OrderService } from "src/app/services/order.service";
import { AuthService } from "src/app/services/auth.service";

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
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  placeOrder() {
    const order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.shoppingCartItems.map(item => {
        return {
          product: {
            title: item.product.title,
            imageUrl: item.product.imageUrl,
            price: item.product.price
          },
          quantity: item.quantity,
          totalPrice: item.product.price * item.quantity
        };
      })
    };

    this.orderService.storeOrder(order);
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
