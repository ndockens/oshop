import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { OrderService } from "src/app/services/order.service";
import { AuthService } from "src/app/services/auth.service";
import { Order } from "src/app/models/order";

@Component({
  selector: "shipping-form",
  templateUrl: "./shipping-form.component.html",
  styleUrls: ["./shipping-form.component.css"]
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input("items") items: any[];
  shipping = {};
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.items);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(["/order-success", result.key]);
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(
      user => (this.userId = user.uid)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
