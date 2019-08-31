import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { OrderService } from "shared/services/order.service";
import { AuthService } from "shared/services/auth.service";

@Component({
  selector: "my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.css"]
})
export class MyOrdersComponent implements OnDestroy {
  orders = [];
  authSubscription: Subscription;
  orderSubscription: Subscription;

  constructor(authService: AuthService, orderService: OrderService) {
    this.authSubscription = authService.user$.subscribe(user => {
      const userId = user.uid;

      this.orderSubscription = orderService
        .getOrdersForUser(userId)
        .subscribe(orders => {
          this.orders = orders;
        });
    });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.orderSubscription.unsubscribe();
  }
}
