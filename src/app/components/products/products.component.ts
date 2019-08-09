import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { CategoryService } from "src/app/services/category.service";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/models/product";

@Component({
  selector: "products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnDestroy {
  categorySubscription: Subscription;
  productSubscription: Subscription;
  queryParamSubscription: Subscription;
  categories: any[] = [];
  products: Product[] = [];
  selectedCategory: string;

  constructor(
    categoryService: CategoryService,
    productService: ProductService,
    route: ActivatedRoute
  ) {
    this.categorySubscription = categoryService
      .getAll()
      .subscribe(categories => {
        this.categories = categories;
      });

    this.productSubscription = productService.getAll().subscribe(products => {
      this.products = products;
    });

    this.queryParamSubscription = route.queryParamMap.subscribe(params => {
      this.selectedCategory = params.get("category") || "";
    });
  }

  get filteredProducts() {
    if (!this.products) return [];

    if (!this.selectedCategory) return this.products;

    return this.products.filter(p => p.category === this.selectedCategory);
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
    this.productSubscription.unsubscribe();
    this.queryParamSubscription.unsubscribe();
  }
}
