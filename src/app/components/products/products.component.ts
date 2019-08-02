import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/models/product";

@Component({
  selector: "products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  categories: any[] = [];
  products: Product[] = [];
  selectedCategory: string;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });

    this.productService.getAll().subscribe(products => {
      this.products = products;
    });
  }

  selectCategory(category: string) {
    if (this.selectedCategory !== category) this.selectedCategory = category;
  }

  get filteredProducts() {
    if (!this.products) return [];

    if (!this.selectedCategory) return this.products;

    return this.products.filter(
      p => p.category.toUpperCase() === this.selectedCategory.toUpperCase()
    );
  }

  ngOnInit() {}
}
