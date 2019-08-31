import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list("/products").push(product);
  }

  getAll() {
    return this.db
      .list("/products")
      .snapshotChanges()
      .pipe(
        map(items =>
          items.map(a => {
            const { title, price, category, imageUrl } = a.payload.val() as any;
            return { key: a.key, title, price, category, imageUrl };
          })
        )
      );
  }

  get(id) {
    return this.db.object("/products/" + id).valueChanges();
  }

  update(id, product) {
    return this.db.object("/products/" + id).update(product);
  }

  delete(id) {
    return this.db.object("/products/" + id).remove();
  }
}
