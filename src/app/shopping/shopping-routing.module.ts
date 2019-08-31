import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "shared/services/auth-guard.service";

import { CheckoutComponent } from "./components/checkout/checkout.component";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";
import { ProductsComponent } from "./components/products/products.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";

const routes: Routes = [
  { path: "products", component: ProductsComponent },
  { path: "shopping-cart", component: ShoppingCartComponent },

  { path: "my/orders", component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: "checkout", component: CheckoutComponent, canActivate: [AuthGuard] },
  {
    path: "order-success/:id",
    component: OrderSuccessComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule {}
