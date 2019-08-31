import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { map } from "rxjs/operators";
import { ShoppingCartService } from "./shopping-cart.service";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  userId;

  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order) {
    const result = await this.db.list("/orders").push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db
      .list("/orders")
      .snapshotChanges()
      .pipe(
        map(orders =>
          orders.map(a => {
            const { datePlaced, items, shipping } = a.payload.val() as any;
            return {
              key: a.key,
              datePlaced,
              items,
              shipping
            };
          })
        )
      );
  }

  getOrdersForUser(userId) {
    return this.db
      .list("/orders/", x => x.orderByChild("userId").equalTo(userId))
      .snapshotChanges()
      .pipe(
        map(orders =>
          orders.map(a => {
            const { datePlaced, items, shipping } = a.payload.val() as any;
            return {
              key: a.key,
              datePlaced,
              items,
              shipping
            };
          })
        )
      );
  }
}
