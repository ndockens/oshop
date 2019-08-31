import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "shared/shared.module";

import { CheckoutComponent } from "./components/checkout/checkout.component";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";
import { ProductsComponent } from "./components/products/products.component";
import { ShippingFormComponent } from "./components/shipping-form/shipping-form.component";
import { ShoppingCartSummaryComponent } from "./components/shopping-cart-summary/shopping-cart-summary.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { ShoppingRoutingModule } from "./shopping-routing.module";

@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [RouterModule, SharedModule, ShoppingRoutingModule],
  exports: [ProductsComponent]
})
export class ShoppingModule {}
