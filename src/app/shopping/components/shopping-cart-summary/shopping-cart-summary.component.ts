import { Component, Input } from "@angular/core";

@Component({
  selector: "shopping-cart-summary",
  templateUrl: "./shopping-cart-summary.component.html",
  styleUrls: ["./shopping-cart-summary.component.css"]
})
export class ShoppingCartSummaryComponent {
  @Input("items") items: any[];

  get itemCount() {
    let count = 0;

    for (let item of this.items) {
      count += item.quantity;
    }

    return count;
  }

  get itemTotal() {
    let total = 0;

    for (let item of this.items) {
      total += item.product.price * item.quantity;
    }

    return total;
  }
}
