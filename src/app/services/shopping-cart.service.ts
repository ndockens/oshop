import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { Product } from "../models/product";
import { ShoppingCart } from "../models/shopping-cart";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private createCart() {
    return this.db.list("/shopping-carts").push({ dateCreated: Date.now() });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db
      .object("/shopping-carts/" + cartId)
      .valueChanges()
      .pipe(map((cart: ShoppingCart) => cart));
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem("shoppingCartId");

    if (cartId) return cartId;

    const result = await this.createCart();
    localStorage.setItem("shoppingCartId", result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }

  async getAllItems(): Promise<Observable<any[]>> {
    const cartId = await this.getOrCreateCartId();

    return this.db
      .list("/shopping-carts/" + cartId + "/items")
      .snapshotChanges()
      .pipe(
        map(items =>
          items.map(a => {
            const { product, quantity, dateModified } = a.payload.val() as any;
            return { key: a.key, product, quantity, dateModified };
          })
        )
      );
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);

    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: { quantity: number }) => {
        const quantity = item ? item.quantity + 1 : 1;

        item$.update({
          product,
          quantity,
          dateModified: Date.now()
        });
      });
  }

  async removeFromCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);

    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: { quantity: number }) => {
        if (!item) return;

        if (item.quantity <= 1) return item$.remove();

        item$.update({
          product,
          quantity: item.quantity - 1,
          dateModified: Date.now()
        });
      });
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.list("/shopping-carts/" + cartId + "/items").remove();
  }
}
