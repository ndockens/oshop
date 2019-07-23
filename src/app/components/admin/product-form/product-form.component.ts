import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CategoryService } from "src/app/services/category.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(
    categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService
      .getCategories()
      .snapshotChanges()
      .pipe(
        map(items =>
          items.map(a => {
            return { key: a.key, data: a.payload.val() };
          })
        )
      );
  }

  save(product) {
    console.log(product);
    this.productService.create(product);
  }

  ngOnInit() {}
}
