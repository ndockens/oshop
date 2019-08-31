import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AngularFireModule } from "angularfire2";
import { environment } from "environments/environment";
import { SharedModule } from "shared/shared.module";

import { AdminModule } from "./admin/admin.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { ShoppingModule } from "./shopping/shopping.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    AdminModule,
    ShoppingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
