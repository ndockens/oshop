import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { CategoryService } from "src/app/services/category.service";
import { ProductService } from "src/app/services/product.service";
import { ShoppingCartService } from "src/app/services/shopping-cart.service";
import { Product } from "src/app/models/product";

@Component({
  selector: "products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit, OnDestroy {
  categorySubscription: Subscription;
  productSubscription: Subscription;
  queryParamSubscription: Subscription;
  shoppingCartSubscription: Subscription;
  categories: any[] = [];
  products: Product[] = [];
  selectedCategory: string;
  shoppingCart;

  constructor(
    categoryService: CategoryService,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService,
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

  addToCart(product) {
    this.shoppingCartService.addToCart(product);
  }

  removeFromCart(product) {
    this.shoppingCartService.removeFromCart(product);
  }

  getProductQuantity(productId: string) {
    if (!this.shoppingCart || !this.shoppingCart.items) return 0;

    const item = this.shoppingCart.items[productId];
    return item ? item.quantity : 0;
  }

  async ngOnInit() {
    this.shoppingCartSubscription = (await this.shoppingCartService.getCart()).subscribe(
      cart => {
        this.shoppingCart = cart;
      }
    );
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
    this.productSubscription.unsubscribe();
    this.queryParamSubscription.unsubscribe();
    this.shoppingCartSubscription.unsubscribe();
  }
}
