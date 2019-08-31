import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "admin-orders",
  templateUrl: "./admin-orders.component.html",
  styleUrls: ["./admin-orders.component.css"]
})
export class AdminOrdersComponent implements OnDestroy {
  orders = [];
  ordersSubscription: Subscription;

  constructor(orderService: OrderService) {
    this.ordersSubscription = orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }

  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
  }
}
