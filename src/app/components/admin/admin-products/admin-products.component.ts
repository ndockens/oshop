import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/models/product";

@Component({
  selector: "admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  pagedProducts: Product[] = [];
  itemsPerPage = 5;
  currentPage = 1;
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.filteredProducts = this.products = products;
      this.paginate();
    });
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter(p =>
          p.title.toUpperCase().includes(query.toUpperCase())
        )
      : this.products;

    this.currentPage = 1;
    this.paginate();
  }

  paginate() {
    this.pagedProducts = this.filteredProducts.slice(
      this.startIndex,
      this.endIndex + 1
    );
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  nextPage() {
    if (this.currentPage < this.pageCount) {
      this.currentPage++;
      this.paginate();
    }
  }

  firstPage() {
    if (this.currentPage !== 1) {
      this.currentPage = 1;
      this.paginate();
    }
  }

  lastPage() {
    if (this.currentPage !== this.pageCount) {
      this.currentPage = this.pageCount;
      this.paginate();
    }
  }

  goToPage(pageNbr: number) {
    if (pageNbr > 0 && pageNbr <= this.pageCount) {
      this.currentPage = pageNbr;
      this.paginate();
    }
  }

  get pageCount() {
    if (!this.filteredProducts) return 1;

    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  get itemCount() {
    if (!this.filteredProducts) return 0;

    return this.filteredProducts.length;
  }

  get startIndex() {
    return this.itemsPerPage * (this.currentPage - 1);
  }

  get endIndex() {
    if (!this.filteredProducts) return 0;

    const endIndex = this.startIndex + this.itemsPerPage - 1;

    return this.filteredProducts.length > endIndex
      ? endIndex
      : this.filteredProducts.length - 1;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
