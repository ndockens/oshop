import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories() {
    return this.db.list("/categories", ref => ref.orderByChild("name"));
  }

  getAll() {
    return this.db
      .list("/categories", ref => ref.orderByChild("name"))
      .snapshotChanges()
      .pipe(
        map(items =>
          items.map(a => {
            const { name } = a.payload.val() as any;
            return { key: a.key, name };
          })
        )
      );
  }
}
